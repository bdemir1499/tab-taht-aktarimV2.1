const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const target = `            const btnReject = document.getElementById('btn-conn-reject');

            btnAccept.onclick = function () {
                myConnection = conn;

                const baglantiHazir = () => {`;

const replace = `            const btnReject = document.getElementById('btn-conn-reject');
            
            // Yaris Kosulunu (Race Condition) onlemek icin open eventini onceden dinle
            let wasOpenedEarly = false;
            conn.on('open', () => { wasOpenedEarly = true; });

            btnAccept.onclick = function () {
                myConnection = conn;

                const baglantiHazir = () => {`;

if (js.includes(target) && !js.includes("wasOpenedEarly = true;")) {
    js = js.replace(target, replace);
    
    // Also patch the check inside btnAccept.onclick
    const checkTarget = `                if (conn.open) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }`;
                
    const checkReplace = `                if (conn.open || wasOpenedEarly) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }`;
                
    if (js.includes(checkTarget)) {
        js = js.replace(checkTarget, checkReplace);
    }
    
    fs.writeFileSync("app.js", js, "utf8");
    console.log("Connection race condition patched.");
} else {
    console.log("Already patched or target missing.");
}
