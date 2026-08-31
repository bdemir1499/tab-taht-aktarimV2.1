const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");
let js = fs.readFileSync("app.js", "utf8");

// index.html degisiklikleri
html = html.replace("📸 Kameradan Soru Çek", "📸 Soru Çek");
html = html.replace("Resim/Dosya(PDFKitap) Yükle", "📁 Dosya Yükle");
html = html.replace(/app\.js\?v=\d+/g, "app.js?v=448");
html = html.replace(/style\.css\?v=\d+/g, "style.css?v=448");

// app.js degisiklikleri (tr translation)
js = js.replace(/yukle: "Resim\/Dosya Yükle"/, 'yukle: "📁 Dosya Yükle"');

fs.writeFileSync("index.html", html, "utf8");
fs.writeFileSync("app.js", js, "utf8");

console.log("Button texts shortened.");
