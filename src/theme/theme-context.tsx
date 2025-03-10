// src/theme/theme-context.tsx
import { createContext, useContext } from 'react';
import { palette } from '@theme/colors';

export const ThemeContext = createContext({
    // add theme props like typography, shadows etc.
    palette,
});

export const useTheme = () => useContext(ThemeContext);