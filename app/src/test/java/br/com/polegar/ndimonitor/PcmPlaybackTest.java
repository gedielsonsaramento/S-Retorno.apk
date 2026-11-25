package br.com.polegar.ndimonitor;
import org.junit.Test;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import static org.junit.Assert.*;
public class PcmPlaybackTest {
    private static class Sink implements PcmPlayback.Sink {
        final List<Short> samples=new ArrayList<>();
        final CountDownLatch done=new CountDownLatch(1);
        final int expected;
        boolean released;
        Sink(int expected) {this.expected=expected;}
        public void play() {}
        public synchronized int write(short[] data,int offset,int count) {
            int size=Math.min(2,count);
            for(int i=0;i<size;i++) samples.add(data[offset+i]);
            if(samples.size()>=expected) done.countDown();
            return size;
        }
        public void pause() {}
        public void release() {released=true;}
    }
    @Test public void partialWritesPreserveEverySampleInOrder() throws Exception {
        Sink sink=new Sink(8);PcmPlayback p=new PcmPlayback((r,c)->sink,()->{});
        try {
            p.start("A");p.offer("A",new short[]{1,2,3,4,5,6,7,8},48000,2);
            assertTrue(sink.done.await(2,TimeUnit.SECONDS));
            assertEquals(java.util.Arrays.asList((short)1,(short)2,(short)3,(short)4,(short)5,(short)6,(short)7,(short)8),sink.samples);
            assertEquals(0,p.stats()[1]);
        } finally {p.close();assertTrue(p.awaitStopped(2000));}
        assertTrue(sink.released);
    }
    @Test public void stalledOutputCannotGrowCaptureQueueAndStopInterruptsWriter() throws Exception {
        CountDownLatch entered=new CountDownLatch(1),interrupted=new CountDownLatch(1);
        Sink sink=new Sink(0) {
            @Override public int write(short[] data,int offset,int count) {
                entered.countDown();
                try {assertTrue(interrupted.await(2,TimeUnit.SECONDS));}
                catch(InterruptedException e) {throw new AssertionError(e);}
                return 0;
            }
            @Override public void pause() {interrupted.countDown();}
        };
        PcmPlayback p=new PcmPlayback((r,c)->sink,()->{});
        try {
            p.start("A");p.offer("A",new short[960],48000,1);
            assertTrue(entered.await(2,TimeUnit.SECONDS));
            for(int i=0;i<1000;i++) p.offer("A",new short[960],48000,1);
            assertTrue(p.stats()[0]<=120);assertTrue(p.stats()[1]>0);
            p.stop();assertEquals(0,p.stats()[0]);
        } finally {p.close();assertTrue(p.awaitStopped(2000));}
        assertTrue(sink.released);
    }
    @Test public void oldSourceAndStoppedPacketsAreIgnored() throws Exception {
        AtomicInteger opens=new AtomicInteger();Sink sink=new Sink(2);
        PcmPlayback p=new PcmPlayback((r,c)->{opens.incrementAndGet();return sink;},()->{});
        try {
            p.start("A");p.stop();p.offer("A",new short[]{8,9},48000,1);assertEquals(0,opens.get());
            p.start("B");p.offer("A",new short[]{8,9},48000,1);p.offer("B",new short[]{1,2},48000,1);
            assertTrue(sink.done.await(2,TimeUnit.SECONDS));
            assertEquals(java.util.Arrays.asList((short)1,(short)2),sink.samples);
        } finally {p.close();assertTrue(p.awaitStopped(2000));}
    }
    @Test public void unavailableOutputDoesNotKillWorker() throws Exception {
        AtomicInteger opens=new AtomicInteger();CountDownLatch failed=new CountDownLatch(1);Sink sink=new Sink(2);
        PcmPlayback p=new PcmPlayback((r,c)->{
            if(opens.incrementAndGet()==1) {failed.countDown();throw new IllegalStateException("unavailable");}
            return sink;
        },()->{});
        try {
            p.start("A");p.offer("A",new short[]{8,9},48000,1);assertTrue(failed.await(2,TimeUnit.SECONDS));
            p.offer("A",new short[]{1,2},48000,1);assertTrue(sink.done.await(2,TimeUnit.SECONDS));
            assertEquals(1,p.stats()[2]);
        } finally {p.close();assertTrue(p.awaitStopped(2000));}
    }
}
