"use strict";

const config = require("../config.json");

module.exports = {
  name: "help",
  aliases: ["h", "cmds", "commands"],
  description: "عرض قائمة الأوامر.",
  usage: "help",
  category: "General",

  async execute({ api, event }) {
    const prefix = config.prefix;
    const name   = config.bot.name;

    const msg = [
      ``,
      `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
      `        🐦‍⬛  ${name.toUpperCase()}  🐦‍⬛`,
      `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
      ``,
      `  ░▒▓  قوائم الظلام  ▓▒░`,
      ``,
      `  🔒  ${prefix}lock       — قفل البوت`,
      `  🔏  ${prefix}lockname   — تثبيت اسم المجموعة`,
      `  ✒️   ${prefix}rename     — تغيير اسم المجموعة`,
      `  🐦‍⬛  ${prefix}غراب       — تفعيل الغراب`,
      `  🩶  ${prefix}nickall    — تغيير لقب الجميع`,
      `  🗑️   ${prefix}clrnick    — مسح جميع الكنيات`,
      `  🤖  ${prefix}botnick    — كنية البوت + حمايتها`,
      `  ⏳  ${prefix}uptime     — مدة تشغيل البوت`,
      ``,
      `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
      ``,
    ].join("\n");

    api.sendMessage(msg, event.threadID);
  },
};
