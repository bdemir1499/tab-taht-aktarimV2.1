const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

const target = `<div class="panel left-panel">`;
const replace = `
    <!-- MOBIL CIHAZLAR ICIN CEKMECE BUTONLARI -->
    <button id="mobile-drawer-left" class="mobile-fab left-fab">🛠️</button>
    <button id="mobile-drawer-right" class="mobile-fab right-fab">⚙️</button>
    
    <div class="panel left-panel">`;

if (!html.includes('id="mobile-drawer-left"')) {
    html = html.replace(target, replace);
    fs.writeFileSync("index.html", html, "utf8");
    console.log("FAB buttons added to index.html");
} else {
    console.log("FAB buttons already exist.");
}
