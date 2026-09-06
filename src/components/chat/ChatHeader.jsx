import { X, Settings, ArrowLeft } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import { useChatSettings } from "./ChatSettingsContext";

export default function ChatHeader({ onClose, onToggleSettings, settingsOpen }) {
  const { settings } = useChatSettings();

  if (settingsOpen) {
    return (
      <header className="chat-header">
        <button
          type="button"
          className="chat-header__close"
          onClick={onToggleSettings}
          aria-label="Back to chat"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="chat-header__id">
          <strong className="chat-header__name">Settings</strong>
        </span>
        <button
          type="button"
          className="chat-header__close"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </header>
    );
  }

  return (
    <header className="chat-header">
      <span className="chat-header__avatar" aria-hidden="true">
        <AssistantAvatar size={30} />
        <span className="chat-header__presence" />
      </span>
      <span className="chat-header__id">
        <strong className="chat-header__name">{settings.name}</strong>
        <span className="chat-header__role">
          <span className="chat-header__dot" aria-hidden="true" />
          {settings.role || "Your personal AI assistant"}
        </span>
      </span>
      <button
        type="button"
        className="chat-header__gear"
        onClick={onToggleSettings}
        aria-label="Customize assistant"
        title="Customize"
      >
        <Settings size={17} />
      </button>
      <button
        type="button"
        className="chat-header__close"
        onClick={onClose}
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </header>
  );
}
