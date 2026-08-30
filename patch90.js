const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

// 1. Düğmeleri icice koyacak sekilde guncelle (absolute positioning file input hilesi)
const oldHTML = `<button id="btn-camera" class="tool-button" style="background-color: #ffaa00; color: #000; font-weight: bold;">📸 Kameradan Soru Çek</button>
        <input type="file" id="camera-input" accept="image/*" capture="environment" style="position: absolute; opacity: 0; width: 1px; height: 1px; z-index: -1;">
        <button id="btn-upload" class="tool-button">Resim/Dosya(PDFKitap) Yükle</button>
        <input type="file" id="file-input" accept="image/*, application/pdf" style="position: absolute; opacity: 0; width: 1px; height: 1px; z-index: -1;">`;

const newHTML = `<button id="btn-camera" class="tool-button" style="position: relative; background-color: #ffaa00; color: #000; font-weight: bold; overflow: hidden;">
            📸 Kameradan Soru Çek
            <input type="file" id="camera-input" accept="image/*" capture="environment" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
        </button>
        <button id="btn-upload" class="tool-button" style="position: relative; overflow: hidden;">
            Resim/Dosya(PDFKitap) Yükle
            <input type="file" id="file-input" accept="image/*, application/pdf" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
        </button>`;

if (html.includes("id=\"camera-input\"")) {
    html = html.replace(/<button id="btn-camera".*?<\/button>\s*<input type="file" id="camera-input".*?>\s*<button id="btn-upload".*?<\/button>\s*<input type="file" id="file-input".*?>/s, newHTML);
    fs.writeFileSync("index.html", html, "utf8");
    console.log("HTML patched with inline file inputs.");
}

// 2. app.js icinden gereksiz onclick yonlendirmelerini temizle
let js = fs.readFileSync("app.js", "utf8");
js = js.replace(/uploadButton\.onclick = \(\) => fileInput\.click\(\);/g, "// uploadButton.onclick kaldirildi");
js = js.replace(/cameraBtn\.onclick = \(\) => cameraInput\.click\(\);/g, "// cameraBtn.onclick kaldirildi");
fs.writeFileSync("app.js", js, "utf8");
console.log("JS patched.");

