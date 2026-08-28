const fs = require("fs");
let indexHtml = fs.readFileSync("index.html", "utf8");
indexHtml = indexHtml.replace(/app\.js\?v=\d+/g, "app.js?v=416");
fs.writeFileSync("index.html", indexHtml, "utf8");
console.log("Bumped app.js cache buster to 416.");
