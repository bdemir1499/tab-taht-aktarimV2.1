const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

let patched = false;

if (js.match(/function paketGonder\(\)\s*\{\s*if \(!myConnection \|\| !myConnection\.open\) return;/)) {
    js = js.replace(/function paketGonder\(\)\s*\{\s*if \(!myConnection \|\| !myConnection\.open\) return;/, 
        "function paketGonder() { if (!myConnection || (!myConnection.open && !window.isConnected)) return;");
    patched = true;
}

if (js.match(/function paketGonderTahta\(\)\s*\{\s*if \(!conn \|\| !conn\.open\) return;/)) {
    js = js.replace(/function paketGonderTahta\(\)\s*\{\s*if \(!conn \|\| !conn\.open\) return;/, 
        "function paketGonderTahta() { if (!conn || (!conn.open && !window.isConnected)) return;");
    patched = true;
}

if (patched) {
    fs.writeFileSync("app.js", js, "utf8");
    console.log("Chunked transfer connection constraint relaxed via regex.");
} else {
    console.log("Target not found with regex.");
}
