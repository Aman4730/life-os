import { useEffect, useMemo, useState } from "react";
import {
  ChatSettingsContext,
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
} from "./ChatSettingsContext";

/**
 * Holds the live, user-editable chat settings (name, icon, theme). Overrides
 * the code defaults from config/assistant.js and persists to localStorage, so
 * a visitor's choices stick for them. To change the default for everyone, edit
 * config/assistant.js.
 */
export default function ChatSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
      if (saved && typeof saved === "object") {
        setSettings((s) => ({ ...s, ...saved }));
      }
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  const value = useMemo(() => {
    const update = (patch) =>
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        try {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
        } catch {
          /* storage may be unavailable */
        }
        return next;
      });

    const reset = () => {
      try {
        localStorage.removeItem(SETTINGS_KEY);
      } catch {
        /* ignore */
      }
      setSettings(DEFAULT_SETTINGS);
    };

    return { settings, update, reset };
  }, [settings]);

  return (
    <ChatSettingsContext.Provider value={value}>
      {children}
    </ChatSettingsContext.Provider>
  );
}
