import { ImagePlus } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import { useChatSettings } from "./ChatSettingsContext";

export default function TypingIndicator({ kind = "text" }) {
  const { settings } = useChatSettings();
  const isImage = kind === "image";
  return (
    <div className="chat-row chat-row--assistant">
      <span className="chat-avatar" aria-hidden="true">
        <AssistantAvatar size={24} />
      </span>
      <div
        className={`chat-typing ${isImage ? "chat-typing--image" : ""}`}
        role="status"
        aria-label={
          isImage
            ? `${settings.name} is creating an image`
            : `${settings.name} is thinking`
        }
      >
        {isImage && (
          <span className="chat-typing__label">
            <ImagePlus size={13} /> Creating image…
          </span>
        )}
        <span className="chat-typing__dots">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}
