package io.vigour.plugin.example;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.TextView;

import com.fasterxml.jackson.jr.ob.JSON;
import com.fasterxml.jackson.jr.ob.impl.JSONReader;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;
import io.vigour.nativewrapper.plugin.core.BridgeEvents;
import io.vigour.plugin.orientation.OrientationPlugin;

public class MainActivity extends AppCompatActivity {

    private OrientationPlugin plugin;
    String orientation = "??";

    @Bind(R.id.output) TextView output;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        plugin = new OrientationPlugin(this);
        plugin.setEventInterface(new BridgeEvents() {
            @Override public void receive(String event, String data, String pluginId) {
                if ("change".equals(event) && "orientation".equals(pluginId)) {
                    orientation = data;
                    output.setText(orientation);
                }
            }
        });
        plugin.init(new Object());

    }

    @Override protected void onResume() {
        super.onResume();
        plugin.onResume();
    }

    String init() {
        return orientation;
    }

    @OnClick(R.id.lock) public void lock() {
        plugin.locked(makeMap("{\"locked\":true}"));
    }
    @OnClick(R.id.unlock) public void unlock() {
        plugin.locked(makeMap("{\"locked\":false}"));
    }
    @OnClick(R.id.portrait) public void portrait() {
        plugin.orientation(makeMap("{\"orientation\":\"portrait\"}"));
    }
    @OnClick(R.id.landscape) public void landscape() {
        plugin.orientation(makeMap("{\"orientation\":\"landscape\"}"));
    }

    private Map<Object, Object> makeMap(String source){
        try {
            return JSON.std.mapFrom(source);
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
