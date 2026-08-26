const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

// Target 1: Green Button
const target1 = `        if (this.isRotatingHandle && this.currentMesh) {
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), (x - this.lastMousePos.x) * 0.01);`;

const replace1 = `        if (this.isRotatingHandle && this.currentMesh) {
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
            this.currentMesh.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);`;

// Target 2: Magic Hand
const target2 = `                                        // Gimbal Lock Fix + Y Eksen Invert
                                        mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * -0.005);
                                        mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * -0.005);`;

const replace2 = `                                        // Gimbal Lock Fix + Trackball (Dunya Maketi) Eksen Donusumu
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        mesh.rotateOnWorldAxis(camUp, dx * -0.005);
                                        mesh.rotateOnWorldAxis(camRight, dy * -0.005);`;

let modified = false;

if (appJs.includes(target1)) {
    appJs = appJs.replace(target1, replace1);
    console.log("Green button trackball fix applied.");
    modified = true;
} else {
    console.log("Green button target NOT found!");
}

if (appJs.includes(target2)) {
    appJs = appJs.replace(target2, replace2);
    console.log("Magic hand trackball fix applied.");
    modified = true;
} else {
    console.log("Magic hand target NOT found!");
}

if (modified) {
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("app.js successfully saved.");
}
