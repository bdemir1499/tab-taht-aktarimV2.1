const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

// Hedefleri bulup, div sarmalayicisi icinde kardes (sibling) yapalim
const targetHTML = `<button id="btn-camera" class="tool-button" style="position: relative; background-color: #ffaa00; color: #000; font-weight: bold; overflow: hidden;">
            📸 Kameradan Soru Çek
            <input type="file" id="camera-input" accept="image/*" capture="environment" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
        </button>
        <button id="btn-upload" class="tool-button" style="position: relative; overflow: hidden;">
            Resim/Dosya(PDFKitap) Yükle
            <input type="file" id="file-input" accept="image/*, application/pdf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
        </button>`;

const newHTML = `<div style="position: relative; overflow: hidden; display: flex; width: 100%; margin-bottom: 5px;">
            <button id="btn-camera" class="tool-button" style="width: 100%; margin: 0; background-color: #ffaa00; color: #000; font-weight: bold;">📸 Kameradan Soru Çek</button>
            <input type="file" id="camera-input" accept="image/*" capture="environment" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
        </div>
        <div style="position: relative; overflow: hidden; display: flex; width: 100%; margin-bottom: 5px;">
            <button id="btn-upload" class="tool-button" style="width: 100%; margin: 0;">Resim/Dosya(PDFKitap) Yükle</button>
            <input type="file" id="file-input" accept="image/*, application/pdf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
        </div>`;

if (html.includes("id=\"btn-camera\"") && html.includes("id=\"btn-upload\"")) {
    html = html.replace(/<button id="btn-camera".*?<\/button>\s*<button id="btn-upload".*?<\/button>/s, newHTML);
    fs.writeFileSync("index.html", html, "utf8");
    console.log("HTML refactored: Inputs are now siblings to prevent translation destruction.");
} else {
    console.log("Target HTML not found.");
}
