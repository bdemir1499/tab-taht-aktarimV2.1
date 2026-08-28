const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// Target 1: AI instant update
const t1 = `                                            if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                                                window.CustomConeEngine.update(mesh, newRatio);
                                            } else if (window.Foldable3D) {
                                                window.Foldable3D.updateUnfold(mesh, newRatio);
                                            }`;
const r1 = `                                            // Lerp animasyonu icin update fonksiyonlari Scene3D.animate'e birakildi`;
if (appJs.includes(t1)) {
    appJs = appJs.replace(t1, r1);
    console.log("Success: AI block updated");
} else { console.log("Failed: AI block"); }

// Target 2: Scene3D.animate lerp
const t2 = `                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.strokeData.openRatio || 0);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.strokeData.openRatio || 0);
                    }`;
const r2 = `                    let targetRatio = mesh.userData.strokeData.openRatio || 0;
                    if (mesh.userData.currentOpenRatio === undefined) mesh.userData.currentOpenRatio = targetRatio;
                    mesh.userData.currentOpenRatio += (targetRatio - mesh.userData.currentOpenRatio) * 0.3;
                    if (Math.abs(targetRatio - mesh.userData.currentOpenRatio) < 0.001) mesh.userData.currentOpenRatio = targetRatio;

                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.currentOpenRatio);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.currentOpenRatio);
                    }`;
if (appJs.includes(t2)) {
    appJs = appJs.replace(t2, r2);
    console.log("Success: animate loop updated");
} else { console.log("Failed: animate loop"); }

// Target 3: sekil_guncelle instant update
const t3 = `                            if (sceneMesh.userData.isCustomCone && window.CustomConeEngine) {
                                window.CustomConeEngine.update(sceneMesh, data.stroke.openRatio);
                            } else if (window.Foldable3D) {
                                window.Foldable3D.updateUnfold(sceneMesh, data.stroke.openRatio);
                            }`;
const r3 = `                            // Animasyon (Lerp) pruzsuz calismasi icin buradaki anlik guncellemeler Scene3D.animate icine alindi.`;
if (appJs.includes(t3)) {
    appJs = appJs.replace(t3, r3);
    console.log("Success: sekil_guncelle updated");
} else { console.log("Failed: sekil_guncelle"); }

fs.writeFileSync("app.js", appJs, "utf8");
