/**
 * Contextual follow-up actions under an AI answer. Each action either asks a
 * follow-up question (`intent`) or navigates (`to`, handled by the parent).
 * Only rendered when actions exist — never on every message.
 */
export default function QuickActions({ actions, onAction, disabled }) {
  if (!actions?.length) return null;
  return (
    <div className="chat-actions">
      {actions.map((a, i) => (
        <button
          key={`${a.label}-${i}`}
          type="button"
          className="chat-action"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onAction(a);
          }}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
