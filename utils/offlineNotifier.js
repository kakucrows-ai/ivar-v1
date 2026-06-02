"use strict";

const logger = require("./logger");

let _api        = null;
let _lastNotify = 0;
const COOLDOWN  = 60000; // لا ترسل أكثر من رسالة كل دقيقة

function setApi(api) { _api = api; }

async function notify(reason) {
  if (!_api) return;
  const now = Date.now();
  if (now - _lastNotify < COOLDOWN) return;
  _lastNotify = now;

  const config = require("../config.json");
  const admins = config.bot.adminIDs || [];
  if (admins.length === 0) return;

  const ts  = new Date().toLocaleTimeString("ar-SA", { timeZone: "Asia/Riyadh", hour12: false });
  const msg = [
    ``,
    `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
    `   🔴  ${config.bot.name.toUpperCase()}  خرج عن الخدمة`,
    `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
    ``,
    `   السبب : ${reason}`,
    `   الوقت  : ${ts}`,
    ``,
    `   سيحاول البوت إعادة الاتصال`,
    `   تلقائياً خلال لحظات...`,
    ``,
    `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
  ].join("\n");

  for (const uid of admins) {
    try {
      await _api.sendMessage(msg, uid);
      logger.info("OfflineNotifier", "Sent offline alert to " + uid);
    } catch (e) {
      logger.warn("OfflineNotifier", "Failed to notify " + uid + ": " + e.message);
    }
  }
}

async function notifyOnline() {
  if (!_api) return;
  const config = require("../config.json");
  const admins = config.bot.adminIDs || [];
  if (admins.length === 0) return;

  const ts  = new Date().toLocaleTimeString("ar-SA", { timeZone: "Asia/Riyadh", hour12: false });
  const msg = [
    ``,
    `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
    `   🟢  ${config.bot.name.toUpperCase()}  عاد للخدمة`,
    `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
    ``,
    `   الوقت  : ${ts}`,
    `   الحالة : متصل ✅`,
    ``,
    `   ◈━━━━━━━━━━━━━━━━━━━━━━◈`,
  ].join("\n");

  for (const uid of admins) {
    try {
      await _api.sendMessage(msg, uid);
      logger.info("OfflineNotifier", "Sent online alert to " + uid);
    } catch (e) {
      logger.warn("OfflineNotifier", "Failed to notify online to " + uid + ": " + e.message);
    }
  }
}

module.exports = { setApi, notify, notifyOnline };
