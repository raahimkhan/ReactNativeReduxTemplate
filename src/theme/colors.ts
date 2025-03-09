import { Palette } from "@blue-prints/theme/palette";
import { ThemeStructure } from "@blue-prints/theme/theme-structure";

export const palette: Palette = {
	// base colors
	primary: '#007AFF',
	secondary: '#5856D6',
	success: '#34C759',
	warning: '#FF9500',
	error: '#FF3B30',
	info: '#5856D6',
	// base monochrome
	white: '#FFFFFF',
	black: '#000000',
};

export const lightTheme: ThemeStructure = {
	// background
	background: palette.white,
	// text
	textColor: palette.black,
	// status
	success: palette.success,
	warning: palette.warning,
	error: palette.error,
	info: palette.info,
};

export const darkTheme: ThemeStructure = {
	// background
	background: palette.black,
	// text
	textColor: palette.white,
	// status
	success: palette.success,
	warning: palette.warning,
	error: palette.error,
	info: palette.info,
};
