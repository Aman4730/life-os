import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssistantAvatar from "./AssistantAvatar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatComposer from "./ChatComposer";
import ChatSettings from "./ChatSettings";
import ChatSettingsProvider from "./ChatSettingsProvider";
import { useChatSettings, accentFor } from "./ChatSettingsContext";
import { fetchReply, generateReply } from "../../data/chatbot";
import "./ChatWidget.css";

const AUTO_OPEN_DELAY = 1200; // ms after arrival before Aria greets
const MIN_THINKING = 450; // ms floor so the thinking state never just flashes

let seq = 0;
const nextId = () => `m${++seq}`;

function ChatWidgetInner() {
  const navigate = useNavigate();
  const { settings } = useChatSettings();
  const accent = accentFor(settings.accent);

  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [pendingKind, setPendingKind] = useState("text"); // "text" | "image"
  const [error, setError] = useState(false);

  const messagesRef = useRef([]);
  const lastQuery = useRef(null); // { text, intentId, history } — for retry

  // Keep a ref of the latest transcript so `send` can read prior turns for the
  // AI context without adding messages to its dependencies.
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-activate on arrival (every load/refresh), so Aria is ready and waiting.
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Escape closes — the only implicit close. Inner clicks never close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const runReply = useCallback(async (text, intentId, history, wantsImage) => {
    setError(false);
    setPendingKind(wantsImage ? "image" : "text");
    setTyping(true);
    const floor = new Promise((r) => setTimeout(r, MIN_THINKING));
    try {
      const resolve = (async () => {
        try {
          // Real AI (text or image) via the serverless Gemini proxy.
          return await fetchReply(text, history, wantsImage);
        } catch {
          // Graceful fallback to the built-in knowledge base if the endpoint
          // isn't reachable (plain `vite`, offline, or an API error).
          return generateReply(text, intentId);
        }
      })();
      const [reply] = await Promise.all([resolve, floor]);
      setMessages((prev) => [
        ...prev,
        reply.kind === "image"
          ? {
              id: nextId(),
              role: "assistant",
              kind: "image",
              imageUrl: reply.imageUrl,
              caption: reply.caption,
              prompt: text,
              actions: reply.actions || [],
            }
          : {
              id: nextId(),
              role: "assistant",
              text: reply.answer,
              links: reply.links || [],
              actions: reply.actions || [],
            },
      ]);
    } catch {
      setError(true);
    } finally {
      setTyping(false);
    }
  }, []);

  const send = useCallback(
    (rawText, intentId, wantsImage = false) => {
      const text = rawText.trim();
      if (!text) return;
      const history = messagesRef.current.map((m) => ({
        role: m.role,
        text: m.text || (m.caption ? `[image] ${m.caption}` : ""),
      }));
      lastQuery.current = { text, intentId, history, wantsImage };
      setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
      runReply(text, intentId, history, wantsImage);
    },
    [runReply]
  );

  // The composer sends free text and its own "image mode" flag.
  const onComposerSend = useCallback(
    (text, wantsImage) => send(text, undefined, wantsImage),
    [send]
  );

  // Suggested question / follow-up action that asks something.
  const onPick = useCallback((q) => send(q.label, q.intent), [send]);

  // Follow-up action: ask a question (intent) or navigate (to).
  const onAction = useCallback(
    (a) => {
      if (a.to) {
        navigate(a.to); // client-side; panel stays open
        return;
      }
      send(a.label, a.intent);
    },
    [navigate, send]
  );

  const onRetry = useCallback(() => {
    if (!lastQuery.current) return;
    const { text, intentId, history, wantsImage } = lastQuery.current;
    runReply(text, intentId, history, wantsImage);
  }, [runReply]);

  const openPanel = () => setOpen(true);
  const closePanel = () => setOpen(false);

  // Mobile backdrop: close only when the backdrop itself is tapped, never when
  // a tap bubbles up from inside the panel (links, buttons, text selection…).
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <div
      className="chat-widget"
      style={{
        "--chat-accent": accent.color,
        "--chat-accent-strong": accent.strong,
      }}
    >
      <div
        className={`chat-backdrop ${open ? "is-open" : ""}`}
        onClick={onBackdrop}
        aria-hidden="true"
      />

      <section
        className={`chat-panel ${open ? "chat-panel--open" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label={`${settings.name}, your LifeOS assistant`}
        aria-hidden={!open}
      >
        <ChatHeader
          onClose={closePanel}
          onToggleSettings={() => setShowSettings((s) => !s)}
          settingsOpen={showSettings}
        />

        {showSettings ? (
          <div className="chat-settings-scroll">
            <ChatSettings />
          </div>
        ) : (
          <>
            <ChatMessages
              messages={messages}
              typing={typing}
              pendingKind={pendingKind}
              error={error}
              disabled={typing}
              onPick={onPick}
              onAction={onAction}
              onRetry={onRetry}
            />

            <ChatComposer onSend={onComposerSend} disabled={typing} open={open} />

            <p className="chat-foot">
              {settings.name} can make mistakes — double-check anything important.
            </p>
          </>
        )}
      </section>

      <button
        type="button"
        className={`chat-launcher ${open ? "chat-launcher--hidden" : ""}`}
        onClick={openPanel}
        aria-label={`Open ${settings.name}, your LifeOS assistant`}
      >
        <span className="chat-launcher__bot" aria-hidden="true">
          <AssistantAvatar size={36} />
        </span>
        <span className="chat-launcher__presence" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function ChatWidget() {
  return (
    <ChatSettingsProvider>
      <ChatWidgetInner />
    </ChatSettingsProvider>
  );
}
