import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import type { Route } from "@react-navigation/native";
import { useTheme } from '@theme/theme-context';

const TabLayout = () => {

  const { palette } = useTheme();

  const getTabBarName = (name: string): string => {
    if (name === 'tab1') {
        return 'Tab1';
    }
    else if (name === 'tab2') {
        return 'Tab2';
    }
    else if (name === 'tab3') {
        return 'Tab3';
    }
    return '';
  };

  return (
    <Tabs
      initialRouteName="tab2"
      screenOptions={({ route }: { route: Route<string> }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: palette.white,
          borderTopColor: 'red',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        unmountOnBlur: false,
        tabBarIcon: ({ focused, size }: { focused: boolean; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          // here you can then change icon size based on tab
          // let iconSize: number = 15;
          if (route.name === 'tab1') {
            iconName = "home-outline";
          } else if (route.name === 'tab2') {
            iconName = "list-outline";
          } else {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={focused ? '#0079FF' : '#2D353DBF'} />;
        },
        tabBarLabel: ({ focused }: { focused: boolean }) => (
          <Text style={{ 
            color: focused ? 'red' : 'gray',
            fontSize: 12,
            marginBottom: 3
          }}>
            { getTabBarName(route.name) }
          </Text>
        )
      })}
    >
      <Tabs.Screen name="tab1" />
      <Tabs.Screen name="tab2" />
      <Tabs.Screen name="tab3" />
    </Tabs>
  );
}

export default TabLayout; 