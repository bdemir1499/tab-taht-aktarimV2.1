const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

const oldBlock = "                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const isPinched2 = pinchDist2 < 0.12;
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                if (!isPinched1 && !isPinched2) {
                                    laserCursor.style.backgroundColor = '#ff00ff'; 
                                    if (startScaleDistance === 0) {
                                        startScaleDistance = handsDistance;
                                        startScale = mesh.scale.x;
                                    } else {
                                        const scaleFactor = handsDistance / startScaleDistance;
                                        let newScale = startScale * scaleFactor;
                                        newScale = Math.max(0.2, Math.min(newScale, 10)); 
                                        mesh.scale.setScalar(newScale);
                                        
                                        if (mesh.userData && mesh.userData.strokeData) {
                                            mesh.userData.strokeData.meshScale = newScale;
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
                                        let ratioChange = distDiff * 2; 
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
                                startX = 0; 
                            } \n                            else {\n                                startScaleDistance = 0;";

const newBlock = "                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const isPinched2 = pinchDist2 < 0.12;
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                // Hata onleme: Iki el birbirinden en az %15 uzak olmali (yanlis algilamalari onler)
                                if (handsDistance > 0.15) {
                                    if (!isPinched1 && !isPinched2) {
                                        laserCursor.style.backgroundColor = '#ff00ff'; 
                                        if (startScaleDistance === 0) {
                                            startScaleDistance = handsDistance;
                                            startScale = mesh.scale.x;
                                        } else {
                                            const distDiff = handsDistance - startScaleDistance;
                                            // Pruzsuz dogrusal buyutme (Sicramalari tamamen onler)
                                            let newScale = startScale + (distDiff * 4);
                                            // Cizim alanindan tasmamasi icin maksimum 3.5 siniri
                                            newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                            
                                            // Lerp ile gecisleri yag gibi kaydir
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
                                            // Acinim hizi biraz yumusatildi (2 yerine 1.5)
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
                            } \n                            else {\n                                startScaleDistance = 0;";

// Clean up line endings to match app.js (CRLF or LF)
const normOld = oldBlock.replace(/\r\n/g, '\n');
const normApp = appJs.replace(/\r\n/g, '\n');

if (normApp.includes(normOld)) {
    const finalAppJs = normApp.replace(normOld, newBlock.replace(/\r\n/g, '\n'));
    fs.writeFileSync('app.js', finalAppJs, 'utf8');
    console.log('Successfully replaced logic');
} else {
    console.log('Block not found. Checking substrings...');
    console.log('First 50 chars of oldBlock present?', normApp.includes(normOld.substring(0, 50)));
}
