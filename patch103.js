const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

const t1 = `            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };`;
    
const r1 = `            reader.readAsDataURL(file);
        }
        // Resim/Dosya islenmeden value'yu temizlemek mobil tarayicilarda File objesinin silinmesine (GC) neden olur!
        setTimeout(() => { e.target.value = ''; }, 2000); 
    };`;

if (js.includes(t1)) {
    js = js.replace(t1, r1);
    fs.writeFileSync("app.js", js, "utf8");
    console.log("e.target.value race condition patched.");
} else {
    console.log("Target not found.");
}
