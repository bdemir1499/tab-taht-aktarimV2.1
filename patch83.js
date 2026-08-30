const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

// 1. Gizli inputlarin 'display: none' olmasini engelle (bazı mobil tarayıcılar display: none olan inputun .click() olmasini engeller)
const targetCamera = `<input type="file" id="camera-input" accept="image/*" capture="environment" style="display: none;">`;
const replaceCamera = `<input type="file" id="camera-input" accept="image/*" style="position: absolute; opacity: 0; width: 1px; height: 1px; z-index: -1;">`;

const targetUpload = `<input type="file" id="file-input" accept="image/*, application/pdf" style="display: none;">`;
const replaceUpload = `<input type="file" id="file-input" accept="image/*, application/pdf" style="position: absolute; opacity: 0; width: 1px; height: 1px; z-index: -1;">`;

if (html.includes(targetCamera)) {
    html = html.replace(targetCamera, replaceCamera);
    console.log("Camera input patched.");
} else {
    // maybe capture was already removed or it's different?
    console.log("Camera input exact string not found. Trying regex.");
    html = html.replace(/<input type="file" id="camera-input"[^>]*>/, replaceCamera);
}

if (html.includes(targetUpload)) {
    html = html.replace(targetUpload, replaceUpload);
    console.log("Upload input patched.");
} else {
    html = html.replace(/<input type="file" id="file-input"[^>]*>/, replaceUpload);
}

fs.writeFileSync("index.html", html, "utf8");
console.log("Inputs updated.");
