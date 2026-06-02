"use strict";

function _delay(ms) { return new Promise(r => setTimeout(r, ms)); }

module.exports = {
  name: "clrnick",
  aliases: ["clearnick", "delnick"],
  description: "حذف جميع الكنيات في المجموعة.",
  usage: "clrnick",
  category: "Group",
  groupOnly: true,
  adminOnly: true,

  async execute({ api, event }) {
    const { threadID } = event;

    let info;
    try { info = await api.getThreadInfo(threadID); }
    catch (e) { return api.sendMessage("❌ فشل جلب معلومات المجموعة: " + e.message, threadID); }

    const ids = info.participantIDs || [];
    if (ids.length === 0) return api.sendMessage("❌ لا يوجد أعضاء.", threadID);

    await api.sendMessage("⏳ جارٍ مسح كنيات " + ids.length + " عضو...", threadID);

    let done = 0, failed = 0;
    for (const uid of ids) {
      try {
        if (typeof api.changeNickname === "function") {
          await api.changeNickname("", threadID, uid);
        } else {
          await api.nickname("", threadID, uid);
        }
        done++;
      } catch { failed++; }
      await _delay(450);
    }

    return api.sendMessage(
      "✅ تم مسح الكنيات:\n• نجح  : " + done + "\n• فشل   : " + failed,
      threadID
    );
  },
};
