import { useEffect, useRef, useState } from "react";
import { ArrowUp, ImagePlus, X } from "lucide-react";
import { useChatSettings } from "./ChatSettingsContext";

const MAX_HEIGHT = 128; // px — grow then scroll

/**
 * Modern AI composer: auto-growing textarea, Enter to send, Shift+Enter for a
 * newline, and an image-generation mode. In image mode the message is sent to
 * Gemini's image model instead of the text model.
 */
export default function ChatComposer({ onSend, disabled, open }) {
  const { settings } = useChatSettings();
  const [value, setValue] = useState("");
  const [imageMode, setImageMode] = useState(false);
  const ref = useRef(null);

  const autosize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  };

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => ref.current?.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text, imageMode);
    setValue("");
    requestAnimationFrame(() => {
      if (ref.current) ref.current.style.height = "auto";
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="chat-composer">
      {imageMode && (
        <div className="chat-composer__mode">
          <span className="chat-composer__mode-label">
            <ImagePlus size={13} /> Image mode — describe a picture to create
          </span>
          <button
            type="button"
            className="chat-composer__mode-exit"
            onClick={() => setImageMode(false)}
            aria-label="Exit image mode"
          >
            <X size={13} />
          </button>
        </div>
      )}

      <form
        className="chat-composer__row"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <button
          type="button"
          className={`chat-composer__tool ${imageMode ? "is-active" : ""}`}
          onClick={() => {
            setImageMode((m) => !m);
            ref.current?.focus();
          }}
          aria-pressed={imageMode}
          aria-label="Generate an image"
          title="Generate an image"
        >
          <ImagePlus size={18} />
        </button>

        <textarea
          ref={ref}
          className="chat-composer__input"
          rows={1}
          value={value}
          placeholder={imageMode ? "Describe an image to create…" : "Ask LifeOS anything…"}
          aria-label={`Message ${settings.name}`}
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
            autosize();
          }}
          onKeyDown={onKeyDown}
        />

        <button
          type="submit"
          className="chat-composer__send"
          disabled={!value.trim() || disabled}
          aria-label={imageMode ? "Generate image" : "Send message"}
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}
