const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const t1 = `                    const px1 = (1 - hand1[8].x) * window.innerWidth;
                    const py1 = hand1[8].y * window.innerHeight;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';`;
                    
const r1 = `                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.25; // 0.25 EMA Yumusatma Filtresi (Titremeyi yutar)
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.25;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';`;

const t2 = `                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;

                                        // Gimbal Lock Fix`;

const r2 = `                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;
                                        
                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Sadece gercek hareketlerde don!

                                        // Gimbal Lock Fix`;
                                        
const t3 = `                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                    }
                                    startX = px1;
                                    startY = py1;`;
                                    
const r3 = `                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        } // Deadzone sonu
                                    }
                                    startX = px1;
                                    startY = py1;`;

let c1 = false, c2 = false, c3 = false;
if (appJs.includes(t1)) { appJs = appJs.replace(t1, r1); c1 = true; }
if (appJs.includes(t2)) { appJs = appJs.replace(t2, r2); c2 = true; }
if (appJs.includes(t3)) { appJs = appJs.replace(t3, r3); c3 = true; }

if (c1 && c2 && c3) {
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success!");
} else {
    console.log(`Failed! c1:${c1} c2:${c2} c3:${c3}`);
}
