import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Minus, Sparkles, ArrowRight } from "lucide-react";
import RobotMascot from "./RobotMascot";
import {
  botMeta,
  starterTopics,
  fallbackReply,
  matchIntent,
  getIntentById,
} from "../../data/chatbot";
import "./ChatWidget.css";

const AUTO_OPEN_DELAY = 1200; // ms after arrival before the bot greets
const TYPING_DELAY = 700; // ms the "typing…" indicator shows before a reply

let msgSeq = 0;
const nextId = () => `m${++msgSeq}`;

/** Build a bot message from an intent-like object ({ answer, links, chips }). */
function botMessage(reply) {
  return {
    id: nextId(),
    from: "bot",
    text: reply.answer,
    links: reply.links || [],
    chips: reply.chips || [],
  };
}

export default function ChatWidget() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: nextId(),
      from: "bot",
      text: botMeta.greeting,
      links: [],
      chips: starterTopics,
    },
  ]);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  // Auto-activate the assistant on every arrival — first visit and every
  // refresh — so the greeting is always waiting for the user.
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Keep the transcript pinned to the latest message.
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Focus the input and wire Escape-to-close whenever the panel opens.
  useEffect(() => {
    if (!open) return;
    const focus = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focus);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(typingTimer.current), []);

  const openPanel = () => setOpen(true);

  const replyWith = useCallback((reply) => {
    setTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, botMessage(reply)]);
    }, TYPING_DELAY);
  }, []);

  // Push a user bubble, then answer it.
  const send = useCallback(
    (rawText, forcedIntentId) => {
      const text = rawText.trim();
      if (!text) return;
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: "user", text, links: [], chips: [] },
      ]);
      const reply = forcedIntentId
        ? getIntentById(forcedIntentId)
        : matchIntent(text);
      replyWith(reply || fallbackReply);
    },
    [replyWith]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    send(input);
    setInput("");
  };

  // A quick-reply chip: echo its label as the user's turn, answer its intent.
  const onChip = (chip) => {
    if (typing) return;
    send(
      chip.label.replace(/^[^\p{L}\p{N}]+/u, "").trim() || chip.label,
      chip.intent
    );
  };

  const onLink = (to) => {
    navigate(to);
    // Leave the panel open so the visitor can keep chatting after they land.
  };

  return (
    <div className="chat-widget">
      {/* Chat panel */}
      <div
        className={`chat-panel ${open ? "chat-panel--open" : ""}`}
        role="dialog"
        aria-label={`${botMeta.name}, ${botMeta.role}`}
        aria-hidden={!open}
      >
        <header className="chat-panel__header">
          <span className="chat-panel__avatar">
            <RobotMascot size={30} />
            <span className="chat-panel__status" aria-hidden="true" />
          </span>
          <span className="chat-panel__id">
            <strong className="chat-panel__name">{botMeta.name}</strong>
            <span className="chat-panel__role">
              <span className="chat-panel__dot" aria-hidden="true" /> Online ·{" "}
              {botMeta.role}
            </span>
          </span>
          <button
            type="button"
            className="chat-panel__icon-btn"
            onClick={() => setOpen(false)}
            aria-label="Minimize chat"
          >
            <Minus size={18} />
          </button>
        </header>

        <div className="chat-panel__messages" ref={listRef} aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`chat-msg chat-msg--${m.from}`}>
              {m.from === "bot" && (
                <span className="chat-msg__avatar" aria-hidden="true">
                  <RobotMascot size={26} />
                </span>
              )}
              <div className="chat-msg__stack">
                <div className="chat-msg__bubble">{m.text}</div>

                {m.links?.length > 0 && (
                  <div className="chat-msg__links">
                    {m.links.map((l) => (
                      <button
                        key={l.to}
                        type="button"
                        className="chat-link"
                        onClick={() => onLink(l.to)}
                      >
                        {l.label}
                        <ArrowRight size={15} />
                      </button>
                    ))}
                  </div>
                )}

                {m.chips?.length > 0 && (
                  <div className="chat-msg__chips">
                    {m.chips.map((c, i) => (
                      <button
                        key={`${m.id}-${i}`}
                        type="button"
                        className="chat-chip"
                        onClick={() => onChip(c)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-msg chat-msg--bot">
              <span className="chat-msg__avatar" aria-hidden="true">
                <RobotMascot size={26} />
              </span>
              <div className="chat-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <form className="chat-panel__input" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Type your message"
            autoComplete="off"
          />
          <button
            type="submit"
            className="chat-send"
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>

        <p className="chat-panel__footnote">
          <Sparkles size={12} /> Powered by LifeOS Assistant
        </p>
      </div>

      {/* Floating robot launcher with a live "thinking" dots bubble */}
      <button
        type="button"
        className={`chat-launcher ${open ? "chat-launcher--hidden" : ""}`}
        onClick={openPanel}
        aria-label="Open chat assistant"
      >
        <span className="chat-launcher__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="chat-launcher__bot" aria-hidden="true">
          <RobotMascot size={38} />
        </span>
      </button>
    </div>
  );
}
