const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const t1 = `const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < 0.8);`;
const r1 = `const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < 0.35);`;

const t2 = `const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < 0.8);`;
const r2 = `const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < 0.35);`;

if (appJs.includes(t1) && appJs.includes(t2)) {
    appJs = appJs.replace(t1, r1);
    appJs = appJs.replace(t2, r2);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: pinch thresholds tightened.");
} else {
    console.log("Failed: pinch thresholds not found.");
}
