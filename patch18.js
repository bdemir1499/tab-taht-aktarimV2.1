const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

// Target 1: animate loop slerp
const t1 = `                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.strokeData.openRatio || 0);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.strokeData.openRatio || 0);
                    }`;
const r1 = `                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.strokeData.openRatio || 0);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.strokeData.openRatio || 0);
                    }
                    
                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.15);
                    }`;

// Target 2: sekil_guncelle network receive
const t2 = `                        // Rotasyon ayarlarini koru
                        if (data.stroke.rotationX !== undefined) sceneMesh.rotation.x = data.stroke.rotationX;
                        if (data.stroke.rotationY !== undefined) sceneMesh.rotation.y = data.stroke.rotationY;
                        if (data.stroke.rotationZ !== undefined) sceneMesh.rotation.z = data.stroke.rotationZ;`;
const r2 = `                        // Rotasyon ayarlarini koru (SLERP Hedefi)
                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }`;

// Target 3: Green Button sending
const t3 = `            this.currentMesh.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * -0.01); // ASAGI CIKIYORSA YUKARI DEGIL, ASAGI DONSUN
            this.currentMesh.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * -0.01);
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            // Yeil buton verisi PC'ye sorunsuz iletilir
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                sd.rotationX = this.currentMesh.rotation.x;
                sd.rotationY = this.currentMesh.rotation.y;
                sd.rotationZ = this.currentMesh.rotation.z;`;
const r3 = `            if (!this.currentMesh.userData.targetQuaternion) {
                this.currentMesh.userData.targetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userData.targetQuaternion);
            dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * -0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * -0.01);
            this.currentMesh.userData.targetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userData.targetQuaternion, 'XYZ');
                sd.rotationX = euler.x;
                sd.rotationY = euler.y;
                sd.rotationZ = euler.z;`;

// Target 4: Magic Hand sending
const t4 = `                                        mesh.rotateOnWorldAxis(camUp, dx * -0.005);
                                        mesh.rotateOnWorldAxis(camRight, dy * 0.005); // TERSINE CEVIRILDI (YON DUZELTME)

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            sd.rotationX = mesh.rotation.x;
                                            sd.rotationY = mesh.rotation.y;
                                            sd.rotationZ = mesh.rotation.z;`;
const r4 = `                                        if (!mesh.userData.targetQuaternion) {
                                            mesh.userData.targetQuaternion = mesh.quaternion.clone();
                                        }
                                        const dummy = new THREE.Object3D();
                                        dummy.quaternion.copy(mesh.userData.targetQuaternion);
                                        dummy.rotateOnWorldAxis(camUp, dx * -0.005);
                                        dummy.rotateOnWorldAxis(camRight, dummy.userData.temp ? 0 : dy * 0.005);
                                        mesh.userData.targetQuaternion.copy(dummy.quaternion);

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            const euler = new THREE.Euler().setFromQuaternion(mesh.userData.targetQuaternion, 'XYZ');
                                            sd.rotationX = euler.x;
                                            sd.rotationY = euler.y;
                                            sd.rotationZ = euler.z;`;

appJs = appJs.replace(t1, r1);
// Due to turkish character issue in t3, I will use regex or partial match for t3
const t3_part1 = `this.currentMesh.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * -0.01); // ASAGI CIKIYORSA YUKARI DEGIL, ASAGI DONSUN`;
const r3_full = `            if (!this.currentMesh.userData.targetQuaternion) {
                this.currentMesh.userData.targetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userData.targetQuaternion);
            dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * -0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * -0.01);
            this.currentMesh.userData.targetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userData.targetQuaternion, 'XYZ');
                sd.rotationX = euler.x;
                sd.rotationY = euler.y;
                sd.rotationZ = euler.z;`;

// We will use a regex replacing a big chunk for Green Button and Network
appJs = appJs.replace(/this\.currentMesh\.rotateOnWorldAxis\(camRight.*?sd\.rotationZ = this\.currentMesh\.rotation\.z;/s, r3_full);

appJs = appJs.replace(t4, r4);
// Use replace for Network Receive too (Target 2)
appJs = appJs.replace(/if \(data\.stroke\.rotationX !== undefined\) sceneMesh\.rotation\.x = data\.stroke\.rotationX;.*?if \(data\.stroke\.rotationZ !== undefined\) sceneMesh\.rotation\.z = data\.stroke\.rotationZ;/s, r2);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("All interpolation patches applied.");
