const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const target = `locateFile: (file) => 'mediapipe/' + file`;
const replace = `locateFile: (file) => 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/' + file`;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Reverted locateFile to CDN.");
} else {
    console.log("Failed: Target not found.");
}
