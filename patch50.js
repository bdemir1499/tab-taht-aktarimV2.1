const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(/<span>PDF<\/span>/g, "<span>X Resmi/PDF Kapat</span>");
html = html.replace(/app\.js\?v=\d+/g, "app.js?v=424");
fs.writeFileSync("index.html", html, "utf8");
console.log("Success: Button text updated via regex");
