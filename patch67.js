const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// Change modelComplexity to 1
const mcTarget = `modelComplexity: 0,`;
const mcReplace = `modelComplexity: 1, // 1 yapildi, uzaktan daha iyi algilamasi icin`;
appJs = appJs.replace(mcTarget, mcReplace);

// Change pinch threshold
const pinch1Target = `const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < 0.35);`;
const pinch1Replace = `const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < 0.45); // Hassasiyet artirildi`;
appJs = appJs.replace(pinch1Target, pinch1Replace);

const pinch2Target = `const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < 0.35);`;
const pinch2Replace = `const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < 0.45);`;
appJs = appJs.replace(pinch2Target, pinch2Replace);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("Success: Tweaked AI for better long-range detection.");
