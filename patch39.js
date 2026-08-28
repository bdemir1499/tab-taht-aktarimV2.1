const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const target = `                                            let multiplier = distDiff < 0 ? 2.8 : 1.8;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Gecislerde (cimdik birakirken) ellerin 
                                            // istemsizce birkac santim oynamasinin sekli bozmasini tamamen onler.
                                            if (newRatio > 0.90) newRatio = 1.0;
                                            if (newRatio < 0.10) newRatio = 0.0;`;

const replace = `                                            // ASIMETRIK CARPAN: Hizli acilip kapanmasi icin carpanlar artirildi
                                            let multiplier = distDiff < 0 ? 5.5 : 4.0;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Daha kolay kapanmasi icin sinirlar genisletildi
                                            if (newRatio > 0.85) newRatio = 1.0;
                                            if (newRatio < 0.18) newRatio = 0.0;`;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Multipliers updated.");
} else {
    console.log("Failed: Target not found.");
}
