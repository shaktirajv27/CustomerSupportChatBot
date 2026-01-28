import { useState, useEffect, useCallback, createContext, useContext } from 'react';

export interface LocalSettings {
  fontSize: number;
  soundEnabled: boolean;
  autoSave: boolean;
  compactMode: boolean;
}

const DEFAULT_SETTINGS: LocalSettings = {
  fontSize: 16,
  soundEnabled: true,
  autoSave: true,
  compactMode: false,
};

// Audio context for notification sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const playNotificationSound = (type: 'send' | 'receive' | 'error' = 'receive') => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Different sounds for different events
    switch (type) {
      case 'send':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
        break;
      case 'receive':
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
        break;
    }
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  } catch (e) {
    console.log('Audio not available');
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<LocalSettings>(() => {
    const stored = localStorage.getItem('localSettings');
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  });

  // Apply font size to document
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.fontSize]);

  // Apply compact mode
  useEffect(() => {
    if (settings.compactMode) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  }, [settings.compactMode]);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('localSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<LocalSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const playSound = useCallback((type: 'send' | 'receive' | 'error' = 'receive') => {
    if (settings.soundEnabled) {
      playNotificationSound(type);
    }
  }, [settings.soundEnabled]);

  return {
    settings,
    updateSettings,
    playSound,
  };
};

// Context for global settings access
interface SettingsContextType {
  settings: LocalSettings;
  updateSettings: (newSettings: Partial<LocalSettings>) => void;
  playSound: (type?: 'send' | 'receive' | 'error') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = SettingsContext.Provider;

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};
