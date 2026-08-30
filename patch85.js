const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

// Kamerayı zorlamak icin capture="environment" niteligini geri ekleyelim
const targetCamera = `<input type="file" id="camera-input" accept="image/*" style="position: absolute; opacity: 0; width: 1px; height: 1px; z-index: -1;">`;
const replaceCamera = `<input type="file" id="camera-input" accept="image/*" capture="environment" style="position: absolute; opacity: 0; width: 1px; height: 1px; z-index: -1;">`;

if (html.includes(targetCamera)) {
    html = html.replace(targetCamera, replaceCamera);
    console.log("Camera capture patched.");
} else {
    console.log("Camera input exact string not found.");
}

fs.writeFileSync("index.html", html, "utf8");
console.log("Inputs updated.");
