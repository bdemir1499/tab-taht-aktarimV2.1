const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

// PC Zirhina app-containeri görünür yapma kurali ekleyelim
const targetZirh = `                .modal, .overlay, #conn-request-modal {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }`;

const replaceZirh = targetZirh + `\n                
                #app-container {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }`;

if (js.includes(targetZirh) && !js.includes("#app-container {\n                    display: block !important;")) {
    js = js.replace(targetZirh, replaceZirh);
    console.log("Zirh CSS patched.");
}

// JS icinde de dogrudan app-container'i acalim
const targetJS = `            ['language-overlay', 'disclaimer-modal', 'footer-container', 'network-panel', 'connect-panel', 'start-screen'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });`;

const replaceJS = targetJS + `\n            
            const appCont = document.getElementById('app-container');
            if (appCont) appCont.style.display = 'block';`;

if (js.includes(targetJS) && !js.includes("appCont.style.display = 'block';")) {
    js = js.replace(targetJS, replaceJS);
    console.log("JS display block patched.");
}

fs.writeFileSync("app.js", js, "utf8");
console.log("app.js updated.");
