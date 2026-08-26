const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

const anchor1 = "if (data.stroke.rotationX !== undefined) sceneMesh.rotation.x = data.stroke.rotationX;";
const anchor2 = "if (window.redrawAllStrokes) window.redrawAllStrokes();";

let i1 = appJs.indexOf(anchor1);
let i2 = appJs.indexOf(anchor2, i1);

if (i1 > -1 && i2 > -1) {
    const pre = appJs.substring(0, i1);
    const post = appJs.substring(i2 + anchor2.length);
    
    const newMid = // Rotasyon ayarlarini koru
                        if (data.stroke.rotationX !== undefined) sceneMesh.rotation.x = data.stroke.rotationX;
                        if (data.stroke.rotationY !== undefined) sceneMesh.rotation.y = data.stroke.rotationY;
                        if (data.stroke.rotationZ !== undefined) sceneMesh.rotation.z = data.stroke.rotationZ;

                        // Boyut (Scale) bilgisini aninda WebGL motoruna yansit (Gecikmesiz)
                        if (data.stroke.meshScale !== undefined) {
                            sceneMesh.scale.setScalar(data.stroke.meshScale);
                        }

                        // Surgu acinim bilgisini senkronize et
                        if (data.stroke.openRatio !== undefined) {
                            hedef.openRatio = data.stroke.openRatio;
                            if (sceneMesh.userData && sceneMesh.userData.strokeData) {
                                sceneMesh.userData.strokeData.openRatio = data.stroke.openRatio;
                            }
                            if (sceneMesh.userData.isCustomCone && window.CustomConeEngine) {
                                window.CustomConeEngine.update(sceneMesh, data.stroke.openRatio);
                            } else if (window.Foldable3D) {
                                window.Foldable3D.updateUnfold(sceneMesh, data.stroke.openRatio);
                            }
                        }

                        if (window.Scene3D.currentMesh === sceneMesh) window.Scene3D.updateHandlePositions();
                    }
                    
                    // ==========================================
                    // HIZ OPTIMIZASYONU (GECIKME KALDIRICI)
                    // ==========================================
                    // Eger yansitilan sekil sadece bir 3D model ise (ve uzerinde 2D yazi/etiket yoksa)
                    // koca 2D sayfa cizim motorunu (redrawAllStrokes) saniyede 60 kez calistirmaya ASLA gerek yoktur!
                    // WebGL motoru zaten (requestAnimationFrame) ile aninda kendi goruntusunu gunceller.
                    // Bu return komutu sayfa kilitlenmesini ve agdaki ping gecikmelerini SIFIRA indirir.
                    if (!hedef.showEdgeLabels && !hedef.showAngleLabels && !hedef.showCircleInfo) {
                        return; 
                    }
                }

                if (window.redrawAllStrokes) window.redrawAllStrokes();;
                
    fs.writeFileSync("app.js", pre + newMid + post, "utf8");
    console.log("Successfully patched network sync latency!");
} else {
    console.log("Could not find anchors!", i1, i2);
}
