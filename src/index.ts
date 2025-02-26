import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-brightness' doesn't seem to be linked. Make sure: \n\n` +
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

const setBrightness = async (brightness: number, duration: number = 0) => {
  if (brightness < 0 || brightness > 1 || brightness === undefined) {
    console.error('brightness value must be between 0 to 1');
    return;
  }

  await BrightnessModule.setBrightness(brightness, duration);
};

const getBrightness = async () => BrightnessModule.getBrightness();

const setIsNeedRestoreBrightness = (isNeedRestoreBrightness: boolean) => {
  if (Platform.OS === 'ios') {
    BrightnessModule.setIsNeedRestoreBrightness(isNeedRestoreBrightness);
  }
};

const Brightness = {
  /**
   * Sets the screen brightness
   * Value must be between 0 to 1
   */
  setBrightness,
  /**
   * Gets the current screen brightness
   */
  getBrightness,
  /**
   * The method is responsible for determining whether the user's original brightness
   * should be restored when the application is minimized
   *
   * initial value is "true".
   * @platform ios
   */
  setIsNeedRestoreBrightness,
};

export default Brightness;
