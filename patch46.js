const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

const t1 = `        <button id="btn-upload" class="tool-button">Resim/Dosya(PDFKitap) Ykle</button>
        <input type="file" id="file-input" accept="image/*, application/pdf" style="display: none;">`;

const r1 = `        <button id="btn-camera" class="tool-button" style="background-color: #ffaa00; color: #000; font-weight: bold;">?? Kameradan Soru ek</button>
        <input type="file" id="camera-input" accept="image/*" capture="environment" style="display: none;">
        <button id="btn-upload" class="tool-button">Resim/Dosya(PDFKitap) Ykle</button>
        <input type="file" id="file-input" accept="image/*, application/pdf" style="display: none;">`;

// Fallback for turkish characters
const t2 = `<button id="btn-upload" class="tool-button">Resim/Dosya(PDFKitap) Y`;
const r2 = `<button id="btn-camera" class="tool-button" style="background-color: #ffaa00; color: #000; font-weight: bold;">📸 Kameradan Soru Çek</button>
        <input type="file" id="camera-input" accept="image/*" capture="environment" style="display: none;">
        <button id="btn-upload" class="tool-button">Resim/Dosya(PDFKitap) Y`;

if (html.includes(t2)) {
    html = html.replace(t2, r2);
    html = html.replace(/app\.js\?v=\d+/g, "app.js?v=422");
    fs.writeFileSync("index.html", html, "utf8");
    console.log("Success: index.html updated");
} else { console.log("Failed: index.html"); }

let app = fs.readFileSync("app.js", "utf8");
const t3 = `if (uploadButton && fileInput) {
    uploadButton.onclick = () => fileInput.click();

    fileInput.onchange = async (e) => {`;

const r3 = `if (uploadButton && fileInput) {
    uploadButton.onclick = () => fileInput.click();

    const cameraBtn = document.getElementById('btn-camera');
    const cameraInput = document.getElementById('camera-input');
    if (cameraBtn && cameraInput) {
        cameraBtn.onclick = () => cameraInput.click();
        cameraInput.onchange = async (e) => fileInput.onchange(e);
    }

    fileInput.onchange = async (e) => {`;

if (app.includes(t3)) {
    app = app.replace(t3, r3);
    fs.writeFileSync("app.js", app, "utf8");
    console.log("Success: app.js updated");
} else { console.log("Failed: app.js"); }

