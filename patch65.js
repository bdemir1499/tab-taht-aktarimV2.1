const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const pdTarget = `canvas.addEventListener('pointerdown', (e) => {`;
const pdReplace = `canvas.addEventListener('pointerdown', (e) => {
    document.body.classList.add('ghost-mode');`;

if (appJs.includes(pdTarget)) {
    appJs = appJs.replace(pdTarget, pdReplace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Added ghost-mode logic to pointerdown");
} else {
    console.log("Failed: Target not found");
}
