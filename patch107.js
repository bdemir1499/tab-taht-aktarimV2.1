const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(/app\.js\?v=\d+/g, "app.js?v=449");
html = html.replace(/style\.css\?v=\d+/g, "style.css?v=449");
fs.writeFileSync("index.html", html, "utf8");
console.log("Bumped cache buster to 449.");
