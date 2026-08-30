const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const target = `    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu Hatası!"; 
        alert("Ücretsiz Sunucuya (PeerJS) şu an ulaşılamıyor. Lütfen sayfayı 1 dakika sonra yenileyin. Hata: " + err.type); 
    });`;

const replace = `    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu Hatası!"; 
        console.warn("PeerJS Arka Plan Hatası (Gözardı edilebilir): " + err.type); 
    });`;

if (js.includes(target) && !js.includes("PeerJS Arka Plan Hatası")) {
    js = js.replace(target, replace);
    fs.writeFileSync("app.js", js, "utf8");
    console.log("PeerJS error alert replaced with console.warn.");
} else {
    console.log("Already patched or target missing. Trying regex fallback...");
    js = js.replace(/alert\("Ücretsiz Sunucuya \(PeerJS\) şu an ulaşılamıyor[^;]*;\s*/g, 'console.warn("PeerJS Arka Plan Hatası (Gözardı edilebilir): " + err.type);\n');
    fs.writeFileSync("app.js", js, "utf8");
    console.log("Regex fallback applied.");
}
