import { createContext, useContext } from "react";
import { assistant } from "../../config/assistant";

/** Theme accents (recolour the avatars, user bubbles and send button). */
export const ACCENTS = [
  { id: "navy", label: "Navy", color: "#1c3a63", strong: "#0b1b34" },
  { id: "ocean", label: "Ocean", color: "#2f6bd6", strong: "#1b3a86" },
  { id: "forest", label: "Forest", color: "#1f9d63", strong: "#14663f" },
  { id: "violet", label: "Violet", color: "#7c53e0", strong: "#4f2fa6" },
  { id: "sunset", label: "Sunset", color: "#e0603a", strong: "#b23a1c" },
];

/** Icon presets (custom images are set via a URL in the settings panel). */
export const ICON_PRESETS = [
  { id: "robot", label: "Robot" },
  { id: "logo", label: "Logo" },
  { id: "spark", label: "Sparkle" },
];

export const SETTINGS_KEY = "lifeos.chat.settings";

export const DEFAULT_SETTINGS = {
  name: assistant.name,
  role: assistant.role,
  avatar: typeof assistant.avatar === "string" ? assistant.avatar : "robot",
  accent: "navy",
};

export function accentFor(id) {
  return ACCENTS.find((a) => a.id === id) || ACCENTS[0];
}

export const ChatSettingsContext = createContext(null);

export function useChatSettings() {
  return (
    useContext(ChatSettingsContext) || {
      settings: DEFAULT_SETTINGS,
      update: () => {},
      reset: () => {},
    }
  );
}
