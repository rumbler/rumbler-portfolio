import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextData {
  theme: typeof lightTheme;
  currentMode: ThemeMode;
  isDarkMode: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const THEME_STORAGE_KEY = '@RumblerPortfolio:theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    return storedTheme || 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDarkMode = currentMode === 'system' 
    ? systemPrefersDark 
    : currentMode === 'dark';

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setCurrentMode(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentMode,
      isDarkMode, 
      setThemeMode 
    }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
