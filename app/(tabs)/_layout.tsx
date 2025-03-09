import React from 'react';
import { Tabs } from 'expo-router';
import { Text, Platform, useWindowDimensions, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { palette } from '@theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// create styles based on dimensions
const createStyles = (width: number, height: number, bottomInset: number) => StyleSheet.create({
	label: {
		fontSize: Math.min(width, height) * 0.03,
		marginBottom: Platform.OS === 'android' ? 8 : 0,
	},
	tabBar: {
		backgroundColor: palette.black,
		borderTopWidth: 0,
		height: Platform.OS === 'android' ? 60 : 85,
		paddingBottom: bottomInset,
	},
	icon: {
		marginTop: Platform.OS === 'android' ? 12 : 8,
	}
});

const TabLayout = () => {
	const { width, height } = useWindowDimensions();
	const { bottom } = useSafeAreaInsets();
	const styles = createStyles(width, height, bottom);
	
	const screenOptions = {
		headerShown: false,
		tabBarIcon: ({ focused, route }: { focused: boolean; route: string }) => {
			const iconMap: Record<string, keyof typeof Feather.glyphMap> = {
				index: 'home',
				tab1: 'grid',
				tab2: 'settings'
			};
			return (
				<Feather
					name={iconMap[route]}
					size={24}
					color={focused ? palette.primary : 'rgba(45,53,61,0.75)'}
				/>
			);
		},
		tabBarLabel: ({ focused, route }: { focused: boolean; route: string }) => {
			const labelMap = {
				index: 'Home',
				tab1: 'Tab 1',
				tab2: 'Tab 2'
			};
			return (
				<Text
					style={[
						styles.label,
						{ color: focused ? palette.primary : 'rgba(45,53,61,0.75)' }
					]}
				>
					{labelMap[route as keyof typeof labelMap]}
				</Text>
			);
		},
		tabBarStyle: styles.tabBar,
		tabBarIconStyle: styles.icon,
		tabBarActiveTintColor: palette.primary,
		tabBarInactiveTintColor: 'rgba(45,53,61,0.75)',
	};

	return (
		<Tabs
			initialRouteName="index"
			screenOptions={({ route }) => ({
				...screenOptions,
				tabBarIcon: ({ focused }) => screenOptions.tabBarIcon({ focused, route: route.name }),
				tabBarLabel: ({ focused }) => screenOptions.tabBarLabel({ focused, route: route.name })
			})}
		>
			<Tabs.Screen name="index" options={{ headerShown: false }} />
			<Tabs.Screen name="tab1" options={{ headerShown: false }} />
			<Tabs.Screen name="tab2" options={{ headerShown: false }} />
		</Tabs>
	);
};

export default TabLayout;