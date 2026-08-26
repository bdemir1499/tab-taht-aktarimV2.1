const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// Fix Pinched1 definition
const t1 = `                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const isPinched1 = pinchDist1 < 0.12; `;
const r1 = `                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const isFist1 = calculateDistance(hand1[8], hand1[5]) < 0.12 && calculateDistance(hand1[12], hand1[9]) < 0.12 && calculateDistance(hand1[16], hand1[13]) < 0.12 && calculateDistance(hand1[20], hand1[17]) < 0.12;
                    const isPinched1 = !isFist1 && (pinchDist1 < 0.07); `; // 0.07 makes it very distinct

// Fix Pinched2 definition
const t2 = `                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const isPinched2 = pinchDist2 < 0.12;`;
const r2 = `                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const isFist2 = calculateDistance(hand2[8], hand2[5]) < 0.12 && calculateDistance(hand2[12], hand2[9]) < 0.12 && calculateDistance(hand2[16], hand2[13]) < 0.12 && calculateDistance(hand2[20], hand2[17]) < 0.12;
                                const isPinched2 = !isFist2 && (pinchDist2 < 0.07);`;

// Fix Fist check inside the block
const t3 = `                                const isFist = calculateDistance(hand1[8], hand1[5]) < 0.08 && calculateDistance(hand1[12], hand1[9]) < 0.08;

                                if (isFist) {`;
const r3 = `                                const isFist = isFist1;

                                if (isFist) {`;

// Remove throttles
function removeThrottle(code) {
    let newCode = code.replace(/const now = Date\.now\(\);\s*if \(now - window\.lastAISendTime > 40\) \{\s*if \(typeof window\.sendNetworkData === ['"]function['"]\) \{\s*window\.sendNetworkData\(\{ type: ['"]sekil_guncelle['"], stroke: (.*?) \}\);\s*\}\s*window\.lastAISendTime = now;\s*\}/g, 
        `if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: $1 }); }`);
    return newCode;
}

if (appJs.includes(t1)) appJs = appJs.replace(t1, r1);
if (appJs.includes(t2)) appJs = appJs.replace(t2, r2);
if (appJs.includes(t3)) appJs = appJs.replace(t3, r3);

appJs = removeThrottle(appJs);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("Gestures tightened and throttle removed.");
