const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const targetPx = `                    const px1 = (1 - hand1[8].x) * window.innerWidth;
                    const py1 = hand1[8].y * window.innerHeight;`;

const replacePx = `                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.3; // Anti-Jitter (Titreme onleyici)
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.3;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;`;

const targetRot = `                                        const dx = px1 - startX;
                                        const dy = py1 - startY;

                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);`;

const replaceRot = `                                        const dx = px1 - startX;
                                        const dy = py1 - startY;

                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Kucuk titremelerde islem yapma
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);`;

const targetRotEnd = `                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                    }
                                    startX = px1;
                                    startY = py1;`;
                                    
const replaceRotEnd = `                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        startX = px1;
                                        startY = py1;
                                        } // End of Deadzone`;

if (appJs.includes(targetPx)) {
    appJs = appJs.replace(targetPx, replacePx);
    if (appJs.includes(targetRot) && appJs.includes(targetRotEnd)) {
        appJs = appJs.replace(targetRot, replaceRot);
        appJs = appJs.replace(targetRotEnd, replaceRotEnd);
        fs.writeFileSync("app.js", appJs, "utf8");
        console.log("Success: Anti-jitter and Deadzone applied.");
    } else {
        console.log("Failed: Rotation target not found.");
    }
} else {
    console.log("Failed: Px target not found.");
}
