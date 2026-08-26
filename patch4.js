const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

// The rotation code is currently:
// mesh.rotation.y += dx * -0.005;
// mesh.rotation.x += dy * 0.005;

const oldRot = "mesh.rotation.y += dx * -0.005;\n                                    mesh.rotation.x += dy * 0.005;";
const newRot = "mesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), dx * -0.005);\n                                    mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), dy * 0.005);";

appJs = appJs.replace(oldRot, newRot);

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('App.js patched for Gimbal Lock');
