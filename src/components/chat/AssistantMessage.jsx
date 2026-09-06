import { Download } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import MessageContent from "./MessageContent";
import ChatLink from "./ChatLink";
import QuickActions from "./QuickActions";

export default function AssistantMessage({ message, onAction, disabled }) {
  const isImage = message.kind === "image";

  return (
    <div className="chat-row chat-row--assistant">
      <span className="chat-avatar" aria-hidden="true">
        <AssistantAvatar size={24} />
      </span>
      <div
        className={`chat-bubble chat-bubble--assistant ${
          isImage ? "chat-bubble--image" : ""
        }`}
      >
        {isImage ? (
          <figure className="chat-image">
            <img
              className="chat-image__img"
              src={message.imageUrl}
              alt={message.prompt || message.caption || "Generated image"}
              loading="lazy"
            />
            <a
              className="chat-image__download"
              href={message.imageUrl}
              download={`lifeos-image-${message.id}.png`}
              onClick={(e) => e.stopPropagation()}
              aria-label="Download image"
              title="Download image"
            >
              <Download size={15} />
            </a>
            {message.caption && (
              <figcaption className="chat-image__caption">
                {message.caption}
              </figcaption>
            )}
          </figure>
        ) : (
          <>
            <MessageContent text={message.text} />
            {message.links?.length > 0 && (
              <div className="chat-links">
                {message.links.map((l, i) => (
                  <ChatLink key={`${message.id}-l${i}`} link={l} />
                ))}
              </div>
            )}
          </>
        )}

        <QuickActions
          actions={message.actions}
          onAction={onAction}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
