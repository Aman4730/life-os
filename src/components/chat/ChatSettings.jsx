import { RotateCcw } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import { useChatSettings, ACCENTS, ICON_PRESETS } from "./ChatSettingsContext";

/**
 * In-chat settings: rename the assistant, pick its icon (or a custom image
 * URL) and choose a theme accent. Changes apply instantly and are saved to the
 * browser (localStorage).
 */
export default function ChatSettings() {
  const { settings, update, reset } = useChatSettings();
  const isImage = settings.avatar && typeof settings.avatar === "object";
  const imageUrl = isImage ? settings.avatar.image : "";

  const setImage = (url) => {
    const v = url.trim();
    update({ avatar: v ? { image: v } : "robot" });
  };

  return (
    <div className="chat-settings">
      {/* Name */}
      <div className="chat-settings__group">
        <label className="chat-settings__label" htmlFor="cs-name">
          Assistant name
        </label>
        <input
          id="cs-name"
          className="chat-settings__input"
          type="text"
          value={settings.name}
          maxLength={24}
          placeholder="e.g. Aria"
          autoComplete="off"
          onChange={(e) => update({ name: e.target.value })}
        />
      </div>

      {/* Icon */}
      <div className="chat-settings__group">
        <span className="chat-settings__label">Chatbot icon</span>
        <div className="chat-settings__icons">
          {ICON_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`chat-settings__icon ${
                settings.avatar === p.id ? "is-active" : ""
              }`}
              onClick={() => update({ avatar: p.id })}
              aria-pressed={settings.avatar === p.id}
            >
              <span className="chat-settings__icon-av">
                <AssistantAvatar size={26} override={p.id} />
              </span>
              <span className="chat-settings__icon-label">{p.label}</span>
            </button>
          ))}
        </div>
        <input
          className="chat-settings__input chat-settings__input--sm"
          type="url"
          value={imageUrl}
          placeholder="Or paste an image URL…"
          autoComplete="off"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      {/* Theme */}
      <div className="chat-settings__group">
        <span className="chat-settings__label">Theme</span>
        <div className="chat-settings__accents">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`chat-settings__accent ${
                settings.accent === a.id ? "is-active" : ""
              }`}
              style={{ "--sw": a.color, "--sw2": a.strong }}
              onClick={() => update({ accent: a.id })}
              aria-pressed={settings.accent === a.id}
              aria-label={a.label}
              title={a.label}
            >
              <span className="chat-settings__swatch" />
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="chat-settings__reset" onClick={reset}>
        <RotateCcw size={14} /> Reset to default
      </button>

      <p className="chat-settings__note">
        Saved in this browser. To change the default for everyone, edit
        <code> src/config/assistant.js</code>.
      </p>
    </div>
  );
}
