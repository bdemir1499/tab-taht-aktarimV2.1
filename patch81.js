const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

// Onceki hatali patch'i temizle
css = css.replace(/max-height: 85vh !important;/g, "");

// Yeni dogru CSS blogunu hazirla
const newCSS = `

    /* MOBILDE PANELLERIN EKRANA TAM SIGMASI (URL CUBUGU HATASI COZUMU) */
    .left-panel, .right-panel {
        top: 10px !important;
        bottom: 10px !important;
        height: auto !important;
        max-height: none !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
    }
    
    .left-panel {
        transform: translateX(-120%) !important;
    }
    
    .right-panel {
        transform: translateX(120%) !important;
    }
    
    .left-panel.drawer-open, .right-panel.drawer-open {
        transform: translateX(0) !important;
    }
`;

const target = `    /* Mobilde alt menuler`;

if (css.includes(target) && !css.includes("MOBILDE PANELLERIN EKRANA TAM SIGMASI")) {
    css = css.replace(target, newCSS + "\n" + target);
    fs.writeFileSync("style.css", css, "utf8");
    console.log("Mobile fixed height patch applied.");
} else {
    console.log("Target not found or already applied.");
}
