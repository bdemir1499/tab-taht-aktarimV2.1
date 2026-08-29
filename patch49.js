const fs = require("fs");
let html = fs.readFileSync("index.html", "utf8");

const target = `<button id="btn-close-pdf" class="pdf-close-btn hidden">
        <span>PDF</span>
    </button>`;
    
const replace = `<button id="btn-close-pdf" class="pdf-close-btn hidden" style="width: auto; padding: 0 15px;">
        <span>? Arkaplan Kapat</span>
    </button>`;

if (html.includes(target)) {
    html = html.replace(target, replace);
    html = html.replace(/app\.js\?v=\d+/g, "app.js?v=424");
    fs.writeFileSync("index.html", html, "utf8");
    console.log("Success: Button text updated");
} else {
    // try fallback
    const t2 = `<span>PDF</span>`;
    const r2 = `<span>? Resmi/PDF'i Kapat</span>`;
    // We can't safely replace just this span without risk, let's just log fail and tell user
    console.log("Failed to find exact block. Let's try simpler replace.");
    html = html.replace(target, replace);
    fs.writeFileSync("index.html", html, "utf8");
}
