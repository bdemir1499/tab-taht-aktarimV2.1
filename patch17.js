const fs = require("fs");
let indexHtml = fs.readFileSync("index.html", "utf8");

indexHtml = indexHtml.replace(/app\.js\?v=\d+/g, "app.js?v=400");
indexHtml = indexHtml.replace(/shape3d_fold\.js\?v=\d+/g, "shape3d_fold.js?v=400");
indexHtml = indexHtml.replace(/cokgen\.js\?v=\d+/g, "cokgen.js?v=400");
indexHtml = indexHtml.replace(/oyunlar\.js\?v=\d+/g, "oyunlar.js?v=400");
indexHtml = indexHtml.replace(/ruler\.js\?v=\d+/g, "ruler.js?v=400");
indexHtml = indexHtml.replace(/gonye\.js\?v=\d+/g, "gonye.js?v=400");
indexHtml = indexHtml.replace(/aciolcer\.js\?v=\d+/g, "aciolcer.js?v=400");
indexHtml = indexHtml.replace(/pergel\.js\?v=\d+/g, "pergel.js?v=400");

fs.writeFileSync("index.html", indexHtml, "utf8");
console.log("Successfully updated cache busters in index.html");
