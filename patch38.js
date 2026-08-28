const fs = require("fs");
let indexHtml = fs.readFileSync("index.html", "utf8");
indexHtml = indexHtml.replace(/app\.js\?v=\d+/g, "app.js?v=418").replace(/shape3d_fold\.js\?v=\d+/g, "shape3d_fold.js?v=418");
fs.writeFileSync("index.html", indexHtml, "utf8");
console.log("Bumped cache buster to 418.");
