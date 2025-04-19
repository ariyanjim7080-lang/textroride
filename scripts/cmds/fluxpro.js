const fs = require("fs");
const path = require("path");
const axios = require("axios");

const requestCache = {};

module.exports = {
  config: {
    name: "fluxpro",
    aliases: ["fpu", "fluxultra", "fluxgen", "fluxcreate"],
    author: "Redwan",
    version: "2.0",
    cooldowns: 20,
    role: 2,
    shortDescription: "Unleash the power of FluxPro Ultra for mind-blowing AI-generated images.",
    longDescription: "FluxPro Ultra creates stunning, ultra-detailed AI-generated visuals based on your prompts.",
    category: "ai",
    guide: "{p}fluxpro <prompt>",
  },

  onStart: async function ({ message, args, api, event }) {
    const userId = event.senderID;
    const prompt = args.join(" ");

    if (!prompt) {
      return api.sendMessage("❌ | FluxPro Ultra needs a spark! Provide a prompt to generate an extraordinary image.", event.threadID, event.messageID);
    }

    if (!canGenerateImage(userId)) {
      return api.sendMessage("❌ | Hold on, creator! You can generate only 2 images every 10 minutes. Try again later!", event.threadID, event.messageID);
    }

    api.setMessageReaction("⏰", event.messageID, (err) => {}, true);

    api.sendMessage("⚡ | FluxPro Ultra is bringing your imagination to life... Please wait!", event.threadID, (err, info) => {
      if (err) return;
      generateImage(prompt, message, api, event, info.messageID, userId);
    });
  },
};

async function generateImage(prompt, message, api, event, waitMessageID, userId) {
  try {
    const apiUrl = `https://global-redwans-apis.onrender.com/api/xemon?model=fluxpro_ultra&prompt=${encodeURIComponent(prompt)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response.data || response.data.length === 0) {
      throw new Error("FluxPro Ultra couldn't generate your vision this time. Try again!");
    }

    const cacheDir = path.resolve(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    const imagePath = path.join(cacheDir, `${Date.now()}_fluxpro_image.png`);
    fs.writeFileSync(imagePath, response.data);

    const stream = fs.createReadStream(imagePath);

    api.unsendMessage(waitMessageID, (err) => {});

    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

    message.reply({
      body: "🌟 | FluxPro Ultra has crafted your masterpiece! Enjoy your stunning AI-generated image! 🚀",
      attachment: stream,
    });

    logRequest(userId);

    setTimeout(() => {
      fs.unlink(imagePath, (err) => {});
    }, 60000);
  } catch (error) {
    api.sendMessage("❌ | FluxPro Ultra encountered an issue while generating your image. Try again later!", event.threadID, event.messageID);
  }
}

function canGenerateImage(userId) {
  const now = Date.now();
  if (!requestCache[userId]) requestCache[userId] = [];
  requestCache[userId] = requestCache[userId].filter((timestamp) => now - timestamp < 10 * 60 * 1000);
  return requestCache[userId].length < 2;
}

function logRequest(userId) {
  if (!requestCache[userId]) requestCache[userId] = [];
  requestCache[userId].push(Date.now());
}
