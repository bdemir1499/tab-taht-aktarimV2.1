const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

const newCSS = `

    /* Mobilde Panel Iceriginin Sigmamasi Sorununu Coz (Kaydirilabilir Yap) */
    .left-panel, .right-panel {
        max-height: 85vh !important; /* Ekranin asagisindan tasma yapmasin */
        overflow-y: auto !important; /* Tasan kisimlar icin dikey kaydirma cubugu */
        overflow-x: hidden !important;
    }

    /* Mobilde alt menuler (Cizgi, Cokgenler) saga dogru degil, ASAGI dogru acilsin!
       Cunku saga dogru acilirsa overflow:auto yuzunden kesilir. */
    #line-options, #polygon-options, #snapshot-options, #oyunlar-options {
        position: relative !important; /* Diger butonlari asagi iter */
        left: 0 !important;
        top: 0 !important;
        margin-left: 0 !important;
        margin-top: 5px !important;
        width: 100% !important;
        box-sizing: border-box !important;
    }
`;

// Sadece mobil css bloğunun icine atmak daha dogru olur ama globaldeki max-width css icinde ezileceği icin !important ile eklemek yeterli.
// Zaten bu kurallari style.css dosyasinin en sonundaki mobil media query bloğunun icine eklemeliyiz.

const target = `    body.ghost-mode .right-panel.drawer-open {
        opacity: 1 !important;
        pointer-events: auto !important;
    }`;

const replace = target + newCSS;

if (css.includes(target) && !css.includes("max-height: 85vh")) {
    css = css.replace(target, replace);
    fs.writeFileSync("style.css", css, "utf8");
    console.log("Mobile scroll fix applied.");
} else {
    console.log("Target not found or already applied.");
}
