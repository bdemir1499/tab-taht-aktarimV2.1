const fs = require("fs");
let css = fs.readFileSync("style.css", "utf8");

const newCSS = `

/* ========================================================
   SIHIRLI CEKMECE (MOBIL RESPONSIVE) ARAYUZ KURALLARI
======================================================== */

/* Varsayilan olarak FAB butonlarini gizle (Masaustu/Tahta) */
.mobile-fab {
    display: none;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(30, 30, 46, 0.9);
    color: #00ffcc;
    border: 2px solid #00ffcc;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    z-index: 50000;
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    outline: none;
}
.left-fab { left: -10px; padding-left: 15px; border-top-left-radius: 0; border-bottom-left-radius: 0; }
.right-fab { right: -10px; padding-right: 15px; border-top-right-radius: 0; border-bottom-right-radius: 0; }

/* MOBIL VE TABLET GORUNUMU (768px alti) */
@media (max-width: 768px) {
    /* Butonlari Goster */
    .mobile-fab {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    /* Cekmece mantigi icin panellerin uste binmesi (z-index) ve disari itilmesi */
    .left-panel, .right-panel {
        z-index: 50001 !important;
        position: fixed !important;
        background-color: rgba(13, 13, 43, 0.95) !important; /* Daha mat bir arka plan */
    }

    /* Sol Paneli Ekran Disina It */
    .left-panel {
        left: 0 !important;
        transform: translateX(-120%) !important;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    }

    /* Sag Paneli Ekran Disina It */
    .right-panel {
        right: 0 !important;
        transform: translateX(120%) !important;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    }

    /* Cekmece Acildiginda Uygulanacak Sinif (Iceri Ceker) */
    .left-panel.drawer-open {
        transform: translateX(0) !important;
    }
    .right-panel.drawer-open {
        transform: translateX(0) !important;
    }

    /* Paneller acikken ekrandaki ghost modu ezmesi gerek (Görünür kalmali) */
    body.ghost-mode .left-panel.drawer-open,
    body.ghost-mode .right-panel.drawer-open {
        opacity: 1 !important;
        pointer-events: auto !important;
    }
}
`;

if (!css.includes("SIHIRLI CEKMECE")) {
    fs.appendFileSync("style.css", newCSS, "utf8");
    console.log("CSS appended.");
} else {
    console.log("CSS already exists.");
}
