const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

// Check if scripts are already there
if (!html.includes('camera_utils.js')) {
    const target = `<link rel="stylesheet" href="style.css?v=2">`;
    const replace = `<link rel="stylesheet" href="style.css?v=2">
    <!-- MediaPipe Yapay Zeka Kutuphaneleri (Erkenden Onbellege Alinmasi Icin Buraya Eklendi) -->
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>`;
    
    html = html.replace(target, replace);
    html = html.replace(/app\.js\?v=\d+/g, "app.js?v=430");
    fs.writeFileSync("index.html", html, "utf8");
    console.log("Success: Added MediaPipe scripts to index.html for instant load.");
} else {
    console.log("Failed or Already exists.");
}
