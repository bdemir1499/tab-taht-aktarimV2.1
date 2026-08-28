const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const t1 = `                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const isFist1 = calculateDistance(hand1[8], hand1[5]) < 0.12 && calculateDistance(hand1[12], hand1[9]) < 0.12 && calculateDistance(hand1[16], hand1[13]) < 0.12 && calculateDistance(hand1[20], hand1[17]) < 0.12;
                    const isPinched1 = !isFist1 && (pinchDist1 < 0.07); `;

const r1 = `                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const handScale1 = calculateDistance(hand1[0], hand1[9]) || 0.001; // Elin ekrandaki boyutu (Bilek - Orta Parmak Koku)
                    // Gercek bir yumrukta parmak uclari koklere cok yaklasir (el boyutunun yarisi kadar veya daha az)
                    const isFist1 = (calculateDistance(hand1[8], hand1[5]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[12], hand1[9]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[16], hand1[13]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[20], hand1[17]) / handScale1) < 0.6;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < 0.8); `; // Cimdik mesafesi de ele gore orantili

const t2 = `                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const isFist2 = calculateDistance(hand2[8], hand2[5]) < 0.12 && calculateDistance(hand2[12], hand2[9]) < 0.12 && calculateDistance(hand2[16], hand2[13]) < 0.12 && calculateDistance(hand2[20], hand2[17]) < 0.12;
                                const isPinched2 = !isFist2 && (pinchDist2 < 0.07);`;

const r2 = `                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const handScale2 = calculateDistance(hand2[0], hand2[9]) || 0.001;
                                const isFist2 = (calculateDistance(hand2[8], hand2[5]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[12], hand2[9]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[16], hand2[13]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[20], hand2[17]) / handScale2) < 0.6;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < 0.8);`;

if (appJs.includes(t1)) appJs = appJs.replace(t1, r1);
if (appJs.includes(t2)) appJs = appJs.replace(t2, r2);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("Scale invariant gestures applied.");
