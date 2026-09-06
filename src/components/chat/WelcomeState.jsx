import { ArrowUpRight } from "lucide-react";
import AssistantAvatar from "./AssistantAvatar";
import { suggestedQuestions } from "../../data/chatbot";
import { assistant } from "../../config/assistant";
import { useChatSettings } from "./ChatSettingsContext";

/**
 * Polished empty/welcome state shown before the first message. The name/icon
 * come from live settings; the subtitle + suggestions from config/chatbot.js.
 */
export default function WelcomeState({ onPick, disabled }) {
  const { settings } = useChatSettings();
  return (
    <div className="chat-welcome">
      <span className="chat-welcome__avatar" aria-hidden="true">
        <AssistantAvatar size={46} />
      </span>
      <h3 className="chat-welcome__title">
        Hi, I&rsquo;m {settings.name} — your LifeOS Assistant.
      </h3>
      <p className="chat-welcome__subtitle">{assistant.welcome.subtitle}</p>

      <div className="chat-welcome__suggestions">
        <span className="chat-welcome__label">Try asking</span>
        {suggestedQuestions.map((q, i) => (
          <button
            key={q.intent || i}
            type="button"
            className="chat-suggestion"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onPick(q);
            }}
          >
            <span>{q.label}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
