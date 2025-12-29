"use client";

import { useEffect, useState } from "react";

/**
 * FontLoader - Client Component
 * Reads font settings from localStorage and applies them immediately
 * This runs on every page load to ensure consistent font across the app
 */
export default function FontLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Apply settings immediately from localStorage
    applySettingsFromStorage();
    
    // Listen for storage changes (for cross-tab sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'siteSettings') {
        applySettingsFromStorage();
      }
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Re-apply on every render to catch any changes
  useEffect(() => {
    if (mounted) {
      applySettingsFromStorage();
    }
  });

  return null; // This component only applies styles, renders nothing
}

function applySettingsFromStorage() {
  try {
    const saved = localStorage.getItem('siteSettings');
    if (saved) {
      const settings = JSON.parse(saved);
      applyFont(settings.fontFamily || 'anek-bangla');
      applyFontSize(settings.fontSize || 16);
      applyTextAlign(settings.textAlign || 'left');
    }
  } catch (e) {
    console.warn('Failed to apply settings from localStorage');
  }
}

function applyFont(fontFamily: string) {
  const root = document.documentElement;
  
  if (fontFamily === 'tiro-bangla') {
    root.style.setProperty('--active-font', 'var(--font-tiro-bangla), "Tiro Bangla", Georgia, serif');
  } else {
    root.style.setProperty('--active-font', 'var(--font-anek-bangla), "Anek Bangla", system-ui, sans-serif');
  }
  
  root.setAttribute('data-font', fontFamily);
}

function applyFontSize(fontSize: number) {
  document.documentElement.style.setProperty('--user-font-size', `${fontSize}px`);
}

function applyTextAlign(textAlign: string) {
  document.documentElement.style.setProperty('--user-text-align', textAlign);
}
