const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");
appJs = appJs.replace(/\r\n/g, "\n");

const target = `                                        mesh.rotation.y += dx * -0.005;
                                        mesh.rotation.x += dy * -0.005;`;
                                        
const replace = `                                        // Gimbal Lock Fix + Y Eksen Invert
                                        mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * -0.005);
                                        mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * -0.005);`;

if (appJs.includes(target)) {
    appJs = appJs.replace(target, replace);
    fs.writeFileSync("app.js", appJs, "utf8");
    console.log("Successfully restored Gimbal Lock fix and kept inverted Y axis.");
} else {
    console.log("Could not find Gimbal Lock target!");
}
