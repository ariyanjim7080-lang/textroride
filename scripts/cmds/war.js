module.exports = {
  config: {
    name: "war",
    version: "1.0",
    author: "Xemon (Redwan)",
    role: 2,
    category: "texts",
    guide: {
      vi: "Not Available",
      en: "cpx @(mention) [loop]"
    }
  },

  onStart: async function ({ api, event, args }) {
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Need to tag 1 friend whom you want to scold with bad words", event.threadID);

    let name = event.mentions[mention];
    var arraytag = [];
    arraytag.push({ id: mention, tag: name });

    var messages = [
      "তর মার ভোদায় পাব্লিক টয়লেট 🥵তর মায়ের ভুদাতে পোকা 🥵তর বাপের হোল তর বউয়ের ভোদাতেদিমু " + name,
      "আবাল চোদা কান্দে ফালাইয়া তর মায়েরে চুদি🥵🥵 " + name,
      "ভুদার বেটা  তর মা এর ভুদায় ধান ছড়াইয়া চড়ুই দিয়া খাওয়ামু❤ " + name,
      "হোগার ভিতরে ভইড়া দিমু…ঠ্যাঁঙ কাইট্টা পুটকি দা ভইরা দুম! হালা ল্যাওড়া চোদা " + name,
      "শুয়োরের বাচ্চা কুত্তার বাচ্ছা হারামির বাচ্চা হারামি হারামজাদা হারামখোর খান্কি মাগির পোলা😭 " + name,
      "কান্দে ফালাইয়া তর মায়েরে চুদি🤠❤ " + name,
      "ধোন কাইট্টা কুত্তা দিয়া খাওয়ামু " + name,
      "তোগোরে ফাসিতে লটকাইয়া চুদমু " + name,
      "তোগোর ধোন টাইনা তোগোর পিছন দিয়া ঢুকামু💋 " + name,
      "জং ধরা লোহা দিয়া পাকিস্তানের মানচিত্র বানাই্য়া তোদের পিছন দিয়া ঢুকামু " + name,
      "তর মায়ের ভোদা শিরিষ কাগজ দিয়া ঘইষা দিমু। " + name,
      "তর মায়ের ভোদা বোম্বাই মরিচ দিয়া চুদামু। " + name,
      "তর বাপের পুটকির ফুটা দিয়া কাডল ঢুকামু। " + name,
      "তর বৌয়ের ভোদায় মাগুর মাছ চাষ করুম। " + name,
      "হাতির ল্যাওড়া দিয়া তর মায়েরে চুদুম।🤠❤ " + name,
      "তর মায়ের ভোদা ছিল্লা লবণ লাগায় দিমু। " + name,
      "তোর মা বোন বউ রে একসাথে একটা কনডম দিয়ে চুদি🤠❤ " + name,
      "খাংকির পোলা তোর মা রে গাছ এর সাথে বেধে ভুদার মধ্যে তালগাছ ঢুকিয়ে চুদি🥵 " + name,
      "বেস্যা কনডম ফাটা ভুদা ছিড়া তোর মা রে সোফায় ফালায়া চুদি " + name,
      "তর মাকে আলমারির সাথে বেঁধে চুদি যাতে আরামে চুদা যায় " + name,
      "বিদুৎ এর কারেন্ট তর মা র ভুদায় প্রবেশ করিয়ে ইলেকট্রনিক সর্ট দিয়ে তর মাকে চুদি🙀❤ " + name,
      "তোর মা রে মাসিক আটকাইয়া মেরে ফেলবো😘 " + name,
      "তর মারে পদ্মা সেতুর ৭নাম্বার পিলারের সাথে হাত পা বেদে কালা কুত্তা দিয়ে চুদাই🤠❤ " + name,
      "XEMON THE GREAT EXIT!!😾🥀🤣 " + name
    ];

    var delay = 3000;

    if (args[1] === "loop") {
      function sendLoopMessages() {
        messages.forEach((msg, index) => {
          setTimeout(() => {
            api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
          }, index * delay);
        });
        setTimeout(sendLoopMessages, messages.length * delay);
      }
      sendLoopMessages();
    } else {
      messages.forEach((msg, index) => {
        setTimeout(() => {
          api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
        }, index * delay);
      });
    }
  }
};
