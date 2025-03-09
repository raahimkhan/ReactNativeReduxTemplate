import React from 'react';
import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TabLayout = () => {

    const options = {
        headerShown: false
    }

    const getTabBarName = (name: string): string => {
        if (name === 'tab1') {
            return 'Tab 1';
        }
        else if (name === 'tab2') {
            return 'Tab 2';
        }
        return '';
    }

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    if (route.name === 'index') {
                        return (
                            <Entypo
                                name="home"
                                size={
                                    Platform.OS === 'android' ? wp(6) : wp(7)
                                }
                                color={focused ? '#0079FF' : 'rgba(45,53,61,0.75)'}
                            />
                        );
                    }
                    else if (route.name === 'tab1') {
                        return (
                            <Entypo
                                name="home"
                                size={
                                    Platform.OS === 'android' ? wp(6) : wp(7)
                                }
                                color={focused ? '#0079FF' : 'rgba(45,53,61,0.75)'}
                            />
                        );
                    }
                    else if (route.name === 'tab2') {
                        return (
                            <Entypo
                                name="home"
                                size={
                                    Platform.OS === 'android' ? wp(6) : wp(7)
                                }
                                color={focused ? '#0079FF' : 'rgba(45,53,61,0.75)'}
                            />
                        );
                    }
                    return null;
                },
                tabBarLabel: ({ focused }: { focused: boolean }) => (
                    <Text
                        style={{
                            color: focused ? '#0079FF' : 'rgba(45,53,61,0.75)',
                            fontSize: Platform.OS === 'android' ? wp(2.7) : wp(3),
                            marginTop: hp(-0.5),
                            marginBottom: Platform.OS === 'android' ? hp(1.3) : undefined
                        }}
                    >
                        {
                            route.name === 'index' ? (
                                "Home"
                            ) : (
                                getTabBarName(route.name)
                            )
                        }
                    </Text>
                ),
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopColor: 'white',
                    height: hp(10),
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarActiveTintColor: '#0079FF',
                tabBarInactiveTintColor: '#2D353DBF',
                tabBarIconStyle: {
                    marginTop: hp(0.5),
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={options}
            />
            <Tabs.Screen
                name="tab1"
                options={options}
            />
            <Tabs.Screen
                name="tab2"
                options={options}
            />
        </Tabs>
    );
}

export default TabLayout;