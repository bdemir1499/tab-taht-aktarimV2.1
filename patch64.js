const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// 1. pointerdown
const pdTarget = `canvas.addEventListener('pointerdown', (e) => {
    // ?? SHRL DOKUNU 1:`;
const pdReplace = `canvas.addEventListener('pointerdown', (e) => {
    document.body.classList.add('ghost-mode');
    // ?? SHRL DOKUNU 1:`;

// 2. pointerup
const puTarget = `canvas.addEventListener('pointerup', (e) => {
    isDrawing = false;`;
const puReplace = `canvas.addEventListener('pointerup', (e) => {
    setTimeout(() => { if (!isDrawing) document.body.classList.remove('ghost-mode'); }, 300);
    isDrawing = false;`;

// 3. pointercancel
const pcTarget = `canvas.addEventListener('pointercancel', (e) => {
    // --- BUNLARI EKLE ---`;
const pcReplace = `canvas.addEventListener('pointercancel', (e) => {
    document.body.classList.remove('ghost-mode');
    // --- BUNLARI EKLE ---`;

// 4. pointerout
const poTarget = `canvas.addEventListener('pointerout', (e) => { pointers.delete(e.pointerId);`;
const poReplace = `canvas.addEventListener('pointerout', (e) => { document.body.classList.remove('ghost-mode'); pointers.delete(e.pointerId);`;

// 5. pointerleave
const plTarget = `canvas.addEventListener('pointerleave', (e) => { pointers.delete(e.pointerId);`;
const plReplace = `canvas.addEventListener('pointerleave', (e) => { document.body.classList.remove('ghost-mode'); pointers.delete(e.pointerId);`;

appJs = appJs.replace(pdTarget, pdReplace);
appJs = appJs.replace(puTarget, puReplace);
appJs = appJs.replace(pcTarget, pcReplace);
appJs = appJs.replace(poTarget, poReplace);
appJs = appJs.replace(plTarget, plReplace);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("Success: Added ghost-mode toggle logic to app.js");
