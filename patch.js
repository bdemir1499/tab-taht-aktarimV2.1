const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// 1. locateFile -> CDN
content = content.replace(/locateFile: \(file\) => \{\s*let baseUrl[\s\S]*?return baseUrl \+ 'mediapipe\/' \+ file;\s*\}/, "locateFile: (file) => 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/' + file");

// 2. modelComplexity 0
content = content.replace('modelComplexity: 1,', 'modelComplexity: 0,');

// 3. videoElement opacity and transform
content = content.replace("videoElement.style.opacity = '0.01';", "videoElement.style.opacity = '0.15'; videoElement.style.transform = 'scaleX(-1)';");

// 4. Debug text in onResults
content = content.replace("hands.onResults((results) => {\n              if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {", "hands.onResults((results) => {\n              tonyBtn.innerHTML = 'AI Aktif';\n              if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {\n                  tonyBtn.innerHTML = 'El Göründü!';");

// 5. Auto-target mesh
const oldMeshCheck = "if (window.Scene3D && window.Scene3D.currentMesh) {\n                      const mesh = window.Scene3D.currentMesh;";
const newMeshCheck = "if (window.Scene3D) {\n                      let mesh = window.Scene3D.currentMesh;\n                      if (!mesh && window.Scene3D.scene) {\n                          mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userData && m.userData.strokeData);\n                      }\n                      if (mesh) {";
content = content.replace(oldMeshCheck, newMeshCheck);

// 6. Close the if (mesh) brace
const oldEndBlock = "startX = 0;\n                              startY = 0;\n                          }\n                      }\n                  }\n              } else {";
const newEndBlock = "startX = 0;\n                              startY = 0;\n                          }\n                      }\n                      } // close if (mesh)\n                  }\n              } else {";
content = content.replace(oldEndBlock, newEndBlock);

// 7. Invert rotation Y
content = content.replace("mesh.rotation.y += dx * 0.005;", "mesh.rotation.y += dx * -0.005;");

fs.writeFileSync('app.js', content, 'utf8');
console.log('Patched app.js successfully');
