const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

// --- FIX 1: INVERT Y ROTATION FOR SINGLE HAND PINCH ---
// Currently: mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * 0.005);
// We will change it to: mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * -0.005);

const targetRot = "mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * 0.005);";
const replaceRot = "mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * -0.005); // YON DUZELTME";

if (appJs.includes(targetRot)) {
    appJs = appJs.replace(targetRot, replaceRot);
    console.log("Fixed Y rotation inversion.");
} else {
    console.log("Could not find Y rotation target! Trying regex...");
    appJs = appJs.replace(/dy \* 0\.005/g, "dy * -0.005");
}

// --- FIX 2: MAGNETIC SNAPPING FOR OPEN RATIO (JITTER FIX) ---
// Find the exact block in Two-Hand Pinch:
/*
let ratioChange = distDiff * 1.5; 
let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
const sInput = document.getElementById("shape-slider");
*/
const targetRatio = `let ratioChange = distDiff * 1.5; 
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));`;
                                            
const replaceRatio = `let ratioChange = distDiff * 1.5; 
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Gecislerde (cimdik birakirken) ellerin 
                                            // istemsizce birkac santim oynamasinin sekli bozmasini tamamen onler.
                                            if (newRatio > 0.90) newRatio = 1.0;
                                            if (newRatio < 0.10) newRatio = 0.0;`;

if (appJs.includes(targetRatio)) {
    appJs = appJs.replace(targetRatio, replaceRatio);
    console.log("Fixed Unfold jitter with magnetic snapping.");
} else {
    console.log("Could not find Unfold ratio block!");
    // Wait, the indent might differ. Let's do a more robust replace.
    const re = /let newRatio = Math\.max\(0, Math\.min\(1, startOpenRatio \+ ratioChange\)\);/;
    appJs = appJs.replace(re, `let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));\n                                            if (newRatio > 0.90) newRatio = 1.0;\n                                            if (newRatio < 0.10) newRatio = 0.0;`);
}

fs.writeFileSync("app.js", appJs, "utf8");
console.log("All fixes applied successfully.");
