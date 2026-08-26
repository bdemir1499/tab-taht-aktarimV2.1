const fs = require('fs');
const appJs = fs.readFileSync('app.js', 'utf8');

const startIndex = appJs.indexOf('if (isTwoHands) {');

const targetStr = \if (isTwoHands) {
                            const hand2 = results.multiHandLandmarks[1];
                            const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                            const isPinched2 = pinchDist2 < 0.12;
                            const handsDistance = calculateDistance(hand1[8], hand2[8]);

                            // Hata onleme: Iki el birbirinden en az %15 uzak olmali
                            if (handsDistance > 0.15) {
                                if (!isPinched1 && !isPinched2) {
                                    laserCursor.style.backgroundColor = '#ff00ff'; 
                                    if (startScaleDistance === 0) {
                                        startScaleDistance = handsDistance;
                                        startScale = mesh.scale.x;
                                    } else {
                                        const distDiff = handsDistance - startScaleDistance;
                                        let newScale = startScale + (distDiff * 4);
                                        newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                        
                                        // Yumusatici (Lerp)
                                        mesh.scale.x += (newScale - mesh.scale.x) * 0.3;
                                        mesh.scale.setScalar(mesh.scale.x);
                                        
                                        if (mesh.userData && mesh.userData.strokeData) {
                                            mesh.userData.strokeData.meshScale = mesh.scale.x;
                                            if (typeof window.sendNetworkData === 'function') {
                                                window.sendNetworkData({ type: 'sekil_guncelle', stroke: mesh.userData.strokeData });
                                            }
                                        }
                                    }
                                    startOpenDistance = 0; 
                                } 
                                else if (isPinched1 && isPinched2) {
                                    laserCursor.style.backgroundColor = '#ffff00'; 
                                    if (startOpenDistance === 0) {
                                        startOpenDistance = handsDistance;
                                        startOpenRatio = mesh.userData.strokeData?.openRatio || 0;
                                    } else {
                                        const distDiff = handsDistance - startOpenDistance;
                                        let ratioChange = distDiff * 1.5; 
                                        let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                        
                                        const sInput = document.getElementById('shape-slider');
                                        if(sInput) sInput.value = newRatio * 100;
                                        
                                        if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                                            window.CustomConeEngine.update(mesh, newRatio);
                                        } else if (window.Foldable3D) {
                                            window.Foldable3D.updateUnfold(mesh, newRatio);
                                        }
                                        
                                        if (mesh.userData && mesh.userData.strokeData) {
                                            mesh.userData.strokeData.openRatio = newRatio;
                                            if (typeof window.sendNetworkData === 'function') {
                                                window.sendNetworkData({ type: 'sekil_guncelle', stroke: mesh.userData.strokeData });
                                            }
                                        }
                                    }
                                    startScaleDistance = 0; 
                                }
                                else {
                                    startScaleDistance = 0;
                                    startOpenDistance = 0;
                                }
                            }
                            startX = 0; 
                        } \;

const splitKey = "else {\n                            startScaleDistance = 0;\n                            startOpenDistance = 0;\n\n                            if (isPinched1) {";
const splitParts = appJs.split(splitKey);

if (splitParts.length === 2) {
    const finalAppJs = splitParts[0].substring(0, startIndex) + targetStr + "\n                        " + splitKey + splitParts[1];
    fs.writeFileSync('app.js', finalAppJs, 'utf8');
    console.log('Replaced two-hand block successfully');
} else {
    console.log('Split key not found or found multiple times');
}
