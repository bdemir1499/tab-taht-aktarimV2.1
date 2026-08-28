const fs = require("fs");
let code = fs.readFileSync("shape3d_fold.js", "utf8");

// Target 1: Add unfoldedCenter calculation
const t1 = `        this.updateUnfold(outerGroup, 0);

        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        group.userData.foldedCenter = center.clone();
        group.position.set(-center.x, -center.y, -center.z);`;

const r1 = `        this.updateUnfold(outerGroup, 0);

        let box = new THREE.Box3().setFromObject(group);
        let center = new THREE.Vector3();
        box.getCenter(center);
        group.userData.foldedCenter = center.clone();
        
        this.updateUnfold(outerGroup, 1);
        box = new THREE.Box3().setFromObject(group);
        box.getCenter(center);
        group.userData.unfoldedCenter = center.clone();
        
        this.updateUnfold(outerGroup, 0);
        group.position.set(-group.userData.foldedCenter.x, -group.userData.foldedCenter.y, -group.userData.foldedCenter.z);`;

// Target 2: Update updateUnfold position logic
const t2 = `            if (group.userData.foldedCenter) {
                const fx = -group.userData.foldedCenter.x;
                const tx = group.userData.shiftX !== undefined ? group.userData.shiftX : fx;
                
                inner.position.x = fx + (tx - fx) * openRatio;
                inner.position.y = -group.userData.foldedCenter.y;
                inner.position.z = -group.userData.foldedCenter.z;
            } else if (group.userData.shiftX) {
                inner.position.x = group.userData.shiftX * openRatio;
            }`;

const r2 = `            if (group.userData.foldedCenter && group.userData.unfoldedCenter) {
                const f = group.userData.foldedCenter;
                const u = group.userData.unfoldedCenter;
                
                const curX = f.x + (u.x - f.x) * openRatio;
                const curY = f.y + (u.y - f.y) * openRatio;
                const curZ = f.z + (u.z - f.z) * openRatio;
                
                inner.position.x = -curX;
                inner.position.y = -curY;
                inner.position.z = -curZ;
                
                if (group.userData.shiftX !== undefined) {
                    const fx = -f.x;
                    const tx = group.userData.shiftX;
                    inner.position.x = fx + (tx - fx) * openRatio;
                }
            } else if (group.userData.shiftX) {
                inner.position.x = group.userData.shiftX * openRatio;
            }`;

if (code.includes(t1)) {
    code = code.replace(t1, r1);
    console.log("Success: unfoldedCenter added");
} else { console.log("Failed: unfoldedCenter"); }

if (code.includes(t2)) {
    code = code.replace(t2, r2);
    console.log("Success: updateUnfold position updated");
} else { console.log("Failed: updateUnfold position"); }

fs.writeFileSync("shape3d_fold.js", code, "utf8");
