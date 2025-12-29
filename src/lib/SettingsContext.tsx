"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontFamily = 'anek-bangla' | 'tiro-bangla';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type ColorTheme = 'default' | 'nature' | 'ocean';

interface Settings {
  fontSize: number;
  fontFamily: FontFamily;
  textAlign: TextAlign;
  colorTheme: ColorTheme;
}

interface SettingsContextType extends Settings {
  setFontSize: (size: number) => void;
  setFontFamily: (font: FontFamily) => void;
  setTextAlign: (align: TextAlign) => void;
  setColorTheme: (theme: ColorTheme) => void;
  isLoaded: boolean;
}

const defaultSettings: Settings = {
  fontSize: 16,
  fontFamily: 'anek-bangla',
  textAlign: 'left',
  colorTheme: 'default',
};

const SettingsContext = createContext<SettingsContextType | null>(null);

// Helper to get settings from localStorage (SSR-safe)
function getInitialSettings(): Settings {
  if (typeof window === 'undefined') return defaultSettings;
  
  try {
    const saved = localStorage.getItem('siteSettings');
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to parse saved settings');
  }
  return defaultSettings;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    setSettings(getInitialSettings());
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      applySettings(settings);
    }
  }, [settings, isLoaded]);

  const setFontSize = (size: number) => {
    setSettings(prev => ({ ...prev, fontSize: Math.min(32, Math.max(12, size)) }));
  };

  const setFontFamily = (font: FontFamily) => {
    setSettings(prev => ({ ...prev, fontFamily: font }));
  };

  const setTextAlign = (align: TextAlign) => {
    setSettings(prev => ({ ...prev, textAlign: align }));
  };

  const setColorTheme = (theme: ColorTheme) => {
    setSettings(prev => ({ ...prev, colorTheme: theme }));
  };

  return (
    <SettingsContext.Provider value={{
      ...settings,
      setFontSize,
      setFontFamily,
      setTextAlign,
      setColorTheme,
      isLoaded,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Apply settings via CSS custom properties - Best Practice
function applySettings(settings: Settings) {
  const root = document.documentElement;
  
  // Set CSS custom properties - these cascade naturally
  root.style.setProperty('--user-font-size', `${settings.fontSize}px`);
  root.style.setProperty('--user-text-align', settings.textAlign);
  
  // Set the active font family CSS variable
  if (settings.fontFamily === 'tiro-bangla') {
    root.style.setProperty('--active-font', 'var(--font-tiro-bangla), "Tiro Bangla", Georgia, serif');
  } else {
    root.style.setProperty('--active-font', 'var(--font-anek-bangla), "Anek Bangla", system-ui, sans-serif');
  }
  
  // Set data attribute for additional CSS rules & color themes
  root.setAttribute('data-font', settings.fontFamily);
  root.setAttribute('data-theme-color', settings.colorTheme);
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Hook to get safe settings (with default values for SSR)
export function useSafeSettings() {
  const context = useContext(SettingsContext);
  return context ?? { ...defaultSettings, isLoaded: false };
}
