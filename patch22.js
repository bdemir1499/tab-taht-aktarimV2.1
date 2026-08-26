const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

const target = `            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) { vid.remove(); }`;

const replacement = `            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) {
                // Kamera donanim isigini ve kaydini TAMAMEN kapatmak icin MediaStream tracklerini durdurmaliyiz!
                if (vid.srcObject) {
                    vid.srcObject.getTracks().forEach(track => track.stop());
                }
                vid.remove();
            }`;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replacement);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Camera track release patch applied successfully.");
} else {
    console.log("Target not found!");
}
