const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(/app\.js\?v=\d+/g, "app.js?v=426");
fs.writeFileSync("index.html", html, "utf8");
console.log("Bumped cache buster to 426.");
