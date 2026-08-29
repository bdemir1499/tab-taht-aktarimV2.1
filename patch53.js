const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const target = `dummy.rotateOnWorldAxis(camUp, -dx * 0.008);`;
const replace = `dummy.rotateOnWorldAxis(camUp, dx * 0.008);`;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Success: Reverted dx to positive.");
} else {
    console.log("Failed: Target not found.");
}
