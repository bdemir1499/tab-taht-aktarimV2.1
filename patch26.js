const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const targetScale = `                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = newScale;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }`;

const replaceScale = `                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = newScale;
                                                const now = Date.now();
                                                if (now - window.lastAISendTime > 40) {
                                                    if (typeof window.sendNetworkData === "function") {
                                                        window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                    }
                                                    window.lastAISendTime = now;
                                                }
                                            }`;

if (appJs.includes(targetScale)) {
    appJs = appJs.replace(targetScale, replaceScale);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Throttle Scale patched.");
} else {
    console.log("Failed: Target not found");
}
