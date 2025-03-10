import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-brightness-control' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const BrightnessModule = NativeModules.Brightness
  ? NativeModules.Brightness
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const setBrightness = async (brightness: number, durationMs: number = 0) => {
  if (brightness < 0 || brightness > 1 || brightness === undefined) {
    console.error(
      `Invalid brightness value: ${brightness}. It must be between 0 and 1`
    );
    return;
  }

  await BrightnessModule.setBrightness(brightness, durationMs);
};

const getBrightness = async (): Promise<number> =>
  BrightnessModule.getBrightness();

const setIsNeedRestoreBrightness = (isNeedRestoreBrightness: boolean) => {
  if (Platform.OS === 'ios') {
    BrightnessModule.setIsNeedRestoreBrightness(isNeedRestoreBrightness);
  }
};

const Brightness = {
  /**
   * Sets the screen brightness.
   * @param brightness - A value between 0 and 1 representing the brightness level
   * @param durationMs - Duration in milliseconds for which the brightness transition should occur
   */
  setBrightness,
  /**
   * Gets the current screen brightness.
   * @returns A promise that resolves the current brightness level (0 to 1)
   */
  getBrightness,
  /**
   * The method is responsible for determining whether the user's original brightness
   * should be restored when the application is minimized
   *
   * @param isNeedRestoreBrightness - If `true`, restores original brightness upon app minimization (initial value is "true")
   * @platform ios
   */
  setIsNeedRestoreBrightness,
};

export default Brightness;
