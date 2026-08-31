const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const t1 = `function paketGonder() {
                if (!myConnection || !myConnection.open) return;`;
const r1 = `function paketGonder() {
                if (!myConnection || (!myConnection.open && !window.isConnected)) return;`;

const t2 = `function paketGonderTahta() {
                        if (!conn || !conn.open) return;`;
const r2 = `function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;`;

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
    console.log("Chunked transfer connection constraint relaxed.");
} else {
    console.log("Target not found.");
}
