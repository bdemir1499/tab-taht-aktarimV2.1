const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const t1 = `if (typeof myConnection !== 'undefined' && myConnection && myConnection.open) {`;
const r1 = `if (typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {`;

const t2 = `if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && myConnection.open) {`;
const r2 = `if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {`;

let patched = false;
if (js.includes(t1)) {
    js = js.replace(t1, r1);
    patched = true;
}
if (js.includes(t2)) {
    js = js.replace(t2, r2);
    patched = true;
}

if (patched) {
    fs.writeFileSync("app.js", js, "utf8");
    console.log("sendNetworkData constraints relaxed.");
} else {
    console.log("Targets not found.");
}
