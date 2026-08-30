const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const newJS = `

// ========================================================
// SIHIRLI CEKMECE (MOBIL RESPONSIVE) ETKILESIMLERI
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const leftFab = document.getElementById('mobile-drawer-left');
    const rightFab = document.getElementById('mobile-drawer-right');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const canvas = document.getElementById('drawing-canvas');

    if (leftFab && leftPanel) {
        // Dokunmatik cihazlarda cift tiklamayi onlemek icin sadece tek click kullan
        leftFab.addEventListener('click', (e) => {
            e.stopPropagation(); // Tuvale dokunmus sayilmamasi icin
            leftPanel.classList.toggle('drawer-open');
            if(rightPanel) rightPanel.classList.remove('drawer-open'); // Digerini kapat
        });
    }

    if (rightFab && rightPanel) {
        rightFab.addEventListener('click', (e) => {
            e.stopPropagation();
            rightPanel.classList.toggle('drawer-open');
            if(leftPanel) leftPanel.classList.remove('drawer-open');
        });
    }

    // Tuvale (Ekrana) dokunuldugunda cekmeceleri otomatik kapat
    if (canvas) {
        canvas.addEventListener('pointerdown', () => {
            if (window.innerWidth <= 768) {
                if(leftPanel && leftPanel.classList.contains('drawer-open')) {
                    leftPanel.classList.remove('drawer-open');
                }
                if(rightPanel && rightPanel.classList.contains('drawer-open')) {
                    rightPanel.classList.remove('drawer-open');
                }
            }
        });
    }
});
`;

if (!js.includes("SIHIRLI CEKMECE (MOBIL RESPONSIVE) ETKILESIMLERI")) {
    fs.appendFileSync("app.js", newJS, "utf8");
    console.log("JS appended.");
} else {
    console.log("JS already exists.");
}
