const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

const t1 = `dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * -0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * -0.01);`;
const r1 = `dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);`;

const t2 = `dummy.rotateOnWorldAxis(camUp, dx * -0.005);
                                        dummy.rotateOnWorldAxis(camRight, dummy.userData.temp ? 0 : dy * 0.005);`;
const r2 = `dummy.rotateOnWorldAxis(camUp, dx * 0.005);
                                        dummy.rotateOnWorldAxis(camRight, dy * -0.005);`;

if (appJs.includes(t1)) {
    appJs = appJs.replace(t1, r1);
    console.log("Green button fixed.");
} else {
    console.log("Green button target NOT found!");
}

if (appJs.includes(t2)) {
    appJs = appJs.replace(t2, r2);
    console.log("Magic hand fixed.");
} else {
    console.log("Magic hand target NOT found!");
}

fs.writeFileSync("app.js", appJs, "utf8");
