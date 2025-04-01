package com.brightness

import android.provider.Settings
import com.facebook.react.bridge.*
import android.animation.ValueAnimator

class BrightnessModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "Brightness"
    }

    @ReactMethod
    fun setBrightness(brightness: Float, duration: Int = 0) {
        val activity = currentActivity ?: return

        activity.runOnUiThread {
            val layoutParams = activity.window.attributes

            if (duration == 0) {
                layoutParams.screenBrightness = brightness
                activity.window.attributes = layoutParams
                return@runOnUiThread
            }

            val startBrightness: Float = if (layoutParams.screenBrightness >= 0) {
                layoutParams.screenBrightness
            } else {
                val resolver = reactApplicationContext.contentResolver
                Settings.System.getInt(resolver, Settings.System.SCREEN_BRIGHTNESS) / 255f
            }

            ValueAnimator.ofFloat(startBrightness, brightness).apply {
                this.duration = duration.toLong()
                addUpdateListener { animator ->
                    layoutParams.screenBrightness = (animator.animatedValue as Float).coerceIn(0f, 1f)
                    activity.window.attributes = layoutParams
                }
                start()
            }
        }
    }

    @ReactMethod
    fun getBrightness(promise: Promise) {
        val activity = currentActivity
        if (activity == null) {
            promise.resolve(0.5f) 
            return
        }

        val layoutParams = activity.window.attributes

        return if (layoutParams.screenBrightness >= 0) {
            promise.resolve(layoutParams.screenBrightness)
        } else {
            val resolver = reactApplicationContext.contentResolver
            promise.resolve(Settings.System.getInt(resolver, Settings.System.SCREEN_BRIGHTNESS) / 255f)
        }
    }
}