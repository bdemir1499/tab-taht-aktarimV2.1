const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

function patch(target, replacement, desc) {
    if (appJs.includes(target)) {
        appJs = appJs.replace(target, replacement);
        console.log("Success: " + desc);
    } else {
        console.log("Failed: Target not found for " + desc);
    }
}

// Target 1: sekil_guncelle
const t1 = `                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }`;
const r1 = `                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }

                        if (data.stroke.x !== undefined && data.stroke.y !== undefined && window.Scene3D && window.Scene3D.camera) {
                            const normCoords = window.Scene3D.getNormalizedCoords(data.stroke.x, data.stroke.y);
                            window.Scene3D.raycaster.setFromCamera(normCoords, window.Scene3D.camera);
                            const intersection = new THREE.Vector3();
                            if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.plane, intersection)) {
                                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                                    intersection.z = data.stroke.pos3D.z;
                                }
                                if (!sceneMesh.userData.targetPosition) {
                                    sceneMesh.position.copy(intersection);
                                    sceneMesh.userData.targetPosition = intersection.clone();
                                } else {
                                    sceneMesh.userData.targetPosition.copy(intersection);
                                }
                            }
                        }`;
patch(t1, r1, "sekil_guncelle position lerp");

// Target 2: Scene3D.animate
const t2 = `                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.15);
                    }`;
const r2 = `                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.15);
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.2);
                    }`;
patch(t2, r2, "Scene3D.animate position lerp");

// Target 3: window.lastAISendTime
const t3 = `            let startOpenDistance = 0, startOpenRatio = 0;

            hands.onResults((results) => {`;
const r3 = `            let startOpenDistance = 0, startOpenRatio = 0;
            window.lastAISendTime = 0;

            hands.onResults((results) => {`;
patch(t3, r3, "window.lastAISendTime init");

// Target 4: Throttle Scale
const t4 = `                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = newScale;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }`;
const r4 = `                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = newScale;
                                                const now = Date.now();
                                                if (now - window.lastAISendTime > 40) {
                                                    if (typeof window.sendNetworkData === "function") {
                                                        window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                    }
                                                    window.lastAISendTime = now;
                                                }
                                            }`;
patch(t4, r4, "Throttle Scale");

// Target 5: Throttle Open
const t5 = `                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.openRatio = newRatio;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }`;
const r5 = `                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.openRatio = newRatio;
                                                const now = Date.now();
                                                if (now - window.lastAISendTime > 40) {
                                                    if (typeof window.sendNetworkData === "function") {
                                                        window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                    }
                                                    window.lastAISendTime = now;
                                                }
                                            }`;
patch(t5, r5, "Throttle Open");

// Target 6: Throttle Rotation
const t6 = `                                            sd.rotationZ = euler.z;
                                            if (typeof window.sendNetworkData === 'function') {
                                                window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                                            }
                                        }`;
const r6 = `                                            sd.rotationZ = euler.z;
                                            const now = Date.now();
                                            if (now - window.lastAISendTime > 40) {
                                                if (typeof window.sendNetworkData === 'function') {
                                                    window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                                                }
                                                window.lastAISendTime = now;
                                            }
                                        }`;
patch(t6, r6, "Throttle Rotation");

// Target 7: Fist Gesture
const t7 = `                            } else {
                                // TEK EL DURUMU (Yalnizca dondurme)
                                if (isPinched1) {
                                    laserCursor.style.backgroundColor = "#00ff00";`;
const r7 = `                            } else {
                                // TEK EL DURUMU (Yalnizca dondurme veya tasima)
                                const isFist = calculateDistance(hand1[8], hand1[5]) < 0.08 && calculateDistance(hand1[12], hand1[9]) < 0.08;
                                
                                if (isFist) {
                                    laserCursor.style.backgroundColor = "#ff0000"; // Kirmizi = Tutma
                                    const fistX = (1 - hand1[9].x) * window.innerWidth;
                                    const fistY = hand1[9].y * window.innerHeight;
                                    
                                    if (!window.Scene3D.isDraggingAI) {
                                        window.Scene3D.isDraggingAI = true;
                                        if (!window.Scene3D.dragOffset) window.Scene3D.dragOffset = new THREE.Vector3();
                                        window.Scene3D.dragPlane.setFromNormalAndCoplanarPoint(window.Scene3D.camera.getWorldDirection(new THREE.Vector3()), mesh.position);
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            window.Scene3D.dragOffset.subVectors(mesh.position, intersectPoint);
                                        }
                                    } else {
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            const targetPos = new THREE.Vector3().addVectors(intersectPoint, window.Scene3D.dragOffset);
                                            if (!mesh.userData.targetPosition) mesh.userData.targetPosition = mesh.position.clone();
                                            mesh.userData.targetPosition.copy(targetPos);
                                            
                                            const vec = targetPos.clone();
                                            vec.project(window.Scene3D.camera);
                                            const canvasEl = document.getElementById('drawing-canvas');
                                            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
                                            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.x = (vec.x * w) + w;
                                                mesh.userData.strokeData.y = -(vec.y * h) + h;
                                                const now = Date.now();
                                                if (now - window.lastAISendTime > 40) {
                                                    if (typeof window.sendNetworkData === 'function') {
                                                        window.sendNetworkData({ type: 'sekil_guncelle', stroke: mesh.userData.strokeData });
                                                    }
                                                    window.lastAISendTime = now;
                                                }
                                            }
                                        }
                                    }
                                }
                                else if (isPinched1) {
                                    window.Scene3D.isDraggingAI = false;
                                    laserCursor.style.backgroundColor = "#00ff00";`;
patch(t7, r7, "Fist Gesture");

// Reset isDraggingAI on hand leave
const t8 = `                                    startX = 0;
                                    startY = 0;
                                }`;
const r8 = `                                    window.Scene3D.isDraggingAI = false;
                                    startX = 0;
                                    startY = 0;
                                }`;
patch(t8, r8, "Reset isDraggingAI");

fs.writeFileSync("app.js", appJs, "utf8");
console.log("All patches completed.");
