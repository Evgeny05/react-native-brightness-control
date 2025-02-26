import { View, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import Brightness from 'react-native-brightness-control';
Brightness;

export default function App() {
  useEffect(() => {
    (async () => {
      await Brightness.getBrightness();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="press"
        onPress={() => Brightness.setBrightness(0.1, 3000)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
