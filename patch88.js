const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const target = `z-index: -9999 !important;
                }`;

const replace = target + `
                
                #app-container {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }`;

if (js.includes(target) && !js.includes("#app-container {\n                    display: block !important;")) {
    js = js.replace(target, replace);
    fs.writeFileSync("app.js", js, "utf8");
    console.log("Zirh CSS patched.");
} else {
    console.log("Already patched or target missing.");
}
