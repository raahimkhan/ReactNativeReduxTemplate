import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/use-load-fonts';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '@global-store/store';
import { ThemeContext } from '@theme/theme-context';
import { palette } from '@theme/colors';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const fontsLoaded = useLoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ palette }}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </ThemeContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default RootLayout;
