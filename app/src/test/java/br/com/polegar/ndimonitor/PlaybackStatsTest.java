package br.com.polegar.ndimonitor;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;
import static org.junit.Assert.*;
@RunWith(RobolectricTestRunner.class) @Config(sdk=35)
public class PlaybackStatsTest {
    @Test public void captureAndRenderRatesRemainDistinctAndResetOnReconnect() throws Exception {
        ReceiverStats stats=new ReceiverStats();
        stats.accept(60,0,0,30,29,16000,1000);
        stats.accept(120,1,0,60,59,33000,2000);
        org.json.JSONObject p=stats.json(2000);
        assertEquals(60,p.getDouble("capture_fps"),0);
        assertEquals(30,p.getDouble("render_fps"),0);
        assertEquals(59,p.getLong("superseded_frames"));
        assertEquals(1,p.getLong("dropped_frames"));
        assertEquals(33,p.getDouble("max_render_ms"),0);
        stats.reset();p=stats.json(3000);
        assertTrue(p.isNull("render_fps"));assertTrue(p.isNull("rendered_frames"));
        assertEquals("waiting",p.getString("state"));
    }
}
