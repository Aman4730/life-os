/**
 * ═══════════════════════════════════════════════════════════════════════
 *  LifeOS Assistant — customization / theme
 *
 *  Edit THIS ONE FILE to rename the assistant or change its animated icon.
 *  No other code needs to be touched. (For the AI's own self-name inside
 *  answers, also update SYSTEM_PROMPT in netlify/functions/chat.mjs.)
 * ═══════════════════════════════════════════════════════════════════════
 */

// 1) The assistant's name — change this to anything you like.
const NAME = "Aria";

// 2) The animated icon shown in the chat header, launcher, welcome and every
//    assistant reply. Pick ONE value for `avatar` below:
//
//      "robot"  →  friendly robot mascot (blinking eyes)      ← default
//      "logo"   →  the animated LifeOS infinity logo
//      "spark"  →  a simple gold sparkle
//      { image: "/my-avatar.png" }  →  your own picture
//                   (drop the file in the /public folder, then use its path)
//
const AVATAR = "robot";

export const assistant = {
  name: NAME,
  role: "Your personal AI assistant",
  avatar: AVATAR,

  // 3) The welcome screen (shown before the first message).
  //    The title uses the name automatically — edit the text freely.
  welcome: {
    title: `Hi, I'm ${NAME} — your LifeOS Assistant.`,
    subtitle:
      "Ask me anything about planning your day, staying organized, understanding your goals, or getting more from LifeOS.",
  },
};
