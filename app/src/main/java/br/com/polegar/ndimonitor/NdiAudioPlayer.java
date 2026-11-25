package br.com.polegar.ndimonitor;

import android.media.AudioAttributes;
import android.media.AudioFormat;
import android.media.AudioTrack;
import android.os.Process;

final class NdiAudioPlayer {
    static PcmPlayback create() {
        return new PcmPlayback((rate,channels) -> {
            int mask=channels==1 ? AudioFormat.CHANNEL_OUT_MONO : AudioFormat.CHANNEL_OUT_STEREO;
            int minimum=AudioTrack.getMinBufferSize(rate,mask,AudioFormat.ENCODING_PCM_16BIT);
            if (minimum<=0) throw new IllegalStateException("Unsupported audio format");
            AudioTrack track=new AudioTrack.Builder()
                    .setAudioAttributes(new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_MEDIA)
                            .setContentType(AudioAttributes.CONTENT_TYPE_MOVIE).build())
                    .setAudioFormat(new AudioFormat.Builder().setSampleRate(rate).setChannelMask(mask)
                            .setEncoding(AudioFormat.ENCODING_PCM_16BIT).build())
                    .setTransferMode(AudioTrack.MODE_STREAM)
                    .setBufferSizeInBytes(Math.max(minimum*2,rate*channels*2*40/1000)).build();
            if (track.getState()!=AudioTrack.STATE_INITIALIZED) {
                track.release(); throw new IllegalStateException("Audio unavailable");
            }
            return new PcmPlayback.Sink() {
                public void play() { track.play(); }
                public int write(short[] data,int offset,int count) {
                    return track.write(data,offset,count,AudioTrack.WRITE_BLOCKING);
                }
                public void pause() { track.pause(); }
                public void release() { try { track.flush(); } finally { track.release(); } }
            };
        }, () -> Process.setThreadPriority(Process.THREAD_PRIORITY_AUDIO));
    }
    private NdiAudioPlayer() { }
}
