import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import WelcomeState from "./WelcomeState";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import TypingIndicator from "./TypingIndicator";

/**
 * Conversation area. Owns scroll behaviour: auto-scrolls on the user's own turn
 * and while thinking, but respects the reader's position when they scroll up —
 * surfacing a "scroll to latest" affordance instead of yanking them down.
 */
export default function ChatMessages({
  messages,
  typing,
  pendingKind,
  error,
  disabled,
  onPick,
  onAction,
  onRetry,
}) {
  const scrollRef = useRef(null);
  const atBottomRef = useRef(true);
  const [showJump, setShowJump] = useState(false);
  const isEmpty = messages.length === 0;

  const scrollToBottom = useCallback((behavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = dist < 80;
    atBottomRef.current = atBottom;
    setShowJump(!atBottom && (messages.length > 0 || typing));
  };

  useEffect(() => {
    const last = messages[messages.length - 1];
    // Always follow the user's own message and the thinking state; otherwise
    // only follow new AI messages if the reader is already near the bottom.
    if (last?.role === "user" || typing || atBottomRef.current) {
      scrollToBottom(messages.length <= 1 ? "auto" : "smooth");
      setShowJump(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, typing]);

  return (
    <div className="chat-body">
      <div
        className="chat-messages"
        ref={scrollRef}
        onScroll={handleScroll}
        aria-live="polite"
        aria-label="Conversation with Aria"
      >
        {isEmpty ? (
          <WelcomeState onPick={onPick} disabled={disabled} />
        ) : (
          messages.map((m) =>
            m.role === "user" ? (
              <UserMessage key={m.id} text={m.text} />
            ) : (
              <AssistantMessage
                key={m.id}
                message={m}
                onAction={onAction}
                disabled={disabled}
              />
            )
          )
        )}

        {typing && <TypingIndicator kind={pendingKind} />}

        {error && (
          <div className="chat-row chat-row--assistant">
            <span className="chat-avatar" aria-hidden="true">
              <AssistantAvatar size={24} />
            </span>
            <div className="chat-error" role="alert">
              <p>Something went wrong. Please try again.</p>
              <button
                type="button"
                className="chat-error__retry"
                onClick={(e) => {
                  e.stopPropagation();
                  onRetry();
                }}
              >
                <RotateCcw size={14} />
                Try again
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className={`chat-jump ${showJump ? "is-visible" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          scrollToBottom();
          setShowJump(false);
        }}
        aria-label="Scroll to latest message"
        tabIndex={showJump ? 0 : -1}
      >
        <ChevronDown size={18} />
      </button>
    </div>
  );
}
