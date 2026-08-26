
const fs = require("fs");
let appJs = fs.readFileSync("shape3d_fold.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

const block1Old = `        // ekil kapalyken Z ekseni boyunca uzansn (bylece XY dzleminde dik durur)
        group.rotation.x = Math.PI / 2;

        const outerGroup = new THREE.Group();
        outerGroup.userData = group.userData;
        outerGroup.userData.innerGroup = group; //  grubu sakla ki rotasyonu ntrleyebilelim
        if (type.startsWith("prism_")) {
            outerGroup.userData.shiftX = group.userData.shiftX;
        }
        outerGroup.add(group);

        return outerGroup;
    },`;

const block1New = `        // Sekil kapaliyken Z ekseni boyunca uzansin (boylece XY duzleminde dik durur)
        group.rotation.x = Math.PI / 2;

        const outerGroup = new THREE.Group();
        outerGroup.userData = group.userData;
        outerGroup.userData.innerGroup = group; // I grubu sakla ki rotasyonu notrleyebilelim
        if (type.startsWith("prism_")) {
            outerGroup.userData.shiftX = group.userData.shiftX;
        }

        // ==========================================
        // DYNAMIC PIVOT CENTERING (Orbit / Savrulma Fix)
        // ==========================================
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        group.userData.foldedCenter = center.clone();
        
        // Kapali formda seklin merkezini (0,0,0) noktasina al
        group.position.set(-center.x, -center.y, -center.z);
        // ==========================================

        outerGroup.add(group);

        return outerGroup;
    },`;


const block2Old = `            // Prizmalarn anm yana doYru uzadY iin, aldka Yekli ortala
            if (group.userData.shiftX) {
                inner.position.x = group.userData.shiftX * openRatio;
            }
        }
    }
};`;

const block2New = `            // Prizmalarin acinimi yana dogru uzadigi icin, acildikca sekli ortala
            // Ayni zamanda Y ve Z eksenlerinde de rotasyon savrulmasini onlemek icin hep merkezde tut
            if (group.userData.foldedCenter) {
                const fx = -group.userData.foldedCenter.x;
                const tx = group.userData.shiftX !== undefined ? group.userData.shiftX : fx;
                
                inner.position.x = fx + (tx - fx) * openRatio;
                inner.position.y = -group.userData.foldedCenter.y;
                inner.position.z = -group.userData.foldedCenter.z;
            } else if (group.userData.shiftX) {
                inner.position.x = group.userData.shiftX * openRatio;
            }
        }
    }
};`;

// We use generic indexOf to bypass Turkish character encoding mismatches
let success = false;
let finalJs = appJs;

const target1Index = finalJs.indexOf("group.rotation.x = Math.PI / 2;");
const end1Index = finalJs.indexOf("return outerGroup;", target1Index);
if(target1Index > -1 && end1Index > -1) {
    // wait, we need the exact block
    const pre = finalJs.substring(0, target1Index);
    const post = finalJs.substring(end1Index + 18);
    const mid = `group.rotation.x = Math.PI / 2;

        const outerGroup = new THREE.Group();
        outerGroup.userData = group.userData;
        outerGroup.userData.innerGroup = group; 
        if (type.startsWith("prism_")) {
            outerGroup.userData.shiftX = group.userData.shiftX;
        }

        // ==========================================
        // DYNAMIC PIVOT CENTERING (Orbit / Savrulma Fix)
        // ==========================================
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        group.userData.foldedCenter = center.clone();
        
        group.position.set(-center.x, -center.y, -center.z);
        // ==========================================

        outerGroup.add(group);

        return outerGroup;`;
    finalJs = pre + mid + post;
    success = true;
}

const target2Index = finalJs.indexOf("if (group.userData.shiftX) {\n                inner.position.x = group.userData.shiftX * openRatio;\n            }");
if(target2Index > -1) {
    const pre = finalJs.substring(0, target2Index);
    const post = finalJs.substring(target2Index + 115); // approximate length
    // Actually just replace the block exactly
    const toReplace = "if (group.userData.shiftX) {\n                inner.position.x = group.userData.shiftX * openRatio;\n            }";
    finalJs = finalJs.replace(toReplace, `// Pivot merkezleme (Savrulma onleyici)
            if (group.userData.foldedCenter) {
                const fx = -group.userData.foldedCenter.x;
                const tx = group.userData.shiftX !== undefined ? group.userData.shiftX : fx;
                
                inner.position.x = fx + (tx - fx) * openRatio;
                inner.position.y = -group.userData.foldedCenter.y;
                inner.position.z = -group.userData.foldedCenter.z;
            } else if (group.userData.shiftX) {
                inner.position.x = group.userData.shiftX * openRatio;
            }`);
}

fs.writeFileSync("shape3d_fold.js", finalJs, "utf8");
console.log("Patched Foldable3D pivot!");

