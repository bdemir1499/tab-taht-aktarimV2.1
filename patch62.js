const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const target = `await loadScript('mediapipe/camera_utils.js');
            await loadScript('mediapipe/hands.js');`;
            
if (appJs.includes(target)) {
    appJs = appJs.replace(target, `// Scripts artik index.html icinde erkenden yukleniyor.`);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Removed dynamic loadScript.");
} else {
    console.log("Failed: Could not find loadScript.");
}
