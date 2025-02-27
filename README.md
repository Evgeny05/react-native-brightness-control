# 🔅 react-native-brightness-control

Native module for RN that allows you to control screen brightness

![npm](https://www.npmjs.com/package/react-native-brightness-control)

## Installation

```sh
npm install react-native-brightness-control

# or

yarn add react-native-brightness-control
```

## Features

- Adjust screen brightness
- Brightness transition animation
- Restore initial user brightness when app goes to background (iOS only)

## Usage

```javascript
import Brightness from 'react-native-brightness-control';

// Get current screen brightness
const brightness = await Brightness.getBrightness();

// Set screen brightness
Brightness.setBrightness(0.8); // Set brightness to 80%

// Set screen brightness with animation
Brightness.setBrightness(0.5, 500); // Animate brightness to 50% over 500ms

// Restore initial user brightness when app goes to background (iOS only)
// Initial value is "true"
Brightness.setIsNeedRestoreBrightness(true);
```

## License

[MIT License](https://github.com/Evgeny05/react-native-brightness/blob/main/LICENSE)
