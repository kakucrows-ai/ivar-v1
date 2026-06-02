"use strict";

const { lockedNicknames } = require("../utils/nicknameLocks");

const BOT_NICK = "ivaar [bot]";

function _delay(ms) { return new Promise(r => setTimeout(r, ms)); }

module.exports = {
  name: "botnick",
  aliases: ["bn", "protectnick"],
  description: "يضع كنية البوت 'ivaar [bot]' ويحميها من التغيير — botnick وقف لإيقاف الحماية.",
  usage: "botnick | botnick وقف",
  category: "Group",
  groupOnly: true,
  adminOnly: true,

  async execute({ api, event, args }) {
    const { threadID } = event;
    const sub = (args[0] || "").trim();
    const botID = api.getCurrentUserID();

    if (sub === "وقف" || sub === "off") {
      if (lockedNicknames.has(threadID)) {
        const threadLocks = lockedNicknames.get(threadID);
        threadLocks.delete(botID);
        if (threadLocks.size === 0) lockedNicknames.delete(threadID);
      }
      return api.sendMessage("🔓 تم إيقاف حماية كنية البوت.", threadID);
    }

    try {
      if (typeof api.changeNickname === "function") {
        await api.changeNickname(BOT_NICK, threadID, botID);
      } else {
        await api.nickname(BOT_NICK, threadID, botID);
      }
    } catch (e) {
      return api.sendMessage("❌ فشل تغيير الكنية: " + e.message, threadID);
    }

    if (!lockedNicknames.has(threadID)) {
      lockedNicknames.set(threadID, new Map());
    }
    lockedNicknames.get(threadID).set(botID, BOT_NICK);

    return api.sendMessage(
      "🐦‍⬛ كنية البوت الآن: " + BOT_NICK + "\n🔒 محمية من التغيير تلقائياً.",
      threadID
    );
  },
};
