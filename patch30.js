const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// Tweak Slerp and Lerp in Scene3D.animate
const targetAnimate = `                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.15);
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.2);
                    }`;

const replaceAnimate = `                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.40); // 0.15'den 0.40'a cikarildi (Aninda tepki)
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.45); // 0.2'den 0.45'e cikarildi (Aninda yapisma)
                    }`;

// Tweak Rotation Sensitivity (Optional, let's just make it slightly faster just in case)
const targetRot = `                                        dummy.rotateOnWorldAxis(camUp, dx * 0.005);
                                        dummy.rotateOnWorldAxis(camRight, dy * -0.005);`;

const replaceRot = `                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * -0.008);`;

if (appJs.includes(targetAnimate)) {
    appJs = appJs.replace(targetAnimate, replaceAnimate);
    if (appJs.includes(targetRot)) {
        appJs = appJs.replace(targetRot, replaceRot);
    }
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Tweaked responsiveness (lerp/slerp factors).");
} else {
    console.log("Failed: Target not found");
}
