const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const target = `                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (Yeil butonla ayni yapildi)`;

const replace = `                                        dummy.rotateOnWorldAxis(camUp, -dx * 0.008); 
                                        dummy.rotateOnWorldAxis(camRight, -dy * 0.008); `;

const targetFallback = `dummy.rotateOnWorldAxis(camUp, dx * 0.008);`;
const replaceFallback = `dummy.rotateOnWorldAxis(camUp, -dx * 0.008);`;
const targetFallback2 = `dummy.rotateOnWorldAxis(camRight, dy * 0.008);`;
const replaceFallback2 = `dummy.rotateOnWorldAxis(camRight, -dy * 0.008);`;

let success = false;
if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    success = true;
} else if (appJs.includes(targetFallback)) {
    appJs = appJs.replace(targetFallback, replaceFallback);
    appJs = appJs.replace(targetFallback2, replaceFallback2);
    success = true;
}

if (success) {
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Magic hand directions inverted.");
} else {
    console.log("Failed: Could not find exact string to replace.");
}
