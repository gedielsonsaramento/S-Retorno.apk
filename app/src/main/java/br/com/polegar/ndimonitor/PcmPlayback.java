package br.com.polegar.ndimonitor;

import java.util.ArrayDeque;
import java.util.Arrays;

/** Live audio: bounded queue, partial writes retained, one sink-owning worker. */
final class PcmPlayback implements AutoCloseable {
    interface Sink {
        void play();
        int write(short[] data, int offset, int count);
        void pause(); // May be called by the owner to interrupt a blocked write.
        void release();
    }
    interface Factory { Sink open(int rate, int channels); }
    private static final long MAX_QUEUE_US = 120_000, MAX_AGE_NS = 250_000_000;
    private final Object lock = new Object();
    private final Factory factory;
    private final Runnable initializeWorker;
    private final ArrayDeque<Chunk> queue = new ArrayDeque<>();
    private Thread worker;
    private Sink current;
    private String source = "";
    private long generation, queuedUs, droppedFrames, writeErrors;
    private boolean closed;
    private static final class Chunk {
        final short[] data;
        final int rate, channels;
        final long generation, receivedAt = System.nanoTime();
        Chunk(short[] data, int rate, int channels, long generation) {
            this.data=data; this.rate=rate; this.channels=channels; this.generation=generation;
        }
        long durationUs() { return 1_000_000L * (data.length / channels) / rate; }
    }
    PcmPlayback(Factory factory, Runnable initializeWorker) {
        this.factory=factory; this.initializeWorker=initializeWorker;
    }
    void start(String source) {
        stop();
        synchronized (lock) {
            if (closed) return;
            this.source=source == null ? "" : source;
            droppedFrames=writeErrors=0;
        }
    }
    void offer(String source, short[] data, int rate, int channels) {
        if (data == null || data.length == 0 || rate < 8000 || rate > 192000 ||
                channels < 1 || channels > 2 || data.length % channels != 0) return;
        synchronized (lock) {
            if (closed || this.source.isEmpty() || !this.source.equals(source)) return;
            int maxSamples=(int)(MAX_QUEUE_US * rate / 1_000_000) * channels;
            if (data.length > maxSamples) {
                droppedFrames += (data.length-maxSamples)/channels;
                data=Arrays.copyOfRange(data,data.length-maxSamples,data.length);
            }
            Chunk chunk=new Chunk(data,rate,channels,generation);
            while (!queue.isEmpty() && queuedUs+chunk.durationUs()>MAX_QUEUE_US) {
                Chunk old=queue.removeFirst(); queuedUs-=old.durationUs();
                droppedFrames+=old.data.length/old.channels;
            }
            queue.addLast(chunk); queuedUs+=chunk.durationUs();
            if (worker == null) {
                worker=new Thread(this::run,"S-Retorno-audio");
                worker.setDaemon(true); worker.start();
            }
            lock.notifyAll();
        }
    }
    void stop() {
        Sink old;
        synchronized (lock) {
            source=""; ++generation; queue.clear(); queuedUs=0; old=current;
            lock.notifyAll();
        }
        if (old != null) try { old.pause(); } catch (RuntimeException ignored) { }
    }
    private boolean active(Chunk chunk) {
        synchronized (lock) { return !closed && !source.isEmpty() && generation == chunk.generation; }
    }
    private void release() {
        Sink old;
        synchronized (lock) { old=current; current=null; }
        // Platform calls never hold the capture queue lock.
        if (old != null) {
            try { old.pause(); } catch (RuntimeException ignored) { }
            try { old.release(); } catch (RuntimeException ignored) { }
        }
    }
    private void run() {
        long observed=-1;
        int rate=0, channels=0;
        try {
            try { initializeWorker.run(); } catch (RuntimeException ignored) { }
            while (true) {
                Chunk chunk;
                synchronized (lock) {
                    while (!closed && queue.isEmpty() && observed == generation) lock.wait();
                    if (closed) return;
                    if (observed != generation) { observed=generation; chunk=null; }
                    else { chunk=queue.removeFirst(); queuedUs-=chunk.durationUs(); }
                }
                if (chunk == null) { release(); rate=channels=0; continue; }
                if (!active(chunk)) continue;
                int offset=0;
                try {
                    if (current == null || rate != chunk.rate || channels != chunk.channels) {
                        release();
                        Sink created=factory.open(chunk.rate,chunk.channels);
                        if (created == null) throw new IllegalStateException("Audio unavailable");
                        synchronized (lock) { current=created; }
                        if (!active(chunk)) { release(); continue; }
                        created.play();
                        rate=chunk.rate; channels=chunk.channels;
                    }
                    long progressAt=System.nanoTime();
                    while (offset<chunk.data.length && active(chunk)) {
                        long now=System.nanoTime();
                        if (now-chunk.receivedAt>MAX_AGE_NS || now-progressAt>MAX_AGE_NS) break;
                        int written=current.write(chunk.data,offset,chunk.data.length-offset);
                        if (written<0 || written>chunk.data.length-offset || written%chunk.channels!=0)
                            throw new IllegalStateException("Audio write failed");
                        if (written==0) {
                            synchronized (lock) { if (active(chunk)) lock.wait(5); }
                        } else { offset+=written; progressAt=System.nanoTime(); }
                    }
                } catch (RuntimeException unavailable) {
                    synchronized (lock) { if (active(chunk)) ++writeErrors; }
                    release();
                    synchronized (lock) { if (active(chunk)) lock.wait(100); }
                }
                synchronized (lock) {
                    if (active(chunk)) droppedFrames+=(chunk.data.length-offset)/chunk.channels;
                }
            }
        } catch (InterruptedException stopped) { Thread.currentThread().interrupt(); }
        finally { release(); }
    }
    long[] stats() {
        synchronized (lock) { return new long[]{queuedUs/1000,droppedFrames,writeErrors}; }
    }
    @Override public void close() {
        synchronized (lock) { closed=true; }
        stop();
    }
    boolean awaitStopped(long timeoutMs) throws InterruptedException {
        Thread t; synchronized (lock) { t=worker; }
        if (t==null) return true;
        t.join(timeoutMs); return !t.isAlive();
    }
}
