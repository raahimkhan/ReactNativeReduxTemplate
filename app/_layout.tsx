import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/useLoadFonts';
import { Stack, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import store from '@store/store';
import * as Updates from 'expo-updates';

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

    const fetchOverTheAirUpdates = async () => {
        try {
            const environment = process.env.EXPO_PUBLIC_ENVIRONMENT;
            // only fetch updates in production environment
            if (environment === 'production') {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync();
                }
            }
        }
        catch (err: any) {}
    }

    // Update SafeAreaView props based on current route
    useEffect(() => {
        const currentRouteName = segments[segments.length - 1];
        setCurrentRoute(currentRouteName);
        if (currentRouteName === 'index' || currentRouteName === 'splash' || currentRouteName === undefined) {
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
            // fetch OTA in production environment only and then hide the splash
            await fetchOverTheAirUpdates();
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <>
            {
                currentRoute === '(tabs)' ? (
                    <StackHierarchy />
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