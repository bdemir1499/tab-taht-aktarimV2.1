const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const targetRot = `                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * -0.008);`;

const replaceRot = `                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (Yeşil butonla ayni yapildi)`;

if (appJs.includes(targetRot)) {
    appJs = appJs.replace(targetRot, replaceRot);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: AI rotation direction fixed.");
} else {
    console.log("Failed: Target not found");
}
