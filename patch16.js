const fs = require("fs");
let shapeJs = fs.readFileSync("shape3d_fold.js", "utf8");
shapeJs = shapeJs.replace(/\r\n/g, "\n");

const targetShape = `        // ==========================================
        // DYNAMIC PIVOT CENTERING (Orbit / Savrulma Fix)
        // ==========================================
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        group.userData.foldedCenter = center.clone();
        
        group.position.set(-center.x, -center.y, -center.z);
        // ==========================================

        outerGroup.add(group);`;

const replaceShape = `        outerGroup.add(group);

        // ==========================================
        // DYNAMIC PIVOT CENTERING (Orbit / Savrulma Fix)
        // ==========================================
        // HATA DUZELTME: Bounding box hesaplanmadan once seklin KAPALI (0) 
        // formuna gecmesi gerekir! Aksi halde acik (2D) halinin merkezini alir ve SAVRULUR!
        this.updateUnfold(outerGroup, 0);

        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        group.userData.foldedCenter = center.clone();
        group.position.set(-center.x, -center.y, -center.z);
        // ==========================================`;

if (shapeJs.includes(targetShape)) {
    shapeJs = shapeJs.replace(targetShape, replaceShape);
    fs.writeFileSync("shape3d_fold.js", shapeJs, "utf8");
    console.log("Successfully fixed pivot logic in shape3d_fold.js");
} else {
    console.log("Could not find shape3d_fold pivot target!");
}

let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

// Green Button signs
const targetApp1 = `            this.currentMesh.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);`;
const replaceApp1 = `            this.currentMesh.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * -0.01); // ASAGI CIKIYORSA YUKARI DEGIL, ASAGI DONSUN
            this.currentMesh.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * -0.01);`;

// Magic Hand signs
const targetApp2 = `                                        mesh.rotateOnWorldAxis(camUp, dx * -0.005);
                                        mesh.rotateOnWorldAxis(camRight, dy * -0.005);`;
const replaceApp2 = `                                        mesh.rotateOnWorldAxis(camUp, dx * -0.005);
                                        mesh.rotateOnWorldAxis(camRight, dy * 0.005); // TERSINE CEVIRILDI (YON DUZELTME)`;

let modified = false;
if (appJs.includes(targetApp1)) {
    appJs = appJs.replace(targetApp1, replaceApp1);
    console.log("Fixed Green Button Trackball directions.");
    modified = true;
}
if (appJs.includes(targetApp2)) {
    appJs = appJs.replace(targetApp2, replaceApp2);
    console.log("Fixed Magic Hand Trackball directions.");
    modified = true;
}
if (modified) {
    fs.writeFileSync("app.js", appJs, "utf8");
}
