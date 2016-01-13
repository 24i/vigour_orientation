package io.vigour.plugin.orientation;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.view.Surface;

import java.util.Map;

import io.vigour.nativewrapper.plugin.core.ActivityLifecycleListener;
import io.vigour.nativewrapper.plugin.core.Plugin;

/**
 * Created by michielvanliempt on 29/09/15.
 */
public class OrientationPlugin extends Plugin implements ActivityLifecycleListener {

    private final Activity context;
    private boolean isPortrait;
    int surfaceRotation;

    public OrientationPlugin(Activity context) {
        super("orientation");
        this.context = context;

    }

    @Override public void onPause() {

    }

    @Override public void onStop() {

    }

    @Override public void onResume() {
        final int current = context.getWindowManager().getDefaultDisplay().getRotation();
        if (current == surfaceRotation) {
            return;
        }
        surfaceRotation = current;
        isPortrait = context.getResources().getConfiguration().orientation != Configuration.ORIENTATION_LANDSCAPE;
        sendEvent("change", isPortrait ? "portrait" : "landscape");
    }

    @Override public void onStart() {

    }

    private int toOrientationRequest(int surfaceRotation) {
        if (surfaceRotation == Surface.ROTATION_0) {
            return ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
        }
        if (surfaceRotation == Surface.ROTATION_90) {
            return ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
        }
        if (surfaceRotation == Surface.ROTATION_180) {
            return ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT;
        }
        return ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE;
    }

    public void locked(Object arg) {
        if (!(arg instanceof Map)) {
            throw new IllegalArgumentException("arg must be a map");
        }
        boolean isLocked = (Boolean)((Map<String, Object>)arg).get("locked");
        if (isLocked) {
            context.setRequestedOrientation(toOrientationRequest(surfaceRotation));
        } else {
            context.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
        }
    }

    public void orientation(Object arg) {
        if (!(arg instanceof Map)) {
            throw new IllegalArgumentException("arg must be a map");
        }
        String orientation = ((Map<String, Object>)arg).get("orientation").toString();
        if ("landscape".equalsIgnoreCase(orientation)) {
            context.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        } else {
            context.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
        }
    }
}
