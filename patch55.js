const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const target = `dummy.rotateOnWorldAxis(camUp, dx * 0.008); 
                                        dummy.rotateOnWorldAxis(camRight, -dy * 0.008); `;

const replace = `dummy.rotateOnWorldAxis(camUp, dx * 0.008); 
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); `;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Reverted dy to positive.");
} else {
    // fallback
    const t2 = `dummy.rotateOnWorldAxis(camRight, -dy * 0.008);`;
    const r2 = `dummy.rotateOnWorldAxis(camRight, dy * 0.008);`;
    if (appJs.includes(t2)) {
        appJs = appJs.replace(t2, r2);
        fs.writeFileSync("app.js", appJs, "utf8");
        console.log("Success: Reverted dy to positive via fallback.");
    } else {
        console.log("Failed: Target not found.");
    }
}
