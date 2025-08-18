const express = require("express");
const Parser = require("rss-parser");

const app = express();
const parser = new Parser();

app.get("/news", async (req, res) => {
  try {
    let feeds = [];

    // 1️⃣ أخبار الخرطوم الوطني
    let khartoum = await parser.parseURL("https://sudan-news-feed-url.com/rss");
    feeds = feeds.concat(khartoum.items.map(i => ({ source: "الخرطوم الوطني", title: i.title, link: i.link })));

    // 2️⃣ أخبار السودان الرياضية
    let sudanSports = await parser.parseURL("https://arabic-sports-url.com/rss");
    feeds = feeds.concat(sudanSports.items.map(i => ({ source: "السودان", title: i.title, link: i.link })));

    // 3️⃣ أخبار عربية
    let arabic = await parser.parseURL("https://www.aljazeera.net/sports/rss");
    feeds = feeds.concat(arabic.items.map(i => ({ source: "العربية", title: i.title, link: i.link })));

    res.json({ news: feeds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "فشل في جلب الأخبار" });
  }
});

module.exports = app;
