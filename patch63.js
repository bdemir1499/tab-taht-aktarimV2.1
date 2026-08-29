const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

const ghostRule = `

/* GHOST MODE: Cizim yaparken panelleri seffaflastirir */
body.ghost-mode .left-panel,
body.ghost-mode .right-panel {
    opacity: 0.1 !important;
    pointer-events: none !important;
    transform: scale(0.95);
}

.left-panel, .right-panel {
    transition: opacity 0.3s ease, transform 0.3s ease !important;
}
`;

if (!css.includes('ghost-mode')) {
    fs.appendFileSync("style.css", ghostRule);
    console.log("Success: Added ghost-mode CSS.");
} else {
    console.log("CSS already has ghost-mode.");
}
