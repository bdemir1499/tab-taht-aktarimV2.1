const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

const target = `                                            const distDiff = handsDistance - startOpenDistance;
                                            // Acinim hizi biraz yumusatildi (2 yerine 1.5)
                                            let ratioChange = distDiff * 1.5; 
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));`;

const replace = `                                            const distDiff = handsDistance - startOpenDistance;
                                            
                                            // ASIMETRIK CARPAN: Kapatmak (distDiff < 0) fiziksel olarak daha dar bir alanda
                                            // yapildigi icin kapatma ivmesini 2.5 yapiyoruz. Acmak 1.5 kaliyor.
                                            let multiplier = distDiff < 0 ? 2.8 : 1.8;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));`;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Successfully applied asymmetric closing multiplier.");
} else {
    console.log("Target not found!");
}
