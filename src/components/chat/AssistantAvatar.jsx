import { Sparkles } from "lucide-react";
import RobotMascot from "./RobotMascot";
import LogoMark from "../ui/LogoMark";
import { useChatSettings } from "./ChatSettingsContext";

/**
 * Renders the assistant's icon based on the live settings (name/icon/theme
 * chosen in the in-chat Settings panel, backed by config/assistant.js defaults).
 * Pass `override` to force a specific icon — used for the settings previews.
 * Options: "robot" | "logo" | "spark" | { image: "/path" }.
 */
export default function AssistantAvatar({ size = 28, className = "", override }) {
  const { settings } = useChatSettings();
  const avatar = override ?? settings.avatar;

  if (avatar && typeof avatar === "object" && avatar.image) {
    return (
      <img
        className={`assistant-avatar-img ${className}`.trim()}
        src={avatar.image}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    );
  }

  if (avatar === "logo") {
    return <LogoMark size={size} onDark className={className} />;
  }

  if (avatar === "spark") {
    return (
      <span className={`assistant-avatar-spark ${className}`.trim()} aria-hidden="true">
        <Sparkles size={Math.round(size * 0.72)} />
      </span>
    );
  }

  return <RobotMascot size={size} className={className} />;
}
