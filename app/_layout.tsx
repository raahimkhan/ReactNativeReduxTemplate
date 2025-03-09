import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/useLoadFonts';
import { Stack, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import store from '@store/store';

SplashScreen.preventAutoHideAsync();

const StackHierarchy = () => {

    const options = {
        headerShown: false
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={options}
            />
            <Stack.Screen
                name="someComponent"
                options={options}
            />
            <Stack.Screen
                name="(tabs)"
                options={options}
            />
        </Stack>
    );
}

const StackLayout = () => {

    const segments = useSegments();

    const fontsLoaded = useLoadFonts();

    const [currentRoute, setCurrentRoute] = useState<string>('index');

    interface safeArea {
        safeAreaBG: string;
        statusBarStyle: StatusBarStyle;
    }
    const [safeAreaProps, setSafeAreaProps] = useState<safeArea>({
        safeAreaBG: 'white',
        statusBarStyle: 'dark'
    });

    // Update SafeAreaView props based on current route
    useEffect(() => {
        const currentRouteName = segments[segments.length - 1];
        setCurrentRoute(currentRouteName);
        if (currentRouteName === 'index' || currentRouteName === undefined) {
            setSafeAreaProps({
                safeAreaBG: 'white',
                statusBarStyle: 'dark',
            });
        }
        else {
            setSafeAreaProps({
                safeAreaBG: 'white',
                statusBarStyle: 'dark',
            });
        }
    }, [segments]);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            {
                currentRoute === '(tabs)' || currentRoute === 'tab1' || currentRoute === 'tab2' ? (
                    <>
                        <StatusBar style={safeAreaProps.statusBarStyle} />
                        <StackHierarchy />
                    </>
                ) : (
                    <>
                        <StatusBar style={safeAreaProps.statusBarStyle}/>
                        <SafeAreaView
                            style={[styles.container, {
                                backgroundColor: safeAreaProps.safeAreaBG,
                            }]}
                            onLayout={onLayoutRootView}
                        >
                            <StackHierarchy />
                        </SafeAreaView>
                    </>
                )
            }
        </>
    );
}

const Root = () => {

    return (
        <Provider store={store}>
            <StackLayout />
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Root;