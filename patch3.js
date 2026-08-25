const fs = require('fs');
let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Invisible video
appJs = appJs.replace("videoElement.style.opacity = '0.15';", "videoElement.style.opacity = '0.001'; videoElement.setAttribute('webkit-playsinline', 'true');");

// 2. Smooth laser cursor CSS
appJs = appJs.replace("laserCursor.style.pointerEvents = 'none';", "laserCursor.style.pointerEvents = 'none';\nlaserCursor.style.transition = 'left 0.1s ease-out, top 0.1s ease-out, background-color 0.2s';\nlaserCursor.style.willChange = 'left, top';");

// 3. Swap the logics for two hands
// Find the block for isPinched1 && isPinched2
const pinchBlockStart = "if (isPinched1 && isPinched2) {";
const openBlockStart = "else if (!isPinched1 && !isPinched2) {";
const singleHandBlockStart = "else {\n                            startScaleDistance = 0;";

// It's easier to just use string replace for the specific comments and swapping logic.
// Original pinch block (was SCALE, needs to be UNFOLD)
// Original open block (was UNFOLD, needs to be SCALE)
// Let's replace the comments first, then variables.
// Actually, I can just replace the IF condition!
// Change "if (isPinched1 && isPinched2) {" to "if (!isPinched1 && !isPinched2) {" 
// Change "else if (!isPinched1 && !isPinched2) {" to "else if (isPinched1 && isPinched2) {"
appJs = appJs.replace("if (isPinched1 && isPinched2) {", "if (isPinched1 === 'SWAP') {"); // temp
appJs = appJs.replace("else if (!isPinched1 && !isPinched2) {", "else if (isPinched1 && isPinched2) {");
appJs = appJs.replace("if (isPinched1 === 'SWAP') {", "if (!isPinched1 && !isPinched2) {");

// Wait, if I just swap the IF conditions, the internal logic stays exactly the same, which is perfect!
// The block that originally did SCALE (under the first IF) will now trigger when OPEN (!isPinched).
// The block that originally did UNFOLD (under the else IF) will now trigger when PINCHED.

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('App.js patched for Tony Stark smoothness');
