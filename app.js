// ğŸš¨ ALAN ADI KÄ°LÄ°DÄ° (DOMAIN BINDING) ğŸš¨
// Sadece bdemir1499.github.io adresinde, EBA sunucularÄ±nda ve yerel bilgisayarda Ã§alÄ±ÅŸÄ±r!
const gecerliAdresler = ["bdemir1499.github.io", "127.0.0.1", "localhost", "eba.gov.tr"];
const mevcutAdres = window.location.hostname;

const kacakKullanimMi = !gecerliAdresler.some(adres => mevcutAdres.includes(adres));

if (kacakKullanimMi && mevcutAdres !== "") {
    document.body.innerHTML = "<div style='color:red; text-align:center; margin-top:50px; font-family:sans-serif; font-size:20px; font-weight:bold;'>â›” GÃœVENLÄ°K Ä°HLALÄ°: Bu yazÄ±lÄ±m kopyalanmÄ±ÅŸtÄ±r. LÃ¼tfen orijinal adresi kullanÄ±n.</div>";
    throw new Error("Korsan kullanÄ±m tespit edildi, sistem durduruldu!");
}

// ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: AkÄ±llÄ± tahtalarda kayÄ±p resim (X_X yÃ¼z) Ã§Ã¶kmesini TAMAMEN engeller ğŸš¨
const cursorFix = document.createElement('style');
cursorFix.innerHTML = `
    /* SADECE KANVASTA DEÄÄ°L, BÃœTÃœN EKRANDA ZOMBÄ° Ä°MLEÃ‡LERÄ° KÃ–KÃœNDEN YASAKLA! */
    body.cursor-eraser { cursor: none !important; }
    body.cursor-pen { cursor: crosshair !important; }
    body.cursor-snapshot { cursor: crosshair !important; }

    /* Ã‡izim tahtasÄ± Ã¼zerinde de kesin yasak (Ã‡ifte gÃ¼venlik) */
    body.cursor-eraser #drawing-canvas { cursor: none !important; }
    body.cursor-pen #drawing-canvas { cursor: crosshair !important; }
    body.cursor-snapshot #drawing-canvas { cursor: crosshair !important; }

    /* MenÃ¼lerin, panellerin ve butonlarÄ±n Ã¼zerinde her zaman normal ok/parmak iÅŸareti Ã§Ä±ksÄ±n! */
    .panel, .panel *, button, .tool-button, .tool-button-sub { 
        cursor: pointer !important; 
    }
`;
document.head.appendChild(cursorFix);



// ArtÄ±k sabit bir MY_SECRET_KEY yok, Ã¶ÄŸretmen her ders ÅŸifreyi belirleyecek
window.sessionPassword = "";

// --- DÄ°L SÃ–ZLÃœÄÃœ ---
let currentLang = 'tr'; // VarsayÄ±lan dil

const translations = {
    tr: { yukle: "ğŸ“ Dosya YÃ¼kle", silgi: "Silgi", kalem: "Kalem", cizgi: "Ã‡izgi", nokta: "Nokta", d_cizgi: "DÃ¼z Ã‡izgi", dogru: "DoÄŸru", dogru_parcasi: "DoÄŸru ParÃ§asÄ±", isin: "IÅŸÄ±n", cetvel: "Cetvel", gonye: "GÃ¶nye", aciolcer: "AÃ§Ä± Ã–lÃ§er", pergel: "Pergel", cokgenler: "Ã‡okgenler", cember: "Ã‡ember", d_ucgen: "DÃ¼zgÃ¼n 3gen", d_dortgen: "DÃ¼zgÃ¼n 4gen", dikdortgen: "DikdÃ¶rtgen", d_besgen: "DÃ¼zgÃ¼n 5gen", d_altigen: "DÃ¼zgÃ¼n 6gen", d_yedigen: "DÃ¼zgÃ¼n 7gen", d_sekizgen: "DÃ¼zgÃ¼n 8gen", oyunlar: "Oyunlar", arac_rengi: "AraÃ§ Rengi", geri_al: "Geri Al", hepsini_sil: "Hepsini Sil", tasi: "TaÅŸÄ±", canlandir: "CanlandÄ±r âœ‚ï¸", kutu: "Kutu", serbest: "Serbest", yardim: "Video YardÄ±m", ins_t: "UygulamayÄ± YÃ¼kle", ins_d: "Daha iyi performans iÃ§in uygulamayÄ± yÃ¼kle.", ins_b: "YÃ¼kle", ins_c: "Kapat", vid_cetvel: "Cetvel KullanÄ±mÄ±", vid_gonye: "GÃ¶nye KullanÄ±mÄ±", vid_aciolcer: "AÃ§Ä± Ã–lÃ§er KullanÄ±mÄ±", vid_pergel: "Pergel KullanÄ±mÄ±", vid_canlandir: "CanlandÄ±rma (Kopyalama)", vid_cizgi: "Ã‡izgi MenÃ¼sÃ¼ KullanÄ±mÄ±", vid_cokgenler: "Ã‡okgenler", vid_kalem: "Kalem", vid_kitap: "Kitap ve Resim YÃ¼kleme", vid_oyunlar: "Oyunlar", pdf_soru: "Bu PDF {0} sayfadÄ±r. KaÃ§Ä±ncÄ± sayfadan devam etmek istersiniz?", kvkk: "Bu uygulama hiÃ§bir kiÅŸisel veri toplamaz ve dosyalarÄ±nÄ±zÄ± sunuculara yÃ¼klemez." },

    en: { yukle: "Upload Image/PDF", silgi: "Eraser", kalem: "Pen", cizgi: "Line", nokta: "Point", d_cizgi: "Straight Line", dogru: "Line", dogru_parcasi: "Segment", isin: "Ray", cetvel: "Ruler", gonye: "Set Square", aciolcer: "Protractor", pergel: "Compass", cokgenler: "Polygons", cember: "Circle", d_ucgen: "Regular Triangle", d_dortgen: "Square", dikdortgen: "Rectangle", d_besgen: "Pentagon", d_altigen: "Hexagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Games", arac_rengi: "Tool Color", geri_al: "Undo", hepsini_sil: "Clear All", tasi: "Move", canlandir: "Animate âœ‚ï¸", kutu: "Box", serbest: "Free", yardim: "Video Help", ins_t: "Install App", ins_d: "Install app for better performance.", ins_b: "Install", ins_c: "Close", vid_cetvel: "Ruler Usage", vid_gonye: "Set Square Usage", vid_aciolcer: "Protractor Usage", vid_pergel: "Compass Usage", vid_canlandir: "Animation (Copy)", vid_cizgi: "Line Menu Usage", vid_cokgenler: "Polygons", vid_kalem: "Pen", vid_kitap: "Load Book and Image", vid_oyunlar: "Games", pdf_soru: "This PDF has {0} pages. Which page would you like to continue from?", kvkk: "This application does not collect any personal data and does not upload your files to servers." },

    de: { yukle: "Bild/PDF hochladen", silgi: "Radierer", kalem: "Stift", cizgi: "Linie", nokta: "Punkt", d_cizgi: "Gerade", dogru: "Gerade", dogru_parcasi: "Strecke", isin: "Strahl", cetvel: "Lineal", gonye: "Geodreieck", aciolcer: "Winkelmesser", pergel: "Zirkel", cokgenler: "Polygone", cember: "Kreis", d_ucgen: "Dreieck", d_dortgen: "Quadrat", dikdortgen: "Rechteck", d_besgen: "FÃ¼nfeck", d_altigen: "Sechseck", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Spiele", arac_rengi: "Farbe", geri_al: "RÃ¼ckgÃ¤ngig", hepsini_sil: "LÃ¶schen", tasi: "Bewegen", canlandir: "Animieren", kutu: "Box", serbest: "Frei", yardim: "Hilfe", ins_t: "App installieren", ins_d: "Installieren fÃ¼r bessere Leistung.", ins_b: "Installieren", ins_c: "SchlieÃŸen", vid_cetvel: "Lineal verwenden", vid_gonye: "Geodreieck verwenden", vid_aciolcer: "Winkelmesser verwenden", vid_pergel: "Zirkel verwenden", vid_canlandir: "Animation (Kopieren)", vid_cizgi: "LinienmenÃ¼ verwenden", vid_cokgenler: "Vielecke", vid_kalem: "Stift", vid_kitap: "Buch und Bild laden", vid_oyunlar: "Spiele", pdf_soru: "Dieses PDF hat {0} Seiten. Auf welcher Seite mÃ¶chten Sie fortfahren?", kvkk: "Diese Anwendung sammelt keine personenbezogenen Daten und lÃ¤dt Ihre Dateien nicht auf Server hoch." },

    ar: { yukle: "ØªØ­Ù…ÙŠÙ„ Ù…Ù„Ù", silgi: "Ù…Ù…Ø­Ø§Ø©", kalem: "Ù‚Ù„Ù…", cizgi: "Ø®Ø·", nokta: "Ù†Ù‚Ø·Ø©", d_cizgi: "Ø®Ø· Ù…Ø³ØªÙ‚ÙŠÙ…", dogru: "Ù…Ø³ØªÙ‚ÙŠÙ…", dogru_parcasi: "Ù‚Ø·Ø¹Ø©", isin: "Ø´Ø¹Ø§Ø¹", cetvel: "Ù…Ø³Ø·Ø±Ø©", gonye: "Ù…Ø«Ù„Ø«", aciolcer: "Ù…Ù†Ù‚Ù„Ø©", pergel: "ÙØ±Ø¬Ø§Ø±", cokgenler: "Ù…Ø¶Ù„Ø¹Ø§Øª", cember: "Ø¯Ø§Ø¦Ø±Ø©", d_ucgen: "Ù…Ø«Ù„Ø« Ù…Ù†ØªØ¸Ù…", d_dortgen: "Ù…Ø±Ø¨Ø¹", dikdortgen: "Ù…Ø³ØªØ·ÙŠÙ„", d_besgen: "Ù…Ø®Ù…Ø³", d_altigen: "Ù…Ø³Ø¯Ø³", d_yedigen: "Ù…Ø³Ø¨Ø¹", d_sekizgen: "Ù…Ø«Ù…Ù†", oyunlar: "Ø£Ù„Ø¹Ø§Ø¨", arac_rengi: "Ø§Ù„Ù„ÙˆÙ†", geri_al: "ØªØ±Ø§Ø¬Ø¹", hepsini_sil: "Ù…Ø³Ø­", tasi: "ØªØ­Ø±ÙŠÙƒ", canlandir: "ØªØ­Ø±ÙŠÙƒ", kutu: "ØµÙ†Ø¯ÙˆÙ‚", serbest: "Ø­Ø±", yardim: "Ù…Ø³Ø§Ø¹Ø¯Ø©", ins_t: "ØªØ«Ø¨ÙŠØª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚", ins_d: "Ø«Ø¨Øª Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù„Ø£Ø¯Ø§Ø¡ Ø£ÙØ¶Ù„.", ins_b: "ØªØ«Ø¨ÙŠØª", ins_c: "Ø¥ØºÙ„Ø§Ù‚", vid_cetvel: "Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù…Ø³Ø·Ø±Ø©", vid_gonye: "Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù…Ø«Ù„Ø«", vid_aciolcer: "Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù…Ù†Ù‚Ù„Ø©", vid_pergel: "Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„ÙØ±Ø¬Ø§Ø±", vid_canlandir: "Ø±Ø³ÙˆÙ… Ù…ØªØ­Ø±ÙƒØ© (Ù†Ø³Ø®)", vid_cizgi: "Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø®Ø·ÙˆØ·", vid_cokgenler: "Ù…Ø¶Ù„Ø¹Ø§Øª", vid_kalem: "Ù‚Ù„Ù…", vid_kitap: "ØªØ­Ù…ÙŠÙ„ ÙƒØªØ§Ø¨ ÙˆØµÙˆØ±Ø©", vid_oyunlar: "Ø£Ù„Ø¹Ø§Ø¨", pdf_soru: "ÙŠØ­ØªÙˆÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù…Ù„Ù Ø¹Ù„Ù‰ {0} ØµÙØ­Ø©. Ù…Ù† Ø£ÙŠ ØµÙØ­Ø© ØªØ±ÙŠØ¯ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©ØŸ", kvkk: "Ù„Ø§ ÙŠØ¬Ù…Ø¹ Ù‡Ø°Ø§ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø£ÙŠ Ø¨ÙŠØ§Ù†Ø§Øª Ø´Ø®ØµÙŠØ© ÙˆÙ„Ø§ ÙŠØ±ÙØ¹ Ù…Ù„ÙØ§ØªÙƒ Ø¥Ù„Ù‰ Ø§Ù„Ø®ÙˆØ§Ø¯Ù…." },

    hi: { yukle: "à¤«à¤¼à¤¾à¤‡à¤² à¤…à¤ªà¤²à¥‹à¤¡", silgi: "à¤‡à¤°à¥‡à¤œà¤¼à¤°", kalem: "à¤ªà¥‡à¤¨", cizgi: "à¤°à¥‡à¤–à¤¾", nokta: "à¤¬à¤¿à¤‚à¤¦à¥", d_cizgi: "à¤¸à¥€à¤§à¥€ à¤°à¥‡à¤–à¤¾", dogru: "à¤°à¥‡à¤–à¤¾", dogru_parcasi: "à¤–à¤‚à¤¡", isin: "à¤•à¤¿à¤°à¤£", cetvel: "à¤ªà¥ˆà¤®à¤¾à¤¨à¤¾", gonye: "à¤—à¥à¤¨à¤¿à¤¯à¤¾", aciolcer: "à¤šà¤¾à¤‚à¤¦à¤¾", pergel: "à¤ªà¤°à¤•à¤¾à¤°", cokgenler: "à¤¬à¤¹à¥à¤­à¥à¤œ", cember: "à¤µà¥ƒà¤¤à¥à¤¤", d_ucgen: "à¤¤à¥à¤°à¤¿à¤­à¥à¤œ", d_dortgen: "à¤µà¤°à¥à¤—", dikdortgen: "à¤†à¤¯à¤¤", d_besgen: "à¤ªà¤‚à¤šà¤­à¥à¤œ", d_altigen: "à¤·à¤Ÿà¥à¤­à¥à¤œ", d_yedigen: "à¤¸à¤ªà¥à¤¤à¤­à¥à¤œ", d_sekizgen: "à¤…à¤·à¥à¤Ÿà¤­à¥à¤œ", oyunlar: "à¤–à¥‡à¤²", arac_rengi: "à¤°à¤‚à¤—", geri_al: "à¤ªà¥‚à¤°à¥à¤µà¤µà¤¤", hepsini_sil: "à¤¸à¤¾à¤«à¤¼", tasi: "à¤²à¥‡ à¤œà¤¾à¤à¤", canlandir: "à¤à¤¨à¤¿à¤®à¥‡à¤Ÿ", kutu: "à¤¬à¥‰à¤•à¥à¤¸", serbest: "à¤®à¥à¤•à¥à¤¤", yardim: "à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾", ins_t: "à¤à¤ª à¤‡à¤‚à¤¸à¥à¤Ÿà¥‰à¤² à¤•à¤°à¥‡à¤‚", ins_d: "à¤¬à¥‡à¤¹à¤¤à¤° à¤ªà¥à¤°à¤¦à¤°à¥à¤¶à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤‡à¤‚à¤¸à¥à¤Ÿà¥‰à¤² à¤•à¤°à¥‡à¤‚à¥¤", ins_b: "à¤‡à¤‚à¤¸à¥à¤Ÿà¥‰à¤²", ins_c: "à¤¬à¤‚à¤¦", vid_cetvel: "à¤°à¥‚à¤²er à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤—", vid_gonye: "à¤¸à¥‡à¤Ÿ à¤¸à¥à¤•à¥à¤µà¤¾à¤¯à¤° à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤—", vid_aciolcer: "à¤šà¤¾à¤‚à¤¦à¤¾ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤—", vid_pergel: "à¤ªà¤°à¤•à¤¾à¤° à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤—", vid_canlandir: "à¤à¤¨à¥€à¤®à¥‡à¤¶à¤¨ (à¤•à¥‰à¤ªà¥€)", vid_cizgi: "à¤²à¤¾à¤‡à¤¨ à¤®à¥‡à¤¨à¥‚ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤—", vid_cokgenler: "à¤¬à¤¹à¥à¤­à¥à¤œ", vid_kalem: "à¤ªà¥‡à¤¨", vid_kitap: "à¤ªà¥à¤¸à¥à¤¤à¤• à¤”à¤° à¤›à¤µà¤¿ à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚", vid_oyunlar: "à¤–à¥‡à¤²", pdf_soru: "à¤‡à¤¸ PDF à¤®à¥‡à¤‚ {0} à¤ªà¥ƒà¤·à¥à¤  à¤¹à¥ˆà¤‚à¥¤ à¤†à¤ª à¤•à¤¿à¤¸ à¤ªà¥ƒà¤·à¥à¤  à¤¸à¥‡ à¤œà¤¾à¤°à¥€ à¤°à¤–à¤¨à¤¾ à¤šà¤¾à¤¹à¥‡à¤‚à¤—à¥‡?", kvkk: "à¤¯à¤¹ à¤à¤ªà¥à¤²à¤¿à¤•à¥‡à¤¶à¤¨ à¤•à¥‹à¤ˆ à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤¡à¥‡à¤Ÿà¤¾ à¤à¤•à¤¤à¥à¤° à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ à¤”à¤° à¤†à¤ªà¤•à¥€ à¤«à¤¼à¤¾à¤‡à¤²à¥‹à¤‚ à¤•à¥‹ à¤¸à¤°à¥à¤µà¤° à¤ªà¤° à¤…à¤ªà¤²à¥‹à¤¡ à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤" },

    ms: { yukle: "Muat Naik Fail", silgi: "Pemadam", kalem: "Pen", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Pembaris", gonye: "Sesiku", aciolcer: "Jangka Sudut", pergel: "Jangka Lukis", cokgenler: "Poligon", cember: "Bulatan", d_ucgen: "Segi Tiga", d_dortgen: "Segi Empat", dikdortgen: "Segi Empat Tepat", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Batal", hepsini_sil: "Padam", tasi: "Gerak", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Pasang Aplikasi", ins_d: "Pasang untuk prestasi lebih baik.", ins_b: "Pasang", ins_c: "Tutup", vid_cetvel: "Penggunaan Pembaris", vid_gonye: "Penggunaan Sesiku", vid_aciolcer: "Penggunaan Jangka Sudut", vid_pergel: "Penggunaan Jangka Lukis", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garisan", vid_cokgenler: "Poligon", vid_kalem: "Pen", vid_kitap: "Muat Buku dan Imej", vid_oyunlar: "Permainan", pdf_soru: "PDF ini mempunyai {0} halaman. Dari halaman mana anda ingin teruskan?", kvkk: "Aplikasi ini tidak mengumpul sebarang data peribadi and tidak memuat naik fail anda ke pelayan." },

    id: { yukle: "Unggah Berkas", silgi: "Penghapus", kalem: "Pena", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Penggaris", gonye: "Segitiga", aciolcer: "Busur", pergel: "Jangka", cokgenler: "Poligon", cember: "Lingkaran", d_ucgen: "Segitiga", d_dortgen: "Persegi", dikdortgen: "Persegi Panjang", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Urung", hepsini_sil: "Hapus", tasi: "Pindah", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Instal Aplikasi", ins_d: "Instal untuk performa daha baik.", ins_b: "Instal", ins_c: "Tutup", vid_cetvel: "Penggunaan Penggaris", vid_gonye: "Penggunaan Penggaris Segitiga", vid_aciolcer: "Penggunaan Busur Derajat", vid_pergel: "Penggunaan Jangka", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garis", vid_cokgenler: "Poligon", vid_kalem: "Pena", vid_kitap: "Muat Buku dan Gambar", vid_oyunlar: "Permainan", pdf_soru: "PDF ini memiliki {0} halaman. Dari halaman mana Anda ingin melanjutkan?", kvkk: "Aplikasi ini tidak mengumpulkan data pribadi apa pun dan tidak mengunggah file Anda ke server." },

    zh: { yukle: "ä¸Šä¼ æ–‡ä»¶", silgi: "æ©¡çš®", kalem: "ç¬”", cizgi: "çº¿", nokta: "ç‚¹", d_cizgi: "ç›´çº¿", dogru: "ç›´çº¿", dogru_parcasi: "çº¿æ®µ", isin: "å°„çº¿", cetvel: "ç›´å°º", gonye: "ä¸‰è§’æ¿", aciolcer: "é‡è§’å™¨", pergel: "åœ†è§„", cokgenler: "å¤šè¾¹å½¢", cember: "åœ†", d_ucgen: "ä¸‰è§’å½¢", d_dortgen: "æ­£æ–¹å½¢", dikdortgen: "é•¿æ–¹å½¢", d_besgen: "äº”è¾¹å½¢", d_altigen: "å…­è¾¹å½¢", d_yedigen: "ä¸ƒè¾¹å½¢", d_sekizgen: "å…«è¾¹å½¢", oyunlar: "æ¸¸æˆ", arac_rengi: "é¢œè‰²", geri_al: "æ’¤é”€", hepsini_sil: "æ¸…é™¤", tasi: "ç§»åŠ¨", canlandir: "åŠ¨ç”»", kutu: "æ¡†é€‰", serbest: "è‡ªç”±", yardim: "å¸®åŠ©", ins_t: "å®‰è£…åº”ç”¨", ins_d: "å®‰è£…åº”ç”¨ä»¥è·å¾—æ›´å¥½æ€§èƒ½ã€‚", ins_b: "å®‰è£…", ins_c: "å…³é—­", vid_cetvel: "å°ºå­ç”¨æ³•", vid_gonye: "ä¸‰è§’æ¿ç”¨æ³•", vid_aciolcer: "é‡è§’å™¨ç”¨æ³•", vid_pergel: "åœ†è§„ç”¨æ³•", vid_canlandir: "åŠ¨ç”»ï¼ˆå¤åˆ¶ï¼‰", vid_cizgi: "çº¿æ¡èœå•ç”¨æ³•", vid_cokgenler: "å¤šè¾¹å½¢", vid_kalem: "ç¬”", vid_kitap: "åŠ è½½ä¹¦ç±å’Œå›¾ç‰‡", vid_oyunlar: "æ¸¸æˆ", pdf_soru: "æ­¤ PDF å…±æœ‰ {0} é¡µã€‚æ‚¨æƒ³ä»å“ªä¸€é¡µå¼€å§‹ç»§ç»­ï¼Ÿ", kvkk: "æ­¤åº”ç”¨ç¨‹åºä¸æ”¶é›†ä»»ä½•ä¸ªäººæ•°æ®ï¼Œä¹Ÿä¸ä¼šå°†æ‚¨çš„æ–‡ä»¶ä¸Šä¼ åˆ°æœåŠ¡å™¨ã€‚" },

    ru: { yukle: "Ğ—Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ Ñ„Ğ°Ğ¹Ğ»", silgi: "Ğ›Ğ°ÑÑ‚Ğ¸Ğº", kalem: "Ğ ÑƒÑ‡ĞºĞ°", cizgi: "Ğ›Ğ¸Ğ½Ğ¸Ñ", nokta: "Ğ¢Ğ¾Ñ‡ĞºĞ°", d_cizgi: "ĞŸÑ€ÑĞ¼Ğ°Ñ Ğ»Ğ¸Ğ½Ğ¸Ñ", dogru: "ĞŸÑ€ÑĞ¼Ğ°Ñ", dogru_parcasi: "ĞÑ‚Ñ€ĞµĞ·Ğ¾Ğº", isin: "Ğ›ÑƒÑ‡", cetvel: "Ğ›Ğ¸Ğ½ĞµĞ¹ĞºĞ°", gonye: "Ğ£Ğ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", aciolcer: "Ğ¢Ñ€Ğ°Ğ½ÑĞ¿Ğ¾Ñ€Ñ‚Ğ¸Ñ€", pergel: "Ğ¦Ğ¸Ñ€ĞºÑƒĞ»ÑŒ", cokgenler: "ĞœĞ½Ğ¾Ğ³Ğ¾ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸ĞºĞ¸", cember: "ĞšÑ€ÑƒĞ³", d_ucgen: "ĞŸÑ€Ğ°Ğ²Ğ¸Ğ»ÑŒĞ½Ñ‹Ğ¹ Ñ‚Ñ€ĞµÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", d_dortgen: "ĞšĞ²Ğ°Ğ´Ñ€Ğ°Ñ‚", dikdortgen: "ĞŸÑ€ÑĞ¼Ğ¾ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", d_besgen: "ĞŸÑÑ‚Ğ¸ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", d_altigen: "Ğ¨ĞµÑÑ‚Ğ¸ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", d_yedigen: "Ğ¡ĞµĞ¼Ğ¸ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", d_sekizgen: "Ğ’Ğ¾ÑÑŒĞ¼Ğ¸ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", oyunlar: "Ğ˜Ğ³Ñ€Ñ‹", arac_rengi: "Ğ¦Ğ²ĞµÑ‚ Ğ¸Ğ½ÑÑ‚Ñ€ÑƒĞ¼ĞµĞ½Ñ‚Ğ°", geri_al: "ĞÑ‚Ğ¼ĞµĞ½Ğ¸Ñ‚ÑŒ", hepsini_sil: "ĞÑ‡Ğ¸ÑÑ‚Ğ¸Ñ‚ÑŒ Ğ²ÑÑ‘", tasi: "ĞŸĞµÑ€ĞµĞ¼ĞµÑÑ‚Ğ¸Ñ‚ÑŒ", canlandir: "ĞĞ½Ğ¸Ğ¼Ğ°Ñ†Ğ¸Ñ âœ‚ï¸", kutu: "ĞšĞ¾Ñ€Ğ¾Ğ±ĞºĞ°", serbest: "Ğ¡Ğ²Ğ¾Ğ±Ğ¾Ğ´Ğ½Ğ¾", yardim: "Ğ¡Ğ¿Ñ€Ğ°Ğ²ĞºĞ°", ins_t: "Ğ£ÑÑ‚Ğ°Ğ½Ğ¾Ğ²Ğ¸Ñ‚ÑŒ", ins_d: "Ğ£ÑÑ‚Ğ°Ğ½Ğ¾Ğ²Ğ¸Ñ‚Ğµ Ğ´Ğ»Ñ Ğ»ÑƒÑ‡ÑˆĞµĞ¹ Ñ€Ğ°Ğ±Ğ¾Ñ‚Ñ‹.", ins_b: "Ğ£ÑÑ‚Ğ°Ğ½Ğ¾Ğ²Ğ¸Ñ‚ÑŒ", ins_c: "Ğ—Ğ°ĞºÑ€Ñ‹Ñ‚ÑŒ", vid_cetvel: "ĞšĞ°Ğº Ğ¸ÑĞ¿Ğ¾Ğ»ÑŒĞ·Ğ¾Ğ²Ğ°Ñ‚ÑŒ Ğ»Ğ¸Ğ½ĞµĞ¹ĞºÑƒ", vid_gonye: "ĞšĞ°Ğº Ğ¸ÑĞ¿Ğ¾Ğ»ÑŒĞ·Ğ¾Ğ²Ğ°Ñ‚ÑŒ ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸Ğº", vid_aciolcer: "ĞšĞ°Ğº Ğ¸ÑĞ¿Ğ¾Ğ»ÑŒĞ·Ğ¾Ğ²Ğ°Ñ‚ÑŒ Ñ‚Ñ€Ğ°Ğ½ÑĞ¿Ğ¾Ñ€Ñ‚Ğ¸Ñ€", vid_pergel: "ĞšĞ°Ğº Ğ¸ÑĞ¿Ğ¾Ğ»ÑŒĞ·Ğ¾Ğ²Ğ°Ñ‚ÑŒ Ñ†Ğ¸Ñ€ĞºÑƒĞ»ÑŒ", vid_canlandir: "ĞĞ½Ğ¸Ğ¼Ğ°Ñ†Ğ¸Ñ (ĞšĞ¾Ğ¿Ğ¸Ñ)", vid_cizgi: "ĞœĞµĞ½Ñ Ğ»Ğ¸Ğ½Ğ¸Ğ¹", vid_cokgenler: "ĞœĞ½Ğ¾Ğ³Ğ¾ÑƒĞ³Ğ¾Ğ»ÑŒĞ½Ğ¸ĞºĞ¸", vid_kalem: "Ğ ÑƒÑ‡ĞºĞ°", vid_kitap: "Ğ—Ğ°Ğ³Ñ€ÑƒĞ·ĞºĞ° ĞºĞ½Ğ¸Ğ³", vid_oyunlar: "Ğ˜Ğ³Ñ€Ñ‹", pdf_soru: "Ğ’ ÑÑ‚Ğ¾Ğ¼ PDF {0} ÑÑ‚Ñ€Ğ°Ğ½Ğ¸Ñ†. Ğ¡ ĞºĞ°ĞºĞ¾Ğ¹ ÑÑ‚Ñ€Ğ°Ğ½Ğ¸Ñ†Ñ‹ Ğ²Ñ‹ Ñ…Ğ¾Ñ‚Ğ¸Ñ‚Ğµ Ğ¿Ñ€Ğ¾Ğ´Ğ¾Ğ»Ğ¶Ğ¸Ñ‚ÑŒ?", kvkk: "Ğ­Ñ‚Ğ¾ Ğ¿Ñ€Ğ¸Ğ»Ğ¾Ğ¶ĞµĞ½Ğ¸Ğµ Ğ½Ğµ ÑĞ¾Ğ±Ğ¸Ñ€Ğ°ĞµÑ‚ Ğ½Ğ¸ĞºĞ°ĞºĞ¸Ñ… Ğ¿ĞµÑ€ÑĞ¾Ğ½Ğ°Ğ»ÑŒĞ½Ñ‹Ñ… Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ… Ğ¸ Ğ½Ğµ Ğ·Ğ°Ğ³Ñ€ÑƒĞ¶Ğ°ĞµÑ‚ Ğ²Ğ°ÑˆĞ¸ Ñ„Ğ°Ğ¹Ğ»Ñ‹ Ğ½Ğ° ÑĞµÑ€Ğ²ĞµÑ€Ñ‹." },

    es: { yukle: "Subir Archivo", silgi: "Borrador", kalem: "LÃ¡piz", cizgi: "LÃ­nea", nokta: "Punto", d_cizgi: "LÃ­nea Recta", dogru: "Recta", dogru_parcasi: "Segmento", isin: "Rayo", cetvel: "Regla", gonye: "Escuadra", aciolcer: "Transportador", pergel: "CompÃ¡s", cokgenler: "PolÃ­gonos", cember: "CÃ­rculo", d_ucgen: "TriÃ¡ngulo", d_dortgen: "Cuadrado", dikdortgen: "RectÃ¡ngulo", d_besgen: "PentÃ¡gono", d_altigen: "HexÃ¡gono", d_yedigen: "HeptÃ¡gono", d_sekizgen: "OctÃ¡gono", oyunlar: "Juegos", arac_rengi: "Color", geri_al: "Deshacer", hepsini_sil: "Borrar Todo", tasi: "Mover", canlandir: "Animar âœ‚ï¸", kutu: "Caja", serbest: "Libre", yardim: "Ayuda", ins_t: "Instalar App", ins_d: "Instalar para mejor rendimiento.", ins_b: "Instalar", ins_c: "Cerrar", vid_cetvel: "Uso de Regla", vid_gonye: "Uso de Escuadra", vid_aciolcer: "Uso de Transportador", vid_pergel: "Uso de CompÃ¡s", vid_canlandir: "AnimaciÃ³n (Copiar)", vid_cizgi: "MenÃº de LÃ­neas", vid_cokgenler: "PolÃ­gonos", vid_kalem: "LÃ¡piz", vid_kitap: "Cargar Libro", vid_oyunlar: "Juegos", pdf_soru: "Este PDF tiene {0} pÃ¡ginas. Â¿Desde quÃ© pÃ¡gina te gustarÃ­a continuar?", kvkk: "Esta aplicaciÃ³n no recopila ningÃºn dato personal y no sube sus archivos a los servidores." },

    fr: { yukle: "TÃ©lÃ©charger", silgi: "Gomme", kalem: "Stylo", cizgi: "Ligne", nokta: "Point", d_cizgi: "Ligne Droite", dogru: "Droite", dogru_parcasi: "Segment", isin: "Demi-droite", cetvel: "RÃ¨gle", gonye: "Ã‰querre", aciolcer: "Rapporteur", pergel: "Compas", cokgenler: "Polygones", cember: "Cercle", d_ucgen: "Triangle", d_dortgen: "CarrÃ©", dikdortgen: "Rectangle", d_besgen: "Pentagone", d_altigen: "Hexagone", d_yedigen: "Heptagone", d_sekizgen: "Octogone", oyunlar: "Jeux", arac_rengi: "Couleur", geri_al: "Annuler", hepsini_sil: "Effacer Tout", tasi: "DÃ©placer", canlandir: "Animer âœ‚ï¸", kutu: "BoÃ®te", serbest: "Libre", yardim: "Aide", ins_t: "Installer App", ins_d: "Installez pour de meilleures performances.", ins_b: "Installer", ins_c: "Fermer", vid_cetvel: "Utilisation de la RÃ¨gle", vid_gonye: "Utilisation de l'Ã‰querre", vid_aciolcer: "Utilisation du Rapporteur", vid_pergel: "Utilisation du Compas", vid_canlandir: "Animation (Copie)", vid_cizgi: "Menu des Lignes", vid_cokgenler: "Polygones", vid_kalem: "Stylo", vid_kitap: "Charger Livre", vid_oyunlar: "Jeux", pdf_soru: "Ce PDF contient {0} pages. Ã€ partir de quelle page voulez-vous continuer ?", kvkk: "Cette application ne collecte aucune donnÃ©e personnelle et ne tÃ©lÃ©charge pas vos fichiers sur des serveurs." },

    pt: { yukle: "Carregar Ficheiro", silgi: "Borracha", kalem: "Caneta", cizgi: "Linha", nokta: "Ponto", d_cizgi: "Linha Reta", dogru: "Reta", dogru_parcasi: "Segmento", isin: "Semirreta", cetvel: "RÃ©gua", gonye: "Esquadro", aciolcer: "Transferidor", pergel: "Compasso", cokgenler: "PolÃ­gonos", cember: "CÃ­rculo", d_ucgen: "TriÃ¢ngulo", d_dortgen: "Quadrado", dikdortgen: "RetÃ¢ngulo", d_besgen: "PentÃ¡gono", d_altigen: "HexÃ¡gono", d_yedigen: "HeptÃ¡gono", d_sekizgen: "OctÃ³gono", oyunlar: "Jogos", arac_rengi: "Cor", geri_al: "Desfazer", hepsini_sil: "Apagar Tudo", tasi: "Mover", canlandir: "Animar âœ‚ï¸", kutu: "Caixa", serbest: "Livre", yardim: "Ajuda", ins_t: "Instalar App", ins_d: "Instale para melhor desempenho.", ins_b: "Instalar", ins_c: "Fechar", vid_cetvel: "Uso da RÃ©gua", vid_gonye: "Uso do Esquadro", vid_aciolcer: "Uso do Transferidor", vid_pergel: "Uso do Compasso", vid_canlandir: "AnimaÃ§Ã£o (CÃ³pia)", vid_cizgi: "Menu de Linhas", vid_cokgenler: "PolÃ­gonos", vid_kalem: "Caneta", vid_kitap: "Carregar Livro", vid_oyunlar: "Jogos", pdf_soru: "Este PDF tem {0} pÃ¡ginas. A partir de qual pÃ¡gina gostaria de continuar?", kvkk: "Este aplicativo nÃ£o coleta nenhum dado pessoal e nÃ£o faz upload de seus arquivos para servidores." },

    ja: { yukle: "ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰", silgi: "æ¶ˆã—ã‚´ãƒ ", kalem: "ãƒšãƒ³", cizgi: "ç·š", nokta: "ç‚¹", d_cizgi: "ç›´ç·š", dogru: "ç›´ç·š", dogru_parcasi: "ç·šåˆ†", isin: "åŠç›´ç·š", cetvel: "å®šè¦", gonye: "ä¸‰è§’å®šè¦", aciolcer: "åˆ†åº¦å™¨", pergel: "ã‚³ãƒ³ãƒ‘ã‚¹", cokgenler: "å¤šè§’å½¢", cember: "å††", d_ucgen: "æ­£ä¸‰è§’å½¢", d_dortgen: "æ­£æ–¹å½¢", dikdortgen: "é•·æ–¹å½¢", d_besgen: "äº”è§’å½¢", d_altigen: "å…­è§’å½¢", d_yedigen: "ä¸ƒè§’å½¢", d_sekizgen: "å…«è§’å½¢", oyunlar: "ã‚²ãƒ¼ãƒ ", arac_rengi: "ãƒ„ãƒ¼ãƒ«ã®è‰²", geri_al: "å…ƒã«æˆ»ã™", hepsini_sil: "ã™ã¹ã¦æ¶ˆå»", tasi: "ç§»å‹•", canlandir: "ã‚¢ãƒ‹ãƒ¡ âœ‚ï¸", kutu: "ãƒœãƒƒã‚¯ã‚¹", serbest: "è‡ªç”±", yardim: "ãƒ˜ãƒ«ãƒ—", ins_t: "ã‚¢ãƒ—ãƒªã‚’ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«", ins_d: "ãƒ‘ãƒ•ã‚©ãƒ¼ãƒãƒ³ã‚¹å‘ä¸Šã®ãŸã‚ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«", ins_b: "ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«", ins_c: "é–‰ã˜ã‚‹", vid_cetvel: "å®šè¦ã®ä½¿ã„æ–¹", vid_gonye: "ä¸‰è§’å®šè¦ã®ä½¿ã„æ–¹", vid_aciolcer: "åˆ†åº¦å™¨ã®ä½¿ã„æ–¹", vid_pergel: "ã‚³ãƒ³ãƒ‘ã‚¹ã®ä½¿ã„æ–¹", vid_canlandir: "ã‚¢ãƒ‹ãƒ¡ãƒ¼ã‚·ãƒ§ãƒ³ (ã‚³ãƒ”ãƒ¼)", vid_cizgi: "ç·šãƒ¡ãƒ‹ãƒ¥ãƒ¼ã®ä½¿ã„æ–¹", vid_cokgenler: "å¤šè§’å½¢", vid_kalem: "ãƒšãƒ³", vid_kitap: "æœ¬ã¨ç”»åƒã‚’èª­ã¿è¾¼ã‚€", vid_oyunlar: "ã‚²ãƒ¼ãƒ ", pdf_soru: "ã“ã®PDFã¯{0}ãƒšãƒ¼ã‚¸ã‚ã‚Šã¾ã™ã€‚ã©ã®ãƒšãƒ¼ã‚¸ã‹ã‚‰ç¶šè¡Œã—ã¾ã™ã‹ï¼Ÿ", kvkk: "ã“ã®ã‚¢ãƒ—ãƒªã‚±ãƒ¼ã‚·ãƒ§ãƒ³ã¯å€‹äººãƒ‡ãƒ¼ã‚¿ã‚’åé›†ã›ãšã€ãƒ•ã‚¡ã‚¤ãƒ«ã‚’ã‚µãƒ¼ãƒãƒ¼ã«ã‚¢ãƒƒãƒ—ãƒ­ãƒ¼ãƒ‰ã—ã¾ã›ã‚“ã€‚" }
};

window.aktifBaglantilar = {};
let currentLassoX = 0;
let currentLassoY = 0;
let isDrawingLasso = false;
let lassoPoints = [];
let drawnStrokes = [];
window.drawnStrokes = drawnStrokes;
let boxCopies = [];
window.boxCopies = boxCopies;
let isDrawing = false;
let isDrawingRectangle = false;
let isDrawingPolygon = false;
let rectStartPoint = null;
let globalScale = 1;
let lastDist = 0;
let pointers = new Map();
let offsetX = 0; // BUNU EKLE
let offsetY = 0; // BUNU EKLE
const MIN_SCALE = 0.5;
const MAX_SCALE = 5.0;
let initialWidth = 0;
let initialHeight = 0;
let isPenActive = false; // AvuÃ§ iÃ§i reddi iÃ§in
let penActiveTimer = null;

// --- Ã‡OK DÄ°LLÄ° OYUNLAR LÄ°STESÄ° (TÃœM DÄ°LLER GÃœNCELLENDÄ°) ---
window.OyunListesi = [
    {
        tr: "Ã‡EMBERLERDEN ÃœÃ‡GEN Ä°NÅASI",
        en: "TRIANGLE CONSTRUCTION FROM CIRCLES",
        de: "DREIECKSKONSTRUKTION AUS KREISEN",
        ar: "Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù…Ø«Ù„Ø« Ù…Ù† Ø§Ù„Ø¯ÙˆØ§Ø¦Ø±",
        hi: "à¤µà¥ƒà¤¤à¥à¤¤à¥‹à¤‚ à¤¸à¥‡ à¤¤à¥à¤°à¤¿à¤­à¥à¤œ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£",
        ms: "PEMBINAAN SEGI TIGA DARIPADA BULATAN",
        id: "KONSTRUKSI SEGITIGA DARI LINGKARAN",
        zh: "ä»åœ†æ„å»ºä¸‰è§’å½¢",
        ru: "ĞŸĞĞ¡Ğ¢Ğ ĞĞ•ĞĞ˜Ğ• Ğ¢Ğ Ğ•Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞ Ğ˜Ğ— ĞĞšĞ Ğ£Ğ–ĞĞĞ¡Ğ¢Ğ•Ğ™",
        es: "CONSTRUCCIÃ“N DE TRIÃNGULOS DESDE CÃRCULOS",
        fr: "CONSTRUCTION DE TRIANGLES Ã€ PARTIR DE CERCLES",
        pt: "CONSTRUÃ‡ÃƒO DE TRIÃ‚NGULOS A PARTIR DE CÃRCULOS",
        ja: "å††ã‹ã‚‰ã®ä¸‰è§’å½¢ã®æ§‹ç¯‰",
        link: "https://bekrmatmt25.my.canva.site/cemberden-ucgen-elde-etme"
    },
    {
        tr: "AÃ‡I Ã–LÃ‡ER YERLEÅTÄ°RME OYUNU",
        en: "PROTRACTOR PLACEMENT GAME",
        de: "WINKELMESSER-PLATZIERUNGSSPIEL",
        ar: "Ù„Ø¹Ø¨Ø© ÙˆØ¶Ø¹ Ø§Ù„Ù…Ù†Ù‚Ù„Ø©",
        hi: "à¤šà¤¾à¤‚à¤¦à¤¾ à¤ªà¥à¤²à¥‡à¤¸à¤®à¥‡à¤‚à¤Ÿ à¤—à¥‡à¤®",
        ms: "PERMAINAN PENEMPATAN JANGKA SUDUT",
        id: "PERMAINAN PENEMPATAN BUSUR DERAJAT",
        zh: "é‡è§’å™¨æ”¾ç½®æ¸¸æˆ",
        ru: "Ğ˜Ğ“Ğ Ğ ĞĞ Ğ ĞĞ—ĞœĞ•Ğ©Ğ•ĞĞ˜Ğ• Ğ¢Ğ ĞĞĞ¡ĞŸĞĞ Ğ¢Ğ˜Ğ Ğ",
        es: "JUEGO DE COLOCACIÃ“N DEL TRANSPORTADOR",
        fr: "JEU DE PLACEMENT DU RAPPORTEUR",
        pt: "JOGO DE COLOCAÃ‡ÃƒO DO TRANSFERIDOR",
        ja: "åˆ†åº¦å™¨é…ç½®ã‚²ãƒ¼ãƒ ",
        link: "https://bekrmatmt2507.my.canva.site/a-l-er-yar-mas"
    },
    {
        tr: "DOÄRUYA DIÅINDAKÄ° NOKTADAN DÄ°KME",
        en: "PERPENDICULAR FROM EXTERNAL POINT",
        de: "LORECHT VON EINEM EXTERNEN PUNKT",
        ar: "Ø¥Ø³Ù‚Ø§Ø· Ø¹Ù…ÙˆØ¯ Ù…Ù† Ù†Ù‚Ø·Ø© Ø®Ø§Ø±Ø¬ Ø§Ù„Ø®Ø·",
        hi: "à¤¬à¤¾à¤¹à¤°à¥€ à¤¬à¤¿à¤‚à¤¦à¥ à¤¸à¥‡ à¤²à¤‚à¤¬à¤µà¤¤ à¤°à¥‡à¤–à¤¾",
        ms: "SERENJANG DARI TITIK LUAR",
        id: "TEGAK LURUS DARI TITIK LUAR",
        zh: "ä»å¤–éƒ¨ç‚¹ç”»å‚çº¿",
        ru: "ĞŸĞ•Ğ ĞŸĞ•ĞĞ”Ğ˜ĞšĞ£Ğ›Ğ¯Ğ  Ğ˜Ğ— Ğ’ĞĞ•Ğ¨ĞĞ•Ğ™ Ğ¢ĞĞ§ĞšĞ˜",
        es: "PERPENDICULAR DESDE UN PUNTO EXTERNO",
        fr: "PERPENDICULAIRE Ã€ PARTIR D'UN POINT EXTERNE",
        pt: "PERPENDICULAR A PARTIR DE UM PONTO EXTERNO",
        ja: "å¤–éƒ¨ã®ç‚¹ã‹ã‚‰ã®å‚ç·š",
        link: "https://bekrmatmt25.my.canva.site/dogruya-disindeki-noktadan-dikme-cizmek"
    },
    {
        tr: "AYNI DÃœZLEMDE Ä°KÄ° DOÄRUNUN YOLCULUÄU",
        en: "JOURNEY OF TWO LINES IN THE SAME PLANE",
        de: "REISE ZWEIER LINIEN IN DERSELBEN EBENE",
        ar: "Ø±Ø­Ù„Ø© Ø®Ø·ÙŠÙ† ÙÙŠ Ù†ÙØ³ Ø§Ù„Ù…Ø³ØªÙˆÙ‰",
        hi: "à¤à¤• à¤¹à¥€ à¤¤à¤² à¤®à¥‡à¤‚ à¤¦à¥‹ à¤°à¥‡à¤–à¤¾à¤“à¤‚ à¤•à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾",
        ms: "PERJALANAN DUA GARIS DALAM SATAH YANG SAMA",
        id: "PERJALANAN DUA GARIS DALAM BIDANG YANG SAMA",
        zh: "åŒä¸€å¹³é¢å†…ä¸¤æ¡çº¿çš„æ—…ç¨‹",
        ru: "ĞŸĞ£Ğ¢Ğ•Ğ¨Ğ•Ğ¡Ğ¢Ğ’Ğ˜Ğ• Ğ”Ğ’Ğ£Ğ¥ Ğ›Ğ˜ĞĞ˜Ğ™ Ğ’ ĞĞ”ĞĞĞ™ ĞŸĞ›ĞĞ¡ĞšĞĞ¡Ğ¢Ğ˜",
        es: "EL VIAJE DE DOS LÃNEAS EN EL MISMO PLANO",
        fr: "LE VOYAGE DE DEUX LIGNES DANS LE MÃŠME PLAN",
        pt: "A JORNADA DE DUAS LINHAS NO MESMO PLANO",
        ja: "åŒä¸€å¹³é¢ä¸Šã®2æœ¬ã®ç·šã®æ—…",
        link: "https://bdemir1499.github.io/ayni-duzlemde-iki-dogru/"
    },
    {
        tr: "AYNI DÃœZLEMDE 3 DOÄRUNUN DURUMLARI",
        en: "POSITIONS OF 3 LINES IN THE SAME PLANE",
        de: "LAGE VON 3 LINIEN IN DERSELBEN EBENE",
        ar: "Ø­Ø§Ù„Ø§Øª 3 Ø®Ø·ÙˆØ· ÙÙŠ Ù†ÙØ³ Ø§Ù„Ù…Ø³ØªÙˆÙ‰",
        hi: "à¤à¤• à¤¹à¥€ à¤¤à¤² à¤®à¥‡à¤‚ 3 à¤°à¥‡à¤–à¤¾à¤“à¤‚ à¤•à¥€ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¤¾à¤",
        ms: "KEDUDUKAN 3 GARIS DALAM SATAH YANG SAMA",
        id: "POSISI 3 GARIS DALAM BIDANG YANG SAMA",
        zh: "åŒä¸€å¹³é¢å†…3æ¡çº¿çš„ä½ç½®",
        ru: "ĞŸĞĞ›ĞĞ–Ğ•ĞĞ˜Ğ¯ 3 Ğ›Ğ˜ĞĞ˜Ğ™ Ğ’ ĞĞ”ĞĞĞ™ ĞŸĞ›ĞĞ¡ĞšĞĞ¡Ğ¢Ğ˜",
        es: "POSICIONES DE 3 LÃNEAS EN EL MISMO PLANO",
        fr: "POSITIONS DE 3 LIGNES DANS LE MÃŠME PLAN",
        pt: "POSIÃ‡Ã•ES DE 3 LINHAS NO MESMO PLANO",
        ja: "åŒä¸€å¹³é¢ä¸Šã®3æœ¬ã®ç·šã®ä½ç½®",
        link: "https://bekrmatmt2507.my.canva.site/ayniduzlemdeucdogrunundurumlari"
    },
    {
        tr: "AÃ‡I Ã‡EÅÄ°TLERÄ° (TÃœMLER/BÃœTÃœNLER/KOMÅU)",
        en: "ANGLE TYPES (COMPLEMENTARY/SUPPLEMENTARY/ADJACENT)",
        de: "WINKELARTEN (KOMPLEMENTÃ„R/SUPPLEMENTÃ„R/NEBENWINKEL)",
        ar: "Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø²ÙˆØ§ÙŠØ§ (Ù…ØªØªØ§Ù…Ø©/Ù…ØªÙƒØ§Ù…Ù„Ø©/Ù…ØªØ¬Ø§ÙˆØ±Ø©)",
        hi: "à¤•à¥‹à¤£à¥‹à¤‚ à¤•à¥‡ à¤ªà¥à¤°à¤•à¤¾à¤° (à¤ªà¥‚à¤°à¤•/à¤¸à¤‚à¤ªà¥‚à¤°à¤•/à¤†à¤¸à¤¨à¥à¤¨)",
        ms: "JENIS SUDUT (PELENGKAP/PENGGENAP/BERSEBELAH)",
        id: "JENIS SUDUT (BERPELURUS/BERPENYIKU/BERDAMPINGAN)",
        zh: "è§’çš„ç±»å‹ï¼ˆä½™è§’/è¡¥è§’/é‚»è§’ï¼‰",
        ru: "Ğ¢Ğ˜ĞŸĞ« Ğ£Ğ“Ğ›ĞĞ’ (Ğ”ĞĞŸĞĞ›ĞĞ˜Ğ¢Ğ•Ğ›Ğ¬ĞĞ«Ğ•/Ğ¡ĞœĞ•Ğ–ĞĞ«Ğ•)",
        es: "TIPOS DE ÃNGULOS (COMPLEMENTARIOS/SUPLEMENTARIOS/ADYACENTES)",
        fr: "TYPES D'ANGLES (COMPLÃ‰MENTAIRES/SUPPLÃ‰MENTAIRES/ADJACENTS)",
        pt: "TIPOS DE Ã‚NGULOS (COMPLEMENTARES/SUPLEMENTARES/ADJACENTES)",
        ja: "è§’ã®ã‚¿ã‚¤ãƒ—ï¼ˆä½™è§’/è£œè§’/éš£æ¥è§’ï¼‰",
        link: "https://bdemir1499.github.io/tumler-butunler-komsutumler-komsubutunler/"
    },
    {
        tr: "AÃ‡ILARINA GÃ–RE ÃœÃ‡GENLER",
        en: "TRIANGLES ACCORDING TO THEIR ANGLES",
        de: "DREIECKE NACH IHREN WINKELN",
        ar: "Ø§Ù„Ù…Ø«Ù„Ø«Ø§Øª Ø­Ø³Ø¨ Ø²ÙˆØ§ÙŠØ§Ù‡Ø§",
        hi: "à¤•à¥‹à¤£à¥‹à¤‚ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤¤à¥à¤°à¤¿à¤­à¥à¤œ",
        ms: "SEGI TIGA MENGIKUT SUDUT",
        id: "SEGITIGA BERDASARKAN SUDUTNYA",
        zh: "æŒ‰è§’åˆ†ç±»çš„ä¸‰è§’å½¢",
        ru: "Ğ¢Ğ Ğ•Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞ˜ ĞŸĞ Ğ¢Ğ˜ĞŸĞĞœ Ğ£Ğ“Ğ›ĞĞ’",
        es: "TRIÃNGULOS SEGÃšN SUS ÃNGULOS",
        fr: "TRIANGLES SELON LEURS ANGLES",
        pt: "TRIÃ‚NGULOS DE ACORDO COM SEUS Ã‚NGULOS",
        ja: "è§’ã«ã‚ˆã‚‹ä¸‰è§’å½¢ã®åˆ†é¡",
        link: "https://bekrmatmt25.my.canva.site/acilarina-gire-ucgenler"
    },
    {
        tr: "AÃ‡I Ã‡EÅÄ°TLERÄ° (DAR, DÄ°K, GENÄ°Å vb.)",
        en: "ANGLE TYPES (ACUTE, RIGHT, OBTUSE etc.)",
        de: "WINKELARTEN (SPITZ, RECHT, STUMPF usw.)",
        ar: "Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø²ÙˆØ§ÙŠØ§ (Ø­Ø§Ø¯Ø©ØŒ Ù‚Ø§Ø¦Ù…Ø©ØŒ Ù…Ù†ÙØ±Ø¬Ø© Ø¥Ù„Ø®)",
        hi: "à¤•à¥‹à¤£à¥‹à¤‚ à¤•à¥‡ à¤ªà¥à¤°à¤•à¤¾à¤° (à¤¨à¥à¤¯à¥‚à¤¨, à¤¸à¤®, à¤…à¤§à¤¿à¤• à¤†à¤¦à¤¿)",
        ms: "JENIS SUDUT (TIRUS, TEGAK, CAWAK dsb.)",
        id: "JENIS SUDUT (LANCIP, SIKU, TUMPUL dll.)",
        zh: "è§’çš„ç±»å‹ï¼ˆé”è§’ã€ç›´è§’ã€é’è§’ç­‰ï¼‰",
        ru: "Ğ’Ğ˜Ğ”Ğ« Ğ£Ğ“Ğ›ĞĞ’ (ĞĞ¡Ğ¢Ğ Ğ«Ğ™, ĞŸĞ Ğ¯ĞœĞĞ™, Ğ¢Ğ£ĞŸĞĞ™ Ğ¸ Ñ‚.Ğ´.)",
        es: "TIPOS DE ÃNGULOS (AGUDO, RECTO, OBTUSO, etc.)",
        fr: "TYPES D'ANGLES (AIGU, DROIT, OBTUS, etc.)",
        pt: "TIPOS DE Ã‚NGULOS (AGUDO, RETO, OBTUSO, etc.)",
        ja: "è§’ã®ã‚¿ã‚¤ãƒ—ï¼ˆé‹­è§’ã€ç›´è§’ã€éˆè§’ãªã©ï¼‰",
        link: "https://bekrmatmt2507.my.canva.site/aci-cesitleri"
    },
    {
        tr: "TEMEL GEOMETRÄ°K ÅEKÄ°LLER",
        en: "BASIC GEOMETRIC SHAPES",
        de: "GEOMETRISCHE GRUNDFORMEN",
        ar: "Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠØ© Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ©",
        hi: "à¤¬à¥à¤¨à¤¿à¤¯à¤¾à¤¦à¥€ à¤œà¥à¤¯à¤¾à¤®à¤¿à¤¤à¥€à¤¯ à¤†à¤•à¥ƒà¤¤à¤¿à¤¯à¤¾à¤",
        ms: "BENTUK GEOMETRI ASAS",
        id: "BENTUK GEOMETRIS DASAR",
        zh: "åŸºæœ¬å‡ ä½•å›¾å½¢",
        ru: "ĞĞ¡ĞĞĞ’ĞĞ«Ğ• Ğ“Ğ•ĞĞœĞ•Ğ¢Ğ Ğ˜Ğ§Ğ•Ğ¡ĞšĞ˜Ğ• Ğ¤Ğ˜Ğ“Ğ£Ğ Ğ«",
        es: "FORMAS GEOMÃ‰TRICAS BÃSICAS",
        fr: "FORMES GÃ‰OMÃ‰TRIQUES DE BASE",
        pt: "FORMAS GEOMÃ‰TRICAS BÃSICAS",
        ja: "åŸºæœ¬çš„ãªå¹¾ä½•å­¦å›³å½¢",
        link: "https://bekrmatmt25.my.canva.site/temel-geometrik-sekiller"
    },
    {
        tr: "Ã‡OKGENLERÄ°N ELEMANLARI",
        en: "ELEMENTS OF POLYGONS",
        de: "ELEMENTE VON POLYGONEN",
        ar: "Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…Ø¶Ù„Ø¹Ø§Øª",
        hi: "à¤¬à¤¹à¥à¤­à¥à¤œ à¤•à¥‡ à¤¤à¤¤à¥à¤µ",
        ms: "ELEMEN POLIGON",
        id: "UNSUR-UNSUR POLIGON",
        zh: "å¤šè¾¹å½¢çš„è¦ç´ ",
        ru: "Ğ­Ğ›Ğ•ĞœĞ•ĞĞ¢Ğ« ĞœĞĞĞ“ĞĞ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ’",
        es: "ELEMENTOS DE LOS POLÃGONOS",
        fr: "Ã‰LÃ‰MENTS DES POLYGONES",
        pt: "ELEMENTOS DOS POLÃGONOS",
        ja: "å¤šè§’å½¢ã®è¦ç´ ",
        link: "https://bekrmatmt2507.my.canva.site/cokgenlerin-elemanlari"
    },
    {
        tr: "Ä°KÄ° PARALEL VE KESENLE OLUÅAN AÃ‡ILAR (1)",
        en: "ANGLES FORMED BY TWO PARALLELS AND A TRANSVERSAL (1)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (1)",
        ar: "Ø§Ù„Ø²ÙˆØ§ÙŠØ§ Ø§Ù„Ù†Ø§ØªØ¬Ø© Ø¹Ù† Ù…ØªÙˆØ§Ø²ÙŠÙŠÙ† ÙˆÙ‚Ø§Ø·Ø¹ (1)",
        hi: "à¤¦à¥‹ à¤¸à¤®à¤¾à¤‚à¤¤à¤° à¤°à¥‡à¤–à¤¾à¤“à¤‚ à¤”à¤° bir à¤¤à¤¿à¤°à¥à¤¯à¤• à¤°à¥‡à¤–à¤¾ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤¬à¤¨à¥‡ à¤•à¥‹à¤£ (1)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (1)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (1)",
        zh: "ä¸¤æ¡å¹³è¡Œçº¿å’Œä¸€æ¡æˆªçº¿å½¢æˆçš„è§’ (1)",
        ru: "Ğ£Ğ“Ğ›Ğ« ĞŸĞ Ğ˜ ĞŸĞĞ ĞĞ›Ğ›Ğ•Ğ›Ğ¬ĞĞ«Ğ¥ Ğ˜ Ğ¡Ğ•ĞšĞ£Ğ©Ğ•Ğ™ (1)",
        es: "ÃNGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (1)",
        fr: "ANGLES FORMÃ‰S PAR DEUX PARALLÃˆLES ET UNE TRANSVERSALE (1)",
        pt: "Ã‚NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (1)",
        ja: "2æœ¬ã®å¹³è¡Œç·šã¨1æœ¬ã®æ¨ªæ–­ç·šã«ã‚ˆã£ã¦å½¢æˆã•ã‚Œã‚‹è§’ (1)",
        link: "https://bekrmatmt25.my.canva.site/k-paralel-dogrunun-b-r-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "ÃœÃ‡ DOÄRUNUN Ä°KÄ°ÅER KESÄ°ÅMESÄ°",
        en: "INTERSECTION OF THREE LINES IN PAIRS",
        de: "PAARWEISE SCHNITTPUNKTE VON DREI LINIEN",
        ar: "ØªÙ‚Ø§Ø·Ø¹ Ø«Ù„Ø§Ø« Ø®Ø·ÙˆØ· Ù…Ø«Ù†Ù‰ Ù…Ø«Ù†Ù‰",
        hi: "à¤¤à¥€à¤¨ à¤°à¥‡à¤–à¤¾à¤“à¤‚ à¤•à¤¾ à¤¯à¥à¤—à¥à¤®à¥‹à¤‚ à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤¤à¤¿à¤šà¥à¤›à¥‡à¤¦à¤¨",
        ms: "PERSILANGAN TIGA GARIS SECARA BERPASANGAN",
        id: "PERPOTONGAN TIGA GARIS BERPASANGAN",
        zh: "ä¸‰æ¡çº¿ä¸¤ä¸¤ç›¸äº¤",
        ru: "ĞŸĞĞŸĞĞ ĞĞĞ• ĞŸĞ•Ğ Ğ•Ğ¡Ğ•Ğ§Ğ•ĞĞ˜Ğ• Ğ¢Ğ Ğ•Ğ¥ ĞŸĞ Ğ¯ĞœĞ«Ğ¥",
        es: "INTERSECCIÃ“N DE TRES LÃNEAS EN PARES",
        fr: "INTERSECTION DE TROIS LIGNES PAR PAIRES",
        pt: "INTERSEÃ‡ÃƒO DE TRÃŠS LINHAS EM PARES",
        ja: "3æœ¬ã®ç·šã®ãƒšã‚¢ã”ã¨ã®äº¤å·®",
        link: "https://bekrmatmt2507.my.canva.site/ikiser-kesisen-dogru"
    },
    {
        tr: "DÄ°KDÃ–RTGENÄ°N Ã‡EVRE VE ALANI",
        en: "PERIMETER AND AREA OF RECTANGLE",
        de: "UMFANG UND FLÃ„CHE DES RECHTECKS",
        ar: "Ù…Ø­ÙŠØ· ÙˆÙ…Ø³Ø§Ø­Ø© Ø§Ù„Ù…Ø³ØªØ·ÙŠÙ„",
        hi: "à¤†à¤¯à¤¤ à¤•à¤¾ à¤ªà¤°à¤¿à¤®à¤¾à¤ª à¤”à¤° à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¤«à¤²",
        ms: "PERIMETER DAN LUAS SEGI EMPAT TEPAT",
        id: "KELILING DAN LUAS PERSEGI PANJANG",
        zh: "é•¿æ–¹å½¢çš„å‘¨é•¿å’Œé¢ç§¯",
        ru: "ĞŸĞ•Ğ Ğ˜ĞœĞ•Ğ¢Ğ  Ğ˜ ĞŸĞ›ĞĞ©ĞĞ”Ğ¬ ĞŸĞ Ğ¯ĞœĞĞ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞ",
        es: "PERÃMETRO Y ÃREA DEL RECTÃNGULO",
        fr: "PÃ‰RIMÃˆTRE ET AIRE DU RECTANGLE",
        pt: "PERÃMETRO E ÃREA DO RETÃ‚NGULO",
        ja: "é•·æ–¹å½¢ã®å‘¨å›²ã¨é¢ç©",
        link: "https://bdemir1499.github.io/dikdortgen-cevre-ve-alan/"
    },
    {
        tr: "DÃ–RTGENLERÄ°N Ã–ZELLÄ°KLERÄ° (TÃœMEVARIM)",
        en: "PROPERTIES OF QUADRILATERALS (INDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (INDUKTION)",
        ar: "Ø®ØµØ§Ø¦Øµ Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ© (Ø§Ù„Ø§Ø³ØªÙ‚Ø±Ø§Ø¡)",
        hi: "à¤šà¤¤à¥à¤°à¥à¤­à¥à¤œ à¤•à¥‡ à¤—à¥à¤£ (à¤†à¤—à¤®à¤¨)",
        ms: "SIFAT-SIFAT SISI EMPAT (INDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (INDUKSI)",
        zh: "å››è¾¹å½¢çš„å±æ€§ï¼ˆå½’çº³æ³•ï¼‰",
        ru: "Ğ¡Ğ’ĞĞ™Ğ¡Ğ¢Ğ’Ğ Ğ§Ğ•Ğ¢Ğ«Ğ Ğ•Ğ¥Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ’ (Ğ˜ĞĞ”Ğ£ĞšĞ¦Ğ˜Ğ¯)",
        es: "PROPIEDADES DE LOS CUADRILÃTEROS (INDUCCIÃ“N)",
        fr: "PROPRIÃ‰TÃ‰S DES QUADRILATÃˆRES (INDUCTION)",
        pt: "PROPRIEDADES DOS QUADRILÃTEROS (INDUÃ‡ÃƒO)",
        ja: "å››è§’å½¢ã®æ€§è³ªï¼ˆå¸°ç´æ³•ï¼‰",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-ve-ozellikleri-tumevarim"
    },
    {
        tr: "DÃ–RTGENLERÄ°N Ã–ZELLÄ°KLERÄ° (TÃœMDEN GELÄ°M)",
        en: "PROPERTIES OF QUADRILATERALS (DEDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (DEDUKTION)",
        ar: "Ø®ØµØ§Ø¦Øµ Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ© (Ø§Ù„Ø§Ø³ØªÙ†ØªØ§Ø¬)",
        hi: "à¤šà¤¤à¥à¤°à¥à¤­à¥à¤œ à¤•à¥‡ à¤—à¥à¤£ (à¤¨à¤¿à¤—à¤®à¤¨)",
        ms: "SIFAT-SIFAT SISI EMPAT (DEDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (DEDUKSI)",
        zh: "å››è¾¹å½¢çš„å±æ€§ï¼ˆæ¼”ç»æ³•ï¼‰",
        ru: "Ğ¡Ğ’ĞĞ™Ğ¡Ğ¢Ğ’Ğ Ğ§Ğ•Ğ¢Ğ«Ğ Ğ•Ğ¥Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ’ (Ğ”Ğ•Ğ”Ğ£ĞšĞ¦Ğ˜Ğ¯)",
        es: "PROPIEDADES DE LOS CUADRILÃTEROS (DEDUCCIÃ“N)",
        fr: "PROPRIÃ‰TÃ‰S DES QUADRILATÃˆRES (DÃ‰DUCTION)",
        pt: "PROPRIEDADES DOS QUADRILÃTEROS (DEDUÃ‡ÃƒO)",
        ja: "å››è§’å½¢ã®æ€§è³ªï¼ˆæ¼”ç¹¹æ³•ï¼‰",
        link: "https://bdemir1499.github.io/dortgen-ve-ozellikleri-tumdengelim/"
    },
    {
        tr: "Ä°KÄ° PARALEL DOÄRUNUN BÄ°R KESENLE YAPTIÄI AÃ‡ILAR (2)",
        en: "ANGLES FORMED BY TWO PARALLEL LINES AND A TRANSVERSAL (2)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (2)",
        ar: "Ø§Ù„Ø²ÙˆØ§ÙŠØ§ Ø§Ù„Ù†Ø§ØªØ¬Ø© Ø¹Ù† Ù…ØªÙˆØ§Ø²ÙŠÙŠÙ† ÙˆÙ‚Ø§Ø·Ø¹ (2)",
        hi: "à¤¦à¥‹ à¤¸à¤®à¤¾à¤‚à¤¤à¤° à¤°à¥‡à¤–à¤¾à¤“à¤‚ à¤”à¤° bir à¤¤à¤¿à¤°à¥à¤¯à¤• à¤°à¥‡à¤–à¤¾ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤¬à¤¨à¥‡ à¤•à¥‹à¤£ (2)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (2)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (2)",
        zh: "ä¸¤æ¡å¹³è¡Œçº¿å’Œä¸€æ¡æˆªçº¿å½¢æˆçš„è§’ (2)",
        ru: "Ğ£Ğ“Ğ›Ğ« ĞŸĞ Ğ˜ ĞŸĞĞ ĞĞ›Ğ›Ğ•Ğ›Ğ¬ĞĞ«Ğ¥ Ğ˜ Ğ¡Ğ•ĞšĞ£Ğ©Ğ•Ğ™ (2)",
        es: "ÃNGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (2)",
        fr: "ANGLES FORMÃ‰S PAR DEUX PARALLÃˆLES ET UNE TRANSVERSALE (2)",
        pt: "Ã‚NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (2)",
        ja: "2æœ¬ã®å¹³è¡Œç·šã¨1æœ¬ã®æ¨ªæ–­ç·šã«ã‚ˆã£ã¦å½¢æˆã•ã‚Œã‚‹è§’ (2)",
        link: "https://bekrmatmt25.my.canva.site/iki-paralel-dogrunun-bir-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "DÃ–NÃœÅÃœM GEOMETRÄ°SÄ° (Ã–TELEME/YANSIMA)",
        en: "TRANSFORMATION GEOMETRY (TRANSLATION/REFLECTION)",
        de: "TRANSFORMATIONSGEOMETRIE (VERSCHIEBUNG/SPIEGELUNG)",
        ar: "Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„ØªØ­ÙˆÙŠÙ„ÙŠØ© (Ø§Ù„Ø¥Ø²Ø§Ø­Ø©/Ø§Ù„Ø§Ù†Ø¹ÙƒØ§Ø³)",
        hi: "à¤°à¥‚à¤ªà¤¾à¤‚à¤¤à¤°à¤£ à¤œà¥à¤¯à¤¾à¤®à¤¿à¤¤à¤¿ (à¤¸à¥à¤¥à¤¾à¤¨à¤¾à¤‚à¤¤à¤°à¤£/à¤ªà¤°à¤¾à¤µà¤°à¥à¤¤à¤¨)",
        ms: "GEOMETRI TRANSFORMASI (TRANSLASI/PANTULAN)",
        id: "GEOMETRI TRANSFORMASI (TRANSLASI/REFLEKSI)",
        zh: "å˜æ¢å‡ ä½•ï¼ˆå¹³ç§»/åå°„ï¼‰",
        ru: "Ğ“Ğ•ĞĞœĞ•Ğ¢Ğ Ğ˜Ğ¯ ĞŸĞ Ğ•ĞĞ‘Ğ ĞĞ—ĞĞ’ĞĞĞ˜Ğ™ (ĞŸĞ•Ğ Ğ•ĞĞĞ¡/ĞĞ¢Ğ ĞĞ–Ğ•ĞĞ˜Ğ•)",
        es: "GEOMETRÃA DE TRANSFORMACIÃ“N (TRASLACIÃ“N/REFLEXIÃ“N)",
        fr: "GÃ‰OMÃ‰TRIE DE TRANSFORMATION (TRANSLATION/RÃ‰FLEXION)",
        pt: "GEOMETRIA DE TRANSFORMAÃ‡ÃƒO (TRANSLAÃ‡ÃƒO/REFLEXÃƒO)",
        ja: "å¤‰æ›å¹¾ä½•å­¦ï¼ˆå¹³ç§»/åå°„ï¼‰",
        link: "https://bekrmatmt25.my.canva.site/oteleme-ve-yansima"
    },
    {
        tr: "DÃ–RTGEN Ã‡EÅÄ°TLERÄ° KAVRAM HARÄ°TASI",
        en: "CONCEPT MAP OF QUADRILATERAL TYPES",
        de: "BEGRIFFSMAP DER VIERECKARTEN",
        ar: "Ø®Ø±ÙŠØ·Ø© Ù…ÙØ§Ù‡ÙŠÙ… Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ©",
        hi: "à¤šà¤¤à¥à¤°à¥à¤­à¥à¤œ à¤ªà¥à¤°à¤•à¤¾à¤°à¥‹à¤‚ à¤•à¤¾ à¤…à¤µà¤§à¤¾à¤°à¤£à¤¾ à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤°",
        ms: "PETA KONSEP JENIS SISI EMPAT",
        id: "PETA KONSEP JENIS SEGI EMPAT",
        zh: "å››è¾¹å½¢ç±»å‹æ¦‚å¿µå›¾",
        ru: "ĞšĞĞĞ¦Ğ•ĞŸĞ¢Ğ£ĞĞ›Ğ¬ĞĞĞ¯ ĞšĞĞ Ğ¢Ğ Ğ¢Ğ˜ĞŸĞĞ’ Ğ§Ğ•Ğ¢Ğ«Ğ Ğ•Ğ¥Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ’",
        es: "MAPA CONCEPTUAL DE TIPOS DE CUADRILÃTEROS",
        fr: "CARTE CONCEPTUELLE DES TYPES DE QUADRILATÃˆRES",
        pt: "MAPA CONCEITUAL DE TIPOS DE QUADRILÃTEROS",
        ja: "å››è§’å½¢ã®ã‚¿ã‚¤ãƒ—ã®æ¦‚å¿µå›³",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-kavram-haritasi"
    },
    {
        tr: "DÃ–RTGENLER GENEL Ã‡IKARIMLAR",
        en: "GENERAL INFERENCES ABOUT QUADRILATERALS",
        de: "ALLGEMEINE SCHLUSSFOLGERUNGEN ÃœBER VIERECKE",
        ar: "Ø§Ù„Ø§Ø³ØªÙ†ØªØ§Ø¬Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø© Ø­ÙˆÙ„ Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ©",
        hi: "à¤šà¤¤à¥à¤°à¥à¤­à¥à¤œà¥‹à¤‚ à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¨à¤¿à¤·à¥à¤•à¤°à¥à¤·",
        ms: "INFERENS UMUM TENTANG SISI EMPAT",
        id: "KESIMPULAN UMUM TENTANG SEGI EMPAT",
        zh: "å…³äºå››è¾¹å½¢çš„ä¸€èˆ¬æ¨è®º",
        ru: "ĞĞ‘Ğ©Ğ˜Ğ• Ğ’Ğ«Ğ’ĞĞ”Ğ« Ğ Ğ§Ğ•Ğ¢Ğ«Ğ Ğ•Ğ¥Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ¥",
        es: "INFERENCIAS GENERALES SOBRE CUADRILÃTEROS",
        fr: "INFERENCES GÃ‰NÃ‰RALES SUR LES QUADRILATÃˆRES",
        pt: "INFERÃŠNCIAS GERAIS SOBRE QUADRILÃTEROS",
        ja: "å››è§’å½¢ã«é–¢ã™ã‚‹ä¸€èˆ¬çš„ãªæ¨è«–",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-genel-cikarimlar"
    },
    {
        tr: "KESÄ°RLERÄ°N FARKLI GÃ–STERÄ°MLERÄ°",
        en: "DIFFERENT REPRESENTATIONS OF FRACTIONS",
        de: "VERSCHIEDENE DARSTELLUNGEN VON BRÃœCHEN",
        ar: "ØªÙ…Ø«ÙŠÙ„Ø§Øª Ù…Ø®ØªÙ„ÙØ© Ù„Ù„ÙƒØ³ÙˆØ±",
        hi: "à¤­à¤¿à¤¨à¥à¤¨à¥‹à¤‚ à¤•à¥‡ à¤µà¤¿à¤­à¤¿à¤¨à¥à¤¨ à¤¨à¤¿à¤°à¥‚à¤ªà¤£",
        ms: "PERWAKILAN PECAHAN YANG BERBEZA",
        id: "BERBAGAI REPRESENTASI PECAHAN",
        zh: "åˆ†æ•°çš„ä¸åŒè¡¨ç¤ºå½¢å¼",
        ru: "Ğ ĞĞ—Ğ›Ğ˜Ğ§ĞĞ«Ğ• ĞŸĞ Ğ•Ğ”Ğ¡Ğ¢ĞĞ’Ğ›Ğ•ĞĞ˜Ğ¯ Ğ”Ğ ĞĞ‘Ğ•Ğ™",
        es: "DIFERENTES REPRESENTACIONES DE FRACCIONES",
        fr: "DIFFÃ‰RENTES REPRÃ‰SENTATIONS DES FRACTIONS",
        pt: "DIFERENTES REPRESENTAÃ‡Ã•ES DE FRAÃ‡Ã•ES",
        ja: "åˆ†æ•°ã®ã•ã¾ã–ã¾ãªè¡¨ç¾",
        link: "https://bekrmatmt25.my.canva.site/kesirlerin-farkl-g-sterimleri"
    },
    {
        tr: "KÃ–ÅEGENLERDEN DÃ–RTGENLERE (1)",
        en: "FROM DIAGONALS TO QUADRILATERALS (1)",
        de: "VON DIAGONALEN ZU VIERECKEN (1)",
        ar: "Ù…Ù† Ø§Ù„Ø£Ù‚Ø·Ø§Ø± Ø¥Ù„Ù‰ Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ© (1)",
        hi: "à¤µà¤¿à¤•à¤°à¥à¤£à¥‹à¤‚ à¤¸à¥‡ à¤šà¤¤à¥à¤°à¥à¤­à¥à¤œ à¤¤à¤• (1)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (1)",
        id: "DARI DIAGONAL KE SEGI EMPAT (1)",
        zh: "ä»å¯¹è§’çº¿åˆ°å››è¾¹å½¢ (1)",
        ru: "ĞĞ¢ Ğ”Ğ˜ĞĞ“ĞĞĞĞ›Ğ•Ğ™ Ğš Ğ§Ğ•Ğ¢Ğ«Ğ Ğ•Ğ¥Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞœ (1)",
        es: "DE LAS DIAGONALES A LOS CUADRILÃTEROS (1)",
        fr: "DES DIAGONALES AUX QUADRILATÃˆRES (1)",
        pt: "DAS DIAGONAIS AOS QUADRILÃTEROS (1)",
        ja: "å¯¾è§’ç·šã‹ã‚‰å››è§’å½¢ã¸ (1)",
        link: "https://bekrmatmt25.my.canva.site/k-egenlerden-d-rtgenlere"
    },
    {
        tr: "CEBÄ°RSEL Ä°FADELER TEMEL KAVRAMLAR",
        en: "ALGEBRAIC EXPRESSIONS BASIC CONCEPTS",
        de: "ALGEBRAISCHE AUSDRÃœCKE - GRUNDBEGRIFFE",
        ar: "Ø§Ù„Ù…ÙØ§Ù‡ÙŠÙ… Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ù„Ù„ØªØ¹Ø¨ÙŠØ±Ø§Øª Ø§Ù„Ø¬Ø¨Ø±ÙŠØ©",
        hi: "à¤¬à¥€à¤œà¤—à¤£à¤¿à¤¤à¥€à¤¯ à¤µà¥à¤¯à¤‚à¤œà¤• à¤¬à¥à¤¨à¤¿à¤¯à¤¾à¤¦à¥€ à¤…à¤µà¤§à¤¾à¤°à¤£à¤¾à¤à¤",
        ms: "UNGKAPAN ALGEBRA KONSEP ASAS",
        id: "KONSEP DASAR EKSPRESI ALJABAR",
        zh: "ä»£æ•°å¼åŸºæœ¬æ¦‚å¿µ",
        ru: "ĞĞ›Ğ“Ğ•Ğ‘Ğ ĞĞ˜Ğ§Ğ•Ğ¡ĞšĞ˜Ğ• Ğ’Ğ«Ğ ĞĞ–Ğ•ĞĞ˜Ğ¯: ĞĞ¡ĞĞĞ’ĞĞ«Ğ• ĞŸĞĞĞ¯Ğ¢Ğ˜Ğ¯",
        es: "EXPRESIONES ALGEBRAICAS CONCEPTOS BÃSICOS",
        fr: "EXPRESSIONS ALGÃ‰BRIQUES CONCEPTS DE BASE",
        pt: "EXPRESSÃ•ES ALGÃ‰BRICAS CONCEITOS BÃSICOS",
        ja: "ä»£æ•°å¼ã®åŸºæœ¬æ¦‚å¿µ",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-temel-kavramlar"
    },
    {
        tr: "CEBÄ°RSEL Ä°FADELER SÃ–ZELDEN CEBÄ°RE",
        en: "ALGEBRAIC EXPRESSIONS FROM VERBAL TO ALGEBRAIC",
        de: "VON DER SPRACHE ZUR ALGEBRA",
        ar: "Ø§Ù„ØªØ¹Ø¨ÙŠØ±Ø§Øª Ø§Ù„Ø¬Ø¨Ø±ÙŠØ© Ù…Ù† Ø§Ù„Ù„ÙØ¸ÙŠØ© Ø¥Ù„Ù‰ Ø§Ù„Ø¬Ø¨Ø±ÙŠØ©",
        hi: "à¤¬à¥€à¤œà¤—à¤£à¤¿à¤¤à¥€à¤¯ à¤µà¥à¤¯à¤‚à¤œà¤•: à¤®à¥Œà¤–à¤¿à¤• à¤¸à¥‡ à¤¬à¥€à¤œà¤—à¤£à¤¿à¤¤à¥€à¤¯",
        ms: "UNGKAPAN ALGEBRA DARIPADA LISAN KEPADA ALGEBRA",
        id: "EKSPRESI ALJABAR DARI VERBAL KE ALJABAR",
        zh: "ä»£æ•°å¼ï¼šä»è¯­è¨€åˆ°ä»£æ•°",
        ru: "ĞĞ›Ğ“Ğ•Ğ‘Ğ ĞĞ˜Ğ§Ğ•Ğ¡ĞšĞ˜Ğ• Ğ’Ğ«Ğ ĞĞ–Ğ•ĞĞ˜Ğ¯: ĞĞ¢ Ğ¡Ğ›ĞĞ’ Ğš ĞĞ›Ğ“Ğ•Ğ‘Ğ Ğ•",
        es: "EXPRESIONES ALGEBRAICAS DE VERBAL A ALGEBRAICO",
        fr: "EXPRESSIONS ALGÃ‰BRIQUES DU VERBAL Ã€ L'ALGÃ‰BRIQUE",
        pt: "EXPRESSÃ•ES ALGÃ‰BRICAS DO VERBAL PARA O ALGÃ‰BRICO",
        ja: "ä»£æ•°å¼ï¼šè¨€èªã‹ã‚‰ä»£æ•°ã¸",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerle-oyun-tasar-m-kopyas"
    },
    {
        tr: "CEBÄ°RSEL Ä°FADELER CEBÄ°RDEN SÃ–ZELE",
        en: "ALGEBRAIC EXPRESSIONS FROM ALGEBRAIC TO VERBAL",
        de: "VON DER ALGEBRA ZUR SPRACHE",
        ar: "Ø§Ù„ØªØ¹Ø¨ÙŠØ±Ø§Øª Ø§Ù„Ø¬Ø¨Ø±ÙŠØ© Ù…Ù† Ø§Ù„Ø¬Ø¨Ø±ÙŠØ© Ø¥Ù„Ù‰ Ø§Ù„Ù„ÙØ¸ÙŠØ©",
        hi: "à¤¬à¥€à¤œà¤—à¤£à¤¿à¤¤à¥€à¤¯ à¤µà¥à¤¯à¤‚à¤œà¤•: à¤¬à¥€à¤œà¤—à¤£à¤¿à¤¤à¥€à¤¯ à¤¸à¥‡ à¤®à¥Œà¤–à¤¿à¤•",
        ms: "UNGKAPAN ALGEBRA DARIPADA ALGEBRA KEPADA LISAN",
        id: "EKSPRESI ALJABAR DARI ALJABAR KE VERBAL",
        zh: "ä»£æ•°å¼ï¼šä»ä»£æ•°åˆ°è¯­è¨€",
        ru: "ĞĞ›Ğ“Ğ•Ğ‘Ğ ĞĞ˜Ğ§Ğ•Ğ¡ĞšĞ˜Ğ• Ğ’Ğ«Ğ ĞĞ–Ğ•ĞĞ˜Ğ¯: ĞĞ¢ ĞĞ›Ğ“Ğ•Ğ‘Ğ Ğ« Ğš Ğ¡Ğ›ĞĞ’ĞĞœ",
        es: "EXPRESIONES ALGEBRAICAS DE ALGEBRAICO A VERBAL",
        fr: "EXPRESSIONS ALGÃ‰BRIQUES DE L'ALGÃ‰BRIQUE AU VERBAL",
        pt: "EXPRESSÃ•ES ALGÃ‰BRICAS DO ALGÃ‰BRICO PARA O VERBAL",
        ja: "ä»£æ•°å¼ï¼šä»£æ•°ã‹ã‚‰è¨€èªã¸",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-2-cebirden-s-zele"
    },
    {
        tr: "CEBÄ°RSEL Ä°FADELER DEÄER HESAPLAMA",
        en: "CALCULATING VALUES OF ALGEBRAIC EXPRESSIONS",
        de: "BERECHNEN VON WERTE ALGEBRAISCHER AUSDRÃœCKE",
        ar: "Ø­Ø³Ø§Ø¨ Ù‚ÙŠÙ… Ø§Ù„ØªØ¹Ø¨ÙŠØ±Ø§Øª Ø§Ù„Ø¬Ø¨Ø±ÙŠØ©",
        hi: "à¤¬à¥€à¤œà¤—à¤£à¤¿à¤¤à¥€à¤¯ à¤µà¥à¤¯à¤‚à¤œà¤•à¥‹à¤‚ à¤•à¥‡ à¤®à¤¾à¤¨à¥‹à¤‚ à¤•à¥€ à¤—à¤£à¤¨à¤¾",
        ms: "MENGIRA NILAI UNGKAPAN ALGEBRA",
        id: "MENGHITUNG NILAI EKSPRESI ALJABAR",
        zh: "è®¡ç®—ä»£æ•°å¼çš„å€¼",
        ru: "Ğ’Ğ«Ğ§Ğ˜Ğ¡Ğ›Ğ•ĞĞ˜Ğ• Ğ—ĞĞĞ§Ğ•ĞĞ˜Ğ™ ĞĞ›Ğ“Ğ•Ğ‘Ğ ĞĞ˜Ğ§Ğ•Ğ¡ĞšĞ˜Ğ¥ Ğ’Ğ«Ğ ĞĞ–Ğ•ĞĞ˜Ğ™",
        es: "CALCULAR VALORES DE EXPRESIONES ALGEBRAICAS",
        fr: "CALCUL DES VALEURS D'EXPRESSIONS ALGÃ‰BRIQUES",
        pt: "CALCULAR VALORES DE EXPRESSÃ•ES ALGÃ‰BRICAS",
        ja: "ä»£æ•°å¼ã®å€¤ã®è¨ˆç®—",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerin-degerini-hesaplamak"
    },
    {
        tr: "ARAÅTIRMA ADIMLARI (Canva)",
        en: "RESEARCH STEPS (Canva)",
        de: "FORSCHUNGSSCHRITTE (Canva)",
        ar: "Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø¨Ø­Ø« (ÙƒØ§Ù†ÙØ§)",
        hi: "à¤…à¤¨à¥à¤¸à¤‚à¤§à¤¾à¤¨ à¤šà¤°à¤£ (Canva)",
        ms: "LANGKAH PENYELIDIKAN (Canva)",
        id: "LANGKAH PENELITIAN (Canva)",
        zh: "ç ”ç©¶æ­¥éª¤ (Canva)",
        ru: "Ğ­Ğ¢ĞĞŸĞ« Ğ˜Ğ¡Ğ¡Ğ›Ğ•Ğ”ĞĞ’ĞĞĞ˜Ğ¯ (Canva)",
        es: "PASOS DE INVESTIGACIÃ“N (Canva)",
        fr: "Ã‰TAPES DE RECHERCHE (Canva)",
        pt: "PASSOS DE PESQUISA (Canva)",
        ja: "ç ”ç©¶ã®ã‚¹ãƒ†ãƒƒãƒ— (Canva)",
        link: "https://bekrmatmt25.my.canva.site/5-sinif-arastirma-adimlari"
    },
    {
        tr: "ARAÅTIRMA ADIMLARI (GitHub)",
        en: "RESEARCH STEPS (GitHub)",
        de: "FORSCHUNGSSCHRITTE (GitHub)",
        ar: "Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø¨Ø­Ø« (Ø¬ÙŠØª Ù‡Ø§Ø¨)",
        hi: "à¤…à¤¨à¥à¤¸à¤‚à¤§à¤¾à¤¨ à¤šà¤°à¤£ (GitHub)",
        ms: "LANGKAH PENYELIDIKAN (GitHub)",
        id: "LANGKAH PENELITIAN (GitHub)",
        zh: "ç ”ç©¶æ­¥éª¤ (GitHub)",
        ru: "Ğ­Ğ¢ĞĞŸĞ« Ğ˜Ğ¡Ğ¡Ğ›Ğ•Ğ”ĞĞ’ĞĞĞ˜Ğ¯ (GitHub)",
        es: "PASOS DE INVESTIGACIÃ“N (GitHub)",
        fr: "Ã‰TAPES DE RECHERCHE (GitHub)",
        pt: "PASSOS DE PESQUISA (GitHub)",
        ja: "ç ”ç©¶ã®ã‚¹ãƒ†ãƒƒãƒ— (GitHub)",
        link: "https://bdemir1499.github.io/5.sinif-arastirma-asamalari/"
    },
    {
        tr: "ÃœÃ‡GENDE YARDIMCI ELEMANLAR",
        en: "AUXILIARY ELEMENTS IN TRIANGLES",
        de: "HILFSELEMENTE IN DREIECKEN",
        ar: "Ø§Ù„Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ù„Ù…Ø«Ù„Ø«",
        hi: "à¤¤à¥à¤°à¤¿à¤­à¥à¤œà¥‹à¤‚ à¤®à¥‡à¤‚ à¤¸à¤¹à¤¾à¤¯à¤• à¤¤à¤¤à¥à¤µ",
        ms: "ELEMEN PEMBANTU DALAM SEGI TIGA",
        id: "UNSUR PEMBANTU DALAM SEGITIGA",
        zh: "ä¸‰è§’å½¢ä¸­çš„è¾…åŠ©è¦ç´ ",
        ru: "Ğ’Ğ¡ĞŸĞĞœĞĞ“ĞĞ¢Ğ•Ğ›Ğ¬ĞĞ«Ğ• Ğ­Ğ›Ğ•ĞœĞ•ĞĞ¢Ğ« Ğ’ Ğ¢Ğ Ğ•Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ¥",
        es: "ELEMENTOS AUXILIARES EN TRIÃNGULOS",
        fr: "Ã‰LÃ‰MENTS AUXILIAIRES DANS LES TRIANGLES",
        pt: "ELEMENTOS AUXILIARES EM TRIÃ‚NGULOS",
        ja: "ä¸‰è§’å½¢ã®è£œåŠ©è¦ç´ ",
        link: "https://bekrmatmt25.my.canva.site/ucgende-yardim-i-elemanlar"
    },
    {
        tr: "ÃœÃ‡GEN Ã‡Ä°ZÄ°MÄ°",
        en: "TRIANGLE DRAWING",
        de: "DREIECKE ZEICHNEN",
        ar: "Ø±Ø³Ù… Ø§Ù„Ù…Ø«Ù„Ø«",
        hi: "à¤¤à¥à¤°à¤¿à¤­à¥à¤œ à¤†à¤°à¥‡à¤–à¤£",
        ms: "LUKISAN SEGI TIGA",
        id: "MENGGAMBAR SEGITIGA",
        zh: "ä¸‰è§’å½¢ç»˜åˆ¶",
        ru: "ĞŸĞĞ¡Ğ¢Ğ ĞĞ•ĞĞ˜Ğ• Ğ¢Ğ Ğ•Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞ",
        es: "DIBUJO DE TRIÃNGULOS",
        fr: "DESSIN DE TRIANGLE",
        pt: "DESENHO DE TRIÃ‚NGULOS",
        ja: "ä¸‰è§’å½¢ã®ä½œå›³",
        link: "https://bekrmatmt25.my.canva.site/ucgen-cizim-sartlari"
    },
    {
        tr: "ÃœÃ‡GENDE EÅLÄ°K VE BENZERLÄ°K",
        en: "CONGRUENCE AND SIMILARITY IN TRIANGLES",
        de: "KONGRUENZ UND Ã„HNLICHKEIT IN DREIECKEN",
        ar: "ØªØ·Ø§Ø¨Ù‚ ÙˆØªØ´Ø§Ø¨Ù‡ Ø§Ù„Ù…Ø«Ù„Ø«Ø§Øª",
        hi: "à¤¤à¥à¤°à¤¿à¤­à¥à¤œà¥‹à¤‚ à¤®à¥‡à¤‚ à¤¸à¤°à¥à¤µà¤¾à¤‚à¤—à¤¸à¤®à¤¤à¤¾ à¤”à¤° à¤¸à¤®à¤°à¥‚à¤ªà¤¤à¤¾",
        ms: "KONGRUEN DAN KESERUPAAN DALAM SEGI TIGA",
        id: "KEKONGRUENAN DAN KESEBANGUNAN DALAM SEGITIGA",
        zh: "ä¸‰è§’å½¢çš„å…¨ç­‰å’Œç›¸ä¼¼",
        ru: "ĞšĞĞĞ“Ğ Ğ£Ğ­ĞĞ¢ĞĞĞ¡Ğ¢Ğ¬ Ğ˜ ĞŸĞĞ”ĞĞ‘Ğ˜Ğ• Ğ¢Ğ Ğ•Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞ’",
        es: "CONGRUENCIA Y SEMEJANZA EN TRIÃNGULOS",
        fr: "CONGRUENCE ET SIMILITUDE DANS LES TRIANGLES",
        pt: "CONGRUÃŠNCIA E SEMELHANÃ‡A EM TRIÃ‚NGULOS",
        ja: "ä¸‰è§’å½¢ã®åˆåŒã¨ç›¸ä¼¼",
        link: "https://bdemir1499.github.io/eslikvebenzerlik/"
    },
    {
        tr: "PRÄ°ZMALARIN ELEMANLARI",
        en: "ELEMENTS OF PRISMS",
        de: "ELEMENTE VON PRISMEN",
        ar: "Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…Ù†Ø´ÙˆØ±Ø§Øª",
        hi: "à¤ªà¥à¤°à¤¿à¤œà¥à¤® à¤•à¥‡ à¤¤à¤¤à¥à¤µ",
        ms: "ELEMEN PRISMA",
        id: "UNSUR-UNSUR PRISMA",
        zh: "æ£±æŸ±çš„è¦ç´ ",
        ru: "Ğ­Ğ›Ğ•ĞœĞ•ĞĞ¢Ğ« ĞŸĞ Ğ˜Ğ—Ğœ",
        es: "ELEMENTOS DE LOS PRISMAS",
        fr: "Ã‰LÃ‰MENTS DES PRISMES",
        pt: "ELEMENTOS DOS PRISMAS",
        ja: "æŸ±ä½“ã®è¦ç´ ",
        link: "https://bekrmatmt25.my.canva.site/prizmalarin-elemanlar-ve-a-inimlari"
    },
    {
        tr: "PÄ°RAMÄ°T VE AÃ‡INIMI",
        en: "PYRAMID AND ITS NET",
        de: "PYRAMIDE UND IHR NETZ",
        ar: "Ø§Ù„Ù‡Ø±Ù… ÙˆØ´Ø¨ÙƒØªÙ‡",
        hi: "à¤ªà¤¿à¤°à¤¾à¤®à¤¿à¤¡ à¤”à¤° à¤‰à¤¸à¤•à¤¾ à¤œà¤¾à¤²",
        ms: "PIRAMID DAN BENTANGANNYA",
        id: "LIMAS DAN JARING-JARINGNYA",
        zh: "æ£±é”¥åŠå…¶å±•å¼€å›¾",
        ru: "ĞŸĞ˜Ğ ĞĞœĞ˜Ğ”Ğ Ğ˜ Ğ•Ğ• Ğ ĞĞ—Ğ’Ğ•Ğ Ğ¢ĞšĞ",
        es: "PIRÃMIDE Y SU DESARROLLO",
        fr: "PYRAMIDE ET SON PATRON",
        pt: "PIRÃ‚MIDE E SUA PLANIFICAÃ‡ÃƒO",
        ja: "éŒä½“ã¨ãã®å±•é–‹å›³",
        link: "https://bekrmatmt25.my.canva.site/piramidin-elemanlar-ve-acinimi"
    },
    {
        tr: "PRÄ°ZMA, PÄ°RAMÄ°T, KONÄ°, SÄ°LÄ°NDÄ°R",
        en: "PRISM, PYRAMID, CONE, CYLINDER",
        de: "PRISMA, PYRAMIDE, KEGEL, ZYLINDER",
        ar: "Ø§Ù„Ù…Ù†Ø´ÙˆØ±ØŒ Ø§Ù„Ù‡Ø±Ù…ØŒ Ø§Ù„Ù…Ø®Ø±ÙˆØ·ØŒ Ø§Ù„Ø§Ø³Ø·ÙˆØ§Ù†Ø©",
        hi: "à¤ªà¥à¤°à¤¿à¤œà¥à¤®, à¤ªà¤¿Ñ€Ğ°à¤®à¤¿à¤¡, à¤¶à¤‚à¤•à¥, à¤¬à¥‡à¤²à¤¨",
        ms: "PRISMA, PIRAMID, KON, SILINDIR",
        id: "PRISMA, LIMAS, KERUCUT, TABUNG",
        zh: "æ£±æŸ±ã€æ£±é”¥ã€åœ†é”¥ã€åœ†æŸ±",
        ru: "ĞŸĞ Ğ˜Ğ—ĞœĞ, ĞŸĞ˜Ğ ĞĞœĞ˜Ğ”Ğ, ĞšĞĞĞ£Ğ¡, Ğ¦Ğ˜Ğ›Ğ˜ĞĞ”Ğ ",
        es: "PRISMA, PIRÃMIDE, CONO, CILINDRO",
        fr: "PRISME, PYRAMIDE, CÃ”NE, CYLINDRE",
        pt: "PRISMA, PIRÃ‚MIDE, CONE, CILINDRO",
        ja: "æŸ±ä½“ã€éŒä½“ã€å††éŒã€å††æŸ±",
        link: "https://sites.google.com/view/uc-boyutlu-sekiller/ana-sayfa_1"
    },
    {
        tr: "KÃ–ÅEGENLERDEN DÃ–RTGENLERE (2)",
        en: "FROM DIAGONALS TO QUADRILATERALS (2)",
        de: "VON DIAGONALEN ZU VIERECKEN (2)",
        ar: "Ù…Ù† Ø§Ù„Ø£Ù‚Ø·Ø§Ø± Ø¥Ù„Ù‰ Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ© (2)",
        hi: "à¤µà¤¿à¤•à¤°à¥à¤£à¥‹à¤‚ à¤¸à¥‡ à¤šà¤¤à¥à¤°à¥à¤­à¥à¤œ à¤¤à¤• (2)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (2)",
        id: "DARI DIAGONAL KE SEGI EMPAT (2)",
        zh: "ä»å¯¹è§’çº¿åˆ°å››è¾¹å½¢ (2)",
        ru: "ĞĞ¢ Ğ”Ğ˜ĞĞ“ĞĞĞĞ›Ğ•Ğ™ Ğš Ğ§Ğ•Ğ¢Ğ«Ğ Ğ•Ğ¥Ğ£Ğ“ĞĞ›Ğ¬ĞĞ˜ĞšĞĞœ (2)",
        es: "DE LAS DIAGONALES A LOS CUADRILÃTEROS (2)",
        fr: "DES DIAGONALES AUX QUADRILATÃˆRES (2)",
        pt: "DAS DIAGONAIS AOS QUADRILÃTEROS (2)",
        ja: "å¯¾è§’ç·šã‹ã‚‰å››è§’å½¢ã¸ (2)",
        link: "https://bekrmatmt25.my.canva.site/kosegenlerden-dortgenlere"
    }
];

// --- BURAYA YAPIÅTIR ---
window.sendNetworkData = function (dataObj) {
    // 1. Durum: EÄŸer bu cihaz TABLET ise (tahtaya baÄŸlÄ±yÄ±z)
    if (typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        myConnection.send(dataObj);
    }
    // 2. Durum: EÄŸer bu cihaz AKILLI TAHTA ise (baÄŸlÄ± olan tabletlere gÃ¶nder)
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        for (let id in window.aktifBaglantilar) {
            if (window.aktifBaglantilar[id] && window.aktifBaglantilar[id].open) {
                window.aktifBaglantilar[id].send(dataObj);
            }
        }
    }
};


// Sayfa aÃ§Ä±ldÄ±ÄŸÄ±nda kÄ±rmÄ±zÄ± butonun yanlÄ±ÅŸlÄ±kla gÃ¶rÃ¼nmesini engellemek iÃ§in:
const closePdfBtn = document.getElementById('btn-close-pdf');
if (closePdfBtn) {
    closePdfBtn.classList.add('hidden');
    closePdfBtn.style.display = 'none'; // Kesin olarak gizle
}




function getGlobalCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    let cX = e.clientX;
    let cY = e.clientY;

    // --- SÄ°ZÄ°N ORÄ°JÄ°NAL HATA KORUMA MANTIÄINIZ (AvuÃ§ iÃ§i karÄ±ÅŸmasÄ±nÄ± engeller) ---
    // EÄŸer cX tanÄ±msÄ±zsa (saf dokunmatikse) o anki geÃ§erli dokunuÅŸu (targetTouches) alÄ±r.
    if (cX === undefined || cX === null || isNaN(cX)) {
        if (e.targetTouches && e.targetTouches.length > 0) {
            cX = e.targetTouches[0].clientX;
            cY = e.targetTouches[0].clientY;
        } else if (e.touches && e.touches.length > 0) {
            cX = e.touches[0].clientX;
            cY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            cX = e.changedTouches[0].clientX;
            cY = e.changedTouches[0].clientY;
        } else {
            cX = 0;
            cY = 0;
        }
    }

    return {
        x: ((cX || 0) - rect.left) * (canvas.width / rect.width),
        y: ((cY || 0) - rect.top) * (canvas.height / rect.height)
    };
}

// --- GRAFÄ°K TABLET SÄ°MÃœLATÃ–RÃœ ---
function getPointerInfo(e) {
    // BURAYI false YAPTIK!
    const testModuAcik = false;

    // EÄŸer test modu aÃ§Ä±ksa ve fare kullanÄ±lÄ±yorsa, onu "Kalem" gibi kandÄ±r
    if (testModuAcik && e.pointerType === 'mouse') {
        return {
            type: 'pen',
            pressure: Math.random() * 0.8 + 0.2
        };
    }

    return {
        type: e.pointerType,
        pressure: e.pressure || 1
    };
}


// --- KANVAS AYARLARI ---

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

function setupCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1; // ğŸš¨ CihazÄ±n HD piksel oranÄ±nÄ± (Retina GÃ¼cÃ¼nÃ¼) al

    // KanvasÄ±n iÃ§ piksel sayÄ±sÄ±nÄ±, ekranÄ±n gerÃ§ek HD Ã§Ã¶zÃ¼nÃ¼rlÃ¼ÄŸÃ¼ ile eÅŸitle
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Arka planÄ± (bg-canvas) da boyut ve oran olarak %100 eÅŸitle (DaralmayÄ± Ã¶nler)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = canvas.style.width || (rect.width + 'px');
        bgCanvas.style.height = canvas.style.height || (rect.height + 'px');
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;
    }

    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

// 1. Uygulama ilk aÃ§Ä±ldÄ±ÄŸÄ±nda Ã§alÄ±ÅŸtÄ±r
setupCanvasResolution();

// 2. Ekran boyutu her deÄŸiÅŸtiÄŸinde (yÃ¼kle butonu sonrasÄ± veya yan Ã§evirince) Ã§alÄ±ÅŸtÄ±r
window.addEventListener('resize', setupCanvasResolution);

// PARDUS KESÄ°N Ã‡Ã–ZÃœM: TarayÄ±cÄ±nÄ±n kaydÄ±rma ve yakÄ±nlaÅŸtÄ±rma yapmasÄ±nÄ± yasakla
canvas.style.touchAction = 'none';
canvas.style.userSelect = 'none';
document.body.style.overscrollBehavior = 'none';


// --- RESÄ°M YÃœKLEME DEÄÄ°ÅKENLERÄ° ---
let backgroundImage = null; // YÃ¼klenen resmi tutacak deÄŸiÅŸken
const uploadButton = document.getElementById('btn-upload');
const fileInput = document.getElementById('file-input');

// --- app.js (DÃœZELTÄ°LMÄ°Å BAÅLANGIÃ‡ BÃ–LÃœMÃœ) ---

// --- SESLER (TÃœMÃœ Ä°PTAL EDÄ°LDÄ° / SESSÄ°Z MOD) ---
// GerÃ§ek ses dosyalarÄ± yerine, hiÃ§bir iÅŸ yapmayan "sahte" bir oynatÄ±cÄ± tanÄ±mlÄ±yoruz.
// Bu sayede alt satÄ±rlardaki hiÃ§bir kodu silmenize gerek kalmaz, hepsi sessizce Ã§alÄ±ÅŸÄ±r.

const silentAudio = {
    play: function () { },   // Ã‡al komutu gelirse: HiÃ§bir ÅŸey yapma.
    pause: function () { },  // Durdur komutu gelirse: HiÃ§bir ÅŸey yapma.
    currentTime: 0,        // SÃ¼re ayarÄ± gelirse: Kabul et ama iÅŸleme.
    src: ""
};

window.audio_click = silentAudio;
let audio_click_src_set = true; // Hata vermemesi iÃ§in "ayarlandÄ±" sayÄ±yoruz.
window.audio_undo = silentAudio;
window.audio_draw = silentAudio;
window.audio_eraser = silentAudio;


// --- DEÄÄ°ÅKENLER ---

let snapshotStart = null;
const animateButton = document.getElementById('btn-animate');
let currentTool = 'none';
let isPinching = false;           // Ä°ki parmakla yakÄ±nlaÅŸtÄ±rma aktif mi?
let initialDistance = 0;          // BaÅŸlangÄ±Ã§ parmak mesafesi (zoom iÃ§in)
let initialScale = 0;             // BaÅŸlangÄ±Ã§ta seÃ§ili nesnenin geniÅŸliÄŸi
let initialCenter = { x: 0, y: 0 }; // Ä°ki parmaÄŸÄ±n merkez noktasÄ± (pan iÃ§in)
let currentPenColor = '#FFFFFF';
let currentPenWidth = 4;
window.currentLineColor = '#FFFFFF'; // VarsayÄ±lan Renk: BEYAZ
const SNAP_THRESHOLD = 10;
let returnToSnapshot = false; // Ä°ÅŸlem bitince geri dÃ¶nÃ¼lecek mi? 
// ==========================================
// --- 3D CÄ°SÄ°MLER Ä°Ã‡Ä°N YENÄ° DEÄÄ°ÅKENLER VE SÃœRGÃœ OLUÅTURUCU (ADIM 1) ---
// ==========================================
let isDrawing3D = false;
let current3DShape = null; // Hangi 3D ÅŸekil seÃ§ili (Ã¶rn: '3d_kare_piramit')
let temp3DData = null;     // Ã‡izim esnasÄ±ndaki canlÄ± Ã¶nizleme verisi
let active3DSliderStroke = null; // SÃ¼rgÃ¼sÃ¼ oynatÄ±lan seÃ§ili 3D cisim

// SÃ¼rgÃ¼ (Slider) Kutusunu HTML'e Otomatik Ekle
const sliderContainer = document.createElement('div');
sliderContainer.id = 'slider-container';
sliderContainer.innerHTML = `
    <label>AÃ§Ä±nÄ±m (Katlama)</label>
    <input type="range" id="shape-slider" min="0" max="100" value="0">
`;
const leftPanel = document.querySelector('.left-panel');
const btnOyunlarOptions = document.getElementById('oyunlar-options');
if (leftPanel && btnOyunlarOptions) {
    leftPanel.insertBefore(sliderContainer, btnOyunlarOptions.nextSibling);
} else {
    document.body.appendChild(sliderContainer);
}
const shapeSlider = document.getElementById('shape-slider');

// Alan / Hacim GÃ¶sterge Kutusunu HTML'e Otomatik Ekle
const infoTooltip = document.createElement('div');
infoTooltip.id = 'info-tooltip';
document.body.appendChild(infoTooltip);

// SÃ¼rgÃ¼ hareket ettiÄŸinde seÃ§ili 3D cismin aÃ§Ä±nÄ±mÄ±nÄ± gÃ¼ncelle
shapeSlider.addEventListener('input', (e) => {
    // ğŸš¨ BURASI 'window' OLARAK GÃœNCELLENDÄ° (ArtÄ±k ÅŸekli tanÄ±yacak!) ğŸš¨
    if (window.active3DSliderStroke) {
        window.active3DSliderStroke.openRatio = parseInt(e.target.value) / 100;

        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'sekil_guncelle', stroke: window.active3DSliderStroke });
        }
        if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
    }
});


let nextPointChar = 'A';
window.nextPointChar = nextPointChar;

let lineStartPoint = null;
let currentMousePos = { x: 0, y: 0 };
let snapTarget = null;
let snapHoverTimer = null;

window.tempPolygonData = null;

let isDrawingLine = false;
let isDrawingInfinityLine = false;
let isDrawingSegment = false;
let isDrawingRay = false;
let isMoving = false;
let selectedItem = null;
let selectedPointKey = null;
let rotationPivot = null;
let dragStartPos = { x: 0, y: 0 };
let originalStartPos = {};
let currentPDF = null;       // YÃ¼klenen PDF dosyasÄ±
let currentPDFPage = 1;      // Åu anki sayfa
let totalPDFPages = 0;       // Toplam sayfa
let pdfImageStroke = null;   // Ekrana Ã§izilen PDF sayfasÄ±

// --- HTML ELEMENTLERÄ° ---
const body = document.body;

// 1. Sol Panel AraÃ§larÄ±
const penButton = document.getElementById('btn-kalem');
const eraserButton = document.getElementById('btn-silgi');
const lineButton = document.getElementById('btn-cizgi');
const rulerButton = document.getElementById('btn-cetvel');
const gonyeButton = document.getElementById('btn-gonye');
const aciolcerButton = document.getElementById('btn-aciolcer');
const pergelButton = document.getElementById('btn-pergel');
const polygonButton = document.getElementById('btn-cokgenler');
const oyunlarButton = document.getElementById('btn-oyunlar');
const oyunlarOptions = document.getElementById('oyunlar-options');

if (oyunlarOptions) {
    oyunlarOptions.classList.add('hidden');
}
oyunlarButton.classList.remove('active');


// --- DÄ°KDÃ–RTGEN BUTONU TANIMLAMASI ---
const dikdortgenButton = document.getElementById('btn-dikdortgen');

if (dikdortgenButton) {
    dikdortgenButton.addEventListener('click', () => {
        if (typeof window.setActiveTool === 'function') {
            window.setActiveTool('draw_rectangle');
        } else {
            currentTool = 'draw_rectangle';
        }
    });
}
// --------------------------------------

// 2. Alt MenÃ¼ ButonlarÄ± ve SeÃ§enekler
const penOptions = document.getElementById('pen-options');
const colorBoxes = document.querySelectorAll('#pen-options .color-box');
const lineOptions = document.getElementById('line-options');
const pointButton = document.getElementById('btn-nokta');
const straightLineButton = document.getElementById('btn-d_cizgi');
const infinityLineButton = document.getElementById('btn-dogru');
const segmentButton = document.getElementById('btn-dogru_parcasi');
const rayButton = document.getElementById('btn-isin');
const lineColorOptions = document.querySelectorAll('#line-color-options .color-box');
const polygonOptions = document.getElementById('polygon-options');
const polygonPreviewLabel = document.getElementById('polygon-preview-label');
const circleButton = document.getElementById('btn-cember');
const regularPolygonButtons = document.querySelectorAll('#polygon-options button[data-sides]');
const polygonColorOptions = document.querySelectorAll('#polygon-color-options .color-box');
// ğŸ”‘ Burada oyunlarOptions tekrar tanÄ±mlanmadÄ±, yukarÄ±daki global tanÄ±m kullanÄ±lacak.


// 3. SaÄŸ Panel AraÃ§larÄ±
const undoButton = document.getElementById('btn-undo');
const clearAllButton = document.getElementById('btn-clear-all');
const moveButton = document.getElementById('btn-move');
const fillButton = document.getElementById('btn-fill');
const fillOptions = document.getElementById('fill-options');
const fillColorBoxes = document.querySelectorAll('#fill-options .color-box');
let currentFillColor = '#FF69B4';

// --- CANLANDIR VE KES MENÃœSÃœ (GÃœNCELLENMÄ°Å VE BÄ°RLEÅTÄ°RÄ°LMÄ°Å) ---
const btnSnapshotMain = document.getElementById('btn-snapshot-main');
const snapshotOptions = document.getElementById('snapshot-options');
const btnSnapshotBox = document.getElementById('btn-snapshot-box');
const btnSnapshotLasso = document.getElementById('btn-snapshot-lasso');

let menuAcilisKilidi = false;
const toggleSnapshotMenu = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (menuAcilisKilidi) return;
    menuAcilisKilidi = true;
    setTimeout(() => { menuAcilisKilidi = false; }, 300);

    let sOptions = document.getElementById('snapshot-options') || document.querySelector('.snapshot-options');
    if (!sOptions) return;

    // Ekrandaki gerÃ§ek gÃ¶rÃ¼nÃ¼rlÃ¼k durumunu kontrol et (inline style dahil)
    const menuKapaliMi = sOptions.classList.contains('hidden') || sOptions.style.display === 'none';

    if (menuKapaliMi) {
        // AracÄ± aktif et
        if (typeof setActiveTool === 'function') {
            setActiveTool('snapshot');
        } else {
            currentTool = 'snapshot';
        }

        // MenÃ¼yÃ¼ gÃ¶rÃ¼nÃ¼r yap ve inline style engelini kaldÄ±r
        sOptions.classList.remove('hidden');
        sOptions.style.display = 'flex';
        sOptions.style.zIndex = '10000';

        // ButonlarÄ±n aktiflik durumunu gÃ¼ncelle
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active');
        if (animateButton) animateButton.classList.add('active');

        // HizalamayÄ± yap
        const refBtn = btnSnapshotMain || animateButton;
        if (refBtn) {
            const buttonRect = refBtn.getBoundingClientRect();
            const panelRect = refBtn.parentElement.getBoundingClientRect();
            sOptions.style.top = `${buttonRect.top - panelRect.top}px`;
        }
    } else {
        // MenÃ¼yÃ¼ kapat ve aracÄ± sÄ±fÄ±rla
        if (typeof setActiveTool === 'function') {
            setActiveTool('none');
        } else {
            currentTool = 'none';
        }

        sOptions.classList.add('hidden');
        sOptions.style.display = 'none';

        if (btnSnapshotMain) btnSnapshotMain.classList.remove('active');
        if (animateButton) animateButton.classList.remove('active');
    }
};

if (btnSnapshotMain) {
    btnSnapshotMain.onclick = null;
    btnSnapshotMain.ontouchstart = null;
    btnSnapshotMain.addEventListener('click', toggleSnapshotMenu);
    btnSnapshotMain.addEventListener('pointerdown', toggleSnapshotMenu);
}
if (btnSnapshotBox) {
    btnSnapshotBox.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('snapshot'); // Kutu aracÄ±nÄ± seÃ§
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}
if (btnSnapshotLasso) {
    btnSnapshotLasso.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('lasso'); // Serbest (Kement) kesim aracÄ±nÄ± seÃ§
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}

// 4. Resim ve PDF YÃ¼kleme AraÃ§larÄ±


const pdfControls = document.getElementById('pdf-controls');
const pageCountLabel = document.getElementById('page-count-label');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');




// --- GÃ–RSEL YARDIMCILAR ---
const snapIndicator = document.createElement('div');
snapIndicator.id = 'snap-indicator';
body.appendChild(snapIndicator);
const eraserPreview = document.createElement('div');
eraserPreview.className = 'eraser-cursor-preview';
body.appendChild(eraserPreview);


// --- YARDIMCI FONKSÄ°YONLAR ---

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function advanceChar(char) {
    let charCode = char.charCodeAt(0) + 1;
    if (charCode > 90) charCode = 65;
    return String.fromCharCode(charCode);
}

function findSnapPoint(pos) {
    for (const stroke of drawnStrokes) {
        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { x: stroke.x, y: stroke.y };
        } else if (stroke.type === 'straightLine' || stroke.type === 'segment') {
            if (distance(pos, stroke.p1) < SNAP_THRESHOLD) return stroke.p1;
            if (distance(pos, stroke.p2) < SNAP_THRESHOLD) return stroke.p2;
        }
    }
    return null;
}


function getEventPosition(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
}

function drawDot(pos, color = '#00FFCC') {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLabel(text, pos, color = '#FF69B4') {
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = color;
    ctx.fillText(text, pos.x + 8, pos.y + 5);
}

function drawInfinityLine(p1, p2, color, width, isRay = false) {
    const INFINITY = 5000;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return { ux: 0, uy: 0 };
    const ux = dx / mag;
    const uy = dy / mag;
    const drawP1 = isRay ? p1 : { x: p1.x - ux * INFINITY, y: p1.y - uy * INFINITY };
    const drawP2 = { x: p1.x + ux * INFINITY, y: p1.y + uy * INFINITY };
    ctx.beginPath();
    ctx.moveTo(drawP1.x, drawP1.y);
    ctx.lineTo(drawP2.x, drawP2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    return { ux, uy };
}

window.bringToolToFront = function (clickedElement) {
    const tools = [
        window.RulerTool ? window.RulerTool.rulerElement : null,
        window.GonyeTool ? window.GonyeTool.gonyeElement : null,
        window.AciolcerTool ? window.AciolcerTool.aciolcerElement : null,
        window.PergelTool ? window.PergelTool.pergelElement : null
    ];
    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: AraÃ§lara dokununca z-index'leri 5'e dÃ¼ÅŸÃ¼p Ã§izim tahtasÄ±nÄ±n altÄ±nda kayboluyordu!
    // ArtÄ±k araÃ§lar her zaman 9990 ve 9999 gÃ¼cÃ¼nde en Ã¼stte kalacak.
    tools.forEach(tool => { if (tool) tool.style.zIndex = 9990; });
    if (clickedElement) clickedElement.style.zIndex = 9999;
}

function redrawAllStrokes() {
    // 1. Ã–NCE KOORDÄ°NATLARI SIFIRLA VE TÃœM EKRANI SÄ°L
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
    if (bgCtx) {
        bgCtx.setTransform(1, 0, 0, 1, 0, 0);
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    // GÃœVENLÄ°K KÄ°LÄ°DÄ°
    if (!window.drawnStrokes || window.drawnStrokes.length === 0) return;

    // --- BÃœYÃœK Ã‡Ã–ZÃœM: KATMAN (Z-INDEX) KORUMASI ---
    // Arka planÄ± (sayfayÄ± veya pdf'i) her zaman zorla en alta gÃ¶nderir.
    // BÃ¶ylece kopyalar, makaslar ve Ã§izimler ASLA sayfanÄ±n altÄ±nda kalmaz!
    window.drawnStrokes.sort((a, b) => {
        if (a.isBackground && !b.isBackground) return -1;
        if (!a.isBackground && b.isBackground) return 1;
        return 0;
    });

    ctx.save();
    // (Buradaki translate ve scale satÄ±rlarÄ±nÄ± tamamen sildik. Zemin artÄ±k sabit!)

    for (const stroke of drawnStrokes) {

        // --- BU BLOÄU DÃ–NGÃœNÃœN EN BAÅINA EKLE ---
        if (stroke.type === 'preview') {
            const p = stroke.payload;
            ctx.save();
            ctx.strokeStyle = '#FF0000'; // KÄ±rmÄ±zÄ±
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 5]); // Kesikli

            if (p.tool === 'pen' && p.path && p.path.length > 0) {
                // ğŸš¨ Kalem iÃ§in canlÄ± Ã¶nizleme kesiksiz ve kendi renginde olmalÄ±!
                ctx.setLineDash([]);
                ctx.strokeStyle = p.color || '#FFFFFF';
                // ğŸš¨ KalÄ±nlÄ±k: GÃ¶nderilen orijinal kalÄ±nlÄ±ÄŸÄ± (baseWidth) kullan
                ctx.lineWidth = p.baseWidth || window.currentLineWidth || 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                ctx.moveTo(p.path[0].x, p.path[0].y);
                for (let i = 1; i < p.path.length; i++) {
                    ctx.lineTo(p.path[i].x, p.path[i].y);
                }
                ctx.stroke();
            }
            else if (['straightLine', 'line', 'segment', 'ray'].includes(p.tool) && p.start && p.end) {
                ctx.beginPath();
                const dx = p.end.x - p.start.x, dy = p.end.y - p.start.y, devCarpan = 5000;
                if (p.tool === 'line') { ctx.moveTo(p.start.x - dx * devCarpan, p.start.y - dy * devCarpan); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else if (p.tool === 'ray') { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.end.x, p.end.y); }
                ctx.stroke();
            }
            // ğŸš¨ Ã‡Ã–ZÃœM: DÄ°KDÃ–RTGEN VE Ã‡OKGENLERÄ° DAÄ°RE YERÄ°NE KENDÄ° ÅEKLÄ°YLE Ã‡Ä°Z
            else if ((p.tool === 'rectangle' || p.tool === 'draw_rectangle') && p.start && p.end) {
                ctx.beginPath();
                ctx.rect(Math.min(p.start.x, p.end.x), Math.min(p.start.y, p.end.y), Math.abs(p.end.x - p.start.x), Math.abs(p.end.y - p.start.y));
                ctx.stroke();
            }
            else if (p.tool === 'polygon' && p.start && p.end) {
                const cx = p.start.x, cy = p.start.y, radius = p.radius, sides = p.sides;
                ctx.beginPath();
                if (!sides || sides === 0) {
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                } else if (sides >= 3) {
                    const angleRad = p.rotation || 0;
                    for (let i = 0; i <= sides; i++) {
                        const polyAngle = (i * 2 * Math.PI / sides) + angleRad;
                        const px = cx + radius * Math.cos(polyAngle);
                        const py = cy + radius * Math.sin(polyAngle);
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }
            else if (p.start && p.end) {
                const radius = p.radius || Math.hypot(p.end.x - p.start.x, p.end.y - p.start.y);
                ctx.beginPath(); ctx.arc(p.start.x, p.start.y, radius, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
            continue; // Bu nesneyi Ã§izdik, diÄŸer dÃ¶ngÃ¼lere girmesine gerek yok // Bu nesneyi Ã§izdik, diÄŸer dÃ¶ngÃ¼lere girmesine gerek yok
        }
        // ------------------------------------------

        // ... (Senin mevcut if (stroke.type === 'pen') { ... } kodlarÄ±n burada devam edecek)
        // --- AKILLI BOYAMA MASKESÄ° ---
        if (stroke.type === 'lasso-mask') {
            ctx.save();

            // Lazerle ÅŸeffaf delme iptal, akÄ±llÄ± tarayÄ±cÄ±nÄ±n bulduÄŸu renkle boyama devrede!
            ctx.fillStyle = stroke.fillColor || "white";

            ctx.beginPath();
            if (stroke.points && stroke.points.length > 0) {
                ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
            }
            ctx.closePath();

            // KestiÄŸin tam o noktayÄ±, sensÃ¶rlerin bulduÄŸu sarÄ± renge pÃ¼rÃ¼zsÃ¼zce boyar
            ctx.fill();
            ctx.restore();
            continue;
        }

        // --- KALEM (PEN) SABÄ°T KALINLIK VE YUMUÅATILMIÅ Ã‡Ä°ZÄ°M (BEZIER CURVE) ---
        if (stroke.type === 'pen') {
            const points = stroke.path;

            if (points.length < 2) {
                // Sadece tÄ±klandÄ±ysa tek bir nokta koy (BasÄ±nÃ§ iptal)
                ctx.beginPath();
                ctx.arc(points[0].x, points[0].y, stroke.baseWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = stroke.color;
                ctx.fill();
            } else {
                // --- KÃ–ÅELERÄ° YOK EDEN YUMUÅATMA (SMOOTHING) ALGORÄ°TMASI ---
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.strokeStyle = stroke.color;

                // 1. BASINÃ‡ Ä°PTALÄ°: KalÄ±nlÄ±k her zaman standart ve sabittir
                ctx.lineWidth = stroke.baseWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // 2. KÃ–ÅE Ä°PTALÄ°: NoktalarÄ± dÃ¼z Ã§izgiyle deÄŸil, esnek eÄŸrilerle (Bezier) baÄŸlar
                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                // Son noktayÄ± eÄŸrinin ucuna baÄŸla
                ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                ctx.stroke();
            }
        }


        // --- RESÄ°M / PDF VE CANLANDIR (SNAPSHOT) KOPYASI ---
        else if (stroke.type === 'image') {

            // 1. EÄER BU BÄ°R PDF VEYA ARKA PLAN Ä°SE SADECE Ã‡ERÃ‡EVESÄ°NÄ° Ã‡Ä°Z, KENDÄ°NÄ° EN ARKAYA SAKLA
            if (stroke.isBackground !== false) {
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                    // Kesikli SeÃ§im Ã‡erÃ§evesi
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    // 1. DÃ¶ndÃ¼rme Butonu (Ãœst Orta - YeÅŸil)
                    const rotX = 0;
                    const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath();
                    ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("â†»", rotX, rotY - 1);

                    // 2. BoyutlandÄ±rma Butonu (SaÄŸ Alt - Pembe)
                    const resX = stroke.width / 2;
                    const resY = stroke.height / 2;
                    ctx.beginPath();
                    ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("â¤¢", resX, resY);

                    ctx.restore();
                }
                continue; // Ä°ÅŸlemi bitir ve resmin kendini Ã§izmesi iÃ§in en arkaya (destination-over) pasla
            }

            // 2. EÄER BU KESTÄ°ÄÄ°MÄ°Z BÄ°R YÃœZEN KOPYAYSA (CANLANDIR) EKRANA Ã‡Ä°Z VE Ã‡ERÃ‡EVE EKLE
            let imgToDraw = null;
            if (stroke.img && stroke.img instanceof HTMLImageElement) {
                imgToDraw = stroke.img;
            } else if (stroke.imgData) {
                if (!stroke.imgObj) {
                    stroke.imgObj = new Image();
                    stroke.imgObj.src = stroke.imgData;
                    stroke.imgObj.onload = () => { if (window.redrawAllStrokes) window.redrawAllStrokes(); };
                }
                imgToDraw = stroke.imgObj;
            }

            if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                ctx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                ctx.translate(centerX, centerY);
                ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                ctx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);

                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("â†»", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("â¤¢", resX, resY);
                }
                ctx.restore();
            }
        }

        // --- NOKTA ---
        else if (stroke.type === 'point') {
            drawDot(stroke, stroke.color); // ğŸš¨ NoktanÄ±n kendi rengini kullanmasÄ±nÄ± saÄŸlar
            drawLabel(stroke.label, stroke, stroke.color); // ğŸš¨ Harfin de aynÄ± renk olmasÄ±nÄ± saÄŸlar
        }

        // --- DÃœZ Ã‡Ä°ZGÄ° ---
        else if (stroke.type === 'straightLine') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width;
            ctx.lineCap = 'round';
            ctx.stroke();
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- DOÄRU ---
        else if (stroke.type === 'line') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, false);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- DOÄRU PARÃ‡ASI ---
        else if (stroke.type === 'segment') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();
            drawLabel(stroke.label1, stroke.p1, '#FF69B4');
            drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- IÅIN ---
        else if (stroke.type === 'ray') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, true);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- Ã‡OKGENLER ---
        else if (stroke.type === 'polygon') {
            if (window.PolygonTool && typeof window.PolygonTool.calculateVertices === 'function') {
                const vertices = window.PolygonTool.calculateVertices(stroke.center, stroke.radius, stroke.sideCount, stroke.rotation);
                stroke.vertices = vertices;

                if (vertices.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let i = 1; i < vertices.length; i++) ctx.lineTo(vertices[i].x, vertices[i].y);
                    ctx.closePath();
                }

                ctx.fillStyle = stroke.fillColor || 'rgba(0, 0, 0, 0.2)';
                ctx.fill();
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = stroke.width || 4;
                ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.stroke();

                drawDot(stroke.center, stroke.color);
                drawLabel(stroke.label, stroke.center, '#FF69B4');
                vertices.forEach(v => drawDot(v, stroke.color));

                if (stroke.showEdgeLabels) {
                    for (let j = 0; j < vertices.length; j++) {
                        const v1 = vertices[j];
                        const v2 = vertices[(j + 1) % vertices.length];
                        const midPoint = { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 };
                        const edgeLabel = window.PolygonTool.getEdgeLength(v1, v2);
                        drawLabel(edgeLabel, midPoint, '#FF69B4');
                    }
                }
                if (stroke.showAngleLabels) {
                    const angleLabel = window.PolygonTool.getInternalAngle(stroke.sideCount);
                    const arcRadius = 25;
                    for (let j = 0; j < vertices.length; j++) {
                        const v_current = vertices[j];
                        const v_prev = vertices[j === 0 ? vertices.length - 1 : j - 1];
                        const v_next = vertices[(j + 1) % vertices.length];
                        const startAngle = Math.atan2(v_prev.y - v_current.y, v_prev.x - v_current.x);
                        const endAngle = Math.atan2(v_next.y - v_current.y, v_next.x - v_current.x);
                        ctx.beginPath();
                        ctx.arc(v_current.x, v_current.y, arcRadius, endAngle, startAngle);
                        ctx.strokeStyle = '#FFFF00'; ctx.lineWidth = 2; ctx.stroke();
                        const angle_label_x = (v_current.x * 0.8) + (stroke.center.x * 0.2);
                        const angle_label_y = (v_current.y * 0.8) + (stroke.center.y * 0.2);
                        drawLabel(angleLabel, { x: angle_label_x, y: angle_label_y }, '#FFFF00');
                    }
                }
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(rotateHandlePos.x, rotateHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; ctx.fill(); ctx.strokeStyle = '#0F0'; ctx.lineWidth = 2; ctx.stroke();
                    const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(resizeHandlePos.x, resizeHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 255, 0.8)'; ctx.fill(); ctx.strokeStyle = '#F0F'; ctx.lineWidth = 2; ctx.stroke();
                }
            }
        }

        // --- 3D HOLOGRRAM MOTORU YÃ–NLENDÄ°RMESÄ° VE 2D SENKRONU ---
        else if (stroke.type === '3d_shape') {
            if (window.ThreeDTool && typeof window.ThreeDTool.drawShape === 'function') window.ThreeDTool.drawShape(ctx, stroke);

            // 1. ÃœÃ‡ BOYUTLU NESNEYÄ° 2D EKRAN MERKEZÄ°NE VE BOYUTUNA ZORLA UYDUR (SENKRONÄ°ZASYON)
            if (window.Scene3D && window.Scene3D.scene) {
                const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === stroke.id);
                if (sceneMesh) {
                    if (stroke.rotationX !== undefined) sceneMesh.rotation.x = stroke.rotationX;
                    if (stroke.rotationY !== undefined) sceneMesh.rotation.y = stroke.rotationY;
                    if (stroke.rotationZ !== undefined) sceneMesh.rotation.z = stroke.rotationZ;
                    
                   const canvasElm = document.getElementById('drawing-canvas');
                    if (canvasElm) {
                        const myCw = canvasElm.width;
                        const myCh = canvasElm.height;
                        
                        // ğŸš¨ SÃœRGÃœ KORUMASI: SÃ¼rgÃ¼ Ã§ekilince deÄŸiÅŸen geniÅŸlik yerine mÃ¼hÃ¼rlÃ¼ original deÄŸerleri kullan
                        const refX = stroke.originalX !== undefined ? stroke.originalX : stroke.x;
                        const refY = stroke.originalY !== undefined ? stroke.originalY : stroke.y;
                        const refW = stroke.originalW !== undefined ? stroke.originalW : stroke.width;
                        const refH = stroke.originalH !== undefined ? stroke.originalH : stroke.height;

                        const cx = refX + (refW / 2);
                        const cy = refY + (refH / 2);
                        
                        const nx = (cx / myCw) * 2 - 1;
                        const ny = -(cy / myCh) * 2 + 1;

                        const raycaster = new THREE.Raycaster();
                        raycaster.setFromCamera(new THREE.Vector2(nx, ny), window.Scene3D.camera);
                        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                        const intersection = new THREE.Vector3();
                        
                        if (raycaster.ray.intersectPlane(plane, intersection)) {
                            sceneMesh.position.copy(intersection);
                        }

                        if (stroke.pos3D && stroke.pos3D.z !== undefined) {
                            sceneMesh.position.z = stroke.pos3D.z;
                        }
                        
                        // ğŸš¨ KUSURSUZ BOYUT + AÄ Ã–LÃ‡EÄÄ°: KoordinatlarÄ± bozmadan sadece pembe buton Ã§arpanÄ±nÄ± ekliyoruz
                        const threeJSHeightRatio = 30 / myCh;
                        const targetThreeJSWidth = refW * threeJSHeightRatio;
                        const originalThreeJSWidth = sceneMesh.userData.baseSize * 2;
                        const gercekOlcek = targetThreeJSWidth / originalThreeJSWidth;
                        
                        const mScale = stroke.meshScale || 1;
                        sceneMesh.scale.setScalar(gercekOlcek * mScale);
                    }
                }
            }

            // 2. SEÃ‡Ä°LÄ°YKEN YEÅÄ°L VE PEMBE KULPLARI Ã‡Ä°Z (ESKÄ° Ã–ZELLÄ°ÄÄ°N GERÄ° GELMESÄ°)
            if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                ctx.save();
                const cX = stroke.x + stroke.width / 2;
                const cY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                ctx.translate(cX, cY);
                ctx.rotate(angleRad);

                // SeÃ§im Ã‡erÃ§evesi
                ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                ctx.setLineDash([]);
                ctx.restore();
            }
        }
        else if (stroke.type === 'rectangle') {
            ctx.save();
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

            // 1. DikdÃ¶rtgeni Ã‡iz
            ctx.beginPath();
            ctx.rect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = 4;
            ctx.stroke();

            // 2. Kenar UzunluklarÄ±nÄ± YazdÄ±r (Ã–nizlemedeki gibi kalÄ±cÄ± olur)
            if (stroke.showEdgeLabels) {
                ctx.font = "14px Arial";
                ctx.fillStyle = stroke.color;
                ctx.textAlign = "center";

                const wCm = (stroke.width / 30).toFixed(1).replace('.', ',');
                const hCm = (stroke.height / 30).toFixed(1).replace('.', ',');

                // Ãœst Kenar CM
                ctx.fillText(`${wCm} cm`, 0, -stroke.height / 2 - 10);

                // Sol Kenar CM (Dikey yazdÄ±rmak iÃ§in dÃ¶ndÃ¼rÃ¼yoruz)
                ctx.save();
                ctx.translate(-stroke.width / 2 - 25, 0);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(`${hCm} cm`, 0, 0);
                ctx.restore();
            }

            // 3. KÃ¶ÅŸe Harflerini YazdÄ±r (A, B, C, D)
            if (stroke.labels) {
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = "#FF69B4"; // Pembe harfler
                ctx.fillText(stroke.labels[0], -stroke.width / 2 - 15, -stroke.height / 2 - 5); // Sol Ãœst
                ctx.fillText(stroke.labels[1], stroke.width / 2 + 10, -stroke.height / 2 - 5);  // SaÄŸ Ãœst
                ctx.fillText(stroke.labels[2], stroke.width / 2 + 10, stroke.height / 2 + 15);  // SaÄŸ Alt
                ctx.fillText(stroke.labels[3], -stroke.width / 2 - 15, stroke.height / 2 + 15); // Sol Alt
            }

            // 4. "TaÅŸÄ±" Modu Aktifse ButonlarÄ± Ã‡iz
            if (currentTool === 'move' && selectedItem === stroke) {
                // DÃ¶ndÃ¼rme (YeÅŸil)
                ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(0, -stroke.height / 2 - 30, 12, 0, 7); ctx.fill();
                // BoyutlandÄ±rma (Pembe)
                ctx.fillStyle = '#F0F'; ctx.beginPath(); ctx.arc(stroke.width / 2, stroke.height / 2, 12, 0, 7); ctx.fill();
            }

            // 5. AÃ§Ä± TÄ±klandÄ±ysa 90 Derece SembolÃ¼nÃ¼ Ã‡iz
            if (stroke.showAngleLabels) {
                ctx.font = "bold 14px Arial"; ctx.fillStyle = "yellow";
                ctx.fillText("90Â°", -stroke.width / 2 + 15, -stroke.height / 2 + 20);
            }
            ctx.restore();
        }



        // --- Ã‡EMBER / PERGEL ---
        else if (stroke.type === 'arc') {
            const PI_RAD = Math.PI / 180;
            let startRad = stroke.startAngle * PI_RAD;
            let endRad = stroke.endAngle * PI_RAD;
            const totalAngleDrawn = Math.abs(stroke.endAngle - stroke.startAngle);

            if (totalAngleDrawn >= 359) { startRad = 0; endRad = 2 * Math.PI; }

            ctx.beginPath();
            ctx.arc(stroke.cx, stroke.cy, stroke.radius, startRad, endRad, false);
            if (totalAngleDrawn >= 359) ctx.closePath();

            if (stroke.fillColor && stroke.fillColor !== 'transparent' && totalAngleDrawn >= 359) {
                ctx.fillStyle = stroke.fillColor;
                ctx.fill();
            }

            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            const centerPos = { x: stroke.cx, y: stroke.cy };
            drawDot(centerPos, stroke.color);
            if (stroke.label) drawLabel(stroke.label, centerPos, '#FF69B4');

            if (stroke.showCircleInfo) {
                ctx.beginPath();
                ctx.moveTo(centerPos.x, centerPos.y);
                ctx.lineTo(centerPos.x + stroke.radius, centerPos.y);
                ctx.strokeStyle = '#FF69B4'; ctx.lineWidth = 1; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([]);

                const PI = window.PolygonTool.PI_VALUE || 3;
                const r_px = stroke.radius;
                const r_cm_raw = (r_px / (window.PolygonTool.PIXELS_PER_CM || 30));
                const r_cm_calc = parseFloat(r_cm_raw.toFixed(2));
                const r_cm_str = r_cm_raw.toFixed(2).replace('.', ',');
                const circ_str = (2 * PI * r_cm_calc).toFixed(2).replace('.', ',');
                const area_str = (PI * r_cm_calc * r_cm_calc).toFixed(2).replace('.', ',');

                const r_label = `r = ${r_cm_str} cm`;
                drawLabel(r_label, { x: centerPos.x + (r_px / 2) - 20, y: centerPos.y - 10 }, '#FFFF00');
                let labelY = centerPos.y - 20;
                const labelX = centerPos.x + r_px + 30;
                drawLabel(`Ã‡ = 2 . Ï€ . r`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= 2 . ${PI} . ${r_cm_str} = ${circ_str} cm`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`A = Ï€ . rÂ²`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= ${PI} . ${r_cm_str}Â² = ${area_str} cmÂ²`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`(Ï€ = ${PI} alÄ±ndÄ±)`, { x: labelX, y: labelY }, '#AAAAAA');
            }
        }
    } // <-- FOR DÃ–NGÃœSÃœ BURADA KAPANIYOR

    ctx.restore();

    // === EKLENECEK YENÄ° BÃ–LÃœM: SAYFAYI EN ARKAYA Ã‡Ä°Z ===
    if (bgCtx) {
        bgCtx.save();
        for (const stroke of drawnStrokes) {
            if (stroke.type === 'image' && stroke.isBackground !== false) {
                let imgToDraw = null;
                if (stroke.img && stroke.img instanceof HTMLImageElement) {
                    imgToDraw = stroke.img;
                } else if (stroke.imgObj) {
                    imgToDraw = stroke.imgObj;
                }

                if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                    bgCtx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    bgCtx.translate(centerX, centerY);
                    bgCtx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    bgCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    bgCtx.restore();
                }
            }
            // AyrÄ±ca Lasso-mask ile PDF Ã¼zerinde delik aÃ§Ä±lmÄ±ÅŸsa onu da bgCtx'den siliyoruz
            else if (stroke.type === 'lasso-mask') {
                bgCtx.save();
                bgCtx.globalCompositeOperation = 'destination-out';
                bgCtx.beginPath();
                bgCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    bgCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
                bgCtx.closePath();
                bgCtx.fill();
                bgCtx.restore();
            }
        }
        bgCtx.restore();
    }
    // ====================================================

    // --- YENÄ° EKLENEN KISIM: OTOMATÄ°K HARF SENKRONÄ°ZASYONU ---
    // Ekranda o an var olan en yÃ¼ksek harfi bulur
    let maxCode = 64;
    drawnStrokes.forEach(s => {
        if (s.label && s.label.charCodeAt(0) > maxCode) maxCode = s.label.charCodeAt(0);
        if (s.label1 && s.label1.charCodeAt(0) > maxCode) maxCode = s.label1.charCodeAt(0);
        if (s.label2 && s.label2.charCodeAt(0) > maxCode) maxCode = s.label2.charCodeAt(0);
    });


    // SÄ±radaki harfe geÃ§er (Z'yi geÃ§erse A'ya dÃ¶ner)
    let nextCode = maxCode + 1;
    if (nextCode > 90) nextCode = 65;

    // TÃ¼m sistemi (Pergel, Ã‡okgenler ve Kalem) tek bir harfe senkronize eder
    nextPointChar = String.fromCharCode(nextCode);
    window.nextPointChar = nextPointChar;
    // ---------------------------------------------------------

    // --- 4. ADIM: YENÄ° POLÄ°GONAL LASSO Ã–NÄ°ZLEMESÄ° ---
    if (currentTool === 'lasso' && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) {
        ctx.save();

        // 1. SABÄ°TLENMÄ°Å Ã‡Ä°ZGÄ°LERÄ° Ã‡Ä°Z (Noktalar arasÄ±)
        ctx.strokeStyle = '#00ffcc'; // Ã‡izgi rengi turkuaz
        ctx.lineWidth = 2;
        ctx.setLineDash([]); // Sabit Ã§izgiler dÃ¼z olsun
        ctx.beginPath();
        ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
        for (let i = 1; i < lassoPoints.length; i++) {
            ctx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
        }
        ctx.stroke();

        // 2. KESÄ°KLÄ° Ã–NÄ°ZLEME Ã‡Ä°ZGÄ°SÄ°NÄ° Ã‡Ä°Z (Son noktadan imlece giden)
        if (typeof currentMousePos !== 'undefined' && currentMousePos) {
            ctx.beginPath();
            ctx.setLineDash([6, 6]); // Kesikli Ã§izgi efekti
            ctx.strokeStyle = '#aaaaaa';
            let lastPoint = lassoPoints[lassoPoints.length - 1];
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentMousePos.x, currentMousePos.y);
            ctx.stroke();
        }

        // 3. TIKLANAN NOKTALARI (KÃœÃ‡ÃœK YUVARLAKLARI) Ã‡Ä°Z
        ctx.fillStyle = '#ff0044';
        ctx.setLineDash([]);
        for (let i = 0; i < lassoPoints.length; i++) {
            ctx.beginPath();
            // Ä°LK noktayÄ± hedef olarak gÃ¶stermek iÃ§in daha BÃœYÃœK Ã§iziyoruz
            let radius = (i === 0) ? 8 : 4;
            ctx.arc(lassoPoints[i].x, lassoPoints[i].y, radius, 0, Math.PI * 2);
            ctx.fill();

            // Ä°lk noktanÄ±n etrafÄ±na beyaz bir hedef halkasÄ± ekle
            if (i === 0) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    } // <-- BURASI YENÄ° POLÄ°GONAL LASSO BLOÄUNUN BÄ°TÄ°Å PARANTEZÄ°


    // --- HASSAS HEDEFLEME Ã‡APRAZI (KESKÄ°N NÄ°ÅANCI MODU) ---
    // (Lasso seÃ§iliyse ve parmak ekrana basÄ±lÄ±ysa her zaman Ã§Ä±kar)
    if (currentTool === 'lasso' && window.isDraggingLassoPoint && typeof currentMousePos !== 'undefined' && currentMousePos) {
        ctx.save();
        ctx.beginPath();
        // EkranÄ±n bir ucundan diÄŸer ucuna yatay ve dikey hizalama Ã§izgileri
        ctx.moveTo(0, currentMousePos.y);
        ctx.lineTo(canvas.width, currentMousePos.y);
        ctx.moveTo(currentMousePos.x, 0);
        ctx.lineTo(currentMousePos.x, canvas.height);

        ctx.setLineDash([4, 4]); // Kesikli

        // EÄŸer baÅŸlangÄ±Ã§ noktasÄ±na kilitlendiysek Ã§apraz YEÅÄ°L olsun
        if (window.lassoIsClosing) {
            ctx.strokeStyle = '#00FF00'; // Kilitlendi YeÅŸili
        } else {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.7)'; // Normal Pembe
        }

        ctx.lineWidth = 1.5;
        ctx.stroke();


        // Tam dokunduÄŸun yere minik bir merkez noktasÄ±
        ctx.beginPath();
        ctx.arc(currentMousePos.x, currentMousePos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = window.lassoIsClosing ? '#00FF00' : '#ff00ff';
        ctx.fill();
        ctx.restore();
    }

} // <-- redrawAllStrokes FONKSÄ°YONU BURADA TAMAMEN KAPANIYOR


function processLassoCut() {
    if (lassoPoints.length < 3) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    lassoPoints.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const width = maxX - minX;
    const height = maxY - minY;
    if (width < 5 || height < 5) return;

    // =======================================================
    // 1. X-RAY (RÃ–NTGEN) SENSÃ–RÃœ: TÃ¼m katmanlarÄ± birleÅŸtirip gerÃ§ek rengi okur
    // =======================================================
    function getRealColor(x, y) {
        const tCan = document.createElement('canvas');
        tCan.width = 1; tCan.height = 1;
        const tCtx = tCan.getContext('2d');

        // Alttaki PDF katmanÄ±nÄ± oku
        const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');
        if (bgLayer) {
            const sX = bgLayer.width / bgLayer.offsetWidth;
            const sY = bgLayer.height / bgLayer.offsetHeight;
            tCtx.drawImage(bgLayer, x * sX, y * sY, 1 * sX, 1 * sY, 0, 0, 1, 1);
        } else {
            tCtx.fillStyle = "white"; tCtx.fillRect(0, 0, 1, 1);
        }
        // Ãœstteki Ã§izim katmanÄ±nÄ± ekle
        tCtx.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1);
        return tCtx.getImageData(0, 0, 1, 1).data;
    }

    // =======================================================
    // 2. KESTÄ°ÄÄ°MÄ°Z PARÃ‡AYI (KOPYAYI) OLUÅTUR (X-Ray kullanarak keser)
    // =======================================================
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width; offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');

    offCtx.beginPath();
    offCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        offCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    offCtx.closePath();
    offCtx.clip();

    const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');

    // YÃ¼ksek kaliteli Ã§izim ayarlarÄ±nÄ± etkinleÅŸtir
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';

    if (bgLayer) {
        // KanvasÄ±n HD Ã§Ã¶zÃ¼nÃ¼rlÃ¼k oranÄ±nÄ± al (DPR)
        const dprCanvasX = canvas.width / canvas.getBoundingClientRect().width;
        const dprCanvasY = canvas.height / canvas.getBoundingClientRect().height;

        // PDF koordinatlarÄ±nÄ± tabletin piksel yoÄŸunluÄŸuna gÃ¶re kusursuz olarak eÅŸitle
        const sX = (bgLayer.width / bgLayer.offsetWidth) / dprCanvasX;
        const sY = (bgLayer.height / bgLayer.offsetHeight) / dprCanvasY;
        offCtx.drawImage(bgLayer, minX * sX, minY * sY, width * sX, height * sY, 0, 0, width, height);
    }
    offCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
    const imgSrc = offCanvas.toDataURL('image/png', 1.0); // Kaliteyi en Ã¼ste sabitle

    // =======================================================
    // 3. AKILLI RENK BULUCU
    // =======================================================
    let smartColor = "white";
    try {
        const cX = minX + width / 2;
        const cY = minY + height / 2;
        const centerPixel = getRealColor(cX, cY);

        const margin = 15;
        const scanPoints = [
            { x: minX - margin, y: cY },
            { x: maxX + margin, y: cY },
            { x: cX, y: minY - margin },
            { x: cX, y: maxY + margin }
        ];

        for (let p of scanPoints) {
            const px = getRealColor(p.x, p.y);
            // Renk farkÄ±nÄ± hesapla
            const diff = Math.abs(px[0] - centerPixel[0]) + Math.abs(px[1] - centerPixel[1]) + Math.abs(px[2] - centerPixel[2]);
            if (diff > 50) {
                smartColor = `rgb(${px[0]}, ${px[1]}, ${px[2]})`;
                break;
            }
        }
    } catch (e) {
        console.warn("Renk okuma hatasÄ±", e);
    }

    // =======================================================
    // 4. ZOOM UYUMLU, KALICI YAMA OLUÅTURUCU
    // =======================================================
    const patchCanvas = document.createElement('canvas');
    patchCanvas.width = width; patchCanvas.height = height;
    const pCtx = patchCanvas.getContext('2d');
    pCtx.fillStyle = smartColor;
    pCtx.beginPath();
    pCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        pCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    pCtx.closePath();
    pCtx.fill(); // Rengi boya

    const patchImg = new Image();
    patchImg.src = patchCanvas.toDataURL('image/png');
    patchImg.onload = () => {
        drawnStrokes.unshift({ // Yama her ÅŸeyin EN ALTINDA kalacak ÅŸekilde baÅŸa eklenir
            type: 'image',
            imgObj: patchImg,
            x: minX, y: minY,
            width: width, height: height,
            rotation: 0,
            isBackground: true, // ZOOM YAPILDIÄINDA PDF Ä°LE BÃœYÃœMESÄ° Ä°Ã‡Ä°N
            isPatch: true       // SAYFA DEÄÄ°ÅÄ°NCE SÄ°LÄ°NMESÄ° Ä°Ã‡Ä°N Ã–ZEL ETÄ°KET
        });
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };

    // =======================================================
    // 5. KESTÄ°ÄÄ°NÄ°Z KOPYAYI EKRANA GETÄ°R VE OTOMATÄ°K SEÃ‡
    // =======================================================
    const newImgStroke = {
        type: 'image',
        imgData: imgSrc,
        x: minX, y: minY,
        width: width, height: height,
        rotation: 0,
        isBackground: false, // KRÄ°TÄ°K: ButonlarÄ±n Ã§Ä±kmasÄ± iÃ§in false olmalÄ±
        imgObj: null
    };

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {

        newImgStroke.imgObj = tempImg;
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };
    boxCopies.push(newImgStroke);


    // --- TABLETTE BUTONLARIN Ã‡IKMASI Ä°Ã‡Ä°N ÅART ---
    selectedItem = newImgStroke; // Yeni kestiÄŸin parÃ§ayÄ± anÄ±nda seÃ§
    isMoving = false;            // SÃ¼rÃ¼kleme durumunu kapat

    // AracÄ± 'move' yap (YukarÄ±da da yaptÄ±k ama burada da olmasÄ± gÃ¼venlidir)
    currentTool = 'move';

    if (window.redrawAllStrokes) window.redrawAllStrokes();
}


function undoLastStroke() {
    if (drawnStrokes.length > 0) {
        if (window.audio_undo) { window.audio_undo.currentTime = 0; window.audio_undo.play(); }

        // 1. Kendi listenden son Ã§izgiyi sil
        const popped = drawnStrokes.pop();

        // ğŸš¨ 3D ÅEKÄ°LSE GERÄ° ALIRKEN SAHNEDEN DE KALDIR
        if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
            const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
            if (meshToRemove) {
                meshToRemove.traverse((child) => {
                    if (child.isMesh || child.isLineSegments) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                            else child.material.dispose();
                        }
                    }
                });
                window.Scene3D.scene.remove(meshToRemove);
                if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                window.Scene3D.updateHandlePositions();
            }
        }

        // --- CANLI SINIF: TAHTAYA "SON Ã‡Ä°ZÄ°MÄ° SÄ°L" MESAJI GÃ–NDER ---
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'geri_al' });
        }
        // ---------------------------------------------------------

        redrawAllStrokes();
    }
}

function clearAllStrokes() {
    // 1. Ses Ã§al (varsa)
    if (drawnStrokes.length > 0) {
        if (window.audio_clear) window.audio_clear.play();
    }

    // 2. Tabletin yerel hafÄ±zasÄ±nÄ± temizle (Arka planlarÄ± koru)
    drawnStrokes = drawnStrokes.filter(stroke => stroke.isBackground === true);
    window.drawnStrokes = drawnStrokes;

    // ğŸš¨ HEPSÄ°NÄ° SÄ°LERKEN 3D SAHNEYÄ° TAMAMEN SIFIRLA
    if (window.Scene3D && window.Scene3D.scene) {
        const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
        toRemove.forEach(m => {
            if (m.geometry) m.geometry.dispose();
            if (m.material) {
                if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
                else m.material.dispose();
            }
            window.Scene3D.scene.remove(m);
        });
        window.Scene3D.currentMesh = null;
        if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
    }

    // 3. TarayÄ±cÄ±daki eski kayÄ±tlarÄ± temizle (EÄŸer PC veya Tablette localStorage kullanÄ±yorsan)
    if (window.localStorage) {
        window.localStorage.removeItem('drawnStrokes');
    }

    // 4. PC'ye "hepsini_sil" komutunu gÃ¶nder
    if (typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'hepsini_sil' });
        console.log("Temizleme komutu PC'ye gÃ¶nderildi.");
    }

    // 5. Harf sayacÄ±nÄ± sÄ±fÄ±rla
    nextPointChar = 'A';
    window.nextPointChar = 'A';

    // 6. EkranÄ± tamamen yenile
    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

function findHit(pos) {
    for (let i = drawnStrokes.length - 1; i >= 0; i--) {
        const stroke = drawnStrokes[i];

        if (stroke.type === 'image') {
            const halfW = stroke.width / 2;
            const halfH = stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // --- KRÄ°TÄ°K DÃœZELTME: Resmin gerÃ§ek merkezini hesapla ---
            const centerX = stroke.x + halfW;
            const centerY = stroke.y + halfH;

            // --- A. DÃ–NDÃœRME KULPU (Rotate Handle) ALGILAMA ---
            const handleDist = halfH + 30;
            const rotX = centerX + Math.sin(angleRad) * handleDist;
            const rotY = centerY - Math.cos(angleRad) * handleDist;

            if (distance(pos, { x: rotX, y: rotY }) < 25) {
                return { item: stroke, pointKey: 'image_rotate' };
            }

            // --- B. BOYUTLANDIRMA KULPU (Resize Handle) ---
            const resLocalX = halfW * Math.cos(angleRad) - halfH * Math.sin(angleRad);
            const resLocalY = halfW * Math.sin(angleRad) + halfH * Math.cos(angleRad);
            const resX = centerX + resLocalX;
            const resY = centerY + resLocalY;

            if (distance(pos, { x: resX, y: resY }) < 25) {
                return { item: stroke, pointKey: 'image_resize' };
            }

            // --- C. RESÄ°M GÃ–VDESÄ° (TaÅŸÄ±ma) ---
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localClickX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localClickY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);

            if (localClickX > -halfW && localClickX < halfW && localClickY > -halfH && localClickY < halfH) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        // --- 3D ÅEKÄ°L BUTON VE GÃ–VDE SENSÃ–RÃœ (KUSURSUZ) ---
        if (stroke.type === '3d_shape') {
            const cX = stroke.x + stroke.width / 2;
            const cY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            if (currentTool === 'move' && selectedItem === stroke) {
                // YeÅŸil (DÃ¶ndÃ¼rme)
                const rotY = -stroke.height / 2 - 40;
                const rotX_world = cX + Math.sin(angleRad) * Math.abs(rotY);
                const rotY_world = cY - Math.cos(angleRad) * Math.abs(rotY);
                if (distance(pos, { x: rotX_world, y: rotY_world }) < 35) return { item: stroke, pointKey: 'image_rotate' };

                // Pembe (BoyutlandÄ±rma)
                const resX_local = stroke.width / 2 + 20;
                const resY_local = stroke.height / 2 + 20;
                const resX_world = cX + (resX_local * Math.cos(angleRad) - resY_local * Math.sin(angleRad));
                const resY_world = cY + (resX_local * Math.sin(angleRad) + resY_local * Math.cos(angleRad));
                if (distance(pos, { x: resX_world, y: resY_world }) < 35) return { item: stroke, pointKey: 'image_resize' };
            }

            // ğŸš¨ 3D Åeklin TÃ¼m GÃ¶vdesini Yakala (TaÅŸÄ±ma BaÅŸlasÄ±n ve Butonlar Ã‡Ä±ksÄ±n)
            if (distance(pos, { x: cX, y: cY }) < Math.max(stroke.width, stroke.height) + 30) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' && selectedItem === stroke) {
            if (stroke.type === 'polygon') {
                const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);

                const dRot = distance(pos, rotateHandlePos);
                const dRes = distance(pos, resizeHandlePos);

                // ğŸš¨ PEMBE VE YEÅÄ°L BUTON Ã‡AKIÅMA ZIRHI (Ã–ncelik en yakÄ±n olana verilir)
                if (dRes < 35 && dRes <= dRot) return { item: stroke, pointKey: 'resize' };
                if (dRot < 35) return { item: stroke, pointKey: 'rotate' };
            }
        }


        // --- DÄ°KDÃ–RTGEN YAKALAMA (TABLET UYUMLU) ---
        if (stroke.type === 'rectangle') {
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // A. DÃ¶ndÃ¼rme Butonu (YeÅŸil - Ãœstte)
            const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 35);
            const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 35);
            if (distance(pos, { x: rotX, y: rotY }) < 30) return { item: stroke, pointKey: 'image_rotate' };

            // B. BoyutlandÄ±rma Butonu (Pembe - SaÄŸ Alt)
            const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
            const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
            if (distance(pos, { x: resX, y: resY }) < 30) return { item: stroke, pointKey: 'image_resize' };

            // C. KÃ¶ÅŸeler (90 Derece AÃ§Ä± GÃ¶sterme - 30px hassasiyet)
            const corners = [
                { x: -stroke.width / 2, y: -stroke.height / 2 }, { x: stroke.width / 2, y: -stroke.height / 2 },
                { x: stroke.width / 2, y: stroke.height / 2 }, { x: -stroke.width / 2, y: stroke.height / 2 }
            ];
            for (let c of corners) {
                const cornerX = centerX + (c.x * Math.cos(angleRad) - c.y * Math.sin(angleRad));
                const cornerY = centerY + (c.x * Math.sin(angleRad) + c.y * Math.cos(angleRad));
                if (distance(pos, { x: cornerX, y: cornerY }) < 30) return { item: stroke, pointKey: 'toggle_angles' };
            }

            // D. GÃ¶vde (Merkezden TaÅŸÄ±ma)
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
            if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' || currentTool === 'fill') { // Fill iÃ§in de hit gerekli
            if (stroke.type === 'polygon' && stroke.vertices) {
                for (let j = 0; j < stroke.vertices.length; j++) {
                    if (distance(pos, stroke.vertices[j]) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_angles' };
                }
                for (let j = 0; j < stroke.vertices.length; j++) {
                    const v1 = stroke.vertices[j];
                    const v2 = stroke.vertices[(j + 1) % stroke.vertices.length];
                    const lineLength = distance(v1, v2);
                    const steps = Math.max(1, Math.floor(lineLength / 5));
                    let hitEdge = false;
                    for (let step = 1; step < steps; step++) {
                        const t = step / steps;
                        const sampleX = v1.x + (v2.x - v1.x) * t;
                        const sampleY = v1.y + (v2.y - v1.y) * t;
                        if (distance({ x: sampleX, y: sampleY }, pos) < SNAP_THRESHOLD) { hitEdge = true; break; }
                    }
                    if (hitEdge) return { item: stroke, pointKey: 'toggle_edges' };
                }
            }

            if (stroke.type === 'rectangle') {
                const centerX = stroke.x + stroke.width / 2;
                const centerY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                // A. DÃ¶ndÃ¼rme Butonu (YeÅŸil)
                const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 30);
                const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 30);
                if (distance(pos, { x: rotX, y: rotY }) < 20) return { item: stroke, pointKey: 'image_rotate' };

                // B. BoyutlandÄ±rma Butonu (Pembe)
                const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
                const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
                if (distance(pos, { x: resX, y: resY }) < 20) return { item: stroke, pointKey: 'image_resize' };

                // C. KÃ¶ÅŸeye TÄ±klama (AÃ§Ä± GÃ¶sterme)
                if (distance(pos, { x: stroke.x, y: stroke.y }) < 20) return { item: stroke, pointKey: 'toggle_angles' };

                // D. GÃ¶vdeden Tutma (Merkezden TaÅŸÄ±ma)
                const dx = pos.x - centerX; const dy = pos.y - centerY;
                const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
                const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
                if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                    return { item: stroke, pointKey: 'self' };
                }
            } if (stroke.type === 'arc' && stroke.cx) {
                const distToCenter = distance(pos, { x: stroke.cx, y: stroke.cy });
                if (Math.abs(distToCenter - stroke.radius) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_circle_info' };
            }
        }

        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'self' };
        }
        if (stroke.p1 && distance(pos, stroke.p1) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p1' };
        if (stroke.p2 && distance(pos, stroke.p2) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p2' };
        if (stroke.type === 'arc' && stroke.cx && distance(pos, { x: stroke.cx, y: stroke.cy }) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'center' };
        // ğŸš¨ Ã‡OKGEN MERKEZÄ°NDEN TUTMA HASSASÄ°YETÄ°NÄ° ARTIR (TABLET Ä°Ã‡Ä°N)
        if (stroke.type === 'polygon' && stroke.center && distance(pos, stroke.center) < 50) return { item: stroke, pointKey: 'center' };
    }
    return null;
}

// Global atamalar
window.redrawAllStrokes = redrawAllStrokes;
window.advanceChar = advanceChar;
window.distance = distance;


// --- ARAÃ‡ SEÃ‡Ä°MÄ° (TAMAMEN DÃœZELTÄ°LMÄ°Å VERSÄ°YON) ---
function setActiveTool(tool) {
    // Oyunlar menÃ¼sÃ¼nÃ¼ her araÃ§ deÄŸiÅŸiminde kapat ve inline olarak gizle
    if (oyunlarOptions) {
        oyunlarOptions.classList.add('hidden');
        oyunlarOptions.style.display = 'none';
    }
    if (oyunlarButton) oyunlarButton.classList.remove('active');

    // Mevcut butonlarÄ±n aktifliÄŸini temizle
    penButton.classList.remove('active');
    eraserButton.classList.remove('active');
    lineButton.classList.remove('active');
    pointButton.classList.remove('active');
    straightLineButton.classList.remove('active');
    infinityLineButton.classList.remove('active');
    segmentButton.classList.remove('active');
    rayButton.classList.remove('active');
    // Fiziksel araÃ§ butonlarÄ±nÄ±n aktifliÄŸi baÄŸÄ±msÄ±z yÃ¶netilir
    polygonButton.classList.remove('active');
    circleButton.classList.remove('active');
    moveButton.classList.remove('active');
    if (fillButton) fillButton.classList.remove('active');
    if (animateButton) animateButton.classList.remove('active');

    // Ä°mleÃ§leri temizle
    body.classList.remove('cursor-pen', 'cursor-eraser', 'cursor-snapshot');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yeni aracÄ± ayarla
    currentTool = tool;

    // SeÃ§ilen aracÄ±n Ä±ÅŸÄ±ÄŸÄ±nÄ± yak
    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    }

    if (eraserPreview) eraserPreview.style.display = 'none';

    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: CSS Ã¶ncelik Ã§eliÅŸkisini aÅŸmak iÃ§in gizlenen tÃ¼m menÃ¼leri inline (none) yapÄ±yoruz
    if (polygonOptions) {
        polygonOptions.classList.add('hidden');
        polygonOptions.style.display = 'none';
    }

    // Ã‡izgi menÃ¼sÃ¼nÃ¼, SADECE yeni seÃ§ilen araÃ§ bir Ã§izgi aracÄ± DEÄÄ°LSE inline olarak mÃ¼hÃ¼rle
    const isLineTool = ['point', 'straightLine', 'line', 'segment', 'ray'].includes(tool);
    if (!isLineTool && lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }

    if (fillOptions) {
        fillOptions.classList.add('hidden');
        fillOptions.style.display = 'none';
    }

    if (penOptions) {
        penOptions.classList.add('hidden');
        penOptions.style.display = 'none';
    }

    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }

    // ğŸš¨ Ã‡Ã–ZÃœM 1: Kalem menÃ¼sÃ¼nÃ¼ kesin olarak gizle
    if (penOptions) { penOptions.classList.add('hidden'); penOptions.style.display = 'none'; }

    // ... diÄŸer gizleme kodlarÄ± buradadÄ±r ...
    penOptions.classList.add('hidden');

    // AÅAÄIDAKÄ° BLOKU EKLÄ°YORSUN:
    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }
    // ...

    // DeÄŸiÅŸkenleri sÄ±fÄ±rla
    isDrawing = false;
    lineStartPoint = null;
    isDrawingLine = false;
    isDrawingInfinityLine = false;
    isDrawingSegment = false;
    isDrawingRay = false;

    // --- BURAYA DÄ°KDÃ–RTGEN SIFIRLAMASINI EKLEYÄ°N ---
    isDrawingRectangle = false;
    rectStartPoint = null;

    window.tempPolygonData = null;
    polygonPreviewLabel.classList.add('hidden');

    // Fiziksel araÃ§lar baÄŸÄ±msÄ±z Ã§alÄ±ÅŸtÄ±ÄŸÄ± iÃ§in setActiveTool iÃ§erisinde gizlenmez.

    if (snapIndicator) snapIndicator.style.display = 'none';

    // EtkileÅŸimleri kapat
    if (window.RulerTool) window.RulerTool.interactionMode = 'none';
    if (window.GonyeTool) window.GonyeTool.interactionMode = 'none';
    if (window.AciolcerTool) window.AciolcerTool.interactionMode = 'none';
    if (window.PergelTool) window.PergelTool.interactionMode = 'none';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawAllStrokes();

    // 2. Yeni aracÄ± aktif et
    currentTool = tool;

    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: SeÃ§ilen araÃ§ 3D deÄŸilse, 3D modunu tamamen kapat! (Ã‡okgen Ã§izerken 3D Ã§izmesini engeller)
    if (!tool || !tool.startsWith('draw_3d_')) {
        window.active3DShapeTool = null;
        if (window.Scene3D) {
            window.Scene3D.activeTool = 'none';
        }
    }

    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
        if (typeof penOptions !== 'undefined' && penOptions) {
            penOptions.classList.remove('hidden');
            penOptions.style.display = 'flex';
            penOptions.style.zIndex = '9999';
            if (penButton) penOptions.style.top = `${penButton.getBoundingClientRect().top - penButton.parentElement.getBoundingClientRect().top}px`;
        }
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    } else if (tool === 'snapshot') {
        if (animateButton) animateButton.classList.add('active');
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active'); // ğŸš¨ EKLENDÄ°
        body.classList.add('cursor-snapshot');

        // ğŸš¨ Ã‡Ã–ZÃœM 1: CanlandÄ±r alt menÃ¼sÃ¼nÃ¼ KESÄ°N OLARAK aÃ§ ve hizala!
        if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
            snapshotOptions.classList.remove('hidden');
            snapshotOptions.style.display = 'flex';
            snapshotOptions.style.zIndex = '10000'; // ğŸš¨ Z-index deÄŸeri yÃ¼kseltildi
            const refBtn = btnSnapshotMain || animateButton; // ğŸš¨ EKLENDÄ°
            if (refBtn) snapshotOptions.style.top = `${refBtn.getBoundingClientRect().top - refBtn.parentElement.getBoundingClientRect().top}px`;
        }
    }


    // --- Ã‡Ä°ZGÄ° ARAÃ‡LARI GRUBU (YÃœKSEK CSS Ã–NCELÄ°KLÄ° GÃ–STERÄ°M) ---
    if (isLineTool && lineOptions) {
        lineOptions.classList.remove('hidden');
        lineOptions.style.display = 'flex'; // ğŸš¨ Ã‡izgi aracÄ± seÃ§ildiÄŸinde gÃ¶rÃ¼nÃ¼rlÃ¼ÄŸÃ¼ inline olarak zorla aÃ§
    }

    if (tool === 'point') {
        lineButton.classList.add('active'); // Ana buton aktif
        pointButton.classList.add('active'); // Alt buton aktif
    } else if (tool === 'straightLine') {
        lineButton.classList.add('active');
        straightLineButton.classList.add('active');
    } else if (tool === 'line') {
        lineButton.classList.add('active');
        infinityLineButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'segment') {
        lineButton.classList.add('active');
        segmentButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'ray') {
        lineButton.classList.add('active');
        rayButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    }

    // --- DÄ°ÄER ARAÃ‡LAR ---
    // --- DÄ°ÄER ARAÃ‡LAR ---
    else if (tool === 'ruler') {
        togglePhysicalTool('ruler');
    } else if (tool === 'gonye') {
        togglePhysicalTool('gonye');
    } else if (tool === 'aciolcer') {
        togglePhysicalTool('aciolcer');
    } else if (tool === 'pergel') {
        togglePhysicalTool('pergel');
    }

    else if (tool.startsWith('draw_polygon_')) {
        polygonButton.classList.add('active');
    } else if (tool === 'move') {
        moveButton.classList.add('active');
    } else if (tool === 'fill') {
        if (fillButton) {
            fillButton.classList.add('active');
            fillOptions.classList.remove('hidden');
            fillOptions.style.display = 'flex';
            const buttonRect = fillButton.getBoundingClientRect();
            const panelRect = fillButton.parentElement.getBoundingClientRect();
            const topOffset = buttonRect.top - panelRect.top;
            fillOptions.style.top = `${topOffset}px`;
        }
    }

    redrawAllStrokes();
}
// --- BUTON OLAYLARI ---

penButton.addEventListener('click', () => setActiveTool(currentTool === 'pen' ? 'none' : 'pen'));
eraserButton.addEventListener('click', () => setActiveTool(currentTool === 'eraser' ? 'none' : 'eraser'));


// --- FÄ°ZÄ°KSEL ARAÃ‡ BUTONLARI KESÄ°N Ã‡Ã–ZÃœMÃœ (TABLET ZIRHI) ---
function togglePhysicalTool(aracAdi) {
    let toolObj = null, el = null, btn = null, isDisplayBlock = false;
    if (aracAdi === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); btn = rulerButton; }
    if (aracAdi === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); btn = gonyeButton; }
    if (aracAdi === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); btn = aciolcerButton; isDisplayBlock = true; }
    if (aracAdi === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); btn = pergelButton; isDisplayBlock = true; }

    if (!toolObj || !el) return;

    const isCurrentlyVisible = el.style.display !== 'none' && !el.classList.contains('hidden');

    if (isCurrentlyVisible) {
        // Gizle
        toolObj.hide();
        el.classList.add('hidden');
        el.style.display = 'none';
        el.style.zIndex = "-1";
        if (btn) btn.classList.remove('active');
    } else {
        // GÃ¶ster
        toolObj.show();
        el.classList.remove('hidden');
        el.style.display = isDisplayBlock ? 'block' : 'flex';
        el.style.zIndex = "9999";
        if (btn) btn.classList.add('active');

        if (aracAdi === 'pergel' && toolObj.state) {
            setTimeout(() => {
                toolObj.state.rotation = 0;
                toolObj.state.radius = 150;
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder();
            }, 100);
        }

        if (window.bringToolToFront) window.bringToolToFront(el || (toolObj ? toolObj.pergelElement || toolObj.rulerElement || toolObj.gonyeElement || toolObj.aciolcerElement : null));
    }

    setTimeout(() => { if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder(); }, 50);
}

const araciBaslat = (aracAdi) => {
    togglePhysicalTool(aracAdi);
};

const butonBagla = (btn, aracAdi) => {
    if (!btn) return;
    const tetikle = (e) => { e.preventDefault(); e.stopPropagation(); araciBaslat(aracAdi); };
    btn.addEventListener('click', tetikle);
    btn.addEventListener('touchstart', tetikle, { passive: false });
};

butonBagla(rulerButton, 'ruler');
butonBagla(gonyeButton, 'gonye');
butonBagla(aciolcerButton, 'aciolcer');
butonBagla(pergelButton, 'pergel');


undoButton.addEventListener('click', undoLastStroke);
clearAllButton.addEventListener('click', clearAllStrokes);
moveButton.addEventListener('click', () => setActiveTool(currentTool === 'move' ? 'none' : 'move'));

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

if (prevPageBtn && nextPageBtn) {

    // Ã–nceki Sayfa (<)
    prevPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage > 1) {
            currentPDFPage--;
            renderPDFPage(currentPDFPage);
            // ğŸš¨ YENÄ°: PC'ye sayfayÄ± deÄŸiÅŸtirmesini sÃ¶yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });

    // Sonraki Sayfa (>)
    nextPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage < totalPDFPages) {
            currentPDFPage++;
            renderPDFPage(currentPDFPage);
            // ğŸš¨ YENÄ°: PC'ye sayfayÄ± deÄŸiÅŸtirmesini sÃ¶yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });
} // <-- EKSÄ°K OLAN VE HATAYA SEBEP OLAN PARANTEZ BURADA KAPANIYOR!


// --- YENÄ°: Sayfa numarasÄ±na tÄ±klayÄ±nca hÄ±zlÄ± gitme kutusunu aÃ§ ---
if (pageCountLabel) {
    pageCountLabel.style.cursor = 'pointer'; // Fareyle Ã¼zerine gelince tÄ±klanabilir el iÅŸareti Ã§Ä±ksÄ±n
    pageCountLabel.addEventListener('click', () => {
        if (!currentPDF) return;

        // --- Ã‡EVÄ°RÄ° ENTEGRASYONU ---
        let t = translations[currentLang];
        let soruMetni = t.pdf_soru.replace('{0}', totalPDFPages);

        const gitSayfa = prompt(soruMetni, currentPDFPage);
        if (gitSayfa !== null) {
            const num = parseInt(gitSayfa);
            if (num > 0 && num <= totalPDFPages) {
                currentPDFPage = num;
                renderPDFPage(currentPDFPage);
            } else {
                alert("GeÃ§ersiz sayfa numarasÄ± girdiniz!"); // Ä°stersen burayÄ± da ileride sÃ¶zlÃ¼ÄŸe ekleyebilirsin
            }
        }
    });
}

if (uploadButton && fileInput) {
    // uploadButton.onclick kaldirildi

    const cameraBtn = document.getElementById('btn-camera');
    const cameraInput = document.getElementById('camera-input');
    if (cameraBtn && cameraInput) {
        // cameraBtn.onclick kaldirildi
        cameraInput.onchange = async (e) => fileInput.onchange(e);
    }

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // --- DURUM A: PDF DOSYASI ---
        if (file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                // 1. AÄA GÃ–NDERMEK Ä°Ã‡Ä°N (Base64 Metni Olarak)
                const base64String = this.result;

                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Koca PDF dosyasÄ±nÄ± PC'nin kendi okumasÄ± iÃ§in aÄŸa fÄ±rlatmak yerine, 
                // Tabletin Ã§izdiÄŸi o anki yÃ¼ksek Ã§Ã¶zÃ¼nÃ¼rlÃ¼klÃ¼ sayfayÄ± (resim olarak) yollayacaÄŸÄ±z.
                // Bu yÃ¼zden pdf_yukle komutunu AÄA GÃ–NDERMEYÄ° Ä°PTAL EDÄ°YORUZ. 
                // PC, PDF.js yÃ¼kÃ¼ne girmek zorunda kalmayacak.

                // 2. TABLET EKRANI Ä°Ã‡Ä°N (PDF.js'in anladÄ±ÄŸÄ± formata geri Ã§eviriyoruz)
                const base64Data = base64String.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                try {
                    currentPDF = await pdfjsLib.getDocument(bytes).promise;
                    totalPDFPages = currentPDF.numPages;
                    currentPDFPage = 1;

                    if (pdfControls) pdfControls.classList.remove('hidden');

                    renderPDFPage(currentPDFPage);

                    setTimeout(() => {
                        let t = typeof translations !== 'undefined' ? translations[currentLang] : { pdf_soru: "Sayfa (1-{0}):" };
                        let soruMetni = (t.pdf_soru || "Sayfa (1-{0}):").replace('{0}', totalPDFPages);

                        const sayfaGrisi = prompt(soruMetni, "1");
                        if (sayfaGrisi !== null) {
                            const hedefSayfa = parseInt(sayfaGrisi);
                            if (hedefSayfa > 0 && hedefSayfa <= totalPDFPages) {
                                currentPDFPage = hedefSayfa;
                                renderPDFPage(currentPDFPage);

                                if (typeof isConnected !== 'undefined' && isConnected) {
                                    window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
                                }
                            }
                        }
                    }, 500);

                } catch (error) {
                    console.error("PDF aÃ§Ä±lÄ±rken hata oluÅŸtu:", error);
                }
            };   // â† fileReader.onload BURADA biter
            fileReader.readAsDataURL(file);
        }

        // --- DURUM B: RESÄ°M DOSYASI ---
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgData = event.target.result;



                const img = new Image();
                img.onload = () => {
                    // --- GORUNTU SIKISTIRMA (Resizer & Compressor) ---
                    // Telefon kameralari 15-20MB resim cektigi icin agi yavaslatir.
                    // Burada resmi tahtaya gitmeden once ufaltip 150KB'a indiriyoruz!
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1920;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round(height * (MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round(width * (MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }

                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = width;
                    tempCanvas.height = height;
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    // Resmi ciz
                    tempCtx.drawImage(img, 0, 0, width, height);
                    
                    // Yuksek oranda sikistir (JPEG 0.6)
                    const compressedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.6); 

                    const compressedImg = new Image();
                    compressedImg.onload = () => {
                        addNewImageToCanvas(compressedImg, false);
                    };
                    compressedImg.src = compressedDataUrl;
                };
                img.src = imgData;
            };
            reader.readAsDataURL(file);
        }
        // Resim/Dosya islenmeden value'yu temizlemek mobil tarayicilarda File objesinin silinmesine (GC) neden olur!
        setTimeout(() => { e.target.value = ''; }, 2000); 
    };
}


function addToCanvasAsObject(img) {
    let startWidth = 400;
    if (img.width < 400) startWidth = img.width;

    let scaleFactor = startWidth / img.width;
    let startHeight = img.height * scaleFactor;

    drawnStrokes.push({
        type: 'image',
        img: img,
        // --- TAM ORTALAMA HESABI ---
        x: (canvas.width / 2) - (startWidth / 2),
        y: (canvas.height / 2) - (startHeight / 2),
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    });

    // --- BUTONU GÃ–STERME VE KAPATMA Ä°ÅLEVÄ° FONKSÄ°YONUN Ä°Ã‡Ä°NE ALINDI ---
    if (closePdfBtn) {
        // 1. Butonu SADECE resim eklendiÄŸinde gÃ¶rÃ¼nÃ¼r yap
        closePdfBtn.classList.remove('hidden');
        closePdfBtn.style.display = 'flex';

        // 2. Kapatma iÅŸlevini tanÄ±mla
        closePdfBtn.onclick = () => {
            // Kontrol panelini ve butonun kendisini gizle
            if (typeof pdfControls !== 'undefined' && pdfControls) {
                pdfControls.classList.add('hidden');
            }
            closePdfBtn.classList.add('hidden');
            closePdfBtn.style.display = 'none';

            // Arka plan olan tÃ¼m Ã¶ÄŸeleri, lasso maskelerini ve yamalarÄ± kaldÄ±r
            drawnStrokes = drawnStrokes.filter(s => !s.isBackground && !s.isPDFPage && s.type !== 'lasso-mask' && !s.isPatch);
            window.drawnStrokes = drawnStrokes;

            // DeÄŸiÅŸkenleri sÄ±fÄ±rla
            currentPDF = null;
            if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;

            // EkranÄ± temizle ve kalan Ã§izimleri tekrar Ã§iz
            redrawAllStrokes();
        };
    }

    redrawAllStrokes();
}


if (fillButton) fillButton.addEventListener('click', () => setActiveTool(currentTool === 'fill' ? 'none' : 'fill'));
if (fillColorBoxes) {
    fillColorBoxes.forEach(box => {
        const handler = (e) => {
            e.stopPropagation();
            fillColorBoxes.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            currentFillColor = e.target.dataset.color || e.target.style.backgroundColor;
            setActiveTool('fill');
        };
        box.addEventListener('click', handler);
        box.addEventListener('touchstart', handler, { passive: false });
    });
    if (fillColorBoxes.length > 0) { fillColorBoxes[0].classList.add('selected'); currentFillColor = fillColorBoxes[0].dataset.color || fillColorBoxes[0].style.backgroundColor; }
}

colorBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        colorBoxes.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        currentPenColor = e.target.style.backgroundColor;
    });
});
colorBoxes[0].classList.add('selected');
currentPenColor = colorBoxes[0].style.backgroundColor;

lineButton.addEventListener('click', () => {
    if (lineButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        lineOptions.classList.remove('hidden'); lineOptions.style.display = 'flex'; lineButton.classList.add('active');
        const buttonRect = lineButton.getBoundingClientRect();
        const panelRect = lineButton.parentElement.getBoundingClientRect();
        lineOptions.style.top = `${buttonRect.top - panelRect.top}px`;
    }
});

// Ã‡okgen Renk SeÃ§imi (VarsayÄ±lan Beyaz)
if (polygonColorOptions.length > 0) {
    polygonColorOptions[0].classList.add('selected');
    window.currentLineColor = polygonColorOptions[0].dataset.color || '#FFFFFF';

    polygonColorOptions.forEach(box => {
        const handleColorSelect = (e) => {
            e.stopPropagation(); e.preventDefault();
            polygonColorOptions.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            const color = e.target.dataset.color || e.target.style.backgroundColor;
            window.currentLineColor = color;
            try { if (window.audio_select) { window.audio_select.currentTime = 0; window.audio_select.play(); } else if (window.audio_click) { window.audio_click.currentTime = 0; window.audio_click.play(); } } catch (err) { }
        };
        box.addEventListener('click', handleColorSelect);
        box.addEventListener('touchstart', handleColorSelect, { passive: false });
    });
}

polygonButton.addEventListener('click', () => {
    if (polygonButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        polygonOptions.classList.remove('hidden'); polygonOptions.style.display = 'flex'; polygonButton.classList.add('active');
        const buttonRect = polygonButton.getBoundingClientRect();
        const panelRect = polygonButton.parentElement.getBoundingClientRect();
        const menuHeight = polygonOptions.offsetHeight;
        const windowHeight = window.innerHeight;
        const margin = 10;
        let topOffset = buttonRect.top - panelRect.top;
        if (buttonRect.top + menuHeight > (windowHeight - margin)) {
            topOffset = (windowHeight - menuHeight - margin) - panelRect.top;
        }
        polygonOptions.style.top = `${topOffset}px`;
    }
});

// --- OYUNLAR MENÃœSÃœ: YUKARI AÃ‡ILAN, SEVÄ°MLÄ° VE SÄ°LGÄ° KAPATAN SÄ°STEM ---
oyunlarButton.addEventListener('click', (e) => {
    e.stopPropagation();

    if (oyunlarButton.classList.contains('active')) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    } else {
        // 1. DÄ°ÄER ARAÃ‡LARI VE SÄ°LGÄ°YÄ° KAPAT (IÅŸÄ±ÄŸÄ±nÄ± sÃ¶ndÃ¼rÃ¼r)
        if (typeof setActiveTool === 'function') setActiveTool('none');

        oyunlarOptions.innerHTML = ''; // Ä°Ã§eriÄŸi temizle

        // 2. MENÃœ GÃ–RÃœNÃœM AYARLARI
        oyunlarOptions.style.display = 'flex';
        oyunlarOptions.style.flexDirection = 'column';
        oyunlarOptions.style.maxHeight = '400px';
        oyunlarOptions.style.overflowY = 'auto';
        oyunlarOptions.style.touchAction = 'pan-y';
        oyunlarOptions.style.WebkitOverflowScrolling = 'touch';

        // 3. KONUMU YUKARI ALAN HESAPLAMA (Ekrana sÄ±ÄŸmasÄ± iÃ§in)
        const buttonRect = oyunlarButton.getBoundingClientRect();
        const panelRect = oyunlarButton.parentElement.getBoundingClientRect();
        oyunlarOptions.style.top = 'auto';
        oyunlarOptions.style.bottom = (panelRect.bottom - buttonRect.bottom) + 'px';

        // 4. KAYDIRMA Ä°PUCU (YazÄ± Geri Geldi)
        const hint = document.createElement('div');
        hint.innerHTML = 'â¬‡ï¸ Liste kaydÄ±rÄ±labilir â¬‡ï¸';
        hint.style.cssText = `
            text-align: center; 
            color: #00ffcc; 
            font-family: 'Fredoka', sans-serif; 
            font-size: 13px; 
            padding: 12px; 
            border-bottom: 1px solid rgba(255,255,255,0.1); 
            margin-bottom: 8px; 
            font-weight: 600;
            background: rgba(0, 255, 204, 0.05);
            border-radius: 12px 12px 0 0;
        `;
        oyunlarOptions.appendChild(hint);

        // 5. OYUNLARI EKLE
        if (window.OyunListesi && window.OyunListesi.length > 0) {
            window.OyunListesi.forEach(oyun => {
                const linkElement = document.createElement('a');
                linkElement.className = 'tool-button-sub';

                // KRÄ°TÄ°K DEÄÄ°ÅÄ°KLÄ°K BURADA:
                // 'oyun.isim' yerine 'oyun[currentLang]' kullanÄ±yoruz.
                // EÄŸer o dilde karÅŸÄ±lÄ±ÄŸÄ± yoksa (hata vermemesi iÃ§in) TÃ¼rkÃ§e'yi gÃ¶sterir.
                linkElement.innerText = oyun[currentLang] || oyun.tr;

                linkElement.style.cssText = `
            text-decoration: none; 
            display: block; 
            padding: 15px; 
            text-align: center; 
            color: white; 
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-family: 'Fredoka', sans-serif;
            font-size: 14px;
        `;

                let startY = 0;
                let isScrolling = false;

                linkElement.addEventListener('touchstart', (te) => {
                    startY = te.touches[0].clientY;
                    isScrolling = false;
                }, { passive: true });

                linkElement.addEventListener('touchmove', (te) => {
                    if (Math.abs(te.touches[0].clientY - startY) > 10) isScrolling = true;
                }, { passive: true });

                const linkiAc = (ae) => {
                    if (isScrolling) return;
                    ae.preventDefault();
                    ae.stopPropagation();
                    window.open(oyun.link, '_blank');

                    // Kapatma iÅŸlemi
                    oyunlarOptions.classList.add('hidden');
                    oyunlarButton.classList.remove('active');
                };

                linkElement.addEventListener('touchend', linkiAc);
                linkElement.addEventListener('click', linkiAc);
                oyunlarOptions.appendChild(linkElement);
            });
        }

        oyunlarOptions.classList.remove('hidden');
        oyunlarButton.classList.add('active');
    }
});

// --- BOÅLUÄA TIKLAYINCA KAPATMA (DOSYANIN EN ALTINA EKLEYÄ°N) ---
document.addEventListener('pointerdown', (e) => {

    if (oyunlarOptions && !oyunlarOptions.contains(e.target) && e.target !== oyunlarButton) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    }
});
// 2. Ana menÃ¼ kutusunun da dÄ±ÅŸarÄ±daki "Ekran Kilitlerine" takÄ±lmasÄ±nÄ± engelle:
oyunlarOptions.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

circleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    setActiveTool('draw_polygon_circle');
    window.PolygonTool.handleDrawClick(null, 0);
    regularPolygonButtons.forEach(b => b.classList.remove('active'));
    circleButton.classList.add('active');
});

regularPolygonButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const sides = parseInt(e.target.dataset.sides);
        setActiveTool(`draw_polygon_${sides}_sides`);
        window.PolygonTool.handleDrawClick(null, sides);
        regularPolygonButtons.forEach(b => b.classList.remove('active'));
        circleButton.classList.remove('active');
        e.target.classList.add('active');
    });
});

pointButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.audio_select) window.audio_select.play();
    if (!audio_click_src_set) { audio_click.src = 'sesler/point-smooth-beep-230573.mp3'; audio_click_src_set = true; }
    setActiveTool(currentTool === 'point' ? 'none' : 'point');
});
straightLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'straightLine' ? 'none' : 'straightLine'); });
infinityLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'line' ? 'none' : 'line'); });
segmentButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'segment' ? 'none' : 'segment'); });
rayButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'ray' ? 'none' : 'ray'); });

lineColorOptions.forEach(box => {
    box.addEventListener('click', (e) => {
        e.stopPropagation();
        lineColorOptions.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        const color = e.target.dataset.color || e.target.style.backgroundColor;
        window.currentLineColor = color;
    });
});
lineColorOptions[0].classList.add('selected');
window.currentLineColor = lineColorOptions[0].dataset.color || lineColorOptions[0].style.backgroundColor;

// ==========================================
// ğŸš¨ NÄ°HAÄ° Ã‡Ã–ZÃœM: KATMAN (Z-INDEX) VE BUTON KORUMA ZIRHI ğŸš¨
// ==========================================
const katmanZirhi = document.createElement('style');
katmanZirhi.innerHTML = `
    /* 1. Ã‡izim TahtasÄ±: 3D ÅŸekillerin Ã¼stÃ¼nde, butonlarÄ±n altÄ±nda kalmalÄ± */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 2. 3D Sahnesi: Kalemin altÄ±nda kalmalÄ± ki Ã¼stÃ¼ne Ã§izilebilsin */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; display: block !important; }
    
    /* 3. ArayÃ¼z ve Butonlar: Asla kaybolmamalarÄ± iÃ§in en Ã¼st seviyeye sabitlendi */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options,
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options,
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip {
        z-index: 10000 !important;
    }
`;
document.head.appendChild(katmanZirhi);

// 3D motorunun gizli kalmamasÄ±nÄ± garantile
if (window.Scene3D && window.Scene3D.container) {
    window.Scene3D.container.style.display = 'block';
    window.Scene3D.container.classList.remove('hidden');
}

// ğŸ‘‡ğŸ‘‡ğŸ‘‡ Ä°ÅTE KODU TAM OLARAK BURAYA, BU BOÅLUÄA YAPIÅTIRIYORSUN ğŸ‘‡ğŸ‘‡ğŸ‘‡

// ğŸš¨ PERGEL TEPE Ã‡Ä°FT TIKLAMA KESÄ°N DÃœZELTMESÄ° (SIÃ‡RAMA ENGELÄ°)
document.addEventListener('dblclick', (e) => {
    const hedef = e.target;
    // Ã‡ift tÄ±klanan eleman pergelin tepesi mi kontrol et
    if (hedef && (hedef.id === 'compass-top' || hedef.classList.contains('compass-top') || hedef.id === 'pergel-tepe' || hedef.closest('#compass-top') || hedef.closest('.pergel-tepe') || hedef.closest('#compass-handle'))) {

        // 1. Eski dosyalardaki hatalÄ± sÄ±Ã§rama kodunun Ã§alÄ±ÅŸmasÄ±nÄ± tamamen engelle!
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        // 2. Yerinden oynatmadan uÃ§larÄ± takas et
        if (window.PergelTool && window.PergelTool.state) {
            // Pergeli iÄŸne ucu etrafÄ±nda 180 derece dÃ¶ndÃ¼rerek uÃ§larÄ± kusursuzca eÅŸler
            window.PergelTool.state.rotation = (window.PergelTool.state.rotation || 0) + Math.PI;

            if (typeof window.PergelTool.updateTransform === 'function') {
                window.PergelTool.updateTransform();
            }
            if (typeof window.araclariAgaGonder === 'function') {
                window.araclariAgaGonder();
            }
        }
    }
}, true); // 'true' (capturing) sayesinde eski hatalÄ± koddan Ã–NCE devreye girer ve onu iptal eder!

// ğŸ‘†ğŸ‘†ğŸ‘† PERGEL KODU BURADA BÄ°TÄ°YOR ğŸ‘†ğŸ‘†ğŸ‘†

// --- app.js: CanlandÄ±r Butonu (TEK SEFERDE AÃ‡ILMA VE ARD ARDA SINIRSIZ KULLANIM GARANTÄ°SÄ°) ---
if (typeof animateButton !== 'undefined' && animateButton) {
    animateButton.onclick = null;
    animateButton.ontouchstart = null;
    animateButton.addEventListener('pointerdown', toggleSnapshotMenu, { passive: false });
}
// <--- KOD DOSYASI TAM OLARAK BU PARANTEZLE BÄ°TMELÄ°DÄ°R!

// ğŸš¨ NÄ°HAÄ° Ã‡Ã–ZÃœM: GERÃ‡EK Ã‡OKLU DOKUNMATÄ°K (MULTI-TOUCH) TAKÄ°PÃ‡Ä°SÄ°
window.touchCount = 0;
window.lastTouchDist = 0;
canvas.addEventListener('touchstart', (e) => { window.touchCount = e.touches.length; }, { passive: true });
canvas.addEventListener('touchend', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });
canvas.addEventListener('touchcancel', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });

// ğŸš¨ GERÃ‡EK MULTI-TOUCH ZOOM MOTORU (ZÄ±plamayÄ± Engelleyen Ana Motor)
canvas.addEventListener('touchmove', (e) => {
    if (currentTool === 'move' && e.touches && e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        
        // ğŸš¨ Ã‡Ã–ZÃœM 2: Ã‡ift parmak zoom motoru devreye girdiÄŸinde sÃ¼rÃ¼klemeyi KESÄ°N olarak kapat!
        // BÃ¶ylece taÅŸÄ±ma ve zoom komutlarÄ± birbiriyle savaÅŸmaz, ekran zÄ±plamaz.
        isMoving = false; 

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        const p1x = e.touches[0].clientX; const p1y = e.touches[0].clientY;
        const p2x = e.touches[1].clientX; const p2y = e.touches[1].clientY;
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);

        if (window.lastTouchDist > 0) {
            const delta = currentDist - window.lastTouchDist;
            const zoomStep = 1 + (delta * 0.003);
            const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
            
            if (mainBg) {
                const cx = mainBg.x + mainBg.width / 2;
                const cy = mainBg.y + mainBg.height / 2;
                
                drawnStrokes.forEach(bg => {
                    if (bg.isBackground === true) {
                        const bg_cx = bg.x + bg.width / 2;
                        const bg_cy = bg.y + bg.height / 2;
                        const ncx = cx + (bg_cx - cx) * zoomStep;
                        const ncy = cy + (bg_cy - cy) * zoomStep;
                        bg.width *= zoomStep; bg.height *= zoomStep;
                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                    }
                });

                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (!s.isBackground && typeof window.zoomStroke === 'function') {
                            window.zoomStroke(s, zoomStep, cx, cy);
                        }
                    });
                }
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height });
                }
            }
        }
        window.lastTouchDist = currentDist;
    }
}, { passive: false });
canvas.addEventListener('pointerdown', (e) => {
    document.body.classList.add('ghost-mode');
    // ğŸš¨ SÄ°HÄ°RLÄ° DOKUNUÅ 1: Ne olursa olsun Ã–NCE tarayÄ±cÄ±nÄ±n yerleÅŸik kaydÄ±rmasÄ±nÄ± (titremeyi) kilitliyoruz!
    if (e.cancelable) e.preventDefault();

    // AKILLI TAHTA YAMASI VE GERÄ°YE DÃ–NÃœK AVUÃ‡ Ä°Ã‡Ä° (PALM) REDDÄ°:
    if (e.pointerType === 'pen') {
        // EÄŸer kÄ±sa sÃ¼re Ã¶nce (avuÃ§ iÃ§i yÃ¼zÃ¼nden) bir veya birden fazla "touch" Ã§izimi baÅŸladÄ±ysa, onlarÄ± anÄ±nda iptal et ve sil!
        let avucIciSilindi = false;
        while (window.drawnStrokes && window.drawnStrokes.length > 0) {
            const lastS = window.drawnStrokes[window.drawnStrokes.length - 1];
            if (lastS.type === 'pen' && lastS.pointerType === 'touch' && lastS.startTime && (Date.now() - lastS.startTime) < 1500) {
                const popped = window.drawnStrokes.pop();
                avucIciSilindi = true;
                if (typeof window.sendNetworkData === 'function' && popped && popped.id) {
                    window.sendNetworkData({ type: 'sil_belirli', id: popped.id });
                }
            } else {
                break;
            }
        }

        if (avucIciSilindi) {
            isDrawing = false; // Temizle ki alt taraftaki switch bloÄŸu kalem iÃ§in temiz bir stroke baÅŸlatsÄ±n
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        isPenActive = true;
        clearTimeout(penActiveTimer);
        // Kalem havaya kalksa bile 2 saniye boyunca eli (avuÃ§ iÃ§ini) reddetmeye devam et:
        penActiveTimer = setTimeout(() => { isPenActive = false; }, 2000);
    }
    if (e.pointerType === 'touch' && isPenActive) return;

    // --- KRÄ°TÄ°K EKLENTÄ°: HAYALET PARMAK SIFIRLAYICI ---
    if (e.isPrimary) {
        pointers.clear();
        lastDist = 0;
    }

    if (currentTool === 'lasso') {
        const pos = getPointerPos(e);
        window.isDraggingLassoPoint = true;
        currentMousePos = pos;
        window.lassoIsClosing = false;
        redrawAllStrokes(); return;
    }

    pointers.set(e.pointerId, e);
    const pos = getPointerPos(e);
    const snapPos = snapTarget || pos;
    currentMousePos = pos;

    // --- TABLET 3D Ã‡Ã–ZÃœMÃœ: EKRANIN HAM PÄ°KSELLERÄ°NÄ° AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (window.touchCount > 0 && e.pointerType === 'touch') { rawX = e.clientX; rawY = e.clientY; } // PointerEvent uses clientX natively

    // ğŸš¨ Ã‡Ã–ZÃœM 4: 3D Åekil aÃ§Ä±kken yeÅŸil ve pembe butonlarÄ±n tÄ±klanmasÄ±nÄ± 3D motoru Ã§almasÄ±n! Ã–ncelik zÄ±rhÄ±!
    let butonYakalandi = false;
    if (currentTool === 'move') {
        const tempHit = typeof findHit === 'function' ? findHit(pos) : null;
        if (tempHit && (tempHit.pointKey === 'image_rotate' || tempHit.pointKey === 'image_resize')) {
            butonYakalandi = true;
        }
    }

    // --- ğŸš¨ KÃ–PRÃœ 1: 3D MOTORUNA DEVRET (HIRSIZLIK KORUMALI) ---
    if (window.Scene3D && window.Scene3D.isInit && !butonYakalandi) {
        if (currentTool === 'move' || currentTool === 'select') {
            window.Scene3D.onDown(rawX, rawY);
            // ğŸš¨ Ã‡Ã–ZÃœM: 3D ÅŸekil seÃ§ildiÄŸinde erken dÃ¶nÃ¼ÅŸ YAPMIYORUZ. 
            // 2D motorunun da isMoving, dragStartPos gibi taÅŸÄ±ma deÄŸiÅŸkenlerini baÅŸlatmasÄ±na izin veriyoruz!
        }
        // SADECE "draw_3d" ile baÅŸlayan 3D araÃ§larÄ± seÃ§iliyse 3D motoruna izin ver!
        else if (currentTool && currentTool.startsWith('draw_3d_')) {
            let toolName = currentTool.replace('draw_3d_', '');
            window.Scene3D.setTool(toolName);
            window.Scene3D.onDown(rawX, rawY);
            return;
        }
    }

    // --- 1. FÄ°ZÄ°KSEL ARAÃ‡ KONTROLÃœ ---
    const isToolElementClicked = e.target.closest('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
    if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';
    if (isToolElementClicked) {
        isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
        lineStartPoint = null; window.tempPolygonData = null;
        if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
        return;
    }

    // --- 2. "TAÅI" MODU KONTROLÃœ ---
    if (currentTool === 'move') {
        const hit = findHit(pos);
        if (hit) {
            drawnStrokes = drawnStrokes.filter(s => s !== hit.item); drawnStrokes.push(hit.item); window.drawnStrokes = drawnStrokes;

            // ğŸš¨ ETÄ°KETLERÄ°N PC'YE GÃ–NDERÄ°LMESÄ° (AÄŸa Sinyal Eklendi)
            if (hit.pointKey === 'toggle_edges') {
                hit.item.showEdgeLabels = !hit.item.showEdgeLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_angles') {
                hit.item.showAngleLabels = !hit.item.showAngleLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_circle_info') {
                hit.item.showCircleInfo = !hit.item.showCircleInfo;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }

            isMoving = true; selectedItem = hit.item; selectedPointKey = hit.pointKey; dragStartPos = pos;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });

            originalStartPos = {};
            if (hit.pointKey === 'self') originalStartPos = { x: hit.item.x, y: hit.item.y };
            else if (hit.pointKey === 'p1') originalStartPos = { x: hit.item.p1.x, y: hit.item.p1.y };
            else if (hit.pointKey === 'p2') originalStartPos = { x: hit.item.p2.x, y: hit.item.p2.y };
            else if (hit.pointKey === 'center') originalStartPos = { x: (hit.item.cx || hit.item.center.x), y: (hit.item.cy || hit.item.center.y) };
            else if (hit.pointKey === 'rotate' || hit.pointKey === 'resize' || hit.pointKey === 'image_resize' || hit.pointKey === 'image_rotate') {
                originalStartPos = { radius: hit.item.radius, rotation: hit.item.rotation, rotationX: hit.item.rotationX || 0, rotationY: hit.item.rotationY || 0, x: hit.item.x || (hit.item.center ? hit.item.center.x : 0), y: hit.item.y || (hit.item.center ? hit.item.center.y : 0) };
                if (selectedItem.type === 'rectangle' || selectedItem.type === 'image' || selectedItem.type === '3d_shape') { initialWidth = selectedItem.width; initialHeight = selectedItem.height; }
            }
            const itemType = hit.item.type;
            if ((itemType === 'line' || itemType === 'segment' || itemType === 'ray' || itemType === 'straightLine') && (hit.pointKey === 'p1' || hit.pointKey === 'p2')) {
                rotationPivot = (hit.pointKey === 'p1') ? hit.item.p2 : hit.item.p1; const movingPoint = (hit.pointKey === 'p1') ? hit.item.p1 : hit.item.p2; selectedItem.startRadius = distance(movingPoint, rotationPivot);
            } else rotationPivot = null;
            redrawAllStrokes(); return;
        } else {
            if (selectedItem) selectedItem.showEdgeLabels = selectedItem.showAngleLabels = selectedItem.showCircleInfo = false;
            selectedItem = null;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_kaldir' });
            redrawAllStrokes();
        }
    }

    if (currentTool === 'none') return;
    if (['point', 'straightLine', 'line', 'segment', 'ray'].includes(currentTool)) { if (typeof lineOptions !== 'undefined' && lineOptions) { lineOptions.classList.add('hidden'); lineOptions.style.display = 'none'; } }
    if (currentTool === 'snapshot') { snapshotStart = getPointerPos(e); return; }

    switch (currentTool) {
        case 'pen': isDrawing = true; const pInfoDown = getPointerInfo(e); const pStroke = { type: 'pen', pointerType: pInfoDown.type, startTime: Date.now(), path: [{ x: snapPos.x, y: snapPos.y, p: pInfoDown.type === 'pen' ? pInfoDown.pressure : 1 }], color: currentPenColor, baseWidth: currentPenWidth, id: Date.now() + Math.random() }; drawnStrokes.push(pStroke); break;
        case 'point': isDrawing = false; const noktaObj = { type: 'point', x: snapPos.x, y: snapPos.y, label: nextPointChar, color: window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF'), id: Date.now() + Math.random() }; drawnStrokes.push(noktaObj); if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'yeni_cizim', stroke: noktaObj }); nextPointChar = advanceChar(nextPointChar); if (typeof window.nextPointChar !== 'undefined') window.nextPointChar = nextPointChar; setTimeout(() => { if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); }, 10); break;
        case 'eraser': isDrawing = false; break; // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Silgi modunda kalem izi Ã§izilmesi tamamen yasaklandÄ±!
        case 'straightLine': if (!isDrawingLine) { isDrawingLine = true; lineStartPoint = snapPos; } break;
        case 'line': if (!isDrawingInfinityLine) { isDrawingInfinityLine = true; lineStartPoint = pos; } break;
        case 'segment': if (!isDrawingSegment) { isDrawingSegment = true; lineStartPoint = snapPos; } break;
        case 'ray': if (!isDrawingRay) { isDrawingRay = true; lineStartPoint = pos; } break;
        case 'draw_rectangle': isDrawingRectangle = true; rectStartPoint = pos; break;
        case 'draw_polygon_circle':
        case 'draw_polygon_3_sides': case 'draw_polygon_4_sides': case 'draw_polygon_5_sides':
        case 'draw_polygon_6_sides': case 'draw_polygon_7_sides': case 'draw_polygon_8_sides':
            if (!window.tempPolygonData) window.tempPolygonData = { center: null, type: 0, radius: 0, rotation: 0 };
            if (window.tempPolygonData.center === null) { window.tempPolygonData.center = snapPos; window.tempPolygonData.type = currentTool === 'draw_polygon_circle' ? 0 : parseInt(currentTool.split('_')[2]); if (window.PolygonTool) window.PolygonTool.state.isDrawing = true; if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.remove('hidden'); }
            else {
                const finalRadius = window.tempPolygonData.radius || 0; if (window.tempPolygonData.type === 0) window.PolygonTool.finalizeCircle(finalRadius); else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);
                setTimeout(() => { const lastS = drawnStrokes[drawnStrokes.length - 1]; if (lastS) window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS }); }, 50);
                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden'); window.tempPolygonData.center = null;
            }
            break;
    }
}, { passive: false });

canvas.addEventListener('pointermove', (e) => {
    // ğŸš¨ SÄ°HÄ°RLÄ° DOKUNUÅ 2: SÃ¼rÃ¼kleme sÄ±rasÄ±nda ekran titremesinin 1 numaralÄ± dÃ¼ÅŸmanÄ± olan zÄ±plamayÄ± EN BAÅTA yok et!
    if (e.cancelable) e.preventDefault();

    const currentPointerMove = getPointerInfo(e);
    if (currentPointerMove.type === 'pen') { isPenActive = true; clearTimeout(penActiveTimer); penActiveTimer = setTimeout(() => { isPenActive = false; }, 1000); }
    else if (currentPointerMove.type === 'touch' && isPenActive) return;

    // --- PARDUS Ã‡Ä°FT SÄ°NYAL ENGELLEYÄ°CÄ° ---
    if (e.pointerType === 'mouse') { let hasTouch = false; for (let p of pointers.values()) if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true; if (hasTouch) return; }
    pointers.set(e.pointerId, e);

    if (pointers.size >= 2 && currentTool === 'move') {
        // ğŸš¨ Ã‡Ã–ZÃœM 3A: Zoom baÅŸlarken sÃ¼rÃ¼klemeyi tamamen kapat!
        isMoving = false; 

        // ğŸš¨ Ã‡AKIÅMAYI Ã–NLEYÄ°CÄ° ZIRH: EÄŸer cihaz gerÃ§ek TouchEvent destekliyorsa (touchCount >= 2),
        // yedek PointerEvent motorunu DURDUR! Aksi takdirde iki motor aynÄ± anda Ã§alÄ±ÅŸÄ±p zoomu KÄ°LÄ°TLER!
        if (window.touchCount >= 2) return;

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        let p1x, p1y, p2x, p2y;
        const p = Array.from(pointers.values());
        if (p.length >= 2) {
            p1x = p[0].clientX; p1y = p[0].clientY; p2x = p[1].clientX; p2y = p[1].clientY;
        } else {
            return;
        }
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);
        if (lastDist > 0) {
            const delta = currentDist - lastDist; const zoomStep = 1 + (delta * 0.003);
            const bgStrokes = drawnStrokes.filter(s => s.isBackground === true);
            if (bgStrokes.length > 0) {
                const cx = bgStrokes[0].x + bgStrokes[0].width / 2;
                const cy = bgStrokes[0].y + bgStrokes[0].height / 2;
                bgStrokes.forEach(bg => { const newW = bg.width * zoomStep; const newH = bg.height * zoomStep; bg.x -= (newW - bg.width) / 2; bg.y -= (newH - bg.height) / 2; bg.width = newW; bg.height = newH; });
                if (window.drawnStrokes) window.drawnStrokes.forEach(s => { if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy); });
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'zoom_senkron', x: bgStrokes[0].x, y: bgStrokes[0].y, width: bgStrokes[0].width, height: bgStrokes[0].height });
            }
        }
        lastDist = currentDist; return;
    }

    if (pointers.size > 1 && e.isPrimary === false) return;
    const pos = getPointerPos(e); currentMousePos = pos;

    // --- TABLET 3D Ã‡Ã–ZÃœMÃœ: EKRANIN HAM PÄ°KSELLERÄ°NÄ° AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (e.targetTouches && e.targetTouches.length > 0) { rawX = e.targetTouches[0].clientX; rawY = e.targetTouches[0].clientY; }

    // --- ğŸš¨ KÃ–PRÃœ 2: 3D HAREKETÄ° (TAÅIMA MOTORU ZIRHI) ---
    if (window.Scene3D && window.Scene3D.isInit) {
        // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: "TaÅŸÄ±" modundayken de ÅŸeklin hareket etmesi iÃ§in 3D motoruna izin verdik.
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            window.Scene3D.onMove(rawX, rawY);
            if (!window.Scene3D.isDragging) return; // TaÅŸÄ±ma iÅŸlemi iÃ§in 2D motoruna devam etmesine izin ver
        }
    }

    if (window.isImageRotating && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; selectedItem.rotation = (Math.atan2(pos.y - cY, pos.x - cX) * 180 / Math.PI) + 90; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', transform: `rotate(${selectedItem.rotation}deg)` }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }
    if (window.isImageResizing && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; const ratio = Math.hypot(pos.x - cX, pos.y - cY) / window.startImageDistance; selectedItem.width = window.startImageWidth * ratio; selectedItem.height = window.startImageHeight * ratio; selectedItem.x = cX - selectedItem.width / 2; selectedItem.y = cY - selectedItem.height / 2; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', width: selectedItem.width + 'px', height: selectedItem.height + 'px' }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }

    if (currentTool === 'move' && isMoving && selectedItem) {
        // ğŸš¨ Ã‡Ã–ZÃœM 3B: Ekrana ikinci parmak deÄŸdiÄŸi an veya Zoom iÅŸlemi devam ediyorsa
        // sÃ¼rÃ¼klemeyi anÄ±nda iptal ediyoruz. Bu tek parmakla taÅŸÄ±rken yaÅŸanan "zÄ±plama" sorununu tamamen bitirir.
        if (window.touchCount >= 2 || pointers.size >= 2 || window.isZooming) {
            isMoving = false;
            return;
        }

        const dx = pos.x - dragStartPos.x; const dy = pos.y - dragStartPos.y;
        if (selectedPointKey === 'self' || selectedPointKey === 'center') { 
            let oldX = 0, oldY = 0, newX = 0, newY = 0;
            if (selectedItem.type === 'arc') { 
                oldX = selectedItem.cx; oldY = selectedItem.cy;
                selectedItem.cx = originalStartPos.x + dx; selectedItem.cy = originalStartPos.y + dy; 
                newX = selectedItem.cx; newY = selectedItem.cy;
            } else if (selectedItem.center) { 
                oldX = selectedItem.center.x; oldY = selectedItem.center.y;
                selectedItem.center.x = originalStartPos.x + dx; selectedItem.center.y = originalStartPos.y + dy; 
                newX = selectedItem.center.x; newY = selectedItem.center.y;
            } else { 
                oldX = selectedItem.x; oldY = selectedItem.y;
                selectedItem.x = (originalStartPos.x || 0) + dx; selectedItem.y = (originalStartPos.y || 0) + dy; 
                newX = selectedItem.x; newY = selectedItem.y;
                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: TaÅŸÄ±ma sÄ±rasÄ±nda 3D ÅŸekillerin originalX ve originalY deÄŸerlerini gÃ¼ncelle
                if (selectedItem.originalX !== undefined) {
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;
                }
            } 
            if (selectedItem.vertices) selectedItem.vertices = null; 

            if (selectedItem.isBackground === true) {
                const diffX = newX - oldX;
                const diffY = newY - oldY;
                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (s !== selectedItem && !s.isBackground) {
                            if (typeof window.moveStroke === 'function') window.moveStroke(s, diffX, diffY);
                        }
                    });
                }
                
                // ğŸš¨ Ã‡Ã–ZÃœM 1: Arka plan kaydÄ±rÄ±lÄ±rken PC'ye devasa koordinatlarÄ± gÃ¶ndermek yerine,
                // Sadece ne kadar kaydÄ±ÄŸÄ±nÄ± (Delta X, Delta Y) Ã¶zel 'hepsini_tasi' komutuyla gÃ¶nderiyoruz.
                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'hepsini_tasi', dx: diffX, dy: diffY });
                }
                
                redrawAllStrokes();
                return; // ğŸš¨ KRÄ°TÄ°K: Tabletin yanlÄ±ÅŸ (sekil_guncelle) komutunu yollamasÄ±nÄ± engeller!
            }
        }


        else if (selectedPointKey === 'rotate' || selectedPointKey === 'image_rotate') {
            if (selectedItem.type === '3d_shape') {
                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: 3D Åekilleri X ve Y ekseninde (Ã–ne-Arkaya ve SaÄŸa-Sola) DÃ¶ndÃ¼rme
                const dragDx = pos.x - dragStartPos.x;
                const dragDy = pos.y - dragStartPos.y;
                selectedItem.rotationY = (originalStartPos.rotationY || 0) + dragDx * 0.02;
                selectedItem.rotationX = (originalStartPos.rotationX || 0) + dragDy * 0.02;
                if (window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                    if (sceneMesh) {
                        sceneMesh.rotation.x = selectedItem.rotationX;
                        sceneMesh.rotation.y = selectedItem.rotationY;
                        window.Scene3D.updateHandlePositions();
                    }
                }
            } else {
                const isRect = (['rectangle', 'rect', 'image'].includes(selectedItem.type));
                const cX = isRect ? selectedItem.x + selectedItem.width / 2 : selectedItem.center.x;
                const cY = isRect ? selectedItem.y + selectedItem.height / 2 : selectedItem.center.y;
                selectedItem.rotation = (originalStartPos.rotation || 0) + (Math.atan2(pos.y - cY, pos.x - cX) - Math.atan2(dragStartPos.y - cY, dragStartPos.x - cX)) * (180 / Math.PI);
                if (selectedItem.vertices) selectedItem.vertices = null;
            }
        }
        else if (selectedPointKey === 'resize' || selectedPointKey === 'image_resize') {
            // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: 3D Åekillere Ã–zel YumuÅŸak BÃ¼yÃ¼tme/KÃ¼Ã§Ã¼ltme
            if (selectedItem.type === '3d_shape') {
                const sW = initialWidth || selectedItem.width;
                const startCX = (originalStartPos.x || 0) + (sW / 2);
                const startCY = (originalStartPos.y || 0) + (sW / 2);
                const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY) || 1;
                const currentDist = Math.hypot(pos.x - startCX, pos.y - startCY);

                const ratio = currentDist / startDist;

                if (ratio > 0.1 && ratio < 10) { // SÄ±Ã§rama ve sonsuz bÃ¼yÃ¼me engellendi
                    selectedItem.width = sW * ratio;
                    selectedItem.height = sW * ratio;
                    selectedItem.x = startCX - (selectedItem.width / 2);
                    selectedItem.y = startCY - (selectedItem.height / 2);
                    
                    // ğŸš¨ 1. AÄ SENKRONU: Pembe butonla bÃ¼yÃ¼tÃ¼rken mÃ¼hÃ¼rlÃ¼ deÄŸerleri de bÃ¼yÃ¼t ki PC bunu kabul etsin!
                    selectedItem.originalW = selectedItem.width;
                    selectedItem.originalH = selectedItem.height;
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;

                    if (window.Scene3D && window.Scene3D.scene) {
                        const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                        if (sceneMesh) {
                            const yeniScale = (selectedItem.width / 30) / sceneMesh.userData.baseSize;
                            sceneMesh.scale.set(yeniScale, yeniScale, yeniScale);
                            window.Scene3D.updateHandlePositions();
                        }
                    }
                }
            }
            // DÄ°ÄER (2D) ÅEKÄ°LLERÄ°N ORÄ°JÄ°NAL KODLARI
            else if (['rectangle', 'rect', 'image'].includes(selectedItem.type)) {
                const sW = initialWidth || selectedItem.width; const sH = initialHeight || selectedItem.height; const startCX = (originalStartPos.x || 0) + (sW / 2); const startCY = (originalStartPos.y || 0) + (sH / 2); const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY); if (startDist > 10) { const ratio = Math.hypot(pos.x - startCX, pos.y - startCY) / startDist; selectedItem.width = sW * ratio; selectedItem.height = sH * ratio; selectedItem.x = startCX - (selectedItem.width / 2); selectedItem.y = startCY - (selectedItem.height / 2); const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel && selectedItem.type !== 'image') { const kalibrasyon = 30; previewLabel.innerText = `w: ${(selectedItem.width / kalibrasyon).toFixed(1)} cm, h: ${(selectedItem.height / kalibrasyon).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); } }
            } else {
                const startDist = Math.hypot(dragStartPos.x - selectedItem.center.x, dragStartPos.y - selectedItem.center.y); if (startDist > 0) selectedItem.radius = originalStartPos.radius * (Math.hypot(pos.x - selectedItem.center.x, pos.y - selectedItem.center.y) / startDist); if (selectedItem.vertices) selectedItem.vertices = null; const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { const sides = selectedItem.sideCount || selectedItem.type; let kenarPx = selectedItem.radius; if (sides >= 3) kenarPx = 2 * selectedItem.radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
            }
        }
        redrawAllStrokes();
        if (typeof isConnected !== 'undefined' && isConnected) {
            // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: 3D dÃ¶ndÃ¼rme ve konum koordinatlarÄ± (rotationX/Y/Z ve pos3D) sÃ¼zgeÃ§ten kurtarÄ±ldÄ±, PC'ye gÃ¶nderiliyor!
            window.sendNetworkData({
                type: 'sekil_guncelle',
                stroke: {
                    id: selectedItem.id,
                    type: selectedItem.type,
                    isBackground: selectedItem.isBackground === true,
                    x: selectedItem.x,
                    y: selectedItem.y,
                    width: selectedItem.width,
                    height: selectedItem.height,
                    rotation: selectedItem.rotation || 0,
                    rotationX: selectedItem.rotationX,
                    rotationY: selectedItem.rotationY,
                    rotationZ: selectedItem.rotationZ,
                    pos3D: selectedItem.pos3D,
                    radius: selectedItem.radius,
                    cx: selectedItem.cx,
                    cy: selectedItem.cy,
                    center: selectedItem.center,
                    // ğŸš¨ 2. AÄ SENKRONU: Boyut mÃ¼hÃ¼rlerini PC'ye fÄ±rlatÄ±yoruz!
                    originalX: selectedItem.originalX,
                    originalY: selectedItem.originalY,
                    originalW: selectedItem.originalW,
                    originalH: selectedItem.originalH
                }
            });
            window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });
        }
        return;
    }

    if (['ruler', 'gonye', 'aciolcer', 'pergel', 'none'].includes(currentTool)) return;
    clearTimeout(snapHoverTimer);
    if (['point', 'straightLine', 'pen', 'segment'].includes(currentTool)) { const potentialSnap = findSnapPoint(pos); if (potentialSnap) { snapHoverTimer = setTimeout(() => { snapTarget = potentialSnap; snapIndicator.style.left = `${snapTarget.x}px`; snapIndicator.style.top = `${snapTarget.y}px`; snapIndicator.style.display = 'block'; }, 25); } else { snapTarget = null; snapIndicator.style.display = 'none'; } }
    if (currentTool === 'eraser') { eraserPreview.style.left = `${pos.x}px`; eraserPreview.style.top = `${pos.y}px`; eraserPreview.style.display = 'block'; } else if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';

    let previewActive = false; const endPos = snapTarget || pos;
    const aktifCizimVarMi = isDrawingLine || isDrawingInfinityLine || isDrawingSegment || isDrawingRay || isDrawingRectangle || (window.tempPolygonData && window.tempPolygonData.center) || (currentTool === 'snapshot' && typeof snapshotStart !== 'undefined' && snapshotStart);

    if (aktifCizimVarMi) {
        redrawAllStrokes(); const ctx = canvas.getContext('2d'); ctx.save(); ctx.strokeStyle = window.currentLineColor || '#000000'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]);

        if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && lineStartPoint) {
            ctx.beginPath(); const dx = endPos.x - lineStartPoint.x; const dy = endPos.y - lineStartPoint.y;
            if (dx !== 0 || dy !== 0) { const devCarpan = 5000; if (currentTool === 'line') { ctx.moveTo(lineStartPoint.x - dx * devCarpan, lineStartPoint.y - dy * devCarpan); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else if (currentTool === 'ray') { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } ctx.stroke();
        }
        else if (isDrawingRectangle && rectStartPoint) { ctx.beginPath(); ctx.rect(Math.min(rectStartPoint.x, endPos.x), Math.min(rectStartPoint.y, endPos.y), Math.abs(endPos.x - rectStartPoint.x), Math.abs(endPos.y - rectStartPoint.y)); ctx.stroke(); }
        else if (window.tempPolygonData && window.tempPolygonData.center) {
            const cx = window.tempPolygonData.center.x; const cy = window.tempPolygonData.center.y; const radius = Math.hypot(endPos.x - cx, endPos.y - cy); const angleRad = Math.atan2(endPos.y - cy, endPos.x - cx); window.tempPolygonData.radius = radius; window.tempPolygonData.rotation = angleRad * 180 / Math.PI; const sides = window.tempPolygonData.type;
            ctx.beginPath(); if (sides === 0) ctx.arc(cx, cy, radius, 0, Math.PI * 2); else if (sides >= 3) { for (let i = 0; i <= sides; i++) { const polyAngle = (i * 2 * Math.PI / sides) + angleRad; const px = cx + radius * Math.cos(polyAngle); const py = cy + radius * Math.sin(polyAngle); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } } ctx.stroke();
            const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { let kenarPx = radius; if (sides >= 3) kenarPx = 2 * radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (endPos.x + 15) + 'px'; previewLabel.style.top = (endPos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
        }
        else if (currentTool === 'snapshot' && snapshotStart) { ctx.strokeStyle = '#00ffcc'; ctx.beginPath(); ctx.rect(Math.min(snapshotStart.x, endPos.x), Math.min(snapshotStart.y, endPos.y), Math.abs(endPos.x - snapshotStart.x), Math.abs(endPos.y - snapshotStart.y)); ctx.stroke(); }
        ctx.restore(); previewActive = true;

        // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Tablet dokunuÅŸlarÄ±ndaki PC gÃ¶nderim engelini kaldÄ±rÄ±yoruz!
        const isTouchActive = (e.touches && e.touches.length > 0) || isDrawing || aktifCizimVarMi;
        if (typeof isConnected !== 'undefined' && isConnected && (e.buttons > 0 || isTouchActive)) {
            const anlikPos = typeof getPointerPos === 'function' ? getPointerPos(e) : { x: e.clientX, y: e.clientY };
            let previewData = null;
            if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && typeof lineStartPoint !== 'undefined' && lineStartPoint) previewData = { tool: currentTool, start: lineStartPoint, end: anlikPos };
            // ğŸš¨ Ã‡Ã–ZÃœM 4 Ä°Ã‡Ä°N DÄ°KDÃ–RTGEN Ä°SMÄ° DE DÃœZELTÄ°LDÄ°:
            else if (currentTool === 'draw_rectangle' && typeof rectStartPoint !== 'undefined' && rectStartPoint) previewData = { tool: 'draw_rectangle', start: rectStartPoint, end: anlikPos };
            // ğŸš¨ Ã‡Ã–ZÃœM 3: KENAR SAYISI VE DÃ–NÃœÅ AÃ‡ISI AÄA EKLENDÄ°:
            else if (window.tempPolygonData && window.tempPolygonData.center) previewData = { tool: 'polygon', start: window.tempPolygonData.center, end: anlikPos, radius: Math.hypot(anlikPos.x - window.tempPolygonData.center.x, anlikPos.y - window.tempPolygonData.center.y), sides: window.tempPolygonData.type, rotation: Math.atan2(anlikPos.y - window.tempPolygonData.center.y, anlikPos.x - window.tempPolygonData.center.x) };
            if (previewData) window.sendNetworkData({ type: 'aktif_onizleme', arac: 'cizim_onizleme', payload: previewData });
        }
    }

    if (previewActive) return;
    if (currentTool === 'lasso') { currentMousePos = pos; if (typeof isDrawingLasso !== 'undefined' && isDrawingLasso && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) { let startPoint = lassoPoints[0]; const toleransScale = (typeof globalScale !== 'undefined' && globalScale > 0) ? globalScale : 1; window.lassoIsClosing = (Math.hypot(pos.x - startPoint.x, pos.y - startPoint.y) < (40 / toleransScale)); } redrawAllStrokes(); return; }
    if (!isDrawing) return;

    if (currentTool === 'pen') {
        const pInfoMove = getPointerInfo(e);
        const curStroke = drawnStrokes[drawnStrokes.length - 1];
        curStroke.path.push({ x: pos.x, y: pos.y, p: pInfoMove.type === 'pen' ? pInfoMove.pressure : 1 }); 
        redrawAllStrokes();

        // ğŸš¨ CANLI Ã‡Ä°ZÄ°M (LIVE INK) AKTARIMI ğŸš¨
        // Kalem henÃ¼z havadayken, yazÄ±lan kÄ±smÄ±n tamamÄ± saliseler iÃ§inde PC'ye fÄ±rlatÄ±lÄ±r
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ 
                type: 'aktif_onizleme', 
                arac: 'cizim_onizleme', 
                payload: { tool: 'pen', path: curStroke.path, color: curStroke.color, baseWidth: curStroke.baseWidth } 
            });
        }
    }
}, { passive: false });


// --- POINTER UP (TÃœM Ã‡Ä°ZÄ°M VE ARAÃ‡ Ä°ÅLEMLERÄ°NÄ°N BÄ°TÄ°ÅÄ°) ---

canvas.addEventListener('pointerup', (e) => {
    setTimeout(() => { if (!isDrawing) document.body.classList.remove('ghost-mode'); }, 300);
    isDrawing = false;

    // Kilitleri serbest bÄ±rak
    if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
    }
    if (e.pointerType === 'touch' && e.cancelable) e.preventDefault();

    // --- PARDUS Ã‡Ä°FT SÄ°NYAL ENGELLEYÄ°CÄ° ---
    if (e.pointerType === 'mouse') {
        let hasTouch = false;
        for (let p of pointers.values()) {
            if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true;
        }
        if (hasTouch) return;
    }

    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastDist = 0;

    const finalPos = snapTarget || currentMousePos;

    // --- ğŸš¨ KÃ–PRÃœ 3: 3D Ä°ÅLEMÄ°NÄ° BÄ°TÄ°R VE SAHNEYE KOY ---
    if (window.Scene3D && window.Scene3D.isInit) {
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            const wasDrawing = window.Scene3D.isDrawing;
            const wasDragging = window.Scene3D.isDragging;
            window.Scene3D.onUp();

            if (wasDrawing) {
                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: "TaÅŸÄ±" (move) butonuna otomatik geÃ§meyi Ä°PTAL ettik. Sistem boÅŸta kalÄ±r.
                window.active3DShapeTool = null;
                currentTool = 'none';
                if (typeof setActiveTool === 'function') setActiveTool('none');

                const mainBtn = document.getElementById('btn-3d-menu');
                if (mainBtn) mainBtn.classList.remove('active');

                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'onizleme_bitir' });
            }
            if (!wasDragging) return; // TaÅŸÄ±ma iÅŸlemi iÃ§in 2D motoruna devam etmesine izin ver
        }
    }


    // --- A) FÄ°ZÄ°KSEL ARAÃ‡LAR (CETVEL, GÃ–NYE, PERGEL vb.) ---
    const isPhysicalTool = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(currentTool);
    if (isPhysicalTool) {
        isDrawing = false;
        if (currentTool === 'ruler' && window.RulerTool && window.RulerTool.finalizeDraw) window.RulerTool.finalizeDraw();
        if (currentTool === 'gonye' && window.GonyeTool && window.GonyeTool.finalizeDraw) window.GonyeTool.finalizeDraw();
        if (currentTool === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.finalizeDraw) window.AciolcerTool.finalizeDraw();
        if (currentTool === 'pergel' && window.PergelTool && window.PergelTool.finalizeDraw) window.PergelTool.finalizeDraw();

        setTimeout(() => {
            const lastS = drawnStrokes[drawnStrokes.length - 1];
            if (lastS) {
                if (!lastS.id) lastS.id = Date.now() + Math.random();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                }
            }
        }, 50);

        redrawAllStrokes();
        return;
    }

    // --- B) TAÅIMA (MOVE) MANTIÄI ---
    if (currentTool === 'move' && isMoving) {
        isMoving = false;
        selectedPointKey = null;
        if (returnToSnapshot) {
            returnToSnapshot = false;
            setActiveTool('snapshot');
            if (typeof animateButton !== 'undefined' && animateButton) animateButton.classList.add('active');
            document.body.classList.add('cursor-snapshot');
        }
        redrawAllStrokes();
        return;
    }

    // --- C) NORMAL Ã‡Ä°ZGÄ°LER (DOÄRU, IÅIN, SEGMENT) ---
    if (lineStartPoint && finalPos) {
        let strokeObj = null;
        const cizgiRengi = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF');

        if (isDrawingLine) strokeObj = { type: 'straightLine', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4 };
        else if (isDrawingInfinityLine) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'line', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingSegment) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'segment', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingRay) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'ray', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }

        if (strokeObj) {
            strokeObj.id = Date.now() + Math.random();
            drawnStrokes.push(strokeObj);

            // ğŸš¨ SÄ°HÄ°RLÄ° Ã‡Ã–ZÃœM: GerÃ§ek Ã§izimi atmadan Ã¶nce Ã¶nizlemeleri yokediyoruz!
            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: strokeObj });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- D) Ã‡OKGENLER (POLYGON TOOL) ---
    if (currentTool && currentTool.startsWith('draw_polygon_')) {
        if (window.tempPolygonData && window.tempPolygonData.center) {
            const finalRadius = window.tempPolygonData.radius || 0;
            if (finalRadius > 5) {
                const currentType = window.tempPolygonData.type;

                if (currentType === 0) window.PolygonTool.finalizeCircle(finalRadius);
                else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);

                // ğŸš¨ SÄ°HÄ°RLÄ° Ã‡Ã–ZÃœM: Ã–nizlemeyi anÄ±nda sildiriyoruz
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                }

                setTimeout(() => {
                    const lastS = drawnStrokes[drawnStrokes.length - 1];
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected && lastS) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                    }
                }, 50);

                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
                window.tempPolygonData.center = null;
                if (window.PolygonTool && window.PolygonTool.handleDrawClick) window.PolygonTool.handleDrawClick(null, currentType);
            }
        }
    }

    // --- E) CANLANDIR (KUTU SNAPSHOT) ---
    if (currentTool === 'snapshot' && snapshotStart && currentMousePos) {
        const x = Math.round(Math.min(snapshotStart.x, currentMousePos.x));
        const y = Math.round(Math.min(snapshotStart.y, currentMousePos.y));
        const w = Math.round(Math.abs(currentMousePos.x - snapshotStart.x));
        const h = Math.round(Math.abs(currentMousePos.y - snapshotStart.y));

        if (w > 10 && h > 10) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = w; tempCanvas.height = h;

            // GÃ¶rÃ¼ntÃ¼ netliÄŸini en Ã¼st dÃ¼zeye Ã§Ä±kar
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';

            const bgCanvas = document.getElementById('bg-canvas');
            if (bgCanvas) tempCtx.drawImage(bgCanvas, x, y, w, h, 0, 0, w, h);
            tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
            
            // ğŸš¨ BEYAZ ARKA PLANI ÅEFFAF YAPMA MANTIÄI: 
            // Kutu kopyasÄ± kareli zemine vb. yapÄ±ÅŸtÄ±rÄ±ldÄ±ÄŸÄ±nda beyazlarÄ±n alttaki Ã§izgileri Ã¶rtmemesi iÃ§in
            try {
                const imgData = tempCtx.getImageData(0, 0, w, h);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    // Beyaza Ã§ok yakÄ±n olan pikselleri (Ã¶rneÄŸin rgb deÄŸeri 240 ve Ã¼stÃ¼ olanlarÄ±) tam ÅŸeffaf (alpha = 0) yapÄ±yoruz
                    if (r >= 240 && g >= 240 && b >= 240) {
                        data[i + 3] = 0; 
                    }
                }
                tempCtx.putImageData(imgData, 0, 0);
            } catch (e) {
                console.warn("CORS veya resim izni nedeniyle arka plan ÅŸeffaflaÅŸtÄ±rÄ±lamadÄ±:", e);
            }

            const finalImage = tempCanvas.toDataURL('image/png', 1.0);

            const newImgStroke = {
                type: 'image', imgData: finalImage, x: x, y: y, width: w, height: h,
                id: Date.now() + Math.random() + 1, isBoxCopy: true, isBackground: false
            };
            drawnStrokes.push(newImgStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
            }

            if (typeof setActiveTool === 'function') setActiveTool('move');
            else currentTool = 'move';

            selectedItem = newImgStroke;
            snapshotStart = null;
            redrawAllStrokes();
        }
    }

    // --- F) DÄ°KDÃ–RTGEN ARACI ---
    if (isDrawingRectangle && rectStartPoint && finalPos) {
        const widthPx = Math.abs(finalPos.x - rectStartPoint.x);
        const heightPx = Math.abs(finalPos.y - rectStartPoint.y);

        if (widthPx > 10 && heightPx > 10) {
            const startX = Math.min(rectStartPoint.x, finalPos.x);
            const startY = Math.min(rectStartPoint.y, finalPos.y);
            const color = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#000000');

            const rectLabels = [nextPointChar];
            for (let i = 0; i < 3; i++) { nextPointChar = advanceChar(nextPointChar); rectLabels.push(nextPointChar); }
            nextPointChar = advanceChar(nextPointChar);

            const rectangleStroke = {
                type: 'rectangle', x: startX, y: startY, width: widthPx, height: heightPx, rotation: 0,
                color: color, labels: rectLabels, showEdgeLabels: true, showAngleLabels: false,
                id: Date.now() + Math.random()
            };

            drawnStrokes.push(rectangleStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' }); // ğŸš¨ Ekledik
                window.sendNetworkData({ type: 'yeni_cizim', stroke: rectangleStroke });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- G) AKILLI KALEM (PEN) VE ÅEKÄ°L TANIMA (GÃœVENLÄ° SÃœRÃœM) ---
    if (currentTool === 'pen') {
        let lastStroke = drawnStrokes[drawnStrokes.length - 1];

        if (lastStroke && lastStroke.type === 'pen') {
            if (!lastStroke.id) lastStroke.id = Date.now() + Math.random();

            if (lastStroke.path && lastStroke.path.length <= 3) {
                if (lastStroke.path[0]) lastStroke.path.push({ x: lastStroke.path[0].x + 0.1, y: lastStroke.path[0].y + 0.1 });
                setTimeout(() => {
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastStroke });
                    }
                }, 50);
            }
            else {
                let correctedShape = null;
                if (typeof akilliSekilTani === 'function') {
                    try { correctedShape = akilliSekilTani(lastStroke); } catch (err) { }
                }

                if (correctedShape) {
                    drawnStrokes.pop();

                    if (Array.isArray(correctedShape)) {
                        correctedShape.forEach(s => s.id = Date.now() + Math.random());
                        drawnStrokes.push(...correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'akilli_sekil_toplu', strokes: correctedShape });
                            }
                        }, 50);
                    }
                    else {
                        correctedShape.id = Date.now() + Math.random();
                        drawnStrokes.push(correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'yeni_cizim', stroke: correctedShape });
                            }
                        }, 50);
                    }
                }
                else {
                    const safePenStroke = {
                        type: 'pen', id: lastStroke.id, color: lastStroke.color || '#000000',
                        baseWidth: lastStroke.baseWidth || 4, width: lastStroke.width || lastStroke.baseWidth || 4,
                        isBackground: false,
                        path: lastStroke.path.map(p => ({ x: Math.round(p.x), y: Math.round(p.y), p: Number((p.p || 1).toFixed(2)) }))
                    };

                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                            window.sendNetworkData({ type: 'yeni_cizim', stroke: safePenStroke });
                        }
                    }, 50);
                }
            }
        }
    }

    // --- GENEL SIFIRLAMA ---
    isDrawing = false;
    isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
    isDrawingRectangle = false;
    lineStartPoint = null;
    rectStartPoint = null;
    snapTarget = null;
    window.isImageRotating = false;
    window.isImageResizing = false;
    if (typeof snapIndicator !== 'undefined' && snapIndicator) snapIndicator.style.display = 'none';

    // OlasÄ± tÃ¼m hayaletleri zorla sil (Garanti ProtokolÃ¼)
    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'onizleme_bitir' });
    }

    // --- H) KESKÄ°N NÄ°ÅANCI LASSO (SERBEST KESÄ°M) ---
    if (currentTool === 'lasso' && window.isDraggingLassoPoint) {
        window.isDraggingLassoPoint = false;

        if (!isDrawingLasso) {
            isDrawingLasso = true;
            lassoPoints = [{ x: currentMousePos.x, y: currentMousePos.y }];
        } else {
            let startPoint = lassoPoints[0];
            const mesafe = Math.hypot(currentMousePos.x - startPoint.x, currentMousePos.y - startPoint.y);

            if (mesafe < 40) {
                lassoPoints.push({ x: startPoint.x, y: startPoint.y });

                let minX = Math.min(...lassoPoints.map(p => p.x));
                let minY = Math.min(...lassoPoints.map(p => p.y));
                let maxX = Math.max(...lassoPoints.map(p => p.x));
                let maxY = Math.max(...lassoPoints.map(p => p.y));
                let w = Math.max(10, maxX - minX);
                let h = Math.max(10, maxY - minY);

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = w; tempCanvas.height = h;
                const tempCtx = tempCanvas.getContext('2d');

                tempCtx.save();
                tempCtx.beginPath();
                tempCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
                for (let i = 1; i < lassoPoints.length; i++) tempCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
                tempCtx.closePath();
                tempCtx.clip();

                // Kaliteyi artÄ±r
                tempCtx.imageSmoothingEnabled = true;
                tempCtx.imageSmoothingQuality = 'high';

                const bgCanvas = document.getElementById('bg-canvas');
                if (bgCanvas) {
                    tempCtx.drawImage(bgCanvas, minX, minY, w, h, 0, 0, w, h);
                }
                tempCtx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
                tempCtx.restore();

                const finalImage = tempCanvas.toDataURL('image/png', 1.0);

                let detectedColor = (typeof window.isToolThemeBlack !== 'undefined' && window.isToolThemeBlack) ? '#222222' : '#ffffff';

                try {
                    const bgCanvas = document.getElementById('bg-canvas');
                    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
                    const mainCtx = canvas.getContext('2d');
                    
                    let centerX = (minX + maxX) / 2;
                    let centerY = (minY + maxY) / 2;
                    
                    let samplePoints = [
                        { x: centerX, y: minY - 5 },
                        { x: centerX, y: maxY + 5 },
                        { x: minX - 5, y: centerY },
                        { x: maxX + 5, y: centerY }
                    ];
                    
                    for (let sp of samplePoints) {
                        let r = 0, g = 0, b = 0, a = 0;
                        
                        let mainData = mainCtx.getImageData(sp.x, sp.y, 1, 1).data;
                        if (mainData[3] > 0) {
                            r = mainData[0]; g = mainData[1]; b = mainData[2]; a = mainData[3];
                        } else if (bgCtx) {
                            let bgData = bgCtx.getImageData(sp.x, sp.y, 1, 1).data;
                            if (bgData[3] > 0) {
                                r = bgData[0]; g = bgData[1]; b = bgData[2]; a = bgData[3];
                            }
                        }
                        
                        if (a > 0) {
                            detectedColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                            break;
                        }
                    }
                } catch (e) { console.warn("Renk Ã¶rnekleme hatasÄ±:", e); }

                const maskStroke = { type: 'lasso-mask', points: lassoPoints.map(p => ({ x: p.x, y: p.y })), fillColor: detectedColor, id: Date.now() + Math.random() };
                drawnStrokes.push(maskStroke);

                const newImgStroke = { type: 'image', imgData: finalImage, x: minX + 30, y: minY + 30, width: w, height: h, rotation: 0, isBackground: false, imgObj: null, id: Date.now() + Math.random() };

                const tempImg = new Image();
                tempImg.onload = () => { newImgStroke.imgObj = tempImg; if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); };
                tempImg.src = finalImage;
                drawnStrokes.push(newImgStroke);

                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: maskStroke });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
                }

                if (typeof setActiveTool === 'function') setActiveTool('move'); else currentTool = 'move';
                selectedItem = newImgStroke;
                isDrawingLasso = false; window.lassoIsClosing = false; currentMousePos = null; lassoPoints = [];
            } else {
                lassoPoints.push({ x: currentMousePos.x, y: currentMousePos.y });
            }
        }
        redrawAllStrokes();
        return;
    } else {
        redrawAllStrokes();
    }
}, { passive: false }); // <--- pointerup fonksiyonu burada BÄ°TTÄ°==============================================================================


// ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Ä°Ã§ iÃ§e geÃ§ip sonsuz dÃ¶ngÃ¼ye giren (ZÄ±plamaya sebep olan) HatalÄ± Kod Temizlendi!
canvas.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();

        // YalnÄ±zca 'TaÅŸÄ±' (move) aracÄ± seÃ§iliyken fare ile zoom yapÄ±labilir
        if (currentTool !== 'move') return;

        const zoomStep = e.deltaY > 0 ? 0.95 : 1.05;

        const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (mainBg) {
            const cx = mainBg.x + mainBg.width / 2;
            const cy = mainBg.y + mainBg.height / 2;
            
            drawnStrokes.forEach(bg => {
                if (bg.isBackground === true) {
                    const bg_cx = bg.x + bg.width / 2;
                    const bg_cy = bg.y + bg.height / 2;
                    const ncx = cx + (bg_cx - cx) * zoomStep;
                    const ncy = cy + (bg_cy - cy) * zoomStep;
                    bg.width *= zoomStep; bg.height *= zoomStep;
                    bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                }
            });

            if (window.drawnStrokes) {
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy);
                });
            }

            redrawAllStrokes();

            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height
                });
            }
        }
    }
}, { passive: false });


// --- POINTERCANCEL (KESÄ°NTÄ° DURUMUNDA SIFIRLAMA) ---
canvas.addEventListener('pointercancel', (e) => {
    document.body.classList.remove('ghost-mode');
    // --- BUNLARI EKLE ---
    pointers.delete(e.pointerId);
    lastDist = 0;
    // --------------------

    // Ä°ÅŸlemi iptal et ve tÃ¼m bayraklarÄ± (flag) indir
    isDrawing = false;
    isMoving = false;
    isPinching = false; // Varsa zoom iÅŸlemini de durdur
    isDrawingRectangle = false;
    rectStartPoint = null;

    // GeÃ§ici verileri temizle
    snapshotStart = null;
    snapTarget = null;
    lineStartPoint = null;
    window.tempPolygonData = null;

    // ArayÃ¼z elemanlarÄ±nÄ± gizle
    if (snapIndicator) snapIndicator.style.display = 'none';
    if (polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // YarÄ±m kalan Ã¶nizlemeleri ekrandan temizlemek iÃ§in
    redrawAllStrokes();

    console.log("Pointer iÅŸlemi bir sistem kesintisi nedeniyle iptal edildi.");
});


// --- BUNLARI EKLE: Tablet ekranÄ±ndan dÄ±ÅŸarÄ± taÅŸan parmaklarÄ± zorla sil ---
canvas.addEventListener('pointerout', (e) => { document.body.classList.remove('ghost-mode'); pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });
canvas.addEventListener('pointerleave', (e) => { document.body.classList.remove('ghost-mode'); pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });


// --- YAPIÅTIRMA (PASTE) DESTEÄÄ° (CTRL+V) ---
window.addEventListener('paste', (e) => {
    // Panodaki verileri al
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    // Verileri tara (Resim var mÄ±?)
    for (let index in items) {
        const item = items[index];

        // EÄŸer bu bir dosya ise ve tipi 'image' iÃ§eriyorsa
        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Resmi makul bir boyuta getir (Dosya yÃ¼klemedeki mantÄ±ÄŸÄ±n aynÄ±sÄ±)
                    let startWidth = 300;
                    let scaleFactor = startWidth / img.width;
                    let startHeight = img.height * scaleFactor;

                    // Resmi HafÄ±zaya 'image' nesnesi olarak ekle
                    drawnStrokes.push({
                        type: 'image',
                        img: img,
                        x: canvas.width / 2, // EkranÄ±n ortasÄ±na koy
                        y: canvas.height / 2,
                        width: startWidth,
                        height: startHeight,
                        rotation: 0
                    });

                    redrawAllStrokes(); // Ekrana Ã§iz

                    // Ä°ÅŸlem baÅŸarÄ±lÄ± sesi (Ä°steÄŸe baÄŸlÄ±)
                    if (window.audio_click) {
                        window.audio_click.currentTime = 0;
                        window.audio_click.play();
                    }
                };
                img.src = event.target.result;
            };

            reader.readAsDataURL(blob);
            e.preventDefault(); // SayfanÄ±n varsayÄ±lan yapÄ±ÅŸtÄ±rma davranÄ±ÅŸÄ±nÄ± engelle
        }
    }
});

// --- app.js EN ALTINA EKLEYÄ°N (EKSÄ°K OLAN PARÃ‡ALAR) ---

function updatePageLabel() {
    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${currentPDFPage} / ${totalPDFPages}`;
}

async function renderPDFPage(num) {
    if (!currentPDF) return;

    // ğŸš¨ BEYAZ EKRAN VE DONMA Ã‡Ã–ZÃœMÃœ: HÄ±zlÄ± sayfa deÄŸiÅŸimlerinde PDF motorunun tÄ±kanmasÄ±nÄ± engelle
    if (window.currentRenderTask) {
        try { window.currentRenderTask.cancel(); } catch(e){}
    }

    try {
        const page = await currentPDF.getPage(num);

        // --- BURASI DEÄÄ°ÅTÄ°: OTOMATÄ°K VE YÃœKSEK Ã‡Ã–ZÃœNÃœRLÃœK AYARI ---
        const dpr = window.devicePixelRatio || 1;
        const KALITE_CARPANI = 2; // Daha gÃ¼venli bir katsayÄ± (3 Ã§ok yÃ¼ksekti, donanÄ±ma Ã§arpÄ±yordu)
        const hdScale = dpr * KALITE_CARPANI;

        let viewport = page.getViewport({ scale: hdScale });

        // GÃœVENLÄ°K ZIRHI: Mobil ve bazÄ± PC tarayÄ±cÄ±larÄ±nda canvas limiti 4096px'dir.
        // EÄŸer sayfa Ã§ok bÃ¼yÃ¼kse (Ã¶rneÄŸin 5000px), Ã¶lÃ§eÄŸi gÃ¼venli bir sÄ±nÄ±ra zorla dÃ¼ÅŸÃ¼r!
        // Bu sayede "sayfa yarÄ±m geldi" veya "canvas dondu" hatalarÄ±nÄ± KÃ–KÃœNDEN Ã¶nleriz!
        if (viewport.height > 3500 || viewport.width > 3500) {
            const maxDim = Math.max(viewport.height, viewport.width);
            const safeScale = hdScale * (3500 / maxDim);
            viewport = page.getViewport({ scale: safeScale });
        }
        // -----------------------------------------------------------

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.height = viewport.height;
        tempCanvas.width = viewport.width;

        // --- BURASI EKLENDÄ°: YAZI KENARLARINI KESKÄ°NLEÅTÄ°RME FÄ°LTRESÄ° ---
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        
        // JPEG formatÄ±nda arka planÄ±n siyah Ã§Ä±kmasÄ±nÄ± Ã¶nlemek iÃ§in beyaz zemin
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        // ----------------------------------------------------------------

        window.currentRenderTask = page.render({
            canvasContext: tempCtx,
            viewport: viewport
        });

        await window.currentRenderTask.promise;

    const img = new Image();
    img.onload = () => {
        addNewImageToCanvas(img, true);

        // --- KUTU KOPYALARINI PDF SAYFASINA GÃ–RE GERÄ° YÃœKLEME YAMASI ---
        if (window.boxCopies) {
            window.boxCopies.forEach(copy => {
                if (!copy.pageOwner || copy.pageOwner === num) {
                    if (!copy.imgObj) {
                        const tImg = new Image();
                        tImg.src = copy.imgData;
                        tImg.onload = () => {
                            copy.imgObj = tImg;
                            if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                                window.drawnStrokes.push(copy);
                            }
                            if (window.redrawAllStrokes) window.redrawAllStrokes();
                        };
                    } else {
                        if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                            window.drawnStrokes.push(copy);
                        }
                    }
                }
            });
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }
    };

    // ğŸš¨ Ä°ÅTE 2. ADIMDAKÄ° DEÄÄ°ÅÄ°KLÄ°ÄÄ°N YAPILDIÄI YER BURASI ğŸš¨
    // AÄŸÄ± felÃ§ eden 20MB PNG yerine %80 kalite JPEG (1MB altÄ±) kullanarak donmayÄ± ve yarÄ±m yÃ¼klemeyi bitiriyoruz!
    const sayfaResmi = tempCanvas.toDataURL('image/jpeg', 0.8);
    img.src = sayfaResmi;

    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${num} / ${totalPDFPages}`;
    
    } catch (e) {
        if (e.name === 'RenderingCancelledException') {
            console.log("HÄ±zlÄ± sayfa deÄŸiÅŸimi nedeniyle Ã¶nceki Ã§izim iptal edildi.");
        } else {
            console.warn("PDF Render hatasÄ±:", e);
        }
    }
}



function addNewImageToCanvas(img, isPDF = false, pcKordinatlari = null) {
    let startWidth, startHeight, posX, posY;

    // EÄŸer PC isek, tabletin bize gÃ¶nderdiÄŸi adaptStrokeToScreen'den geÃ§miÅŸ kusursuz koordinatlarÄ± kullan!
    if (pcKordinatlari) {
        startWidth = pcKordinatlari.width;
        startHeight = pcKordinatlari.height;
        posX = pcKordinatlari.x;
        posY = pcKordinatlari.y;
    } else {
        // EÄŸer Tabletsek kendi ekranÄ±mÄ±za gÃ¶re hesapla
        startWidth = canvas.width * 0.8;
        if (img.width < startWidth) startWidth = img.width;
        let scaleFactor = startWidth / img.width;
        startHeight = img.height * scaleFactor;

        if (startHeight > canvas.height * 0.8) {
            startHeight = canvas.height * 0.8;
            let scaleFactorH = startHeight / img.height;
            startWidth = img.width * scaleFactorH;
        }

        posX = (canvas.width / 2) - (startWidth / 2);
        posY = (canvas.height / 2) - (startHeight / 2);
    }

    const newStroke = {
        type: 'image',
        id: Date.now() + Math.random(),
        img: img,
        imgData: img.src, // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: PDF'in tahta_durumu ile aÄŸdan geÃ§erken kaybolmamasÄ± iÃ§in imgData eklendi!
        x: posX,
        y: posY,
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    };

    if (isPDF && typeof pdfImageStroke !== 'undefined' && pdfImageStroke !== null) {
        for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
            let s = window.drawnStrokes[i];
            if (s === pdfImageStroke ||
                (s.type === 'image' && s.isBackground === false && !s.isBoxCopy) ||
                (s.isPatch === true || s.type === 'lasso-mask')) {
                window.drawnStrokes.splice(i, 1);
            }
        }
        if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
    }

    drawnStrokes.push(newStroke);
    if (isPDF) { pdfImageStroke = newStroke; }

    const pdfControls = document.getElementById('pdf-controls');
    if (pdfControls) { pdfControls.classList.remove('hidden'); pdfControls.style.display = 'flex'; }

    const closeBtn = document.getElementById('btn-close-pdf');
            if (closeBtn) { closeBtn.classList.remove('hidden'); closeBtn.style.display = 'flex'; }

            redrawAllStrokes();

            // ğŸš¨ Ã‡Ã–ZÃœM 1: Tabletin resmi anÄ±nda gÃ¶rebilmesi iÃ§in kÃ¼Ã§Ã¼k bir gecikmeyle ekranÄ± zorla tazeliyoruz. 
            // Bu sayede "boÅŸluÄŸa tÄ±klama" zorunluluÄŸu ortadan kalkar ve PDF anÄ±nda gÃ¶rÃ¼nÃ¼r!
            setTimeout(() => { if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes(); }, 150);

            // ğŸš¨ PC'nin donanÄ±mÄ± zayÄ±f olduÄŸu iÃ§in ve PDF kitap gÃ¶nderimi Ã¶nceden kapatÄ±ldÄ±ÄŸÄ± iÃ§in, 
            // Tablet her halÃ¼karda Ã§izdiÄŸi hafifletilmiÅŸ JPEG sayfayÄ± PC'ye gÃ¶ndermek zorunda!
            if (!pcKordinatlari && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'arka_plan_resmi_aktar',
                    imgData: img.src,
                    isPDF: isPDF,
                    kordinatlar: { x: newStroke.x, y: newStroke.y, width: newStroke.width, height: newStroke.height },
                    canvasW: canvas.width,
                    canvasH: canvas.height
                });
            }

    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: YÃ¼kleme iÅŸleminden sonra TaÅŸÄ± butonunun kendi kendine aktif olmasÄ±nÄ± engellemek iÃ§in aracÄ± Kalem'e sÄ±fÄ±rla.
    if (typeof setActiveTool === 'function') setActiveTool('pen');
}



// --- ARAÃ‡ RENGÄ° DEÄÄ°ÅTÄ°RME MANTIÄI (SÄ°YAH / NEON / TOK MAVÄ°) ---
const toolColorBtn = document.getElementById('btn-tool-color');
let isBlackTheme = false;
window.isToolThemeBlack = false; // DiÄŸer dosyalar iÃ§in global deÄŸiÅŸken

if (toolColorBtn) {
    toolColorBtn.addEventListener('click', () => {
        isBlackTheme = !isBlackTheme;
        window.isToolThemeBlack = isBlackTheme; // Durumu kaydet

        // Buton yazÄ±sÄ±nÄ± gÃ¼ncelle
        toolColorBtn.innerText = isBlackTheme ? "AraÃ§ Rengi: Neon" : "AraÃ§ Rengi: Siyah";

        // O an ekranda aÃ§Ä±k olan tÃ¼m fiziksel araÃ§larÄ± bul ve rengini deÄŸiÅŸtir
        const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');

        elements.forEach(el => {
            if (isBlackTheme) {
                el.classList.add('tool-black-theme');
            } else {
                el.classList.remove('tool-black-theme');
            }
        });

        // ğŸš¨ SÄ°NKRONÄ°ZASYON: Tema deÄŸiÅŸimini diÄŸer cihazlara (PC'ye) bildir
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'fiziksel_arac_temasi', isBlackTheme: isBlackTheme });
        }
    });
}

// --- ARAÃ‡LAR AÃ‡ILDIÄINDA RENGÄ° HATIRLA (YAMA) ---
// Sayfa tamamen yÃ¼klendikten sonra araÃ§larÄ±n 'show' fonksiyonlarÄ±na ekleme yapÄ±yoruz
window.addEventListener('load', () => {
    const toolsList = [
        { objName: 'RulerTool', elementProp: 'rulerElement' },
        { objName: 'GonyeTool', elementProp: 'gonyeElement' },
        { objName: 'AciolcerTool', elementProp: 'aciolcerElement' },
        { objName: 'PergelTool', elementProp: 'pergelElement' }
    ];

    toolsList.forEach(toolInfo => {
        const toolObj = window[toolInfo.objName];
        if (toolObj && toolObj.show) {
            // Orijinal show fonksiyonunu sakla
            const originalShow = toolObj.show.bind(toolObj);

            // Yeni show fonksiyonu tanÄ±mla
            toolObj.show = function () {
                originalShow(); // Ã–nce normal aÃ§Ä±lma iÅŸlemini yap

                // Sonra tema rengini kontrol et ve uygula
                if (this[toolInfo.elementProp]) {
                    if (window.isToolThemeBlack) {
                        this[toolInfo.elementProp].classList.add('tool-black-theme');
                    } else {
                        this[toolInfo.elementProp].classList.remove('tool-black-theme');
                    }
                }
            };
        }
    });
});

// --- YARDIM VÄ°DEOLARI SÄ°STEMÄ° ---

// 1. VÄ°DEO LÄ°STESÄ° (Ã‡eviriye Uygun Hale Getirildi)
const tutorialVideos = [
    { id: "vid_cetvel", dosya: "cetvel-vid.mp4" },
    { id: "vid_gonye", dosya: "gonye-vid.mp4" },
    { id: "vid_aciolcer", dosya: "aciolcer-vid.mp4" },
    { id: "vid_pergel", dosya: "pergel-vid.mp4" },
    { id: "vid_canlandir", dosya: "canlandir-vid.mp4" },
    { id: "vid_cizgi", dosya: "cizgi-vid.mp4" },
    { id: "vid_cokgenler", dosya: "cokgenler-vid.mp4" },
    { id: "vid_kalem", dosya: "kalem-vid.mp4" },
    { id: "vid_kitap", dosya: "kitap-yukleme-vid.mp4" },
    { id: "vid_oyunlar", dosya: "oyunlar-vid.mp4" }
];


// Elementleri SeÃ§
const helpBtn = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const closeHelpBtn = document.getElementById('close-help');
const videoListContainer = document.getElementById('video-list-container');
const videoPlayer = document.getElementById('main-video-player');
const videoTitleLabel = document.getElementById('video-title-label');

// Listeyi OluÅŸtur (Ã‡oklu Dil Destekli)
function loadVideoList() {
    videoListContainer.innerHTML = '';

    // O anki seÃ§ili dili al (EÄŸer boÅŸsa 'tr' kabul et)
    const t = translations[currentLang || 'tr'];

    tutorialVideos.forEach((vid) => {
        const btn = document.createElement('button');
        btn.className = 'video-item-btn';

        // Ã‡eviriden baÅŸlÄ±ÄŸÄ± al (EÄŸer Ã§eviri dosyasÄ±na eklemeyi unutursan hata vermesin diye id'yi yazar)
        const videoBaslik = t[vid.id] || vid.id;

        btn.innerText = `â–¶ ${videoBaslik}`;

        btn.onclick = () => {
            // TÃ¼m butonlarÄ±n rengini sÄ±fÄ±rla, buna renk ver
            document.querySelectorAll('.video-item-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Videoyu oynat
            videoPlayer.src = `videolar/${vid.dosya}`;
            videoTitleLabel.innerText = videoBaslik; // OynatÄ±cÄ±nÄ±n Ã¼stÃ¼ndeki baÅŸlÄ±ÄŸÄ± da Ã§evir
            videoPlayer.play();
        };
        videoListContainer.appendChild(btn);
    });
}
// AÃ§ma/Kapama OlaylarÄ±
if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
        loadVideoList();
    });

    closeHelpBtn.addEventListener('click', () => {
        helpModal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.src = ""; // Videoyu durdur ve sÄ±fÄ±rla
    });
}

// --- KESÄ°N Ã‡Ã–ZÃœM: PDF KAPATMA BUTONU (Global Dinleyici) ---
document.addEventListener('click', function (e) {
    const btn = e.target.closest('#btn-close-pdf');

    if (btn) {
        console.log("PDF KapatÄ±lÄ±yor...");

        // 1. PC'YE KAPATMA EMRÄ° GÃ–NDER
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'pdf_kapat' });
        }

        e.preventDefault();
        e.stopPropagation();

        // ğŸš¨ 2. SÄ°HÄ°RLÄ° Ã‡Ã–ZÃœM: filter yerine splice ile hafÄ±za kopmadan temizlik yapÄ±yoruz ğŸš¨
        if (window.drawnStrokes) {
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                // PDF, Resim, arka plan, lasso maskesi ve yamalarÄ±n hepsini temizle
                const s = window.drawnStrokes[i];
                if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                    window.drawnStrokes.splice(i, 1);
                }
            }
        }

        // 3. DeÄŸiÅŸkenleri SÄ±fÄ±rla
        if (typeof currentPDF !== 'undefined') currentPDF = null;
        if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;
        if (typeof currentPDFPage !== 'undefined') currentPDFPage = 1;
        if (typeof totalPDFPages !== 'undefined') totalPDFPages = 0;
        if (typeof backgroundImage !== 'undefined') backgroundImage = null;

        // 4. ButonlarÄ± Gizle
        const controls = document.getElementById('pdf-controls');
        if (controls) {
            controls.classList.add('hidden');
            controls.style.display = 'none';
        }
        btn.classList.add('hidden');
        btn.style.display = 'none';

        // 5. EkranÄ± Temizle ve KalanlarÄ± Yeniden Ã‡iz
        if (typeof redrawAllStrokes === 'function') {
            const canvas = document.getElementById('drawing-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            redrawAllStrokes();
        }

        try {
            if (window.audio_click) {
                window.audio_click.currentTime = 0;
                window.audio_click.play();
            }
        } catch (err) { }
    }
}, true);


// --- BAÅLANGIÃ‡ ---
// --- AKILLI EKRAN BOYUTLANDIRMA (ADRES Ã‡UBUÄU ZIPLAMASINI ENGELLER) ---
let lastWindowWidth = window.innerWidth;

function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // GerÃ§ekten ekran dÃ¶ndÃ¼yse veya boyut deÄŸiÅŸtiyse gÃ¼ncelle
    lastWindowWidth = newWidth;

    if (window.Scene3D && window.Scene3D.camera) {
        const aspect = newWidth / newHeight;
        const frustumSize = 30;

        if (window.Scene3D.camera.isPerspectiveCamera) {
            window.Scene3D.camera.aspect = aspect;
        } else {
            window.Scene3D.camera.left = -frustumSize * aspect / 2;
            window.Scene3D.camera.right = frustumSize * aspect / 2;
            window.Scene3D.camera.top = frustumSize / 2;
            window.Scene3D.camera.bottom = -frustumSize / 2;
        }
        window.Scene3D.camera.updateProjectionMatrix();
        if (window.Scene3D.renderer) {
            window.Scene3D.renderer.setSize(newWidth, newHeight);
        }
    }

    redrawAllStrokes();

    // canvas.height = newHeight; satÄ±rÄ±nÄ±n hemen altÄ±na ekle
    setupCanvasResolution();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// --- app.js EN ALT SATIR (EDGE, CHROME, TABLET UYUMLU FÄ°NAL) ---

{
    let deferredPrompt;
    const installPopup = document.getElementById('install-popup');
    const btnInstall = document.getElementById('btn-popup-install');
    const btnClose = document.getElementById('btn-popup-close');
    const iosInstructions = document.getElementById('ios-instructions');

    // 1. TarayÄ±cÄ± sinyali (Install Prompt)
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Popup'Ä± gÃ¶ster
        if (installPopup) installPopup.style.display = 'flex';
    });

    // 2. iOS (iPhone/iPad) KontrolÃ¼
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos && !isInStandaloneMode) {
        setTimeout(() => {
            if (installPopup) {
                installPopup.style.display = 'flex';
                if (btnInstall) btnInstall.style.display = 'none'; // iPhone'da butonu gizle
                if (iosInstructions) iosInstructions.style.display = 'block'; // Tarifi gÃ¶ster
            }
        }, 3000);
    }

    // --- BUTONLARI Ã‡ALIÅTIRAN FONKSÄ°YON (EDGE DOKUNMATÄ°K HATASI Ã‡Ã–ZÃœMÃœ) ---
    const activateButton = (btn, actionCallback) => {
        if (!btn) return;

        const handler = async (e) => {
            // Edge'in dokunmayÄ± yutmasÄ±nÄ± engelle
            e.stopPropagation();
            e.preventDefault();

            // Ä°ÅŸlemi gerÃ§ekleÅŸtir
            await actionCallback();
        };

        // Hem tÄ±klama hem parmak dokunuÅŸunu dinle
        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler, { passive: false });
    };

    // --- BUTONLARA GÃ–REVLERÄ°NÄ° VER ---

    // A) YÃ¼kle Butonu
    activateButton(btnInstall, async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("SonuÃ§:", outcome);
            deferredPrompt = null;
        }
        if (installPopup) installPopup.style.display = 'none';

        // ğŸš¨ SÄ°HÄ°RLÄ° DOKUNUÅ: PC'deki yÃ¼kleme penceresini de kapatmasÄ± iÃ§in komut gÃ¶nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });

    // B) Kapat (HayÄ±r) Butonu
    activateButton(btnClose, async () => {
        if (installPopup) installPopup.style.display = 'none';

        // ğŸš¨ SÄ°HÄ°RLÄ° DOKUNUÅ: PC'deki yÃ¼kleme penceresini de kapatmasÄ± iÃ§in komut gÃ¶nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });
}

// --- app.js EN ALTA EKLE: DÃ–NDÃœRME FONKSÄ°YONU ---

/**
 * Bir HTML elementine dÃ¶ndÃ¼rme Ã¶zelliÄŸi ekler.
 * @param {HTMLElement} element - DÃ¶ndÃ¼rÃ¼lecek olan kopya kutusu (div)
 */

// ==========================================
// --- TARAYICI DOKUNMATÄ°K Ã‡AKIÅMA Ã‡Ã–ZÃœMÃœ ---
// ==========================================
// TarayÄ±cÄ±nÄ±n adres Ã§ubuÄŸu veya "sayfayÄ± yenile" hareketinin
// dÃ¶ndÃ¼rme (rotate) ve taÅŸÄ±ma iÅŸlemlerini bozmasÄ±nÄ± engeller.
window.addEventListener('touchmove', function (e) {
    // EÄŸer dokunulan ÅŸey dÃ¶ndÃ¼rme kulpuysa veya kopyalanan resimse:
    if (e.target.closest('.rotate-handle') ||
        e.target.classList.contains('rotate-handle') ||
        e.target.closest('.resize-handle') ||
        e.target.tagName.toLowerCase() === 'img') {

        // TarayÄ±cÄ±ya "KarÄ±ÅŸma, kaydÄ±rma yapma!" diyoruz.
        e.preventDefault();
    }
}, { passive: false }); // passive: false Ã§ok Ã¶nemlidir, tarayÄ±cÄ±yÄ± durdurmaya izin verir.
// ==========================================


// =========================================================
// MOBÄ°L TARAYICI ZIPLAMA Ã‡Ã–ZÃœMÃœ: KATI EKRAN KÄ°LÄ°DÄ° (app.js)
// =========================================================
function lockScreenSize() {
    // EkranÄ±n o anki gerÃ§ek piksel boyutunu al
    let w = window.innerWidth || document.documentElement.clientWidth || window.screen.width || 1024;
    let h = window.innerHeight || document.documentElement.clientHeight || window.screen.height || 768;
    const dpr = window.devicePixelRatio || 1; // ğŸš¨ HD OranÄ±

    // Ana KanvasÄ± Sabitle
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
    }

    // ğŸš¨ EKSÄ°K OLAN KISIM: Arka Plan KanvasÄ±nÄ± da Ana Kanvasla Beton Gibi Sabitle (Sayfa BasÄ±klÄ±ÄŸÄ±nÄ± Yok Eder)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = w + 'px';
        bgCanvas.style.height = h + 'px';
        bgCanvas.width = w * dpr;
        bgCanvas.height = h * dpr;
    }

    document.body.style.width = w + 'px';
    document.body.style.height = h + 'px';
    document.documentElement.style.width = w + 'px';
    document.documentElement.style.height = h + 'px';

    if (typeof window.redrawAllStrokes === 'function') {
        window.redrawAllStrokes();
    }
}

// 1. Sayfa yÃ¼klendiÄŸinde boyutlarÄ± kilitle
window.addEventListener('load', lockScreenSize);

// 2. Tablet yan Ã§evrilirse (yatay/dikey) yeni boyuta gÃ¶re tekrar kilitle
window.addEventListener('orientationchange', () => {
    setTimeout(lockScreenSize, 300);
});

// KRÄ°TÄ°K NOKTA: 'resize' eventini (adres Ã§ubuÄŸu hareketlerini) DÄ°NLEMÄ°YORUZ!
// BÃ¶ylece adres Ã§ubuÄŸu kaybolsa/Ã§Ä±ksa bile sayfa esnemez, Ã§izgiler zÄ±plamaz.

// =======================================================
// CANLANDIR (SNAPSHOT) - TABLET/PC UYUMLU YÃœZEN KOPYA
// =======================================================
function olusturYuzenKopya(imgSrc, startX, startY, width, height) {
    // ğŸš¨ SÄ°HÄ°RLÄ° DÃœZELTME: HD piksel deÄŸerlerini DOM iÃ§in CSS pikseline dÃ¶nÃ¼ÅŸtÃ¼r
    const canvasEl = document.getElementById('drawing-canvas');
    const dpr = canvasEl ? (canvasEl.width / canvasEl.getBoundingClientRect().width) : (window.devicePixelRatio || 1);

    // Gelen koordinatlarÄ±n HD olup olmadÄ±ÄŸÄ±nÄ± kontrol et ve Ã¶lÃ§ekle
    const isHD = width > (canvasEl ? canvasEl.getBoundingClientRect().width : window.innerWidth);
    const scale = isHD ? dpr : 1;

    const cssX = startX / scale;
    const cssY = startY / scale;
    const cssW = width / scale;
    const cssH = height / scale;

    // 1. Ana KapsayÄ±cÄ± Kutu
    const container = document.createElement('div');
    container.className = 'yuzen-kopya-container';
    container.style.position = 'absolute';
    container.style.left = cssX + 'px';
    container.style.top = cssY + 'px';
    container.style.width = cssW + 'px';
    container.style.height = cssH + 'px';
    container.style.border = '2px dashed #00ffcc';
    container.style.cursor = 'grab';
    container.style.zIndex = '9999';
    container.style.boxSizing = 'border-box';
    container.style.transformOrigin = 'center center';
    container.style.touchAction = 'none'; // KRÄ°TÄ°K: Tablette sayfa kaymasÄ±nÄ± yasaklar
    container.dataset.rotation = '0';

    // 2. Kopyalanan Resim
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    container.appendChild(img);

    // 3. DÃ¶ndÃ¼rme (YeÅŸil) Butonu ve SapÄ±
    const rotateLine = document.createElement('div');
    rotateLine.style.position = 'absolute';
    rotateLine.style.top = '-20px';
    rotateLine.style.left = '50%';
    rotateLine.style.width = '2px';
    rotateLine.style.height = '20px';
    rotateLine.style.backgroundColor = '#00ff00';
    rotateLine.style.transform = 'translateX(-50%)';
    container.appendChild(rotateLine);

    const rotateBtn = document.createElement('div');
    rotateBtn.className = 'rotate-handle'; // Tablette kaymayÄ± durduran mevcut sÄ±nÄ±fÄ±nÄ±z
    rotateBtn.style.position = 'absolute';
    rotateBtn.style.top = '-40px';
    rotateBtn.style.left = '50%';
    rotateBtn.style.transform = 'translateX(-50%)';
    rotateBtn.style.width = '30px';
    rotateBtn.style.height = '30px';
    rotateBtn.style.backgroundColor = '#00ff00';
    rotateBtn.style.borderRadius = '50%';
    rotateBtn.style.cursor = 'grab';
    rotateBtn.style.border = '2px solid white';
    rotateBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    rotateBtn.style.touchAction = 'none'; // KRÄ°TÄ°K
    container.appendChild(rotateBtn);

    // 4. Yeniden BoyutlandÄ±rma (Pembe) Butonu
    const resizeBtn = document.createElement('div');
    resizeBtn.className = 'resize-handle'; // Tablette kaymayÄ± durduran mevcut sÄ±nÄ±fÄ±nÄ±z
    resizeBtn.style.position = 'absolute';
    resizeBtn.style.bottom = '-15px';
    resizeBtn.style.right = '-15px';
    resizeBtn.style.width = '30px';
    resizeBtn.style.height = '30px';
    resizeBtn.style.backgroundColor = '#ff00ff';
    resizeBtn.style.borderRadius = '50%';
    resizeBtn.style.cursor = 'nwse-resize';
    resizeBtn.style.border = '2px solid white';
    resizeBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    resizeBtn.style.touchAction = 'none'; // KRÄ°TÄ°K
    container.appendChild(resizeBtn);

    document.body.appendChild(container);

    // --- TABLET UYUMLU ETKÄ°LEÅÄ°M MANTIÄI ---
    let mode = 'none';
    let startEvtX, startEvtY, initialLeft, initialTop, initialWidth, initialHeight, initialRotation, centerX, centerY;
    let activePointerId = null; // ParmaÄŸÄ± takip etmek iÃ§in kilit ID'si

    // DÃ¶ndÃ¼rmeye BaÅŸla
    rotateBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'rotate';
        activePointerId = e.pointerId;
        rotateBtn.setPointerCapture(activePointerId); // KRÄ°TÄ°K: ParmaÄŸÄ± yeÅŸil butona kilitle!

        const rect = container.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        initialRotation = parseFloat(container.dataset.rotation) || 0;
        container.dataset.startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
    });

    // BoyutlandÄ±rmaya BaÅŸla
    resizeBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'resize';
        activePointerId = e.pointerId;
        resizeBtn.setPointerCapture(activePointerId); // KRÄ°TÄ°K: ParmaÄŸÄ± pembe butona kilitle!

        startEvtX = e.clientX; startEvtY = e.clientY;
        initialWidth = container.offsetWidth; initialHeight = container.offsetHeight;
    });

    // SÃ¼rÃ¼klemeye BaÅŸla
    container.addEventListener('pointerdown', (e) => {
        if (e.target === rotateBtn || e.target === resizeBtn) return;
        e.stopPropagation(); e.preventDefault();
        mode = 'drag';
        activePointerId = e.pointerId;
        container.setPointerCapture(activePointerId); // KRÄ°TÄ°K: ParmaÄŸÄ± resme kilitle!

        container.style.cursor = 'grabbing';
        startEvtX = e.clientX; startEvtY = e.clientY;
        initialLeft = container.offsetLeft; initialTop = container.offsetTop;
    });

    // Hareket Etme (Move)
    const onMove = (e) => {
        if (mode === 'none') return;
        if (e.pointerId !== activePointerId) return; // Ä°kinci parmakla yapÄ±lan mÃ¼dahaleleri engeller
        e.preventDefault();

        if (mode === 'drag') {
            container.style.left = (initialLeft + (e.clientX - startEvtX)) + 'px';
            container.style.top = (initialTop + (e.clientY - startEvtY)) + 'px';
        } else if (mode === 'resize') {
            const newWidth = Math.max(30, initialWidth + (e.clientX - startEvtX));
            container.style.width = newWidth + 'px';
            container.style.height = initialHeight * (newWidth / initialWidth) + 'px';
        } else if (mode === 'rotate') {
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const finalRotation = initialRotation + (currentAngle - parseFloat(container.dataset.startAngle));
            container.style.transform = `rotate(${finalRotation}deg)`;
            container.dataset.rotation = finalRotation;
        }
    };

    // ParmaÄŸÄ± KaldÄ±rma (BÄ±rakma)
    const onUp = (e) => {
        if (mode === 'none') return;

        // Kilidi serbest bÄ±rak
        if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }

        if (mode === 'drag') container.style.cursor = 'grab';
        mode = 'none';
        activePointerId = null;
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp); // TarayÄ±cÄ± hatasÄ±nda da bÄ±rak

    // --- BOÅLUÄA TIKLAYINCA ANA KANVASA MÃœHÃœRLE (TABLET Ã‡OKLU KOPYA Ã–NLEYÄ°CÄ°) ---
    setTimeout(() => {
        let isStamped = false; // Ã‡oklu kopyayÄ± engelleyen kilit

        const disariTiklama = (e) => {
            if (isStamped || container.contains(e.target)) return;

            // EÄŸer dÃ¶ndÃ¼rme veya boyutlandÄ±rma butonlarÄ±na basÄ±lÄ±yorsa mÃ¼hÃ¼rleme yapma
            if (e.target.closest('.rotate-handle') || e.target.closest('.resize-handle')) return;

            isStamped = true;
            window.removeEventListener('pointerdown', disariTiklama, true);

            // Sizin orijinal canvas referansÄ±nÄ±za (canvas) gÃ¶re tam uyumlu koordinat yakalama
            const containerRect = container.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            let xKoordinati = parseFloat(container.style.left);
            let yKoordinati = parseFloat(container.style.top);
            let genislik = parseFloat(container.style.width);
            let yukseklik = parseFloat(container.style.height);

            // Dokunmatik ekrandan el Ã§ekildiÄŸinde koordinat kaybolursa fiziksel pikselleri kurtar
            if (isNaN(xKoordinati) || isNaN(yKoordinati)) {
                xKoordinati = containerRect.left - canvasRect.left;
                yKoordinati = containerRect.top - canvasRect.top;
                genislik = containerRect.width;
                yukseklik = containerRect.height;
            }

            // HatalÄ±/boÅŸ tÄ±klamalarÄ± engelle
            if (genislik < 5 || yukseklik < 5) {
                if (container && container.parentNode) container.parentNode.removeChild(container);
                return;
            }

            // PDF ve Sayfa HafÄ±zasÄ±yla tam uyumlu yeni kopya objesi
            const newCopy = {
                type: 'image',
                imgData: imgSrc,
                x: xKoordinati - canvasRect.left, // KanvasÄ±n sol boÅŸluÄŸunu net olarak dÃ¼ÅŸÃ¼yoruz
                y: yKoordinati - canvasRect.top,  // KanvasÄ±n Ã¼st boÅŸluÄŸunu net olarak dÃ¼ÅŸÃ¼yoruz
                width: genislik,
                height: yukseklik,
                rotation: parseFloat(container.dataset.rotation) || 0,
                isBackground: false,
                isBoxCopy: true,
                pageOwner: typeof currentPDFPage !== 'undefined' ? currentPDFPage : 1,
                imgObj: null
            };

            // Kanvas Ã§izim motoru tetikleyicisi
            const imgObj = new Image();
            imgObj.src = imgSrc;
            imgObj.onload = () => {
                newCopy.imgObj = imgObj;

                // Ana Ã§izim dizisine ekle
                if (typeof drawnStrokes !== 'undefined') {
                    drawnStrokes.push(newCopy);
                }

                // PDF sayfa hafÄ±za dizisine ekle
                if (!window.boxCopies) window.boxCopies = [];
                window.boxCopies.push(newCopy);

                // Kanvas ekranÄ±nÄ± anÄ±nda tazeleyip resmi gÃ¶rÃ¼nÃ¼r kÄ±l
                if (window.redrawAllStrokes) window.redrawAllStrokes();

                console.log("Kutu kopyasÄ± baÅŸarÄ±yla kanvas hafÄ±zasÄ±na mÃ¼hÃ¼rlendi!");
            };

            // GeÃ§ici Ã§izgili kutuyu ve diÄŸer izleyicileri temizle
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };

        window.addEventListener('pointerdown', disariTiklama, true);
    }, 200);
}

// DosyanÄ±n en altÄ±na ekle
window.addEventListener('load', () => {
    setTimeout(setupCanvasResolution, 500);
});


// ===================================================================
// --- AKILLI ÅEKÄ°L TANIMA V15 (KUSURSUZ YILDIZ VE ÃœÃ‡GEN AYRIMI) ---
// ===================================================================
function akilliSekilTani(stroke) {
    if (!stroke || stroke.type !== 'pen' || stroke.path.length < 15) return null;

    const pts = stroke.path;
    const start = pts[0];
    const end = pts[pts.length - 1];
    const directDistance = Math.hypot(end.x - start.x, end.y - start.y);

    let totalDistance = 0;
    for (let i = 1; i < pts.length; i++) totalDistance += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const w = maxX - minX;
    const h = maxY - minY;
    const maxBoyut = Math.max(w, h);
    const cx = minX + w / 2;
    const cy = minY + h / 2;

    if (maxBoyut < 30) return null;

    const col = stroke.color;
    const wid = stroke.baseWidth || 3;

    // 1. DÃœZ Ã‡Ä°ZGÄ°
    if (directDistance > 50 && (totalDistance / directDistance) < 1.15) {
        return { type: 'straightLine', p1: start, p2: end, color: col, width: wid };
    }

    // 2. KAPALI ÅEKÄ°LLER (Kapanma ToleransÄ±)
    const tamKapaliMi = directDistance < (maxBoyut * 0.3) && directDistance < 50;
    if (!tamKapaliMi) return null;

    // AÅIRI KARMAÅIK KARALAMA KORUMASI 
    if (totalDistance > (w + h) * 4) return null;

    // --- BÃ–LGESEL FÄ°ZÄ°KSEL KANITLAR ---
    let topMinX = Infinity, topMaxX = -Infinity;
    let bottomMinX = Infinity, bottomMaxX = -Infinity;
    let leftMinY = Infinity, leftMaxY = -Infinity;
    let rightMinY = Infinity, rightMaxY = -Infinity;
    let distTL = Infinity, distTR = Infinity, distBL = Infinity, distBR = Infinity;
    let totalR = 0;

    pts.forEach(p => {
        if (p.y < minY + h * 0.35) { if (p.x < topMinX) topMinX = p.x; if (p.x > topMaxX) topMaxX = p.x; }
        if (p.y > maxY - h * 0.35) { if (p.x < bottomMinX) bottomMinX = p.x; if (p.x > bottomMaxX) bottomMaxX = p.x; }
        if (p.x < minX + w * 0.35) { if (p.y < leftMinY) leftMinY = p.y; if (p.y > leftMaxY) leftMaxY = p.y; }
        if (p.x > maxX - w * 0.35) { if (p.y < rightMinY) rightMinY = p.y; if (p.y > rightMaxY) rightMaxY = p.y; }
        totalR += Math.hypot(p.x - cx, p.y - cy);

        const dTL = Math.hypot(p.x - minX, p.y - minY); if (dTL < distTL) distTL = dTL;
        const dTR = Math.hypot(p.x - maxX, p.y - minY); if (dTR < distTR) distTR = dTR;
        const dBL = Math.hypot(p.x - minX, p.y - maxY); if (dBL < distBL) distBL = dBL;
        const dBR = Math.hypot(p.x - maxX, p.y - maxY); if (dBR < distBR) distBR = dBR;
    });

    let topW = Math.max(1, topMaxX - topMinX);
    let bottomW = Math.max(1, bottomMaxX - bottomMinX);
    let leftH = Math.max(1, leftMaxY - leftMinY);
    let rightH = Math.max(1, rightMaxY - rightMinY);
    let avgCornerDist = (distTL + distTR + distBL + distBR) / 4;

    let avgR = totalR / pts.length;
    let sapma = 0;
    pts.forEach(p => { sapma += Math.abs(Math.hypot(p.x - cx, p.y - cy) - avgR); });
    let sapmaOrani = sapma / (pts.length * avgR);

    // ==========================================
    // 1. YILDIZ KONTROLÃœ (Nokta Sayma Ä°ptal, Derinlik Ã–lÃ§Ã¼mÃ¼ Geldi)
    // ==========================================
    let isStar = false;
    if (Math.abs(w - h) < maxBoyut * 0.6) {
        let altSolMaxY = -Infinity;
        let altSagMaxY = -Infinity;
        let altOrtaMaxY = -Infinity;

        pts.forEach(p => {
            // Åeklin saÄŸ, sol ve orta alt kÄ±sÄ±mlarÄ±nÄ±n "En derin" (MaxY) noktalarÄ±nÄ± buluyoruz
            if (p.x < cx - w * 0.15) { if (p.y > altSolMaxY) altSolMaxY = p.y; }
            else if (p.x > cx + w * 0.15) { if (p.y > altSagMaxY) altSagMaxY = p.y; }
            else { if (p.y > altOrtaMaxY) altOrtaMaxY = p.y; }
        });

        // ÃœÃ§gende alt Ã§izgi dÃ¼zdÃ¼r, altOrtaMaxY diÄŸerlerine eÅŸittir.
        // YÄ±ldÄ±zda ise ortada boÅŸluk olduÄŸu iÃ§in altOrtaMaxY belirgin ÅŸekilde DAHA YUKARIDADIR.
        if (topW < w * 0.5 &&
            altSolMaxY > cy + h * 0.10 &&
            altSagMaxY > cy + h * 0.10 &&
            altOrtaMaxY < Math.min(altSolMaxY, altSagMaxY) - h * 0.10) {
            isStar = true;
        }
    }

    // ==========================================
    // 2. KALP KONTROLÃœ 
    // ==========================================
    let isHeart = false;
    if (!isStar && Math.abs(w - h) < maxBoyut * 0.5) {
        let ustKisim = pts.filter(p => p.y < cy);
        let solTepe = ustKisim.filter(p => p.x < cx - w * 0.15);
        let sagTepe = ustKisim.filter(p => p.x > cx + w * 0.15);
        let ortaCukur = ustKisim.filter(p => Math.abs(p.x - cx) <= w * 0.15);

        if (solTepe.length > 0 && sagTepe.length > 0 && ortaCukur.length > 0) {
            let solMaxY = Math.min(...solTepe.map(p => p.y));
            let sagMaxY = Math.min(...sagTepe.map(p => p.y));
            let ortaMinY = Math.max(...ortaCukur.map(p => p.y));

            if (ortaMinY > solMaxY + h * 0.08 && ortaMinY > sagMaxY + h * 0.08 && bottomW < w * 0.45) {
                isHeart = true;
            }
        }
    }

    // ==========================================
    // 3. Ã‡EMBER KONTROLÃœ
    // ==========================================
    let isCircle = (!isStar && !isHeart && sapmaOrani < 0.20 && Math.abs(w - h) < maxBoyut * 0.5 && avgCornerDist > maxBoyut * 0.14);

    // --- SONUÃ‡ DÃ–NDÃœRME ---
    const getChar = () => {
        let c = window.nextPointChar || 'A';
        let nextCode = c.charCodeAt(0) + 1;
        if (nextCode > 90) nextCode = 65;
        window.nextPointChar = String.fromCharCode(nextCode);
        return c;
    };

    const createTriangle = (pA, pB, pC) => {
        const l1 = getChar(), l2 = getChar(), l3 = getChar();
        return [
            { type: 'segment', p1: pA, p2: pB, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: pB, p2: pC, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: pC, p2: pA, color: col, width: wid, label1: l3, label2: l1 }
        ];
    };

    if (isStar) {
        const starPath = [];
        // Bu dÃ¶ngÃ¼, senin istediÄŸin "DÄ±ÅŸ HatlarÄ± Olan KesiÅŸmeyen YÄ±ldÄ±zÄ±" Ã§izen 10 noktalÄ± sihirli kÄ±sÄ±mdÄ±r!
        for (let i = 0; i <= 10; i++) {
            let r = i % 2 === 0 ? maxBoyut / 2 : maxBoyut / 4.5;
            let ang = (Math.PI * 2 * i / 10) - Math.PI / 2;
            starPath.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
        }
        return { type: 'pen', path: starPath, color: col, baseWidth: wid, width: wid };
    }

    if (isHeart) {
        const heartPath = [];
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
            heartPath.push({
                x: cx + (w / 2) * (16 * Math.pow(Math.sin(t), 3)) / 16,
                y: cy - (h / 2) * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16 - (h * 0.05)
            });
        }
        heartPath.push(heartPath[0]);
        return { type: 'pen', path: heartPath, color: col, baseWidth: wid, width: wid };
    }

    if (isCircle) {
        return { type: 'arc', cx: cx, cy: cy, radius: (w + h) / 4, startAngle: 0, endAngle: 360, color: col, width: wid, fillColor: 'transparent' };
    }

    // 4. ÃœÃ‡GEN
    if (topW < bottomW * 0.45 || bottomW < topW * 0.45) {
        if (topW < bottomW) return createTriangle({ x: (topMinX + topMaxX) / 2, y: minY }, { x: minX, y: maxY }, { x: maxX, y: maxY });
        else return createTriangle({ x: minX, y: minY }, { x: maxX, y: minY }, { x: (bottomMinX + bottomMaxX) / 2, y: maxY });
    }
    if (leftH < rightH * 0.45 || rightH < leftH * 0.45) {
        if (leftH < rightH) return createTriangle({ x: minX, y: (leftMinY + leftMaxY) / 2 }, { x: maxX, y: minY }, { x: maxX, y: maxY });
        else return createTriangle({ x: maxX, y: (rightMinY + rightMaxY) / 2 }, { x: minX, y: minY }, { x: minX, y: maxY });
    }

    // 5. YAMUK
    if ((topW < bottomW * 0.85 && topW >= bottomW * 0.45) || (bottomW < topW * 0.85 && bottomW >= topW * 0.45)) {
        const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
        return [
            { type: 'segment', p1: { x: topMinX, y: minY }, p2: { x: topMaxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: { x: topMaxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
            { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: topMinX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
        ];
    }

    // 6. DÄ°KDÃ–RTGEN / KARE 
    const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
    return [
        { type: 'segment', p1: { x: minX, y: minY }, p2: { x: maxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
        { type: 'segment', p1: { x: maxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
        { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
        { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: minX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
    ];

} // <-- BU SÃœSLÃœ PARANTEZ Ã‡OK Ã–NEMLÄ°, ÃœSTTEKÄ° FONKSÄ°YONU KAPATIR!


// --- BAÅKA BÄ°R ARACA TIKLANDIÄINDA SÄ°LGÄ°YÄ° OTOMATÄ°K KAPATMA YAMASI ---
document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
    btn.addEventListener('click', function () {
        // EÄŸer tÄ±klanan buton "Silgi" deÄŸilse Ã§alÄ±ÅŸsÄ±n
        if (this.id !== 'btn-silgi') {
            const silgiBtn = document.getElementById('btn-silgi');

            // Silgi butonu aktifse, aktiflik sÄ±nÄ±fÄ±nÄ± kaldÄ±r (Ä±ÅŸÄ±ÄŸÄ±nÄ± sÃ¶ndÃ¼r)
            if (silgiBtn && silgiBtn.classList.contains('active')) {
                silgiBtn.classList.remove('active');

                // Arka planda Ã§izim aracÄ±nÄ± 'silgi' modundan Ã§Ä±kar (uygulamanÄ±zdaki deÄŸiÅŸken ismine gÃ¶re 'none' veya 'pen' yapÄ±yoruz)
                if (typeof currentTool !== 'undefined' && currentTool === 'eraser') {
                    currentTool = 'none';
                }
            }
        }
    });
});

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    const update = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
            console.log(`${id} gÃ¼ncellendi: ${text}`); // Hata ayÄ±klama iÃ§in konsola yazar
        }
    };

    // SOL PANEL
    update('btn-silgi', t.silgi);
    update('btn-kalem', t.kalem);
    update('btn-cizgi', t.cizgi);
    update('btn-nokta', t.nokta);
    update('btn-d_cizgi', t.d_cizgi);
    update('btn-dogru', t.dogru);
    update('btn-dogru_parcasi', t.dogru_parcasi);
    update('btn-isin', t.isin);
    update('btn-cetvel', t.cetvel);
    update('btn-gonye', t.gonye);
    update('btn-aciolcer', t.aciolcer);
    update('btn-pergel', t.pergel);
    update('btn-cokgenler', t.cokgenler);
    update('btn-cember', t.cember);
    update('btn-duzgun_ucgen', t.d_ucgen);
    update('btn-duzgun_dortgen', t.d_dortgen);
    update('btn-dikdortgen', t.dikdortgen);
    update('btn-duzgun_besgen', t.d_besgen);
    update('btn-duzgun_altigen', t.d_altigen);
    update('btn-duzgun_yedigen', t.d_yedigen);
    update('btn-duzgun_sekizgen', t.d_sekizgen);
    update('btn-oyunlar', t.oyunlar);

    // SAÄ PANEL
    update('btn-undo', t.geri_al);
    update('btn-clear-all', t.hepsini_sil);
    update('btn-move', t.tasi);
    update('btn-upload', t.yukle);
    update('btn-snapshot-main', t.canlandir);
    update('btn-snapshot-box', t.kutu);
    update('btn-snapshot-lasso', t.serbest);
    update('btn-help', t.yardim);

    // POPUP VE ALT BÄ°LGÄ° (Kritik SatÄ±r)
    update('install-title', t.ins_t);
    update('install-desc', t.ins_d);
    update('btn-popup-install', t.ins_b);
    update('btn-popup-close', t.ins_c);
    update('kvkk-bilgi', t.kvkk); // <--- BU SATIRIN EKLENDÄ°ÄÄ°NDEN EMÄ°N OL

    // ARAÃ‡ RENGÄ° GÃœNCELLEME
    const colorBtn = document.getElementById('btn-tool-color');
    if (colorBtn) {
        const parts = colorBtn.innerText.split(': ');
        const currentColor = parts[1] || "Siyah";
        colorBtn.innerText = `${t.arac_rengi}: ${currentColor}`;
    }

    // ARAPÃ‡A YÃ–N AYARI
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // ARAYÃœZÃœ KAPAT
    const overlay = document.getElementById('language-overlay');
    if (overlay) overlay.style.display = 'none';

    // --- TÃœM SEÃ‡ENEK MENÃœLERÄ°NÄ° KESÄ°N OLARAK KAPAT (TAÅMA VE SIZMA ENGELLEYÄ°CÄ°) ---
    const optionMenus = [
        document.getElementById('line-options'),
        document.getElementById('polygon-options'),
        document.getElementById('fill-options'),
        document.getElementById('snapshot-options'),
        document.getElementById('pen-options'),
        document.getElementById('oyunlar-options')
    ];
    optionMenus.forEach(menu => {
        if (menu) {
            menu.classList.add('hidden');
            menu.style.display = 'none';
        }
    });

    // TÃ¼m ana butonlarÄ±n aktiflik (Ä±ÅŸÄ±k) durumunu baÅŸlangÄ±Ã§ iÃ§in sÃ¶ndÃ¼r
    document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
        btn.classList.remove('active');
    });

    // EÄŸer aktif bir araÃ§ seÃ§ili kalmÄ±ÅŸsa onu temizle (isteÄŸe baÄŸlÄ±)
    // currentTool = null; 

    console.log("MenÃ¼ler uzun kelime taÅŸmasÄ±na karÅŸÄ± sÄ±fÄ±rlandÄ±.");

    // OYUN LÄ°STESÄ°NÄ° YENÄ°LE (Oyunlar menÃ¼sÃ¼ aÃ§Ä±ksa isimler deÄŸiÅŸsin)
    if (typeof listeleOyunlar === 'function') listeleOyunlar();

    // KANVAS TAZELEME
    setTimeout(() => {
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    }, 100);
}

// --- BU FONKSÄ°YON SETLANGUAGE'Ä°N DIÅINA/ALTINA GELÄ°YOR ---
// Ä°kinci kopya resizeCanvas kaldÄ±rÄ±ldÄ± Ã§Ã¼nkÃ¼ koordinat senkronizasyonunu bozuyordu.

// ================================================================
// DÄ°L SEÃ‡Ä°MÄ° VE AÄA FIRLATMA MOTORU
// ================================================================
function dilButonlariniHazirla() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const langMatch = btn.getAttribute('onclick')?.match(/'([^']+)'/);
        const targetLang = langMatch ? langMatch[1] : btn.dataset.lang;

        if (targetLang) {
            btn.onclick = null;
            btn.removeAttribute('onclick');

            let isTriggered = false;
            const handleSelect = (e) => {
                if (isTriggered) return;
                isTriggered = true;

                if (e.cancelable) e.preventDefault();
                e.stopPropagation();

                // ğŸš¨ FÄ°ZÄ°KSEL DOKUNMA SIZMASI (GHOST CLICK) KALKANI ğŸš¨
                // Dil seÃ§ilip overlay kapandÄ±ÄŸÄ± an, arkadaki butonlara hayalet tÄ±klama Ã§arpmasÄ±n diye
                // tÃ¼m arayÃ¼z panellerini 500ms (yarÄ±m saniye) boyunca tamamen tÄ±klanamaz yapÄ±yoruz.
                document.querySelectorAll('.panel').forEach(panel => {
                    panel.style.pointerEvents = 'none';
                    setTimeout(() => {
                        panel.style.pointerEvents = 'auto'; // YarÄ±m saniye sonra kilit otomatik aÃ§Ä±lÄ±r
                    }, 500);
                });

                // 1. Tabletin (TÄ±klanan cihazÄ±n) ekranÄ±nÄ± aÃ§
                setLanguage(targetLang);

                // ğŸš¨ Ã‡Ã–ZÃœM 3: Tablette yasal uyarÄ± penceresini KESÄ°N OLARAK Kapat!
                const disclaimer = document.getElementById('disclaimer-modal');
                if (disclaimer) disclaimer.style.display = 'none';
                window.acilisPenceresiKapatildi = true;

                // Tablet yerel ekranÄ±ndaki alt bilgi ÅŸeridini de kapat
                const footer = document.getElementById('footer-container') || document.getElementById('disclaimer-container') || document.getElementById('kvkk-bilgi')?.parentElement;
                if (footer) footer.style.display = 'none';

                // 2. KarÅŸÄ± cihaza (PC/Tahtaya) "AynÄ± dili seÃ§ ve ekranÄ± aÃ§" emri gÃ¶nder!
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (typeof isConnected !== 'undefined' && isConnected && firlatici) {
                    firlatici({ type: 'dil_secimi', lang: targetLang });
                    firlatici({ type: 'acilis_penceresini_kapat' });
                    firlatici({ type: 'yukleme_penceresini_kapat' });
                    
                    // ğŸš¨ GARANTÄ° SÄ°NYALÄ°: PC'nin veri kanalÄ±nÄ± aÃ§arken yaÅŸayabileceÄŸi milisaniyelik gecikmelere karÅŸÄ± mesaj 3 kez daha tekrarlanÄ±r!
                    [500, 1500, 3000].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: targetLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                        }, gecikme);
                    });
                }

                setTimeout(() => { isTriggered = false; }, 500);
            };

            btn.addEventListener('pointerdown', handleSelect);
            btn.addEventListener('touchstart', handleSelect, { passive: false });
            btn.addEventListener('click', handleSelect);
        }
    });
}


// AkÄ±llÄ± tahta tarayÄ±cÄ±larÄ±nÄ±n gecikme/hÄ±z problemlerine karÅŸÄ± garanti tetikleyici
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', dilButonlariniHazirla);
} else {
    dilButonlariniHazirla();
}



// =========================================================================
// KUSURSUZ AKILLI NESNE SÄ°LGÄ°SÄ° v2 (ZOMBÄ° KORUMALI VE EKSÄ°KSÄ°Z)
// =========================================================================
const canvasElm = document.getElementById('drawing-canvas');

function akilliSilgi(e, isDown) {
    // Sadece silgi aracÄ± seÃ§iliyse Ã§alÄ±ÅŸsÄ±n
    if (typeof currentTool === 'undefined' || currentTool !== 'eraser') return false;

    // TÄ±klanmÄ±yorsa veya ekrana dokunulmuyorsa iÅŸlem yapma
    const isClicking = isDown || (typeof isDrawing !== 'undefined' && isDrawing) || e.buttons > 0 || (e.touches && e.touches.length > 0);
    if (!isClicking) {
        window.lastEraserPos = null; // TÄ±klama bitince hafÄ±zayÄ± sÄ±fÄ±rla
        return false;
    }

    // ğŸš¨ KESÄ°N VE KUSURSUZ Ã‡Ã–ZÃœM: Windows Ekran Ã–lÃ§eklendirmesini (%125, %150) Yenen Evrensel FormÃ¼l!
    const canvasElm = document.getElementById('drawing-canvas') || e.target;
    const rect = canvasElm.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    // Ã‡arpma/bÃ¶lme hilesiyle farenin CSS pikselini, HD Canvas pikseline %100 sapmasÄ±z Ã§eviriyoruz:
    const scaleX = canvasElm.width / rect.width;
    const scaleY = canvasElm.height / rect.height;

    const ex = (clientX - rect.left) * scaleX;
    const ey = (clientY - rect.top) * scaleY;

    // Silginin etki alanÄ±nÄ± da ekranÄ±n HD oranÄ±na gÃ¶re bÃ¼yÃ¼tÃ¼yoruz
    const eR = 45 * Math.max(scaleX, scaleY);

    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Yeni bir yere dokunulduÄŸunda eski hafÄ±zayÄ± SIFIRLA!
    // BÃ¶ylece eski noktadan yeni noktaya gÃ¶rÃ¼nmez bir lazer Ã§ekip diÄŸer ÅŸekilleri yutmaz.
    if (isDown) {
        window.lastEraserPos = null;
    }

    // --- IÅŸÄ±nlanma (HÄ±zlÄ± Silme) KorumasÄ± ---
    let noktalar = [{ x: ex, y: ey }];

    if (window.lastEraserPos) {
        const dx = ex - window.lastEraserPos.x;
        const dy = ey - window.lastEraserPos.y;
        const mesafe = Math.hypot(dx, dy);

        // EÄŸer fare hÄ±zlÄ± kaydÄ±rÄ±lÄ±p boÅŸluk oluÅŸtuysa, arayÄ± daha sÄ±k (15px) sanal silgilerle doldur
        if (mesafe > 15) {
            const adimSayisi = Math.floor(mesafe / 15);
            for (let i = 1; i <= adimSayisi; i++) {
                noktalar.push({
                    x: window.lastEraserPos.x + (dx * i / adimSayisi),
                    y: window.lastEraserPos.y + (dy * i / adimSayisi)
                });
            }
        }
    }
    window.lastEraserPos = { x: ex, y: ey };

    let silindiMi = false;

    // ... BU SATIRDAN AÅAÄISINA (const distToSeg... kÄ±smÄ±na) DOKUNMAYIN ...
    const distToSeg = (p, v, w) => {
        let l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    };

    if (typeof drawnStrokes !== 'undefined') {
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            const s = drawnStrokes[i];
            if (s.isBackground) continue;

            let vuruldu = false;

            // BoÅŸluklarÄ± dolduran tÃ¼m sanal silgilerle tarama yap
            for (let n of noktalar) {
                if (vuruldu) break; // Zaten silindiyse diÄŸer noktalara bakma
                let nx = n.x, ny = n.y;

                // 1. Serbest Kalem
                if (s.type === 'pen' && s.path) {
                    for (let j = 1; j < s.path.length; j++) {
                        if (distToSeg({ x: nx, y: ny }, s.path[j - 1], s.path[j]) < eR + (s.width || 3)) { vuruldu = true; break; }
                    }
                    if (!vuruldu && s.path.length === 1) {
                        if (Math.hypot(s.path[0].x - nx, s.path[0].y - ny) < eR + 5) vuruldu = true;
                    }
                }
                // 2. Kutu ve Serbest Kesimler
                else if (s.type === 'image') {
                    if (nx >= (s.x || 0) && nx <= (s.x || 0) + (s.width || 0) && ny >= (s.y || 0) && ny <= (s.y || 0) + (s.height || 0)) vuruldu = true;
                }
                // 3. Ã‡okgenler
                else if (s.type === 'polygon' && s.center) {
                    if (Math.hypot(s.center.x - nx, s.center.y - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. Ã‡ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. Ã‡ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }

                // ğŸš¨ YENÄ° 5: Cetvel Ã‡izgileri, Sonsuz DoÄŸru, IÅŸÄ±n ve DoÄŸru ParÃ§asÄ± (Kusursuz Silme)
                else if (s.p1 && s.p2) {
                    if (s.type === 'line' || s.type === 'ray') {
                        const dx = s.p2.x - s.p1.x;
                        const dy = s.p2.y - s.p1.y;
                        const mag = Math.hypot(dx, dy);
                        if (mag > 0) {
                            const dist = Math.abs(dy * nx - dx * ny + s.p2.x * s.p1.y - s.p2.y * s.p1.x) / mag;

                            if (s.type === 'ray') {
                                const dot = (nx - s.p1.x) * dx + (ny - s.p1.y) * dy;
                                if (dot >= 0 && dist < eR + 10) vuruldu = true;
                            } else {
                                if (dist < eR + 10) vuruldu = true;
                            }
                        }
                    } else {
                        // DoÄŸru ParÃ§asÄ± ve DÃ¼z Ã‡izgi (Eski kodunuzdaki distToSeg devam eder)
                        if (distToSeg({ x: nx, y: ny }, s.p1, s.p2) < eR + 10) vuruldu = true;
                    }
                }

                // 6. DÄ°KDÃ–RTGEN DESTEÄÄ°
                else if (s.type === 'rectangle' || s.type === 'rect') {
                    let rx = s.x !== undefined ? s.x : Math.min(s.startPoint?.x || 0, s.endPoint?.x || 0);
                    let ry = s.y !== undefined ? s.y : Math.min(s.startPoint?.y || 0, s.endPoint?.y || 0);
                    let rw = s.width !== undefined ? s.width : Math.abs((s.startPoint?.x || 0) - (s.endPoint?.x || 0));
                    let rh = s.height !== undefined ? s.height : Math.abs((s.startPoint?.y || 0) - (s.endPoint?.y || 0));

                    if (nx >= rx - eR && nx <= rx + rw + eR && ny >= ry - eR && ny <= ry + rh + eR) {
                        vuruldu = true;
                    }
                }

                // 7. NOKTA SÄ°LME DESTEÄÄ°
                else if (s.type === 'point') {
                    if (Math.hypot((s.x || 0) - nx, (s.y || 0) - ny) <= 15 + eR) vuruldu = true;
                }

                // ğŸš¨ YENÄ° 8: HAYALET Ã–NÄ°ZLEMELERÄ° YOK EDÄ°CÄ°
                else if (s.type === 'preview') {
                    vuruldu = true;
                }
                // ğŸš¨ YENÄ° 9: 3D ÅEKÄ°LLERÄ° SÄ°LME (Silgi Ã‡Ã¶zÃ¼mÃ¼)
                else if (s.type === '3d_shape') {
                    if (Math.hypot((s.x || window.innerWidth / 2) - nx, (s.y || window.innerHeight / 2) - ny) <= (s.width || 100) / 2 + eR) {
                        vuruldu = true;
                    }
                }
            } // <--- Noktalar tarama dÃ¶ngÃ¼sÃ¼nÃ¼n bitiÅŸ parantezi

            // VURULDUYSA SÄ°L VE AÄA GÃ–NDER
            if (vuruldu) {
                if (!s.id) s.id = Date.now() + Math.random();

                // ğŸš¨ EÄŸer 3D ÅŸekilse, 3D uzay sahnesinden (Scene3D) kazÄ±!
                if (s.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === s.id);
                    if (meshToRemove) {
                        window.Scene3D.scene.remove(meshToRemove);
                        if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                        window.Scene3D.updateHandlePositions();
                    }
                }

                window.drawnStrokes.splice(i, 1);
                silindiMi = true;

                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'sil_objeyi', strokeId: s.id, index: i });
                }
            }
        }
    }

    if (silindiMi && window.redrawAllStrokes) {
        window.redrawAllStrokes();
    }
}

// --- SÄ°LGÄ° OLAY DÄ°NLEYÄ°CÄ°LERÄ° (ArtÄ±k GÃ¼vende) ---
if (canvasElm) {
    canvasElm.addEventListener('pointerdown', (e) => akilliSilgi(e, true));
    canvasElm.addEventListener('pointermove', (e) => akilliSilgi(e, false));
    canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: false });

    // ğŸš¨ ZIRH 1: Parmak veya Fare ekrandan kalktÄ±ÄŸÄ± an silgi hafÄ±zasÄ±nÄ± zorla sÄ±fÄ±rla!
    canvasElm.addEventListener('pointerup', () => {
        window.lastEraserPos = null;
    });

    // ğŸš¨ ZIRH 2: Fare veya parmak kanvas alanÄ±ndan Ã§Ä±karsa hem hafÄ±zayÄ± sil hem imleci kapat!
    canvasElm.addEventListener('pointerleave', () => {
        window.lastEraserPos = null;
        if (typeof eraserPreview !== 'undefined' && eraserPreview) {
            eraserPreview.style.display = 'none';
        }
    });
}


// Fare veya parmak kanvas alanÄ±ndan Ã§Ä±karsa silgi imlecini zorla kapat
canvas.addEventListener('pointerleave', () => {
    if (typeof eraserPreview !== 'undefined' && eraserPreview) {
        eraserPreview.style.display = 'none';
    }
});

// =========================================================================
// --- OTOMATÄ°K AKILLI YAMA VE KOPYA TEMÄ°ZLEME MOTORU ---
// =========================================================================

window.temizleLassoVeKopyalar = function () {
    if (typeof drawnStrokes !== 'undefined' && drawnStrokes.length > 0) {
        let silinenOlduMu = false;

        // DÃ¶ngÃ¼yÃ¼ tersten kuruyoruz ki silerken sÄ±ra kaymasÄ±n
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            let s = drawnStrokes[i];

            // DÃœZELTME: isBoxCopy (Kutu veya Kement kopyasÄ±) ise SÄ°LME!
            // Sadece maskeler (delikler) temizlensin, kopyalar ekranda silgiye kadar yaÅŸasÄ±n.
            if (s.type === 'lasso-mask' || (s.type === 'image' && s.isBackground === false && !s.isBoxCopy)) {
                drawnStrokes.splice(i, 1);
                silinenOlduMu = true;
            }
        }

        // EÄŸer seÃ§ili olan ÅŸey silinen bir ÅŸeyse seÃ§imi iptal et
        if (typeof window.selectedItem !== 'undefined' && window.selectedItem && !window.selectedItem.isBoxCopy) {
            window.selectedItem = null;
        }

        // Sadece bir ÅŸey silindiyse ekranÄ± tazele
        if (silinenOlduMu && typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
};

// --- OTOMATÄ°K TETÄ°KLEYÄ°CÄ° (GÃ–ZLEMCÄ°) - GÃœNCELLENMÄ°Å ---
document.addEventListener('click', function (e) {
    let element = e.target.closest('button, div, a, i');
    if (element) {
        let id = (element.id || '').toLowerCase();
        let sinif = (element.className || '').toLowerCase();
        let metin = (element.innerText || '').toLowerCase();

        // KRÄ°TÄ°K DÃœZELTME: EÄŸer tÄ±klanan buton bir "Silgi" (Eraser) ise temizliÄŸi TETÄ°KLEME!
        let isSilgi = id.includes('silgi') || metin.includes('silgi') || id.includes('eraser') || metin.includes('eraser');
        if (isSilgi) return;

        // GerÃ§ek temizleme butonlarÄ± (Hepsini sil, kapat, ileri-geri vb.)
        let silmeSartlari = [
            'next', 'prev', 'page', 'clear', 'close', 'kapat', 'ileri', 'geri', 'temizle'
        ];

        // "sil" kelimesini sadece "hepsini_sil" veya "temizle" gibi durumlarda kabul et
        let tamSilme = id.includes('clear-all') || id.includes('hepsini_sil') || metin.includes('hepsini sil');

        let tetikle = tamSilme || silmeSartlari.some(kelime => id.includes(kelime) || sinif.includes(kelime) || metin.includes(kelime));

        if (tetikle) {
            setTimeout(window.temizleLassoVeKopyalar, 50);
        }
    }
});


// =========================================================================
// --- CANLI SINIF (PEERJS) AÄ MOTORU ---
// =========================================================================

let myPeer = null;
let myConnection = null;
let isConnected = false;

// --- 1. AÄ AYARLARI VE KOD ÃœRETÄ°CÄ° ---
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let myRoomCode = '';
for (let i = 0; i < 5; i++) {
    myRoomCode += chars.charAt(Math.floor(Math.random() * chars.length));
}
const isTablet = window.location.href.includes("tablet");

// --- 2. PEERJS BAÅLANGIÃ‡ VE CÄ°HAZ MODU AYARI ---
// --- 2. PEERJS BAÅLANGIÃ‡ (ASKERÄ° DÃœZEY YEREL AÄ KÄ°LÄ°DÄ°) ---

// ğŸš¨ SÄ°HÄ°RLÄ° DOKUNUÅ: TarayÄ±cÄ±nÄ±n dÄ±ÅŸ dÃ¼nyaya (internete) Ã§Ä±kÄ±ÅŸ yollarÄ±nÄ± kesiyoruz!
// iceServers dizisi boÅŸ bÄ±rakÄ±ldÄ±ÄŸÄ± iÃ§in sistem NAT/GÃ¼venlik duvarÄ±nÄ± aÅŸamaz.
// KÃ¶tÃ¼ niyetli biri ÅŸifreyi bilse bile fiziksel olarak uzaktan veri gÃ¶nderemez!
const askeriKalkan = {
    config: {
        'iceServers': [] // Ä°nternet kapÄ±larÄ± mÃ¼hÃ¼rlendi. Sadece LocalHost (AynÄ± Wi-Fi) Ã§alÄ±ÅŸÄ±r.
    }
};

if (isTablet) {
    myPeer = new Peer(askeriKalkan);
    myPeer.on('open', (id) => { console.log("Tablet Peer HazÄ±r. KimliÄŸim:", id); });
    myPeer.on('error', (err) => { alert("Tablet BaÄŸlantÄ± HatasÄ±: " + err); });
} else {
    myPeer = new Peer(myRoomCode, askeriKalkan);
    window.sessionPassword = Math.floor(1000 + Math.random() * 9000).toString();
    
    // GeÃ§ici olarak ekrana yÃ¼kleniyor yazalÄ±m ki uygulamanÄ±n Ã§Ã¶kmediÄŸini gÃ¶relim
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    if (idSaha) idSaha.innerText = "BaÄŸlanÄ±yor...";
    if (pinSaha) pinSaha.innerText = "...";

    myPeer.on('open', (id) => {
        console.log("Tahta Peer HazÄ±r. Oda Kodu:", id);
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
    });
    
    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu HatasÄ±!"; 
        console.warn("PeerJS Arka Plan HatasÄ± (GÃ¶zardÄ± edilebilir): " + err.type); 
    });
}
// --- 3. BAÄLANTI Ä°STEK DÄ°NLEYÄ°CÄ°SÄ° (KAPI ZÄ°LÄ°) ---
myPeer.on('connection', function (conn) {
    // ğŸš¨ KRÄ°TÄ°K GÃœVENLÄ°K YAMASI: ÅÄ°FRE (PIN) KONTROLÃœ ZORUNLULUÄU VE KABA KUVVET (BRUTE-FORCE) KORUMASI ğŸš¨
    if (!window.bannedPeers) window.bannedPeers = {};
    if (!window.failedAttempts) window.failedAttempts = {};

    const peerId = conn.peer;

    // EÄŸer IP/Cihaz engelliyse sÃ¼resinin dolup dolmadÄ±ÄŸÄ±na bak (5 dakika)
    if (window.bannedPeers[peerId]) {
        if (Date.now() - window.bannedPeers[peerId] < 5 * 60 * 1000) {
            console.warn(`ğŸ”’ GÃ¼venlik Ä°hlali: ${peerId} engelli! Deneme reddedildi.`);
            setTimeout(() => conn.close(), 100);
            return;
        } else {
            delete window.bannedPeers[peerId];
            window.failedAttempts[peerId] = 0;
        }
    }

    if (!conn.metadata || conn.metadata.password !== window.sessionPassword) {
        console.warn("ğŸ”’ GÃ¼venlik Ä°hlali: HatalÄ± ÅŸifre denemesi reddedildi!", conn.peer);
        
        window.failedAttempts[peerId] = (window.failedAttempts[peerId] || 0) + 1;
        if (window.failedAttempts[peerId] >= 3) {
            window.bannedPeers[peerId] = Date.now();
            console.warn(`ğŸ”’ GÃ¼venlik Ä°hlali: ${peerId} 3 hatalÄ± deneme yaptÄ±. 5 DAKÄ°KA ENGELLENDÄ°!`);
        }

        // KarÅŸÄ± tarafa hemen red gÃ¶nderip baÄŸlantÄ±yÄ± kopartÄ±yoruz
        setTimeout(() => conn.close(), 500);
        return; // Modal penceresini bile gÃ¶sterme (Ã–ÄŸretmeni rahatsÄ±z etme)
    }

    // DoÄŸru girdiyse eski hatalarÄ± sÄ±fÄ±rla
    delete window.failedAttempts[peerId];


    console.log("Bir cihaz baÄŸlanmak istiyor (Åifre DoÄŸrulandÄ±):", conn.peer);

    const requestModal = document.getElementById('conn-request-modal');
    const requestText = document.getElementById('request-text');
    const btnAccept = document.getElementById('btn-conn-accept');
    const btnReject = document.getElementById('btn-conn-reject');

    if (requestModal && requestText && btnAccept && btnReject) {
        requestText.innerText = `Oda kodu "${conn.peer}" olan bir cihaz baÄŸlanmak istiyor. OnaylÄ±yor musun?`;
        requestModal.classList.remove('hidden');
        requestModal.style.display = 'flex';

        // Yaris Kosulunu (Race Condition) onlemek icin open eventini onceden dinle
        let wasOpenedEarly = false;
        conn.on('open', () => { wasOpenedEarly = true; });

        btnAccept.onclick = function () {
            try {
                myConnection = conn;

                const baglantiHazir = () => {
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;

                    const statusEl = document.getElementById('connection-status');
                    if (statusEl) {
                        statusEl.innerText = "BAÄLANDI ğŸŸ¢";
                        statusEl.style.color = "#00ffcc";
                    }

                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                    console.log("Cihaz baÅŸarÄ±yla baÄŸlandÄ±:", conn.peer);

                    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: PC baÄŸlantÄ±yÄ± onayladÄ±ÄŸÄ± an, dinlemeye baÅŸlar baÅŸlamaz tabletten 
                    // "Ekran durumunu" zorla talep eder. BÃ¶ylece kayÄ±p mesajlar tamamen Ã¶nlenir!
                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function') {
                            window.sendNetworkData({ type: 'pc_hazir_durum_talep_et' });
                        }
                    }, 500);
                };

                if (conn.open || wasOpenedEarly) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }
            } catch (err) {
                console.error("BaÄŸlantÄ± hatasÄ±:", err);
            } finally {
                requestModal.classList.add('hidden');
                requestModal.style.display = 'none';
            }
        };

        btnReject.onclick = function () {
            conn.close();
            requestModal.classList.add('hidden');
            requestModal.style.display = 'none';
        };
    }
});

// 4. Sistem sunucuya baÅŸarÄ±yla baÄŸlandÄ±ÄŸÄ±nda kodumuzu HTML panele yazdÄ±r
myPeer.on('open', function (id) {
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');

    if (!isTablet) {
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
    } else {
        const panel = document.getElementById('network-panel');
        if (panel) {
            const kodDiv = document.getElementById('my-peer-id')?.parentElement;
            if (kodDiv) kodDiv.style.display = 'none';
        }
    }
});

// 5. TABLET ROLÃœ: BaÄŸlanma butonu (GÃœNCEL VERSÄ°YON)
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const targetCode = document.getElementById('connect-input').value.trim();
            const passwordInput = document.getElementById('session-pass-input').value.trim();

            if (targetCode.length === 5 && passwordInput.length > 0) {
                if (!myPeer || myPeer.destroyed) {
                    alert("AÄŸ baÄŸlantÄ±sÄ± henÃ¼z kurulmadÄ±, lÃ¼tfen 2 saniye bekleyip tekrar dene.");
                    return;
                }

                window.sessionPassword = passwordInput;
                document.getElementById('connection-status').innerText = "BaÄŸlanÄ±yor â³";

                // BaÄŸlantÄ±yÄ± baÅŸlat (Åifreyi kriptografik metadata olarak gÃ¶nderiyoruz)
                myConnection = myPeer.connect(targetCode, {
                    metadata: { password: window.sessionPassword }
                });

                // --- BAÄLANTIYI GARANTÄ°LEMEK Ä°Ã‡Ä°N Ä°KÄ°LÄ° KONTROL ---
                // --- BAÄLANTIYI GARANTÄ°LEMEK Ä°Ã‡Ä°N Ä°KÄ°LÄ° KONTROL ---
                myConnection.on('open', () => {
                    console.log("Tablet: Connection Open tetiklendi!");
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    document.getElementById('connection-status').innerText = "BAÄLANDI ğŸŸ¢";
                    document.getElementById('connection-status').style.color = "#00ffcc";

                    // Tablet arayÃ¼zÃ¼nÃ¼ temizle
                    document.getElementById('connect-input').style.display = "none";
                    document.getElementById('connect-btn').style.display = "none";

                    // ğŸš¨ YENÄ°: BaÄŸlantÄ± kurulunca oda/ÅŸifre panelini otomatik kÃ¼Ã§Ã¼lt ğŸš¨
                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                });
            } else {
                alert("LÃ¼tfen 5 haneli Oda Kodunu ve Tahta Åifresini eksiksiz girin.");
            }
        });
    }
});



function setupConnectionEvents() {
    if (!myConnection) return;
    if (window._lastSetupConnection === myConnection) return;
    window._lastSetupConnection = myConnection;
    window._connectionEventsBound = true;

    // --- 1. GÃœVENLÄ°K ONAYI (AÄ MOTORU ZATEN KÄ°LÄ°TLÄ°) ---
    // PeerJS baÅŸlangÄ±cÄ±nda iceServers: [] yaptÄ±ÄŸÄ±mÄ±z iÃ§in cihazÄ±n internete Ã§Ä±kÄ±ÅŸÄ± YOKTUR.
    // DolayÄ±sÄ±yla buraya kadar baÄŸlanabilen cihaz %100 aynÄ± Wi-Fi/Hotspot aÄŸÄ±ndadÄ±r.
    const pc = myConnection.peerConnection;
    // =========================================================
    // EKRANLAR ARASI ORANTISAL ADAPTASYON (Ã‡Ã–ZÃœNÃœRLÃœK SENKRONU)
    // =========================================================

    window.moveStroke = function(stroke, dx, dy) {
        if (!stroke) return;
        // ğŸš¨ 3D Åekilleri dÄ±ÅŸlamÄ±yoruz, ekran kaydÄ±rÄ±lÄ±nca onlar da taÅŸÄ±nacak!

        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x += dx; p.y += dy; });
        if (stroke.points) stroke.points.forEach(p => { p.x += dx; p.y += dy; });

        if (stroke.x !== undefined) stroke.x += dx;
        if (stroke.y !== undefined) stroke.y += dy;
        if (stroke.cx !== undefined) stroke.cx += dx;
        if (stroke.cy !== undefined) stroke.cy += dy;
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x += dx;
            if (stroke.center.y !== undefined) stroke.center.y += dy;
        }

        if (stroke.p1) { stroke.p1.x += dx; stroke.p1.y += dy; }
        if (stroke.p2) { stroke.p2.x += dx; stroke.p2.y += dy; }
        if (stroke.p3) { stroke.p3.x += dx; stroke.p3.y += dy; }

        // ğŸš¨ MÃ¼hÃ¼rlÃ¼ KoordinatlarÄ± da KaydÄ±r!
        if (stroke.originalX !== undefined) stroke.originalX += dx;
        if (stroke.originalY !== undefined) stroke.originalY += dy;
    };

    window.zoomStroke = function(stroke, scale, cx, cy) {
        if (!stroke) return;
        // ğŸš¨ 3D Åekilleri zoom iÅŸlemine dahil ediyoruz (engel kaldÄ±rÄ±ldÄ±)

        const mapX = (x) => cx + (x - cx) * scale;
        const mapY = (y) => cy + (y - cy) * scale;
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined && !isLineType) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined && !isLineType) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined && !isLineType) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined && !isLineType) stroke.height *= scale;
        }

        // ğŸš¨ ZOOM Ä°Ã‡Ä°N ZIRH: MÃ¼hÃ¼rlÃ¼ "original" deÄŸerleri de zoomla!
        if (stroke.originalX !== undefined && stroke.originalW !== undefined && !isLineType) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined && !isLineType) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }

        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        
        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;
        if (stroke.baseWidth) stroke.baseWidth *= scale;
        
        // ğŸš¨ Ã‡Ä°ZGÄ° KALINLIÄI ZIRHI: EÄŸer bu bir Ã§izgi aracÄ± (segment, line, ray, polygon vs.) ise
        // bounding box'Ä± olmadÄ±ÄŸÄ± iÃ§in (x undefined'dir) yukarÄ±daki bloklarda width Ã¶lÃ§eklenmez.
        // O yÃ¼zden Ã§izgi kalÄ±nlÄ±ÄŸÄ±nÄ± temsil eden width deÄŸerini burada doÄŸrudan ekran oranÄ±na gÃ¶re bÃ¼yÃ¼tÃ¼yoruz.
        if (stroke.width !== undefined && stroke.x === undefined) {
            stroke.width *= scale;
        }
    };

    window.adaptStrokeToScreen = function (stroke, senderW, senderH, senderCw, senderCh, data) {
        if (!stroke || !senderW || !senderH) return stroke;

        // ğŸš¨ Ã‡Ã–ZÃœM ADIMI 1: Tabletin gerÃ§ek ekran yÃ¼ksekliÄŸini ÅŸekle mÃ¼hÃ¼rle (3D Perspektif oranÄ±nÄ± korumak iÃ§in)
        stroke.originalSenderH = senderH;

        // ğŸš¨ Ã‡Ã–ZÃœM: 3D Åekilleri dÄ±ÅŸlama, onlar da arka plan ve 2D ekran oranlarÄ±na gÃ¶re otomatik hizalansÄ±n!
        // (3D korumasÄ± silindi)

        const myW = window.innerWidth;
        const myH = window.innerHeight;
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : myW;
        const myCh = canvasElm ? canvasElm.height : myH;
        const senderDpr = senderCw ? (senderCw / senderW) : 1;
        const myDpr = canvasElm ? (myCw / myW) : 1;
        
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        let scale, offsetX, offsetY;
        const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;

        if (data && data.bgW > 0 && myBg && myBg.width > 0 && stroke.isBackground !== true) {
            scale = myBg.width / data.bgW;
            offsetX = myBg.x - (data.bgX * scale);
            offsetY = myBg.y - (data.bgY * scale);
      } else {
            // ğŸš¨ NÄ°HAÄ° Ã‡Ã–ZÃœM: EkranÄ± ortalama! Sol paneli (0,0) referans al ve fiziksel boyutu KESÄ°N OLARAK KORU!
            scale = myDpr / senderDpr;
            offsetX = 0; 
            offsetY = 0; 
        }
        
        // 3D ÅŸekillerin pozisyon takibi iÃ§in bu oranÄ± ÅŸekle mÃ¼hÃ¼rlÃ¼yoruz
        stroke.usedScale = scale;
        stroke.adaptedScale = scale;

        const mapX = (x) => (x * scale) + offsetX;
        const mapY = (y) => (y * scale) + offsetY;

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined) stroke.height *= scale;
        }

        // ğŸš¨ 2. AÄ SENKRON ZIRHI: MÃ¼hÃ¼rlÃ¼ "original" deÄŸerleri PC Ã§Ã¶zÃ¼nÃ¼rlÃ¼ÄŸÃ¼ne Ã§evir! (ZÄ±plamayÄ± engeller)
        if (stroke.originalX !== undefined && stroke.originalW !== undefined) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }
        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        if (stroke.lengthLabelPos) { stroke.lengthLabelPos.x = mapX(stroke.lengthLabelPos.x); stroke.lengthLabelPos.y = mapY(stroke.lengthLabelPos.y); }

        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;

        // KalÄ±nlÄ±k hesaplamasÄ± (Ã‡izgilerin Ã§ok ince veya Ã§ok kalÄ±n olmasÄ±nÄ± engeller)
        if (stroke.width !== undefined && isLineType) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.width *= (myDpr / senderDpr);
            }
        }

        if (stroke.baseWidth !== undefined) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.baseWidth *= (myDpr / senderDpr);
            }
        }

        return stroke;
    };

    window.baglantiOnaylandi = true;
    isConnected = true;

    // --- 2. VERÄ° ALICI VE PARÃ‡ALAMA MOTORU (BARKOD SÄ°STEMLÄ°) ---
    window.chunkBuffers = {}; // ğŸš¨ YENÄ°: Her mesaja Ã¶zel ayrÄ± bir kutu aÃ§Ä±yoruz

    myConnection.on('data', function (data) {

        // ğŸš¨ NÄ°HAÄ° VE MATEMATÄ°KSEL KESÄ°N Ã‡Ã–ZÃœM: CSS ve Canvas HD UyuÅŸmazlÄ±ÄŸÄ±nÄ± Giderici ğŸš¨
        function veriyiIsle(d) {
            if (!d) return;

            // --- EKRANLAR ARASI Ã‡Ã–ZÃœNÃœRLÃœK ADAPTASYONU ---
            const canvasElm = document.getElementById('drawing-canvas');
            const myCw = canvasElm ? canvasElm.width : window.innerWidth;
            const myCh = canvasElm ? canvasElm.height : window.innerHeight;
            const senderW = d.cw || d.cssW || window.innerWidth;
            const senderH = d.ch || d.cssH || window.innerHeight;
            
            // ğŸš¨ HATA BURADAYDI: Bu iki satÄ±r aÅŸaÄŸÄ±daydÄ±, sistemin Ã§Ã¶kmemesi iÃ§in en Ã¼ste alÄ±ndÄ±!
            const senderDpr = d.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;

            let scale, offsetX, offsetY;
            const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
            if (d.bgW > 0 && myBg && myBg.width > 0 && d.type !== 'zoom_senkron' && d.type !== 'hepsini_tasi' && d.type !== 'sekil_guncelle') {
                scale = myBg.width / d.bgW;
                offsetX = myBg.x - (d.bgX * scale);
                offsetY = myBg.y - (d.bgY * scale);
            } else {
                // ğŸš¨ NÄ°HAÄ° Ã‡Ã–ZÃœM (CanlÄ± Ã‡izim): EkranÄ± ortalama! Sol panele yapÄ±ÅŸtÄ±r ve birebir aynÄ± bÃ¼yÃ¼klÃ¼kte tut!
                scale = myDpr / senderDpr;
                offsetX = 0;
                offsetY = 0;
            }

            const mapCssX = (cssX) => (((parseFloat(cssX) * senderDpr) * scale + offsetX) / myDpr) + 'px';
            const mapCssY = (cssY) => (((parseFloat(cssY) * senderDpr) * scale + offsetY) / myDpr) + 'px';
            const mapCssDim = (cssDim) => (((parseFloat(cssDim) * senderDpr) * scale) / myDpr) + 'px';
            const mapNumX = (numX) => (((numX * senderDpr) * scale + offsetX) / myDpr);
            const mapNumY = (numY) => (((numY * senderDpr) * scale + offsetY) / myDpr);
            const mapNumDim = (numDim) => (((numDim * senderDpr) * scale) / myDpr);
            const mapX = (x) => (x * scale) + offsetX;
            const mapY = (y) => (y * scale) + offsetY;

            if (d.type === 'arac_senkron' && !d.ignoreAdapt) {
                if (d.left) d.left = mapCssX(d.left);
                if (d.top) d.top = mapCssY(d.top);
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'arac_state_senkron' && d.state && !d.ignoreAdapt) {
                if (d.state.x !== undefined) d.state.x = mapNumX(d.state.x);
                if (d.state.y !== undefined) d.state.y = mapNumY(d.state.y);
                if (d.state.width !== undefined) d.state.width = mapNumDim(d.state.width);
                if (d.state.height !== undefined) d.state.height = mapNumDim(d.state.height);
                if (d.state.radius !== undefined) d.state.radius = mapNumDim(d.state.radius);
                if (d.state.pivot) {
                    d.state.pivot.x = mapNumX(d.state.pivot.x);
                    d.state.pivot.y = mapNumY(d.state.pivot.y);
                }
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'aktif_onizleme' && d.payload && !d.ignoreAdapt) {
                const isPhysical = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(d.arac);
                const p = d.payload;
                if (isPhysical) {
                    if (p.handleX !== undefined) p.handleX = mapNumDim(p.handleX);
                    if (p.handleY !== undefined) p.handleY = mapNumDim(p.handleY);
                    if (p.ldx !== undefined) p.ldx = mapNumDim(p.ldx);
                    if (p.ldy !== undefined) p.ldy = mapNumDim(p.ldy);
                    if (d.arac === 'pergel') {
                        if (p.cx !== undefined) p.cx = mapX(p.cx);
                        if (p.cy !== undefined) p.cy = mapY(p.cy);
                        if (p.px !== undefined) p.px = mapX(p.px);
                        if (p.py !== undefined) p.py = mapY(p.py);
                        if (p.radius !== undefined) p.radius *= scale;
                    }
                } else {
                    if (p.handleX !== undefined) p.handleX *= scale;
                    if (p.handleY !== undefined) p.handleY *= scale;
                    if (p.cx !== undefined) p.cx = mapX(p.cx);
                    if (p.cy !== undefined) p.cy = mapY(p.cy);
                    if (p.px !== undefined) p.px = mapX(p.px);
                    if (p.py !== undefined) p.py = mapY(p.py);
                    if (p.ldx !== undefined) p.ldx *= scale;
                    if (p.ldy !== undefined) p.ldy *= scale;
                    if (p.x !== undefined) p.x = mapX(p.x);
                    if (p.y !== undefined) p.y = mapY(p.y);
                    
                    if (p.start) { p.start.x = mapX(p.start.x); p.start.y = mapY(p.start.y); }
                    if (p.end) { p.end.x = mapX(p.end.x); p.end.y = mapY(p.end.y); }
                    if (p.radius !== undefined) p.radius *= scale;
                    
                    // ğŸš¨ CANLI Ã‡Ä°ZÄ°M ADAPTASYONU: Tablet Ã§Ã¶zÃ¼nÃ¼rlÃ¼ÄŸÃ¼ndeki kalem hareketlerini PC'ye oranla!
                    if (p.tool === 'pen' && p.path) {
                        for (let pt of p.path) {
                            if (pt.x !== undefined) pt.x = mapX(pt.x);
                            if (pt.y !== undefined) pt.y = mapY(pt.y);
                        }
                    }
                }
                d.ignoreAdapt = true;
            }

            // 1. ZOOM VE PDF SENKRONÄ°ZASYONU
            if (d.type === 'zoom_senkron') {
                if ((typeof pointers !== 'undefined' && pointers.size >= 2) || window.touchCount >= 2 || window.isZooming) return;

                if (window.drawnStrokes) {
                    const canvasElm = document.getElementById('drawing-canvas');
                    const myCw = canvasElm ? canvasElm.width : window.innerWidth;
                    const myCh = canvasElm ? canvasElm.height : window.innerHeight;
                    const senderW = d.cw || d.cssW || window.innerWidth;
                    const senderH = d.ch || d.cssH || window.innerHeight;
                    
                    const scale = Math.min(myCw / senderW, myCh / senderH);
                    const offsetX = (myCw - (senderW * scale)) / 2;
                    const offsetY = (myCh - (senderH * scale)) / 2;
                    const mapX = (x) => (x * scale) + offsetX;
                    const mapY = (y) => (y * scale) + offsetY;

                    const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                    
                    if (mainBg && d.width !== undefined && d.height !== undefined && d.x !== undefined && d.y !== undefined) {
                        const newW = d.width * scale;
                        const newH = d.height * scale;
                        const newX = mapX(d.x);
                        const newY = mapY(d.y);

                        const oldW = mainBg.width;
                        const oldX = mainBg.x;
                        const oldY = mainBg.y;

                        if (oldW > 0) {
                            const zoomRatio = newW / oldW;
                            const cx = oldX + oldW / 2;
                            const cy = oldY + mainBg.height / 2;

                            window.drawnStrokes.forEach(s => {
                                if (!s.isBackground && typeof window.zoomStroke === 'function') {
                                    window.zoomStroke(s, zoomRatio, cx, cy);
                                }
                            });

                            window.drawnStrokes.forEach(bg => {
                                if (bg.isBackground === true) {
                                    if (bg === mainBg) {
                                        bg.width = newW; bg.height = newH; bg.x = newX; bg.y = newY;
                                    } else {
                                        const bg_cx = bg.x + bg.width / 2;
                                        const bg_cy = bg.y + bg.height / 2;
                                        const ncx = cx + (bg_cx - cx) * zoomRatio;
                                        const ncy = cy + (bg_cy - cy) * zoomRatio;
                                        bg.width *= zoomRatio; bg.height *= zoomRatio;
                                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                                    }
                                }
                            });
                        }
                    }
                    if (window.redrawAllStrokes) window.redrawAllStrokes();
                }
                return;
            }

            if (typeof processData === 'function') processData(d);
        }

        if (data && data.type === 'chunk') {
            const id = data.msgId || 'genel';
            
            if (data.idx !== undefined && data.total !== undefined) {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = { chunks: new Array(data.total), count: 0 };
                if (window.chunkBuffers[id].chunks && !window.chunkBuffers[id].chunks[data.idx]) {
                    window.chunkBuffers[id].chunks[data.idx] = data.data;
                    window.chunkBuffers[id].count++;
                }
                if (window.chunkBuffers[id].count === data.total) {
                    const fullStr = window.chunkBuffers[id].chunks.join('');
                    try { veriyiIsle(JSON.parse(fullStr)); } catch (e) { }
                    delete window.chunkBuffers[id];
                }
            } else {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = "";
                if (typeof window.chunkBuffers[id] === 'string') {
                    window.chunkBuffers[id] += data.data;
                    if (data.isLast) {
                        try { veriyiIsle(JSON.parse(window.chunkBuffers[id])); } catch (e) { }
                        delete window.chunkBuffers[id];
                    }
                }
            }
            return;
        }

        veriyiIsle(data);
    });


    function processData(data) {

        // ğŸš¨ KORUMA ZIRHI: Canvas henÃ¼z baÅŸlatÄ±lmadÄ±ysa (Ã¶rn. 300px ise) aÄŸÄ± iÅŸlemeden Ã¶nce tam boyuta getir!
        const cnv = document.getElementById('drawing-canvas');
        if (cnv && cnv.width <= 300 && typeof lockScreenSize === 'function') {
            lockScreenSize();
        }

        // ğŸš¨ YENÄ° ALICI: TABLETTEN GELEN KUSURSUZ RESMÄ° VE PDF'Ä° EKRANA Ã‡Ä°ZER (MERKEZLEME GARANTÄ°LÄ°)
        if (data.type === 'arka_plan_resmi_aktar') {
            const img = new Image();
            img.onload = () => {
                if (typeof addNewImageToCanvas === 'function') {
                    const canvas = document.getElementById('drawing-canvas');
                    let pcMerkez = null;
                    
                    // PC'de resmi ekranÄ±n tam ortasÄ±na yeniden hesapla (SaÄŸa kaymayÄ± KESÄ°N Ã¶nler)
                    if (canvas) {
                        let startWidth = canvas.width * 0.8;
                        let sW = startWidth;
                        if (img.width < sW) sW = img.width;
                        let scaleFactor = sW / img.width;
                        let sH = img.height * scaleFactor;
                        
                        if (sH > canvas.height * 0.8) {
                            sH = canvas.height * 0.8;
                            sW = img.width * (sH / img.height);
                        }
                        pcMerkez = {
                            x: (canvas.width / 2) - (sW / 2),
                            y: (canvas.height / 2) - (sH / 2),
                            width: sW,
                            height: sH
                        };
                    }
                    
                    addNewImageToCanvas(img, data.isPDF, pcMerkez);
                    setTimeout(() => { if (window.redrawAllStrokes) window.redrawAllStrokes(); }, 100);
                }
            };
            img.src = data.imgData;
            return;
        } 

// ğŸš¨ YENÄ° ALICI: TABLETTEN GELEN KUSURSUZ KAYDIRMA (PAN) SÄ°NYALÄ°NÄ° Ä°ÅLER
        if (data.type === 'hepsini_tasi') {
            const senderDpr = data.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;
            const scale = myDpr / senderDpr; 

            const diffX = data.dx * scale;
            const diffY = data.dy * scale;

            if (window.drawnStrokes) {
                const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                if (mainBg) {
                    mainBg.x += diffX;
                    mainBg.y += diffY;
                }
                // Zemindeki Ã§izimleri ve ÅŸekilleri de aynÄ± oranda kaydÄ±r
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.moveStroke === 'function') {
                        window.moveStroke(s, diffX, diffY);
                    }
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
            return;
        }

if (!data || !data.type) return;
        if (!window.drawnStrokes) window.drawnStrokes = [];

// ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: PC hazÄ±r olduÄŸunu bildirdiÄŸinde, Tablet zaten Ã§izim alanÄ±na geÃ§miÅŸse durumunu PC'ye zorla fÄ±rlatÄ±r!
        if (data.type === 'pc_hazir_durum_talep_et') {
            if (window.acilisPenceresiKapatildi && typeof currentLang !== 'undefined' && currentLang) {
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (firlatici) {
                    // PeÅŸ peÅŸe atÄ±ÅŸ yaparak PC'nin veri kanalÄ±nda bu mesajÄ± kaÃ§Ä±rmasÄ±nÄ± engelle
                    [50, 500, 1500].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: currentLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                            firlatici({ type: 'yukleme_penceresini_kapat' });
                        }, gecikme);
                    });
                }
            }
            return;
        }

        // ğŸš¨ DÄ°L SEÃ‡Ä°MÄ° HER ZAMAN GEÃ‡SÄ°N VE EKRANI ZORLA AÃ‡SIN ğŸš¨
        if (data.type === 'dil_secimi') {
            if (typeof setLanguage === 'function') setLanguage(data.lang);

            // PC iÃ§in tam ekran temizliÄŸi (GÃ¶rÃ¼nmez CSS Balyozu!)
            const pcZirhi = document.createElement('style');
            pcZirhi.innerHTML = `
                /* PC ekranÄ±nÄ± kilitleyen ne kadar pencere/panel varsa KÃ–KÃœNDEN yok eder */
                #language-overlay, .language-overlay,
                #disclaimer-modal, .disclaimer-modal,
                #footer-container, .footer-container,
                #install-popup, .install-popup,
                #network-panel, .network-panel,
                #connect-panel, .connect-panel,
                .start-screen, #start-screen,
                .intro-container, #intro-container,
                .modal, .overlay, #conn-request-modal {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    z-index: -9999 !important;
                }
                
                #app-container {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                /* Ã‡izim AlanÄ± ve Sol/SaÄŸ MenÃ¼leri KESÄ°N OLARAK Ã–NE Ã‡IKARIR */
                #drawing-canvas, #bg-canvas {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                .left-panel, .right-panel, .panel {
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(pcZirhi);

            // HTML iÃ§inden de JavaScript ile gizleyelim (Ã‡ifte GÃ¼venlik)
            ['language-overlay', 'disclaimer-modal', 'footer-container', 'network-panel', 'connect-panel', 'start-screen'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            
            const appCont = document.getElementById('app-container');
            if (appCont) appCont.style.display = 'block';

            // PC aÄŸ panelini kÃ¼Ã§Ã¼lten/yok eden yerel fonksiyonu tetikle (EÄŸer HTML'de varsa)
            if (typeof window.kucultPanel === 'function') {
                window.kucultPanel();
            }

            // Ekran kilitleri aÃ§Ä±ldÄ±ktan hemen sonra canvas'Ä± temiz bir ÅŸekilde yenile
            setTimeout(() => {
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                if (typeof lockScreenSize === 'function') lockScreenSize();
            }, 150);

            return;
        }


        // GÃœVENLÄ°K DUVARI
        if (!window.baglantiOnaylandi) return;

        // --- A) TOPLU ÅEKÄ°L ALICISI (Ã‡OKGENLER VE ÃœÃ‡GENLER) ---
        if (data.type === 'akilli_sekil_toplu') {
            if (data.strokes && Array.isArray(data.strokes)) {
                data.strokes.forEach(s => {
                    if (typeof adaptStrokeToScreen === 'function') {
                        const senderCw = data.cw || data.cssW;
                        const senderCh = data.ch || data.cssH;
                        adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                    }
                    const isDuplicate = s.id && window.drawnStrokes.some(ds => ds.id === s.id);
                    if (!isDuplicate) window.drawnStrokes.push(s);
                });
            }
            if (window.redrawAllStrokes) window.redrawAllStrokes();
            return;
        }


        // --- B) TEKÄ°L Ã‡Ä°ZÄ°M/KALEM/RESÄ°M ALICISI ---
        if (data.type === 'yeni_cizim') {
            const stroke = data.stroke;
            if (!stroke) return;

            // ğŸš¨ EKRAN SENKRONÄ°ZASYONU: Gelen stroke'u Kendi EkranÄ±mÄ±za (Ä°Ã§ Piksellere) Ã‡evir!
            // EÄER BUNU YAPMAZSAK, Ã‡Ä°ZÄ°MLER FARKLI EKRANLARDA PDF Ä°LE UYUÅMAZ!
            const isArr = Array.isArray(stroke);
            const strokesArr = isArr ? stroke : [stroke];
            
            strokesArr.forEach(s => {
                if (typeof adaptStrokeToScreen === 'function') {
                    const senderCw = data.cw || data.cssW;
                    const senderCh = data.ch || data.cssH;
                    adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                }
            });

            // EÄŸer veride bir anormallik olup dizi (array) gelirse diye gÃ¼venlik Ã¶nlemi
            if (isArr) {
                strokesArr.forEach(s => {
                    const isExist = s.id && window.drawnStrokes.some(ex => ex.id === s.id);
                    if (!isExist) window.drawnStrokes.push(s);
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
                return;
            }

            // Normal Tekil Ã‡izim (Kalem karalamasÄ± vs.)
            const existingIndex = stroke.id ? window.drawnStrokes.findIndex(s => s.id === stroke.id) : -1;

            if (existingIndex !== -1) {
                window.drawnStrokes[existingIndex] = stroke;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            } else {
                if (stroke.type === 'image' && stroke.imgData) {
                    const tempImg = new Image();
                    tempImg.src = stroke.imgData;
                    tempImg.onload = () => {
                        stroke.imgObj = tempImg;
                        window.drawnStrokes.push(stroke);
                        if (window.redrawAllStrokes) window.redrawAllStrokes();
                    };
                } else {
                    window.drawnStrokes.push(stroke);
                    if (window.redrawAllStrokes) window.redrawAllStrokes();

                    // ğŸš¨ EÄER GELEN Ã‡Ä°ZÄ°M 3D ÅEKÄ°LSE PC MOTORUNU TETÄ°KLE ğŸš¨
                    if (stroke.type === '3d_shape' && window.Scene3D) {
                        if (!window.Scene3D.isInit) window.Scene3D.init();
                        if (window.Scene3D.container) {
                            window.Scene3D.container.style.display = 'block';
                            window.Scene3D.container.style.zIndex = '9995';
                        }
                        if (typeof window.Scene3D.addShapeFromNetwork === 'function') {
                            window.Scene3D.addShapeFromNetwork(stroke);
                        }
                    }
                }
            }
            return;
        }

        // --- C) FÄ°ZÄ°KSEL ARAÃ‡LAR VE DÄ°ÄER FONKSÄ°YONLAR ---
        if (data.type === 'arac_senkron') {
            // ğŸš¨ GÃœVENLÄ°K YAMASI: Sadece izin verilen araÃ§lara CSS mÃ¼dahalesi yapÄ±labilir
            const allowedSelectors = ['.yuzen-kopya-container'];
            if (!allowedSelectors.includes(data.selector)) {
                console.warn("ğŸ”’ GÃ¼venlik Ä°hlali: Ä°zin verilmeyen CSS mÃ¼dahalesi engellendi!", data.selector);
                return;
            }

            const el = document.querySelector(data.selector);
            if (el) {
                if (data.display !== undefined) el.style.display = data.display;
                if (data.left !== undefined) el.style.left = data.left;
                if (data.top !== undefined) el.style.top = data.top;
                if (data.transform !== undefined) el.style.transform = data.transform;
                if (data.width !== undefined) el.style.width = data.width;
                if (data.height !== undefined) el.style.height = data.height;
            }
        }

        // --- BURAYA EKLENECEK TEK SATIR ---
        window.isConnected = true;

        if (data.type === 'sekil_guncelle') {
            const stroke = data.stroke;
            if (!stroke) return;
            if (typeof adaptStrokeToScreen === 'function') {
                const senderCw = data.cw || data.cssW;
                const senderCh = data.ch || data.cssH;
                const senderW = data.cssW || data.cw;
                const senderH = data.cssH || data.ch;
                adaptStrokeToScreen(stroke, senderW, senderH, senderCw, senderCh, data);
            }

            let index = -1;

            // ğŸš¨ KÄ°MLÄ°K UYUÅMAZLIÄI Ã‡Ã–ZÃœMÃœ: 
            // Gelen ÅŸekil arka plan (resim/PDF) ise, ID'ye bakmadan direkt bul!
            if (stroke.isBackground === true) {
                index = window.drawnStrokes.findIndex(s => s.isBackground === true);
            } else {
                if (!stroke.id) return;
                index = window.drawnStrokes.findIndex(s => s.id === stroke.id);
            }

            if (index !== -1) {
                const hedef = window.drawnStrokes[index];

                if (hedef.isBackground === true) {
                    // ğŸš¨ Ã‡Ã–ZÃœM 3: Tabletin mutlak koordinatlarÄ±, PC'nin Ã¶zel merkez hizalamasÄ±nÄ± ezmesin diye
                    // Arka plan sekil_guncelle iÅŸlemlerini KESÄ°N OLARAK YASAKLIYORUZ! 
                    // Bu iÅŸlem artÄ±k sadece Ã¼stteki 'hepsini_tasi' ile pÃ¼rÃ¼zsÃ¼zce yapÄ±lacak.
                    return; 
                }

                hedef.x = stroke.x;
                hedef.y = stroke.y;
                hedef.width = stroke.width;
                hedef.height = stroke.height;
                if (stroke.rotation !== undefined) hedef.rotation = stroke.rotation;

                if (stroke.radius !== undefined) hedef.radius = stroke.radius;
                if (stroke.cx !== undefined) hedef.cx = stroke.cx;
                if (stroke.cy !== undefined) hedef.cy = stroke.cy;
                if (stroke.center !== undefined) hedef.center = stroke.center;

               // ğŸš¨ Ã‡Ã–ZÃœM: KoordinatlarÄ± aÄŸda zorla ezmeyi bÄ±raktÄ±k (ZÄ±plamayÄ± engeller). Sadece gÃ¼venli verileri al.
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.meshScale !== undefined) hedef.meshScale = stroke.meshScale;

                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Tabletteki (AÃ§Ä± / Kenar uzunluÄŸu / Ã‡ember formÃ¼lÃ¼) etiketlerini PC'de de GÃ–STER!

                // ğŸš¨ 3. AÄ SENKRONU: PC'nin 3D dÃ¶ndÃ¼rme ve boyutlarÄ± kabul etmesi iÃ§in gelen verileri kaydet!
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.originalW !== undefined) {
                    hedef.originalW = stroke.originalW;
                    hedef.originalH = stroke.originalH;
                    hedef.originalX = stroke.originalX;
                    hedef.originalY = stroke.originalY;
                }

                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: Tabletteki (AÃ§Ä± / Kenar uzunluÄŸu / Ã‡ember formÃ¼lÃ¼) etiketlerini PC'de de GÃ–STER!
                if (data.stroke.showEdgeLabels !== undefined) hedef.showEdgeLabels = data.stroke.showEdgeLabels;
                if (data.stroke.showAngleLabels !== undefined) hedef.showAngleLabels = data.stroke.showAngleLabels;
                if (data.stroke.showCircleInfo !== undefined) hedef.showCircleInfo = data.stroke.showCircleInfo;

                // ğŸš¨ PC MOTORU: TABLETTEN GELEN SÃœRÃœKLEME VE DÃ–NDÃœRME BÄ°LGÄ°SÄ°NÄ° SAHNEYE UYGULA
                if (hedef.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hedef.id);
                    if (sceneMesh) {
                        
                        // ğŸš¨ NÄ°HAÄ° Ã‡Ã–ZÃœM 2: Konum ve boyutlandÄ±rmayÄ± burada YAPMIYORUZ! 
                // ZÄ±plamalarÄ±n ana sebebi buydu. Ã‡izim motoru (redrawAllStrokes) zaten onu 
                // PC'de olmasÄ± gereken milimetrik konuma taÅŸÄ±yor. Sadece Z eksenini koruyup bÄ±rakÄ±yoruz.
                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                    sceneMesh.position.z = data.stroke.pos3D.z;
                }

                        // Rotasyon ayarlarÄ±nÄ± koru
                        // Rotasyon ayarlarini koru
                                                // Rotasyon ayarlarini koru (SLERP Hedefi)
                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }

                        if (data.stroke.x !== undefined && data.stroke.y !== undefined && window.Scene3D && window.Scene3D.camera) {
                            const normCoords = window.Scene3D.getNormalizedCoords(data.stroke.x, data.stroke.y);
                            window.Scene3D.raycaster.setFromCamera(normCoords, window.Scene3D.camera);
                            const intersection = new THREE.Vector3();
                            if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.plane, intersection)) {
                                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                                    intersection.z = data.stroke.pos3D.z;
                                }
                                if (!sceneMesh.userData.targetPosition) {
                                    sceneMesh.position.copy(intersection);
                                    sceneMesh.userData.targetPosition = intersection.clone();
                                } else {
                                    sceneMesh.userData.targetPosition.copy(intersection);
                                }
                            }
                        }

                        // Boyut (Scale) bilgisini aninda WebGL motoruna yansit (Gecikmesiz)
                        if (data.stroke.meshScale !== undefined) {
                            sceneMesh.scale.setScalar(data.stroke.meshScale);
                        }

                        // Surgu acinim bilgisini senkronize et
                        if (data.stroke.openRatio !== undefined) {
                            hedef.openRatio = data.stroke.openRatio;
                            if (sceneMesh.userData && sceneMesh.userData.strokeData) {
                                sceneMesh.userData.strokeData.openRatio = data.stroke.openRatio;
                            }
                            // Animasyon (Lerp) pruzsuz calismasi icin buradaki anlik guncellemeler Scene3D.animate icine alindi.
                        }

                        if (window.Scene3D.currentMesh === sceneMesh) window.Scene3D.updateHandlePositions();
                    }
                    
                    // ==========================================
                    // HIZ OPTIMIZASYONU (GECIKME KALDIRICI)
                    // ==========================================
                    // Eger yansitilan sekil sadece bir 3D model ise (ve uzerinde 2D yazi/etiket yoksa)
                    // koca 2D sayfa cizim motorunu (redrawAllStrokes) saniyede 60 kez calistirmaya ASLA gerek yoktur!
                    // WebGL motoru zaten (requestAnimationFrame) ile aninda kendi goruntusunu gunceller.
                    // Bu return komutu sayfa kilitlenmesini ve agdaki ping gecikmelerini SIFIRA indirir.
                    if (!hedef.showEdgeLabels && !hedef.showAngleLabels && !hedef.showCircleInfo) {
                        return; 
                    }
                }

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'sil_objeyi') {
            const zombiIndex = window.drawnStrokes.findIndex(s => s.id === data.strokeId);

            // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: 3D Åekil ise PC'nin uzay sahnesinden de TAMAMEN SÄ°L!
            if (window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === data.strokeId);
                if (meshToRemove) {
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            if (zombiIndex !== -1) window.drawnStrokes.splice(zombiIndex, 1);
            else if (data.index !== undefined && window.drawnStrokes[data.index]) window.drawnStrokes.splice(data.index, 1);

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        if (data.type === 'geri_al') {
            const popped = window.drawnStrokes.pop();
            // ğŸš¨ 3D ÅEKÄ°LSE GERÄ° ALIRKEN PC SAHNESÄ°NDEN DE KALDIR
            if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
                if (meshToRemove) {
                    meshToRemove.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }
        else if (data.type === 'sil_belirli' && data.id) {
            const index = window.drawnStrokes.findIndex(s => s.id === data.id);
            if (index !== -1) {
                window.drawnStrokes.splice(index, 1);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }
        else if (data.type === 'hepsini_sil') {
            // PC Ä°Ã‡Ä°N KESÄ°N Ã‡Ã–ZÃœM: HafÄ±za baÄŸlantÄ±sÄ±nÄ± koparmadan filtreleme yapÄ±yoruz!
            const korunacakZeminler = window.drawnStrokes.filter(stroke => stroke.isBackground === true);

            window.drawnStrokes.length = 0; // 1. Orijinal hafÄ±zanÄ±n iÃ§ini tamamen boÅŸalt
            window.drawnStrokes.push(...korunacakZeminler); // 2. Sadece PDF ve arka planlarÄ± geri koy

            // ğŸš¨ PC'NÄ°N 3D UZAYINI TAMAMEN TEMÄ°ZLE ğŸš¨
            if (window.Scene3D && window.Scene3D.scene) {
                const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
                toRemove.forEach(m => {
                    m.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(m);
                });
                window.Scene3D.currentMesh = null;
                if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
            }

            // PC tarafÄ±ndaki kayÄ±tlÄ± veriyi de temizle (LocalStorage)
            if (window.localStorage) {
                window.localStorage.removeItem('drawnStrokes');
            }
            // EkranÄ± yenile
            if (window.redrawAllStrokes) window.redrawAllStrokes();

            console.log("PC: Silme komutu alÄ±ndÄ±. Ã‡izimler ve kopyalar uÃ§uruldu, sadece zemin korundu.");
        }

        if (data.type === 'pdf_yukle') {
            try {
                const base64Data = data.pdfData.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
                if (typeof pdfjsLib !== 'undefined') {
                    pdfjsLib.getDocument(bytes).promise.then(pdf => {
                        window.currentPDF = pdf; window.totalPDFPages = pdf.numPages; window.currentPDFPage = 1;
                        if (document.getElementById('pdf-controls')) document.getElementById('pdf-controls').classList.remove('hidden');
                        if (typeof renderPDFPage === 'function') renderPDFPage(1);
                    });
                }
            } catch (e) { console.error("PDF HatasÄ±:", e); }
        }

        if (data.type === 'pdf_sayfa_degis') { window.currentPDFPage = data.sayfa; if (typeof renderPDFPage === 'function') renderPDFPage(window.currentPDFPage); }

        // (Ä°kinci kopya arka_plan_resmi_aktar alÄ±cÄ±sÄ± silindi, yukarÄ±daki ana alÄ±cÄ± kullanÄ±lÄ±yor)

        // ğŸš¨ YENÄ° EKLENEN BÃ–LÃœM: PC'NÄ°N PDF KAPATMA EMRÄ°NÄ° ALDIÄI YER ğŸš¨
        if (data.type === 'pdf_kapat') {
            // ğŸš¨ SÄ°HÄ°RLÄ° Ã‡Ã–ZÃœM: PC tarafÄ±nda da filter yerine splice kullanÄ±yoruz ğŸš¨
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    const s = window.drawnStrokes[i];
                    if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                        window.drawnStrokes.splice(i, 1);
                    }
                }
            }
            window.currentPDF = null;
            window.pdfImageStroke = null;

            // KÄ±rmÄ±zÄ± butonu PC ekranÄ±ndan da garanti olmasÄ± iÃ§in gizle
            const pcKapatBtn = document.getElementById('btn-close-pdf');
            if (pcKapatBtn) {
                pcKapatBtn.classList.add('hidden');
                pcKapatBtn.style.display = 'none';
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
            console.log("PC: Tablet arka planÄ± kapattÄ±, ekran temizlendi.");
        }


        // ğŸš¨ NÃœKLEER Ã‡Ã–ZÃœM: AÃ‡ILIÅ PENCERESÄ°NÄ° KÃ–KÃœNDEN SÄ°L ğŸš¨
        if (data.type === 'acilis_penceresini_kapat') {
            const acilisPenceresi = document.getElementById('disclaimer-modal');
            if (acilisPenceresi) {
                // Sadece gizlemekle kalma, HTML'den tamamen kazÄ±!
                acilisPenceresi.remove();
            }

            // EÄŸer isminde farklÄ±lÄ±k varsa diye tÃ¼m uyarÄ± pencerelerini gizle
            document.querySelectorAll('.modal, .overlay, [id*="modal"], [id*="disclaimer"]').forEach(el => {
                el.style.display = 'none';
            });

            // ZÄ±rh: PC arka planda yeniden aÃ§maya Ã§alÄ±ÅŸmasÄ±n diye CSS ile mÃ¼hÃ¼rle
            const mÃ¼hÃ¼r = document.createElement('style');
            mÃ¼hÃ¼r.innerHTML = '#disclaimer-modal, .disclaimer-modal { display: none !important; opacity: 0 !important; pointer-events: none !important; z-index: -9999 !important; }';
            document.head.appendChild(mÃ¼hÃ¼r);

            console.log("PC: AÃ§Ä±lÄ±ÅŸ penceresi KÃ–KÃœNDEN silindi ve mÃ¼hÃ¼rlendi.");
        }


        // ğŸš¨ PC: UYGULAMAYI YÃœKLE PENCERESÄ°NÄ° KAPATMA SÄ°NYALÄ° ğŸš¨
        if (data.type === 'yukleme_penceresini_kapat') {
            const yuklemePenceresi = document.getElementById('install-popup');
            if (yuklemePenceresi) {
                yuklemePenceresi.remove(); // Sadece gizleme, HTML dosyasÄ±ndan KÃ–KÃœNDEN SÄ°L!
            }

            // TarayÄ±cÄ± arkadan iÅŸ Ã§evirip geri getirmesin diye CSS MÃ¼hrÃ¼ bas:
            const muhur = document.createElement('style');
            muhur.innerHTML = '#install-popup { display: none !important; opacity: 0 !important; z-index: -9999 !important; pointer-events: none !important; }';
            document.head.appendChild(muhur);

            console.log("PC: YÃ¼kleme penceresi yok edildi ve mÃ¼hÃ¼rlendi.");
        }


        if (data.type === 'arac_state_senkron') {
            let toolObj = null, el = null;
            if (data.arac === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); }
            if (data.arac === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); }
            if (data.arac === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); }
            if (data.arac === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); }

            if (toolObj) {
                if (data.state) Object.assign(toolObj.state, data.state);
                if (data.arac === 'pergel' && toolObj.state) {
                    if (toolObj.state.isDrawing) {
                        toolObj.previewCanvas.style.display = 'block';
                        toolObj.previewCanvas.width = window.innerWidth;
                        toolObj.previewCanvas.height = window.innerHeight;
                        toolObj.drawPreviewArc();
                    } else {
                        toolObj.previewCanvas.style.display = 'none';
                        if (toolObj.previewCtx) toolObj.previewCtx.clearRect(0, 0, toolObj.previewCanvas.width, toolObj.previewCanvas.height);
                    }
                }
                if (el) {
                    if (data.display === 'none') {
                        el.classList.add('hidden'); // ğŸš¨ KESÄ°N OLARAK GÄ°ZLE
                        el.style.display = 'none';
                    } else {
                        el.classList.remove('hidden'); // ğŸš¨ KESÄ°N OLARAK GÃ–STER
                        el.style.display = (data.arac === 'ruler' || data.arac === 'gonye') ? 'flex' : 'block';
                    }
                    if (data.width) el.style.width = data.width;
                    if (data.height) el.style.height = data.height;
                }
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof toolObj.updateMarkings === 'function') toolObj.updateMarkings();
                if (typeof toolObj.createLabels === 'function') toolObj.createLabels();

                // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: YansÄ±ma (Titreme) Engelleme Kilidi
                toolObj.lastNetworkReceiveTime = Date.now();
            }
        }

        if (data.type === 'aktif_onizleme') {
            const arac = data.arac;
            const p = data.payload;

            if (arac === 'ruler' && window.RulerTool && window.RulerTool.drawCtx) {
                const r = window.RulerTool;
                r.drawHandleElement.style.transition = 'none'; r.drawHandleElement.style.left = `${p.handleX}px`;
                r.drawHandleLabel.innerText = `${(p.handleX / r.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                r.drawHandleLabel.style.display = 'block';
                r.drawCtx.clearRect(0, 0, r.drawCanvas.width, r.drawCanvas.height);
                r.drawCtx.beginPath(); r.drawCtx.moveTo(0, 4); r.drawCtx.lineTo(p.handleX, 4);
                r.drawCtx.strokeStyle = '#FFFFFF'; r.drawCtx.lineWidth = 3; r.drawCtx.stroke();
            }
            else if (arac === 'gonye' && window.GonyeTool && window.GonyeTool.drawCtx) {
                const g = window.GonyeTool;
                g.drawHandleElement.style.transition = 'none'; g.drawHandleElement.style.top = `${p.handleY}px`;
                g.drawHandleLabel.innerText = `${(Math.abs(g.state.height - (p.handleY + 10)) / g.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                g.drawHandleLabel.style.display = 'block';
                g.drawCtx.clearRect(0, 0, g.drawCanvas.width, g.drawCanvas.height);
                g.drawCtx.beginPath(); g.drawCtx.moveTo(4, g.state.height); g.drawCtx.lineTo(4, p.handleY + 10);
                g.drawCtx.strokeStyle = '#FFFFFF'; g.drawCtx.lineWidth = 3; g.drawCtx.stroke();
            }
            else if (arac === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.previewCtx) {
                const a = window.AciolcerTool;
                a.previewCanvas.style.display = 'block'; a.previewCanvas.width = window.innerWidth; a.previewCanvas.height = window.innerHeight;
                a.previewCtx.clearRect(0, 0, a.previewCanvas.width, a.previewCanvas.height);
                a.previewCtx.beginPath(); a.previewCtx.moveTo(p.cx, p.cy); a.previewCtx.lineTo(p.px, p.py);
                a.previewCtx.strokeStyle = '#FFFFFF'; a.previewCtx.lineWidth = 3; a.previewCtx.setLineDash([5, 5]); a.previewCtx.stroke(); a.previewCtx.setLineDash([]);
                a.drawHandleLabel.style.display = 'block'; a.drawHandleLabel.innerText = `${p.angle.toFixed(0)}Â°`;
                a.redLine.style.transition = 'none'; a.redLine.style.transform = `rotate(${-p.angle}deg)`;
                a.drawHandle.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy + 5}px)`;
                a.drawHandleLabel.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy - 20}px)`;
            }
            else if (arac === 'lazer') {
                let lazer = document.getElementById('sanal-lazer');
                if (!lazer) {
                    lazer = document.createElement('div'); lazer.id = 'sanal-lazer';
                    lazer.style.width = '14px'; lazer.style.height = '14px'; lazer.style.background = 'rgba(0, 255, 200, 0.9)'; lazer.style.boxShadow = '0 0 12px rgba(0,255,200,1)';
                    lazer.style.borderRadius = '50%'; lazer.style.position = 'fixed'; lazer.style.pointerEvents = 'none'; lazer.style.zIndex = '9999'; lazer.style.transform = 'translate(-50%, -50%)';
                    document.body.appendChild(lazer);
                }
                lazer.style.display = 'block'; lazer.style.left = `${p.x}px`; lazer.style.top = `${p.y}px`;
                clearTimeout(window.lazerTimer); window.lazerTimer = setTimeout(() => { lazer.style.display = 'none'; }, 150);
            }
            else if (arac === 'cizim_onizleme') {
                // SÄ°HÄ°RLÄ° DÃœZELTME: filter yerine splice kullanarak hafÄ±za kopmasÄ±nÄ± kÃ¶kÃ¼nden Ã§Ã¶zÃ¼yoruz!
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }

                const previewObj = { type: 'preview', isTemporaryPreview: true, payload: p, id: 'temp-preview-id' };
                window.drawnStrokes.push(previewObj);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }

            // ğŸš¨ YENÄ° EKLENEN: PC'NÄ°N Ã‡Ä°ZGÄ° Ã–NÄ°ZLEMESÄ°NÄ° HAVADA Ã‡Ä°ZMESÄ° ğŸš¨
            else if (arac === 'cizgi_onizleme') {
                if (window.redrawAllStrokes) window.redrawAllStrokes(); // KalÄ±cÄ± Ã§izgileri ezmemek iÃ§in Ã¶nce ekranÄ± tazele

                const canvas = document.getElementById('drawing-canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                    ctx.strokeStyle = p.color || '#000000';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([5, 5]); // AynÄ± tabletteki gibi kesikli Ã§izgi efekti
                    ctx.beginPath();

                    const dx = p.endX - p.startX;
                    const dy = p.endY - p.startY;

                    if (dx !== 0 || dy !== 0) {
                        const devCarpan = 5000;
                        if (p.tool === 'line') {
                            ctx.moveTo(p.startX - dx * devCarpan, p.startY - dy * devCarpan);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else if (p.tool === 'ray') {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.endX, p.endY);
                        }
                    } else {
                        ctx.moveTo(p.startX, p.startY);
                        ctx.lineTo(p.endX, p.endY);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            }

        } // <--- ğŸš¨ EKSÄ°K OLAN SÃœSLÃœ PARANTEZ BURADA! (aktif_onizleme bloÄŸunu kapatÄ±r) ğŸš¨

        if (data.type === 'onizleme_bitir') {
            // SÄ°HÄ°RLÄ° DÃœZELTME: filter yerine splice kullanarak hafÄ±za kopmasÄ±nÄ± kÃ¶kÃ¼nden Ã§Ã¶zÃ¼yoruz!
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
            }

            if (window.RulerTool && window.RulerTool.drawCtx) { window.RulerTool.drawHandleLabel.style.display = 'none'; window.RulerTool.drawCtx.clearRect(0, 0, window.RulerTool.drawCanvas.width, window.RulerTool.drawCanvas.height); }
            if (window.GonyeTool && window.GonyeTool.drawCtx) { window.GonyeTool.drawHandleLabel.style.display = 'none'; window.GonyeTool.drawHandleElement.style.transition = 'top 0.1s ease-out'; window.GonyeTool.drawHandleElement.style.top = `${window.GonyeTool.state.height - 20}px`; window.GonyeTool.drawCtx.clearRect(0, 0, window.GonyeTool.drawCanvas.width, window.GonyeTool.drawCanvas.height); }
            if (window.AciolcerTool && window.AciolcerTool.previewCtx) { window.AciolcerTool.drawHandleLabel.style.display = 'none'; window.AciolcerTool.previewCanvas.style.display = 'none'; window.AciolcerTool.redLine.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.redLine.style.transform = 'rotate(0deg)'; window.AciolcerTool.drawHandle.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.drawHandle.style.transform = 'translateX(-50%) translate(0px, 0px)'; window.AciolcerTool.previewCtx.clearRect(0, 0, window.AciolcerTool.previewCanvas.width, window.AciolcerTool.previewCanvas.height); }
            let lazer = document.getElementById('sanal-lazer'); if (lazer) lazer.style.display = 'none';
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        if (data.type === 'secimi_senkronize_et') {
            const index = window.drawnStrokes.findIndex(s => s.id === data.strokeId);
            if (index !== -1) {
                // ğŸš¨ PC'deki LOKAL deÄŸiÅŸkenleri ez ve aracÄ± zorla 'move' yap (Butonlar gÃ¶rÃ¼nsÃ¼n)
                selectedItem = window.drawnStrokes[index];
                window.selectedItem = selectedItem;

                if (typeof setActiveTool === 'function') setActiveTool('move');
                else currentTool = 'move';

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'secimi_kaldir') {
            selectedItem = null;
            window.selectedItem = null;
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        // ğŸš¨ SÄ°NKRONÄ°ZASYON: Fiziksel AraÃ§ TemasÄ± (Siyah/Neon) PC'ye yansÄ±tÄ±lÄ±yor
        if (data.type === 'fiziksel_arac_temasi') {
            window.isToolThemeBlack = data.isBlackTheme;
            const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
            elements.forEach(el => {
                if (data.isBlackTheme) {
                    el.classList.add('tool-black-theme');
                } else {
                    el.classList.remove('tool-black-theme');
                }
            });
            // PC'deki butonun metnini de senkronize et
            const colorBtn = document.getElementById('btn-tool-color');
            if (colorBtn) {
                colorBtn.innerText = data.isBlackTheme ? "AraÃ§ Rengi: Neon" : "AraÃ§ Rengi: Siyah";
            }
        }
    } // <--- processData fonksiyonu TAM BURADA kusursuzca kapanÄ±r

    // --- 3. BAÄLANTI KOPMASI DURUMU ---
    myConnection.on('close', function () {
        window._connectionEventsBound = false;
        window._lastSetupConnection = null;
        isConnected = false;
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.innerText = "BaÄŸlantÄ± Koptu ğŸ”´";
            statusEl.style.color = "#ff4444";
        }
        // BaÄŸlantÄ± koptuÄŸunda sayfayÄ± yenilemek en garantili Ã§Ã¶zÃ¼mdÃ¼r:
        setTimeout(() => { location.reload(); }, 2000);
    });

    // --- SÄ°HÄ°RLÄ° EÅÄ°TLEME (Ä°KÄ° PENCERE Ä°Ã‡Ä°N ISRARCI VE ZIRHLI VERSÄ°YON) ---
    let denemeSayisi = 0;
    const pencereSyncTimer = setInterval(() => {
        if (!isConnected || !myConnection || !myConnection.open) return;

        // ğŸš¨ YENÄ° Ã‡Ã–ZÃœM: BAÄLANTI SONRADAN BÄ°LE GELSE DÄ°LÄ° VE EKRAN KÄ°LÄ°DÄ°NÄ° SENKRONÄ°ZE ET
        if (typeof currentLang !== 'undefined' && currentLang && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'dil_secimi', lang: currentLang });
        }

        // 1. Yasal UyarÄ± KontrolÃ¼ ve Sinyali
        if ((window.acilisPenceresiKapatildi || (document.getElementById('disclaimer-modal') && document.getElementById('disclaimer-modal').style.display === 'none')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'acilis_penceresini_kapat' });
        }

        // ğŸš¨ 2. YENÄ°: YÃ¼kle Penceresi KontrolÃ¼ ve Sinyali ğŸš¨
        const tabletPopup = document.getElementById('install-popup');
        if ((!tabletPopup || tabletPopup.style.display === 'none' || tabletPopup.classList.contains('hidden')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }

        console.log("PC'ye tÃ¼m pencerelerin durum eÅŸitlemesi gÃ¶nderiliyor... (Deneme: " + (denemeSayisi + 1) + ")");

        denemeSayisi++;
        if (denemeSayisi >= 4) clearInterval(pencereSyncTimer); // 4 saniye boyunca tahtayÄ± bombalar, sonra durur
    }, 1000);

} // <--- setupConnectionEvents fonksiyonu tam burada kusursuzca kapanÄ±yor

// =========================================================
// 7. GÃœVENLÄ° VE KAYIPSIZ VERÄ° FIRLATMA FONKSÄ°YONU (ZIRHLI VE BARKODLU VERSÄ°YON)
// =========================================================
window.mySessionId = Date.now().toString() + Math.random().toString();

window.sendNetworkData = function (dataPackage) {
    if (!dataPackage) return;

    // YANKI KORUMASI Ä°Ã‡Ä°N KÄ°MLÄ°K DAMGASI
    dataPackage.senderId = window.mySessionId;

    // BoyutlarÄ± damgala (PC'de doÄŸru hizalama iÃ§in)
    const canvasElm = document.getElementById('drawing-canvas');
    if (canvasElm) {
        dataPackage.cw = canvasElm.width;
        dataPackage.ch = canvasElm.height;
        dataPackage.cssW = window.innerWidth;
        dataPackage.cssH = window.innerHeight;
        dataPackage.dpr = window.devicePixelRatio || 1;
    }

    if (window.drawnStrokes) {
        const bg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (bg) {
            dataPackage.bgX = bg.x;
            dataPackage.bgY = bg.y;
            dataPackage.bgW = bg.width;
            dataPackage.bgH = bg.height;
        }
    }

    // GÃ¼vence: Ã‡izim gÃ¶nderiliyorsa ve ID'si yoksa ID ata!
    if (dataPackage.type === 'yeni_cizim' && dataPackage.stroke && !dataPackage.stroke.id) {
        dataPackage.stroke.id = Date.now() + Math.random();
    }

    

    const dataString = JSON.stringify(dataPackage);
    const CHUNK_SIZE = 8000;

    // DURUM 1: Tabletsek Tahtaya GÃ¶nder
    if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        if (dataString.length <= CHUNK_SIZE) {
            myConnection.send(dataPackage);
        } else {
            let i = 0; let chunkIndex = 0;
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
            function paketGonder() {
                if (!myConnection || (!myConnection.open && !window.isConnected)) return;
                if (myConnection.dataChannel && myConnection.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonder, 50); return; }
                if (i < dataString.length) {
                    myConnection.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                    i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonder, 5);
                }
            }
            paketGonder();
        }
    }
    // DURUM 2: Tahtaysak Tabletlere GÃ¶nder
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        for (let id in window.aktifBaglantilar) {
            const conn = window.aktifBaglantilar[id];
            if (conn && conn.open) {
                if (dataString.length <= CHUNK_SIZE) {
                    conn.send(dataPackage);
                } else {
                    let i = 0; let chunkIndex = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
                    function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.dataChannel && conn.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonderTahta, 50); return; }
                        if (i < dataString.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                            i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonderTahta, 5);
                        }
                    }
                    paketGonderTahta();
                }
            }
        }
    }
};
window.networkResZirhi = true;
// ğŸš¨ 1. ZIRH: EKRAN KAYDIRMA VE YAYLANMA ENGELLEYÄ°CÄ° ğŸš¨
const palmZirhi = document.createElement('style');
palmZirhi.innerHTML = `
    body, html {
        overscroll-behavior: none !important; /* EkranÄ±n lastik gibi yaylanmasÄ±nÄ± bitirir */
    }
    #drawing-canvas {
        touch-action: none !important; /* TarayÄ±cÄ±ya kaydÄ±rma yapmayÄ± kesinlikle yasaklar */
        -webkit-user-select: none !important;
        -webkit-touch-callout: none !important;
    }
`;
document.head.appendChild(palmZirhi);

// iOS/Safari ve Android'in inatÃ§Ä± kaydÄ±rma (scroll) huylarÄ±nÄ± zorla durduran motor
const cCnv = document.getElementById('drawing-canvas');
if (cCnv) {
    cCnv.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
    cCnv.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
}

// ğŸš¨ AKILLI ZIRH: AvuÃ§ Ä°Ã§iyle Sayfa KaymasÄ±nÄ± Engeller, Zoom'u Bozmaz!
const smartCanvas = document.getElementById('drawing-canvas');
if (smartCanvas) {
    smartCanvas.addEventListener('touchmove', function (e) {
        // EÄŸer ekrana sadece 1 temas varsa (avuÃ§ iÃ§i veya tek parmak sÃ¼rtÃ¼nmesi)
        // sayfanÄ±n lastik gibi kaymasÄ±nÄ± kesin olarak kilitler!
        if (e.touches && e.touches.length === 1 && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
}


// =========================================================
// ğŸš¨ Ã–ZEL KONÄ° AÃ‡INIM MOTORU (Kusursuz Yelpaze ve Kapak Sistemi)
// =========================================================
window.CustomConeEngine = {
    create: function(radius, height, mainMat, edgeMat) {
        const innerGroup = new THREE.Group();
        innerGroup.userData.isCustomCone = true;
        innerGroup.userData.r = radius;
        innerGroup.userData.h = height;
        innerGroup.userData.s = Math.hypot(radius, height);

        const segments = 32;
        const lateralGeo = new THREE.BufferGeometry();
        const numVerts = segments + 2;
        const posArray = new Float32Array(numVerts * 3);
        lateralGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const indices = [];
        for (let i = 1; i <= segments; i++) {
            // ğŸš¨ 1. Ã‡Ã–ZÃœM: YÃ¼zeyleri dÄ±ÅŸa Ã§evirdik, "Alttan gÃ¶rÃ¼nme" illÃ¼zyonu bitti!
            indices.push(0, i, i + 1);
        }
        lateralGeo.setIndex(indices);
        const lateralMesh = new THREE.Mesh(lateralGeo, mainMat);
        lateralMesh.material.side = THREE.DoubleSide;
        
        // Ã‡izgi Geometrisi
        const edgePos = new Float32Array((segments + 3) * 3);
        const lateralEdgeGeo = new THREE.BufferGeometry();
        lateralEdgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
        const lateralEdges = new THREE.Line(lateralEdgeGeo, edgeMat);
        
        // Taban (Kapak) Geometrisi
        const baseGeo = new THREE.CircleGeometry(radius, 32);
        baseGeo.translate(0, -radius, 0); // KapaÄŸÄ±n dÃ¶nme menteÅŸesini tam arka noktaya alÄ±yoruz
        
        const baseMesh = new THREE.Mesh(baseGeo, mainMat);
        baseMesh.material.side = THREE.DoubleSide;
        const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), edgeMat);
        baseMesh.add(baseEdges);
        
        innerGroup.add(lateralMesh); innerGroup.add(baseMesh); innerGroup.add(lateralEdges);
        innerGroup.userData.lateralMesh = lateralMesh; innerGroup.userData.baseMesh = baseMesh; innerGroup.userData.lateralEdges = lateralEdges;
        
        const outerGroup = new THREE.Group();
        outerGroup.userData = innerGroup.userData;
        outerGroup.userData.innerGroup = innerGroup;
        outerGroup.add(innerGroup);
        
        this.update(outerGroup, 0); 
        return outerGroup;
    },
    
    update: function(group, ratio) {
        const innerGroup = group.userData.innerGroup || group;
        const r = innerGroup.userData.r; 
        const h = innerGroup.userData.h; 
        const s = innerGroup.userData.s; 
        const segments = 32;
        const pos = innerGroup.userData.lateralMesh.geometry.attributes.position.array;
        const epos = innerGroup.userData.lateralEdges.geometry.attributes.position.array;
        
        // ğŸš¨ 2. Ã‡Ã–ZÃœM: Motordan "rotation" (eÄŸim) komutlarÄ±nÄ± tamamen SÄ°LDÄ°K. 
        // ArtÄ±k koni ekranÄ±n Ã¼stÃ¼ne bakarak dimdik duracak ve YeÅŸil TaÅŸÄ±ma Butonu kusursuz Ã§alÄ±ÅŸacak!

        const apexX = 0; const apexY = 0; const apexZ = h / 2;
        pos[0] = apexX; pos[1] = apexY; pos[2] = apexZ;
        epos[0] = apexX; epos[1] = apexY; epos[2] = apexZ;
        
        for (let i = 0; i <= segments; i++) {
            // ğŸš¨ 3. Ã‡Ã–ZÃœM: YÄ±rtÄ±lma Ã§izgisini (alpha=0) tam Ã–N TARAFA (-Y ekseni) aldÄ±k.
            const alpha = (i / segments) * 2 * Math.PI; 
            
            // 3D KapalÄ± Hal (Dimdik duruyor)
            const x3 = r * Math.sin(alpha); 
            const y3 = -r * Math.cos(alpha); // Eksi y = Tam Ã–n Taraf
            const z3 = -h / 2;
            
            // 2D AÃ§Ä±k Hal (SaÄŸ kanat saÄŸa, sol kanat sola dÃ¶kÃ¼lÃ¼r)
            const theta = (2 * Math.PI * r) / s; 
            const sectorAngle = ((alpha - Math.PI) / Math.PI) * (theta / 2); 
            const x2 = -s * Math.sin(sectorAngle); 
            const y2 = 0; // KarÅŸÄ±dan gÃ¶rÃ¼nmesi iÃ§in XZ dÃ¼zlemine yatÄ±rÄ±lÄ±r
            const z2 = h / 2 - s * Math.cos(sectorAngle); 
            
            const x = x3 * (1 - ratio) + x2 * ratio; 
            const y = y3 * (1 - ratio) + y2 * ratio; 
            const z = z3 * (1 - ratio) + z2 * ratio;
            
            const vIdx = (i + 1) * 3; 
            pos[vIdx] = x; pos[vIdx + 1] = y; pos[vIdx + 2] = z;
            
            const eIdx = (i + 1) * 3; 
            epos[eIdx] = x; epos[eIdx + 1] = y; epos[eIdx + 2] = z;
        }
        
        // Son siyah Ã§izgiyi tepeye kapat
        const lastIdx = (segments + 2) * 3;
        epos[lastIdx] = apexX; epos[lastIdx + 1] = apexY; epos[lastIdx + 2] = apexZ;
        
        innerGroup.userData.lateralMesh.geometry.attributes.position.needsUpdate = true;
        innerGroup.userData.lateralMesh.geometry.computeVertexNormals();
        innerGroup.userData.lateralEdges.geometry.attributes.position.needsUpdate = true;
        
        // ğŸš¨ 4. Ã‡Ã–ZÃœM: KapaÄŸÄ±n (tabanÄ±n) menteÅŸe gibi arkadan aÅŸaÄŸÄ± doÄŸru bir kapÄ± misali aÃ§Ä±lmasÄ±
        const baseMesh = innerGroup.userData.baseMesh;
        const hingeY = r * (1 - ratio);
        const hingeZ = (-h / 2) * (1 - ratio) + (h / 2 - s) * ratio;
        baseMesh.position.set(0, hingeY, hingeZ);
        baseMesh.rotation.x = (Math.PI / 2) * ratio; // 0'dan (dÃ¼z) baÅŸlayarak ekrana doÄŸru sarkÄ±p tam daire olur

        // ğŸš¨ 5. Ã‡Ã–ZÃœM: Koninin aÃ§Ä±lÄ±rken tam karÅŸÄ±dan (XY dÃ¼zleminden) gÃ¶rÃ¼nmesi iÃ§in rotasyonu otomatik dÃ¼zelt
        if (group.userData.innerGroup) {
            // Koninin aÃ§Ä±k hali XZ dÃ¼zlemindedir (y=0). KameranÄ±n gÃ¶rmesi iÃ§in onu kameranÄ±n (Y=-30, Z=20) aÃ§Ä±sÄ±na tam dikmeliyiz.
            const qClosed = new THREE.Quaternion().identity(); // KapalÄ±yken (ratio=0) kullanÄ±cÄ±nÄ±n verdiÄŸi rotasyona dokunma
            
            // XZ dÃ¼zlemindeki ÅŸekli ekrana tam paralel yatÄ±rmak iÃ§in, Z ekseni ekranÄ±n 'Ã¼st' noktasÄ±na (Y=20, Z=30) gelmeli.
            // Bunun iÃ§in gereken kusursuz aÃ§Ä± Math.atan2(-20, 30)'dur. (-Math.PI / 2 yani -90 derece sadece dÃ¼z kamera iÃ§indi)
            const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.atan2(-20, 30));
            
            // DÄ±ÅŸ grubun dinamik rotasyonunu deÄŸil, varsayÄ±lan rotasyonunu kullanÄ±yoruz. 
            // Koniler baÅŸlangÄ±Ã§ta X ve Z ekseninde -30 derece (-Math.PI/6) dÃ¶ndÃ¼rÃ¼lerek ekleniyor.
            const defaultOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 6, 0, -Math.PI / 6, 'XYZ'));
            const qOuterInverse = defaultOuterQ.invert();
            const qOpenTarget = qOuterInverse.multiply(qOpenAbsolute);
            
            innerGroup.quaternion.copy(qClosed).slerp(qOpenTarget, ratio);
        }
    }
};


window.Scene3D = {
    container: null, scene: null, camera: null, renderer: null, labelElement: null,
    isInit: false, activeTool: 'none', version: "3.4 - KUSURSUZ Ã‡Ä°ZÄ°M",

    currentMesh: null, previewMesh: null, previewLine: null, helperGroup: null,
    raycaster: null, mouse: null, plane: null,
    rotateHandleBtn: null, resizeHandleBtn: null,
    isRotatingHandle: false, isResizingHandle: false,
    handles: { center: { x: 0, y: 0 } }, lastMousePos: { x: 0, y: 0 },
    dragPlane: null, dragOffset: null,
    isDragging: false, isClickCandidate: false, clickStartPos: { x: 0, y: 0 }, isRotatingShape: false,

    init: function () {
        if (this.isInit) return;
        if (typeof THREE === 'undefined') { setTimeout(() => { window.Scene3D.init(); }, 500); return; }
        this.isInit = true;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.dragPlane = new THREE.Plane();
        this.dragOffset = new THREE.Vector3();

        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();

        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 30; // 3D sahnede gÃ¶rÃ¼nen alanÄ±n yaklaÅŸÄ±k yÃ¼ksekliÄŸi
        this.camera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, 0.1, 1000);
        this.camera.position.set(0, -30, 20);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 0, 1);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.pointerEvents = 'none';

        if (this.container) {
            this.container.appendChild(this.renderer.domElement);
            // ğŸš¨ GÃœVENLÄ°K 1: BaÅŸlangÄ±Ã§ta tahtayÄ± zorla gÃ¶rÃ¼nÃ¼r yap!
            this.container.style.display = 'block';
            this.container.classList.remove('hidden');
        }

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, -10, 20);
        this.scene.add(dirLight);

        this.helperGroup = new THREE.Group();
        this.scene.add(this.helperGroup);

        const styleBtn = (btn, isRotate) => {
            btn.style.position = 'absolute'; btn.style.width = '32px'; btn.style.height = '32px';
            btn.style.borderRadius = '50%'; btn.style.backgroundColor = isRotate ? '#00ffcc' : '#ff007f';
            btn.style.color = 'white'; btn.style.fontSize = '16px';
            btn.style.display = 'none'; btn.style.justifyContent = 'center'; btn.style.alignItems = 'center';
            btn.style.cursor = 'pointer'; btn.style.zIndex = '1000';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            btn.innerHTML = isRotate ? 'â†»' : 'â¤¡';
        };

        if (this.rotateHandleBtn && this.rotateHandleBtn.parentNode) {
            this.rotateHandleBtn.parentNode.removeChild(this.rotateHandleBtn);
        }
        if (this.resizeHandleBtn && this.resizeHandleBtn.parentNode) {
            this.resizeHandleBtn.parentNode.removeChild(this.resizeHandleBtn);
        }
        document.querySelectorAll('.scene3d-rotate-btn, .scene3d-resize-btn').forEach(btn => btn.remove());

        this.rotateHandleBtn = document.createElement('div');
        this.rotateHandleBtn.className = 'scene3d-rotate-btn';
        styleBtn(this.rotateHandleBtn, true);
        document.body.appendChild(this.rotateHandleBtn);

        this.resizeHandleBtn = document.createElement('div');
        this.resizeHandleBtn.className = 'scene3d-resize-btn';
        styleBtn(this.resizeHandleBtn, false);
        document.body.appendChild(this.resizeHandleBtn);

        const startInteract = (action, e) => {
            if (e && e.cancelable) e.preventDefault();
            if (e) e.stopPropagation();
            this[action] = true;
            const px = e.touches ? e.touches[0].clientX : e.clientX;
            const py = e.touches ? e.touches[0].clientY : e.clientY;
            this.lastMousePos = { x: px, y: py };

            if (action === 'isResizingHandle' && this.currentMesh) {
                this.startScale = this.currentMesh.scale.x;
                this.startResizeDist = Math.hypot(px - this.handles.center.x, py - this.handles.center.y) || 1;
            }
        };

        ['mousedown', 'touchstart'].forEach(evt => {
            this.rotateHandleBtn.addEventListener(evt, (e) => startInteract('isRotatingHandle', e), { passive: false });
            this.resizeHandleBtn.addEventListener(evt, (e) => startInteract('isResizingHandle', e), { passive: false });
        });

        ['touchmove', 'mousemove', 'pointermove'].forEach(evt => {
            window.addEventListener(evt, (e) => {
                if (this.isRotatingHandle || this.isResizingHandle) {
                    if (e.cancelable) e.preventDefault();
                    const px = e.touches ? e.touches[0].clientX : e.clientX;
                    const py = e.touches ? e.touches[0].clientY : e.clientY;
                    this.onMove(px, py);
                }
            }, { passive: false });
        });

        ['touchend', 'mouseup', 'pointerup'].forEach(evt => {
            window.addEventListener(evt, () => { if (this.isRotatingHandle || this.isResizingHandle) this.onUp(); });
        });

        this.animate();
    },

    updateHandlePositions: function () {
        if (!this.currentMesh || currentTool !== 'move') {
            if (this.rotateHandleBtn) this.rotateHandleBtn.style.display = 'none';
            if (this.resizeHandleBtn) this.resizeHandleBtn.style.display = 'none';
            return;
        }
        const vec = this.currentMesh.position.clone();
        vec.project(this.camera);
        const canvasEl = document.getElementById('drawing-canvas');
        const rect = canvasEl ? canvasEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const w = rect.width / 2, h = rect.height / 2;
        const px = rect.left + (vec.x * w) + w, py = rect.top + (-(vec.y * h) + h);

        this.handles.center = { x: px, y: py };

        const scale = this.currentMesh.scale.x || 1;

        this.rotateHandleBtn.style.display = 'flex';
        this.rotateHandleBtn.style.left = (px + (30 * scale)) + 'px';
        this.rotateHandleBtn.style.top = (py - (60 * scale)) + 'px';

        this.resizeHandleBtn.style.display = 'flex';
        this.resizeHandleBtn.style.left = (px - (70 * scale)) + 'px';
        this.resizeHandleBtn.style.top = (py + (30 * scale)) + 'px';
    },

    animate: function () {
        requestAnimationFrame(() => window.Scene3D.animate());

        if (this.scene) {
            this.scene.children.forEach(mesh => {
                if (mesh.userData && mesh.userData.strokeData) {
                    // ğŸš¨ KONÄ° Ã‡Ã–ZÃœMÃœ: Koni ise kendi motoruyla canlandÄ±r, deÄŸilse diÄŸerleriyle
                    let targetRatio = mesh.userData.strokeData.openRatio || 0;
                    if (mesh.userData.currentOpenRatio === undefined) mesh.userData.currentOpenRatio = targetRatio;
                    mesh.userData.currentOpenRatio += (targetRatio - mesh.userData.currentOpenRatio) * 0.3;
                    if (Math.abs(targetRatio - mesh.userData.currentOpenRatio) < 0.001) mesh.userData.currentOpenRatio = targetRatio;

                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.currentOpenRatio);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.currentOpenRatio);
                    }
                    
                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.40); // 0.15'den 0.40'a cikarildi (Aninda tepki)
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.45); // 0.2'den 0.45'e cikarildi (Aninda yapisma)
                    }
                }
            });
        }

        if (this.scene && this.renderer && this.camera) this.renderer.render(this.scene, this.camera);
    },

    // ğŸš¨ 3D TABLET HATASI Ã‡Ã–ZÃœMÃœ: EkranÄ±n tamamÄ± deÄŸil, Ã§izim kutusunun gerÃ§ek sÄ±nÄ±rlarÄ± baz alÄ±nÄ±r!
    getNormalizedCoords: function (clientX, clientY) {
        const canvasEl = document.getElementById('drawing-canvas');
        const w = canvasEl ? canvasEl.clientWidth : window.innerWidth;
        const h = canvasEl ? canvasEl.clientHeight : window.innerHeight;
        return {
            x: (clientX / w) * 2 - 1,
            y: -(clientY / h) * 2 + 1
        };
    },

    get3DPointOnFloor: function (x, y) {
        if (!this.raycaster || !this.camera) return new THREE.Vector3(0, 0, 0);
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersection = new THREE.Vector3();
        return this.raycaster.ray.intersectPlane(this.plane, intersection) ? intersection : null;
    },

    createGeometry: function (type, size) {
        const height = size * 2;
        switch (type) {
            case 'sphere': return new THREE.SphereGeometry(size, 32, 32);
            case 'prism_cube': return new THREE.BoxGeometry(size * 2, size * 2, size * 2);
            case 'prism_cylinder': return new THREE.CylinderGeometry(size, size, height, 32);
            case 'prism_3': return new THREE.CylinderGeometry(size, size, height, 3);
            case 'prism_4': return new THREE.BoxGeometry(size * 1.5, height, size * 1.5);
            case 'prism_square': return new THREE.BoxGeometry(size * 1.5, size * 3, size * 1.5);
            case 'prism_rect': return new THREE.BoxGeometry(size * 3, size * 2.2, size * 1.5);
            case 'prism_5': return new THREE.CylinderGeometry(size, size, height, 5);
            case 'prism_6': return new THREE.CylinderGeometry(size, size, height, 6);
            case 'pyramid_cone': return new THREE.ConeGeometry(size, height, 32);
            case 'pyramid_3': return new THREE.ConeGeometry(size, height, 3);
            case 'pyramid_4': return new THREE.ConeGeometry(size, height, 4);
            case 'pyramid_5': return new THREE.ConeGeometry(size, height, 5);
            case 'pyramid_6': return new THREE.ConeGeometry(size, height, 6);
            default: return new THREE.SphereGeometry(size, 32, 32);
        }
    },

    onDown: function (x, y) {
        if (!this.isInit) return false;
        if (this.container) { this.container.style.display = 'block'; this.container.classList.remove('hidden'); }
        if (this.isRotatingHandle || this.isResizingHandle) return true;

        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        let foundMesh = intersects.find(h => h.object.type === 'Mesh' && h.object !== this.helperGroup);

        // ğŸš¨ EÄER BU BÄ°R GRUPSA (Foldable3D) EN ÃœST GRUBU BUL
        if (foundMesh) {
            let rootObj = foundMesh.object;
            while (rootObj.parent && rootObj.parent !== this.scene && rootObj.parent.type === 'Group') {
                rootObj = rootObj.parent;
            }
            foundMesh = { object: rootObj };
        }

        // ğŸš¨ TABLET DOKUNMATÄ°K ZIRHI: Parmakla basÄ±ldÄ±ÄŸÄ±nda 3D IÅŸÄ±n Ä±skalasa bile 2D Kutusundan Kesin Yakala!
        if (!foundMesh && window.drawnStrokes && currentTool === 'move') {
            const canvasEl = document.getElementById('drawing-canvas');
            if (canvasEl) {
                const rect = canvasEl.getBoundingClientRect();
                // DÃœZELTME: YÃ¼ksek DPI (Retina) cihazlarda canvasX hatalÄ± olur, CSS koordinatlarÄ± (cssX, cssY) kullanÄ±lmalÄ±!
                const cssX = x - rect.left;
                const cssY = y - rect.top;

                const hitStroke = window.drawnStrokes.find(s => s.type === '3d_shape' && Math.abs(cssX - (s.x + s.width / 2)) < Math.max(40, s.width / 2) && Math.abs(cssY - (s.y + s.height / 2)) < Math.max(40, s.height / 2));
                if (hitStroke) {
                    const sceneMesh = this.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hitStroke.id);
                    if (sceneMesh) foundMesh = { object: sceneMesh };
                }
            }
        }

        if (foundMesh) {
            this.currentMesh = foundMesh.object;
            this.clickStartPos = { x, y };

            if (currentTool === 'move') {
                this.isRotatingShape = false;
                this.isDragging = true;
                this.dragPlane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new THREE.Vector3()), this.currentMesh.position);
                const intersectPoint = new THREE.Vector3();
                if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                    this.dragOffset.subVectors(this.currentMesh.position, intersectPoint);
                }

                // FormÃ¼l kutusunun Ã§Ä±kmasÄ± iÃ§in ÅŸekli seÃ§ili hale getir
                if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                    window.selectedItem = this.currentMesh.userData.strokeData;
                    if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                }
            } else {
                this.isDragging = false; this.isRotatingShape = true; this.lastMousePos = { x, y };
            }
            this.updateHandlePositions();
            return true;
        }

        if (this.activeTool && this.activeTool !== 'none' && this.activeTool !== 'move') {
            this.isDrawing = true;
            this.startPoint = this.get3DPointOnFloor(x, y) || new THREE.Vector3(0, 0, 0);

            const previewGeo = this.createGeometry(this.activeTool, 0.1);
            if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) previewGeo.rotateX(Math.PI / 2);
            this.previewMesh = new THREE.Mesh(previewGeo, new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.5 }));
            this.previewMesh.position.copy(this.startPoint);

            this.scene.add(this.previewMesh);
            return true;
        }

        if (currentTool === 'move') {
            this.currentMesh = null;
            window.selectedItem = null;
            this.updateHandlePositions();
        }
        return false;
    },

    onMove: function (x, y) {
        if (this.isRotatingHandle && this.currentMesh) {
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
                        if (!this.currentMesh.userData.targetQuaternion) {
                this.currentMesh.userData.targetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userData.targetQuaternion);
            dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);
            this.currentMesh.userData.targetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userData.targetQuaternion, 'XYZ');
                sd.rotationX = euler.x;
                sd.rotationY = euler.y;
                sd.rotationZ = euler.z;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
            }
            return;
        }
        if (this.isResizingHandle && this.currentMesh) {
            const currentDist = Math.hypot(x - this.handles.center.x, y - this.handles.center.y);
            const dragRatio = currentDist / this.startResizeDist;
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                
                // ğŸš¨ ZÄ±plama KorumasÄ±: Orijinal koordinatlara (originalW vs.) ASLA dokunmadan 
                // sadece ekranlar arasÄ± gÃ¼venli bir "Ã‡arpan" (meshScale) Ã¼retiyor ve yolluyoruz!
                sd.meshScale = (sd.meshScale || 1) * dragRatio;
                this.startResizeDist = currentDist; // Katlanarak bÃ¼yÃ¼meyi engelle
                
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
            }
            return;
        }
        if (this.isDrawing && this.startPoint && this.previewMesh) {
            const currentPoint = this.get3DPointOnFloor(x, y);
            if (!currentPoint) return;
            const distance = currentPoint.distanceTo(this.startPoint);
            const scale = Math.max(0.1, distance * 3.5);
            this.previewMesh.scale.setScalar(scale);
            return;
        }
        if (this.isDragging && this.currentMesh) {
            this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
            const intersectPoint = new THREE.Vector3();
            if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                this.currentMesh.position.addVectors(intersectPoint, this.dragOffset);
                
                // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                this.currentMesh.position.x = Math.max(-30, Math.min(30, this.currentMesh.position.x));
                this.currentMesh.position.y = Math.max(-30, Math.min(30, this.currentMesh.position.y));
                this.currentMesh.position.z = Math.max(-30, Math.min(30, this.currentMesh.position.z));

                this.updateHandlePositions();
                // TaÅŸÄ±ma sÄ±rasÄ±ndaki aÄŸ senkronu zaten 2D motoru tarafÄ±ndan kusursuz yapÄ±lÄ±yor. Burada hiÃ§bir ÅŸeye dokunmuyoruz!
            }
            return;
        }
        if (this.isRotatingShape && this.currentMesh && currentTool !== 'move') {
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), (x - this.lastMousePos.x) * 0.01);
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
        }
    },

    onUp: function () {
        const wasResizing = this.isResizingHandle;
        this.isRotatingHandle = this.isResizingHandle = this.isDragging = this.isRotatingShape = false;
        const wasDrawing = this.isDrawing;
        this.isDrawing = false;

        if (wasResizing && this.currentMesh && this.currentMesh.userData && this.currentMesh.userData.strokeData) {
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: this.currentMesh.userData.strokeData });
        }

        if (wasDrawing && this.previewMesh) {
            const finalScale = this.previewMesh.scale.x || 1;
            const finalRadius = 0.1 * finalScale;
            this.scene.remove(this.previewMesh); this.previewMesh.geometry.dispose(); this.previewMesh = null;

            const isSphere = this.activeTool === 'sphere';
            const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
            const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

            let solidShape = null;
            // ğŸš¨ KONÄ° Ã‡Ã–ZÃœMÃœ: Koniyi Ã¶zel motorla aÃ§ ki piramide dÃ¶nÃ¼ÅŸmesin!
            if (this.activeTool === 'pyramid_cone' && window.CustomConeEngine) {
                solidShape = window.CustomConeEngine.create(finalRadius, finalRadius * 2, mainMaterial, edgeMaterial);
            } else if (window.Foldable3D) {
                solidShape = window.Foldable3D.createFoldableGroup(this.activeTool, finalRadius, mainMaterial, edgeMaterial);
            }
            if (!solidShape) {
                const geometry = this.createGeometry(this.activeTool, finalRadius);
                if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
                solidShape = new THREE.Mesh(geometry, mainMaterial);
                solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
            }

            // Åekli 3D uzaya tam senin bÄ±raktÄ±ÄŸÄ±n yere yerleÅŸtir
            solidShape.position.copy(this.startPoint || new THREE.Vector3(0, 0, 0));

            // ğŸš¨ Ã‡Ä°ZÄ°M TAMAMLANDIÄINDA Ä°ZOMETRÄ°K DURUÅ: Ã–n, Ãœst ve SaÄŸ yÃ¼zlerin gÃ¶rÃ¼nmesi iÃ§in
            if (this.activeTool === 'pyramid_cone' || this.activeTool.startsWith('prism_') || this.activeTool.startsWith('pyramid_')) {
                // -Math.PI/6 (-30 derece) dÃ¶ndÃ¼rÃ¼ldÃ¼ÄŸÃ¼nde Ã–n yÃ¼z daha geniÅŸ, SaÄŸ yÃ¼z dar gÃ¶rÃ¼nÃ¼r (Klasik 3D gÃ¶rÃ¼nÃ¼m)
                solidShape.rotation.z = -Math.PI / 6;
                // Koni iÃ§in kameraya tam dik bakmamasÄ± adÄ±na X ekseninde de eÄŸim veriyoruz ki taban elips gÃ¶rÃ¼nsÃ¼n
                solidShape.rotation.x = -Math.PI / 6;
            }

            this.scene.add(solidShape);
            this.currentMesh = solidShape;
            this.updateHandlePositions();

            // ğŸš¨ SÄ°HÄ°RLÄ° DOKUNUÅ: 3D Åeklin 2D Ã‡izim NoktasÄ±nÄ± Tam Ä°sabet Hesapla! (Ortaya kaÃ§maz)
            const vec = solidShape.position.clone();
            vec.project(this.camera);
            const canvasEl = document.getElementById('drawing-canvas');
            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
            const screenX = (vec.x * w) + w;
            const screenY = -(vec.y * h) + h;

            // ğŸš¨ 1. KUSURSUZ BOYUT: GerÃ§ek HD Piksel karÅŸÄ±lÄ±ÄŸÄ±nÄ± hesapla (KÃ¼Ã§Ã¼lmeyi ve kaymayÄ± Ã¶nler)
            const myCh = canvasEl ? canvasEl.height : window.innerHeight;
            const pixelPerUnit = myCh / 30; // 3D uzaydaki 1 birimin piksel karÅŸÄ±lÄ±ÄŸÄ±
            const gercekPx = (finalRadius * 2) * pixelPerUnit;

            const networkData = {
                type: '3d_shape', id: Date.now().toString() + Math.random(), shapeType: this.activeTool,
                x: screenX - (gercekPx / 2),
                y: screenY - (gercekPx / 2),
                width: gercekPx, height: gercekPx,
                // SÃ¼rgÃ¼ Ã§ekilse bile asla zÄ±plamasÄ±n ve PC'ye mÃ¼kemmel gitsin diye ZIRH:
                originalX: screenX - (gercekPx / 2),
                originalY: screenY - (gercekPx / 2),
                originalW: gercekPx,
                originalH: gercekPx,
                rotationX: solidShape.rotation.x, rotationY: solidShape.rotation.y, rotationZ: solidShape.rotation.z,
                pos3D: { x: solidShape.position.x, y: solidShape.position.y, z: solidShape.position.z },
                rotation: 0, yaw: 0, pitch: 1, openRatio: 0, isPreview: false, color: '#00ffcc'
            };
            Object.assign(solidShape.userData, { type: this.activeTool, baseSize: finalRadius, height: finalRadius * 2, strokeData: networkData });

            if (window.drawnStrokes) window.drawnStrokes.push(networkData);
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'yeni_cizim', stroke: networkData });
        }
    },

    setTool: function (toolName) {
        if (!this.isInit) this.init();
        this.activeTool = toolName;
        // ğŸš¨ GÃœVENLÄ°K 4: AraÃ§ seÃ§ildiÄŸinde de konteynerÄ± zorla gÃ¶ster! (Senin notun)
        if (this.container) {
            this.container.style.display = 'block';
            this.container.classList.remove('hidden');
        }
    },

    deleteObjectAt: function (x, y) {
        if (!this.isInit || !this.scene) return false;
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        const hit = intersects.find(h => {
            const obj = h.object;
            let isHelper = false; let parent = obj.parent;
            while (parent) { if (parent === this.helperGroup) { isHelper = true; break; } parent = parent.parent; }
            return !isHelper && (obj.type === 'Mesh' || obj.type === 'Line' || obj.type === 'LineSegments');
        });
        if (hit) {
            let targetObj = hit.object;
            while (targetObj.parent && targetObj.parent !== this.scene) { targetObj = targetObj.parent; }
            if (this.scene.children.includes(targetObj)) {
                if (targetObj.userData && targetObj.userData.strokeData) {
                    if (window.drawnStrokes) {
                        window.drawnStrokes = window.drawnStrokes.filter(s => s.id !== targetObj.userData.strokeData.id);
                    }
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({ type: 'cizim_sil', strokeId: targetObj.userData.strokeData.id });
                    }
                }
                // SENÄ°N EKLENTÄ°N: Etiketi silme iÅŸlemi KORUNDU
                if (targetObj.userData.labelElement) targetObj.userData.labelElement.remove();
                this.scene.remove(targetObj);
                if (this.currentMesh === targetObj) this.currentMesh = null;
                this.updateHandlePositions();
                return true;
            }
        }
        return false;
    },

    handleEraser: function (pos) {
        if (this.deleteObjectAt(pos.x, pos.y)) {
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    },

    addShapeToScene: function (type, x, y) {
        if (!this.isInit) this.init();
        this.createSolidMesh(type, new THREE.Vector3(0, 0, 0), 2, true);
        console.log(type + " sahneye baÅŸarÄ±yla Ã§aÄŸrÄ±ldÄ±!");
    },

    // ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: PC'nin 3D Åekilleri Tabletinden AlÄ±p Ã‡izmesi Ä°Ã§in AÄŸ AlÄ±cÄ±sÄ±
    addShapeFromNetwork: function (strokeData) {
        if (!this.isInit) this.init();
        const isSphere = strokeData.shapeType === 'sphere';
        const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

        let solidShape = null;
        // ğŸš¨ KONÄ° Ã‡Ã–ZÃœMÃœ: AÄŸdan gelen koniyi de Ã¶zel motorla Ã§iz!
        if (strokeData.shapeType === 'pyramid_cone' && window.CustomConeEngine) {
            solidShape = window.CustomConeEngine.create(strokeData.width / 30, (strokeData.width / 30) * 2, mainMaterial, edgeMaterial);
        } else if (window.Foldable3D) {
            solidShape = window.Foldable3D.createFoldableGroup(strokeData.shapeType, strokeData.width / 30, mainMaterial, edgeMaterial);
        }
        if (!solidShape) {
            const geometry = this.createGeometry(strokeData.shapeType, strokeData.width / 30);
            if (strokeData.shapeType.startsWith('prism') || strokeData.shapeType.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
            solidShape = new THREE.Mesh(geometry, mainMaterial);
            solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
        }

        // ğŸš¨ Ã‡Ã–ZÃœM 1: 3D Åeklin yaratÄ±lÄ±ÅŸÄ±nda PC ekranÄ±na mÃ¼kemmel hizalanmasÄ±
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : window.innerWidth;
        const myCh = canvasElm ? canvasElm.height : window.innerHeight;
        
        const cx = strokeData.x + (strokeData.width / 2);
        const cy = strokeData.y + (strokeData.height / 2);
        
        const ndcX = (cx / myCw) * 2 - 1;
        const ndcY = -(cy / myCh) * 2 + 1;
        
        const vec = new THREE.Vector3(ndcX, ndcY, 0);
        vec.unproject(this.camera);
        solidShape.position.x = vec.x;
        solidShape.position.y = vec.y;
        solidShape.position.z = (strokeData.pos3D && strokeData.pos3D.z !== undefined) ? strokeData.pos3D.z : 0;

        // ğŸš¨ NÄ°HAÄ° Ã‡Ã–ZÃœM 1: Ä°lk yaratÄ±lÄ±ÅŸta Ã¶lÃ§eÄŸi 1'de sabit bÄ±rakÄ±yoruz. 
        // GerÃ§ek bÃ¼yÃ¼klÃ¼k redrawAllStrokes iÃ§inde hesaplanacak.
        solidShape.scale.setScalar(1);
        solidShape.userData.baseTabletWidth = strokeData.width;

        if (strokeData.rotationX !== undefined) solidShape.rotation.x = strokeData.rotationX;
        if (strokeData.rotationY !== undefined) solidShape.rotation.y = strokeData.rotationY;
        Object.assign(solidShape.userData, { type: strokeData.shapeType, baseSize: strokeData.width / 30, height: (strokeData.width / 30) * 2, strokeData: strokeData });
        this.scene.add(solidShape);
        if (typeof this.updateHandlePositions === 'function') this.updateHandlePositions();
    }
}; // --- GERÃ‡EK 3D UZAY MOTORU (Scene3D) BURADA BÄ°TÄ°YOR ---


// ==========================================
// 4. ARAYÃœZ VE MENÃœ MOTORU (Ã–zellik KaybÄ± Yok)
// ==========================================
window.addEventListener('load', () => {
    const polyBtn = document.getElementById('btn-cokgenler');
    if (polyBtn && !document.getElementById('btn-3d-menu')) {
        const btn3D = document.createElement('button'); btn3D.id = 'btn-3d-menu'; btn3D.className = 'tool-button'; btn3D.innerHTML = '3D Cisimler';
        polyBtn.parentNode.insertBefore(btn3D, polyBtn.nextSibling);

        const menu3D = document.createElement('div'); menu3D.id = 'options-3d-main'; menu3D.className = 'tool-options hidden';
        menu3D.style.cssText = `position: absolute; left: 100%; margin-left: 10px; z-index: 20; background-color: rgba(30, 30, 46, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menu3D.innerHTML = `<button class="tool-button-sub" data-3d="3d_kure">KÃ¼re</button><button class="tool-button-sub has-submenu" id="btn-prizmalar">Prizmalar ğŸ‘‰</button><button class="tool-button-sub has-submenu" id="btn-piramitler">Piramitler ğŸ‘‰</button>`;
        btn3D.parentNode.insertBefore(menu3D, btn3D.nextSibling);


        const menuPrizmalar = document.createElement('div'); menuPrizmalar.id = 'options-prizmalar'; menuPrizmalar.className = 'tool-options hidden';
        menuPrizmalar.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 0; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPrizmalar.innerHTML = `<button class="tool-button-sub" data-3d="3d_kup">KÃ¼p</button><button class="tool-button-sub" data-3d="3d_kare_prizma">Kare Prizma</button><button class="tool-button-sub" data-3d="3d_dikdortgen_prizma">DikdÃ¶rtgen Prizma</button><button class="tool-button-sub" data-3d="3d_ucgen_prizma">ÃœÃ§gen Prizma</button><button class="tool-button-sub" data-3d="3d_besgen_prizma">BeÅŸgen Prizma</button><button class="tool-button-sub" data-3d="3d_altigen_prizma">AltÄ±gen Prizma</button><button class="tool-button-sub" data-3d="3d_silindir">Silindir</button>`;
        menu3D.appendChild(menuPrizmalar);

        const menuPiramitler = document.createElement('div'); menuPiramitler.id = 'options-piramitler'; menuPiramitler.className = 'tool-options hidden';
        menuPiramitler.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 40px; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPiramitler.innerHTML = `<button class="tool-button-sub" data-3d="3d_koni">Koni</button><button class="tool-button-sub" data-3d="3d_ucgen_piramit">ÃœÃ§gen Piramit</button><button class="tool-button-sub" data-3d="3d_kare_piramit">Kare Piramit</button><button class="tool-button-sub" data-3d="3d_besgen_piramit">BeÅŸgen Piramit</button><button class="tool-button-sub" data-3d="3d_altigen_piramit">AltÄ±gen Piramit</button>`;
        menu3D.appendChild(menuPiramitler);

        btn3D.addEventListener('click', (e) => {
            e.stopPropagation(); document.querySelectorAll('.tool-options').forEach(m => { if (m !== menu3D && m !== menuPrizmalar && m !== menuPiramitler) { m.classList.add('hidden'); m.style.display = 'none'; } });
            if (menu3D.classList.contains('hidden')) {
                menu3D.classList.remove('hidden'); menu3D.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; menu3D.style.top = (btn3D.getBoundingClientRect().top - btn3D.parentElement.getBoundingClientRect().top) + 'px'; btn3D.classList.add('active');
            } else { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; btn3D.classList.remove('active'); }
        });

        document.getElementById('btn-prizmalar').addEventListener('mouseenter', () => { menuPrizmalar.classList.remove('hidden'); menuPrizmalar.style.display = 'flex'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; });
        document.getElementById('btn-piramitler').addEventListener('mouseenter', () => { menuPiramitler.classList.remove('hidden'); menuPiramitler.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; });

        document.querySelectorAll('#options-3d-main button[data-3d]').forEach(b => {
            b.addEventListener('click', (e) => {
                e.stopPropagation();
                const data3d = b.getAttribute('data-3d');

                if (typeof setActiveTool === 'function') setActiveTool('none');

                window.active3DShapeTool = 'draw_' + data3d;
                const btn3D = document.getElementById('btn-3d-menu');
                if (btn3D) btn3D.classList.add('active');
                const menu3D = document.getElementById('options-3d-main');
                if (menu3D) { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; }

                // 3D Motorunu UyandÄ±r ve AracÄ± Ver
                if (window.Scene3D) {
                    if (!window.Scene3D.isInit) window.Scene3D.init();
                    if (window.Scene3D.container) {
                        window.Scene3D.container.style.display = 'block';
                        window.Scene3D.container.style.zIndex = '9995';
                    }
                    let toolName = 'sphere';
                    if (data3d.includes('kure')) toolName = 'sphere';
                    else if (data3d.includes('kup')) toolName = 'prism_cube';
                    else if (data3d.includes('silindir')) toolName = 'prism_cylinder';
                    else if (data3d.includes('koni')) toolName = 'pyramid_cone';
                    else if (data3d.includes('kare_prizma')) toolName = 'prism_square';
                    else if (data3d.includes('dikdortgen_prizma')) toolName = 'prism_rect';
                    else if (data3d.includes('ucgen_prizma')) toolName = 'prism_3';
                    else if (data3d.includes('besgen_prizma')) toolName = 'prism_5';
                    else if (data3d.includes('altigen_prizma')) toolName = 'prism_6';
                    else if (data3d.includes('ucgen_piramit')) toolName = 'pyramid_3';
                    else if (data3d.includes('kare_piramit')) toolName = 'pyramid_4';
                    else if (data3d.includes('besgen_piramit')) toolName = 'pyramid_5';
                    else if (data3d.includes('altigen_piramit')) toolName = 'pyramid_6';
                    else toolName = 'prism_rect';

                    currentTool = 'draw_3d_' + toolName;
                    window.Scene3D.setTool(toolName);
                }
            });
        });
    }

    const uiMotor = () => {
        const slider = document.getElementById('slider-container');
        const info = document.getElementById('info-tooltip');

        let activeShape = null;
        // Åekil "TaÅŸÄ±" modunda seÃ§iliyken algÄ±la
        if (window.currentTool === 'move' && window.selectedItem && window.selectedItem.type === '3d_shape') {
            activeShape = window.selectedItem;
        } else if (!window.currentTool || window.currentTool === 'none' || window.currentTool.startsWith('draw_3d_')) {
            // "none" durumunda veya 3D Ã§izim aracÄ±ndayken son Ã§izilen 3D ÅŸekli otomatik sÃ¼rgÃ¼ye baÄŸla
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === '3d_shape') {
                        activeShape = window.drawnStrokes[i];
                        break;
                    }
                }
            }
        }

        if (activeShape) {
            window.active3DSliderStroke = activeShape;
            if (slider) {
                if (activeShape.shapeType === 'sphere') slider.style.display = 'none';
                else slider.style.display = 'flex';
            }
            if (info) {
                let isSelectedMove = (currentTool === 'move' && window.selectedItem === activeShape);
                if (isSelectedMove) {
                    info.style.display = 'block';
                } else {
                    info.style.display = 'none';
                }

                // ğŸš¨ PÄ°=3 ALINARAK ALAN/HACÄ°M HESAPLAYAN Ã–ZEL FORMÃœL MOTORU
                let formulMetni = "";
                let currentScale = activeShape.meshScale || 1;
                const r = ((activeShape.width * currentScale) / 30).toFixed(1);
                const h = (r * 2).toFixed(1);

                let r_val = parseFloat(r);
                let h_val = parseFloat(h);

                // FormÃ¼ller HTML destekli renkli ve kalÄ±n yazÄ±larla ÅŸekillendiriliyor
                if (activeShape.shapeType === 'sphere') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">KÃ¼re</span><br>r = ${r} cm<br><span style="color:#ff00ff">Hacim = (4/3)Â·Ï€Â·rÂ³</span><br>= (4/3)Â·3Â·(${r})Â³ = <b>${(4 * r_val * r_val * r_val).toFixed(1)} cmÂ³</b><br><span style="color:#ff00ff">Alan = 4Â·Ï€Â·rÂ²</span><br>= 4Â·3Â·(${r})Â² = <b>${(12 * r_val * r_val).toFixed(1)} cmÂ²</b>`;
                } else if (activeShape.shapeType === 'prism_cube') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">KÃ¼p</span><br>a = ${r} cm<br><span style="color:#ff00ff">Hacim = aÂ³</span><br>= (${r})Â³ = <b>${(r_val * r_val * r_val).toFixed(1)} cmÂ³</b><br><span style="color:#ff00ff">Alan = 6Â·aÂ²</span><br>= 6Â·(${r})Â² = <b>${(6 * r_val * r_val).toFixed(1)} cmÂ²</b>`;
                } else if (activeShape.shapeType === 'prism_cylinder') {
                    let tabanAlani = 3 * r_val * r_val;
                    let yanalAlan = 2 * 3 * r_val * h_val;
                    let toplamAlan = 2 * tabanAlani + yanalAlan;
                    let hacim = tabanAlani * h_val;
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Silindir</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Taban AlanÄ± = Ï€Â·rÂ²</span><br>= 3Â·(${r})Â² = <b>${tabanAlani.toFixed(1)} cmÂ²</b><br><span style="color:#ff00ff">Yanal Alan = 2Â·Ï€Â·rÂ·h</span><br>= 2Â·3Â·${r}Â·${h} = <b>${yanalAlan.toFixed(1)} cmÂ²</b><br><span style="color:#ff00ff">Toplam Alan = 2Â·(Taban AlanÄ±) + Yanal Alan</span><br>= 2Â·${tabanAlani.toFixed(1)} + ${yanalAlan.toFixed(1)} = <b>${toplamAlan.toFixed(1)} cmÂ²</b><br><span style="color:#ff00ff">Hacim = Ï€Â·rÂ²Â·h</span><br>= 3Â·(${r})Â²Â·${h} = <b>${hacim.toFixed(1)} cmÂ³</b>`;
                } else if (activeShape.shapeType === 'pyramid_cone') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Koni</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = (Ï€Â·rÂ²Â·h)/3</span><br>= (3Â·(${r})Â²Â·${h})/3 = <b>${(r_val * r_val * h_val).toFixed(1)} cmÂ³</b>`;
                } else if (activeShape.shapeType === 'prism_rect') {
                    let a = (r_val * 1.5).toFixed(1);
                    let b = r;
                    let taban = (a * b).toFixed(1);
                    let yanal = (2 * (parseFloat(a) + parseFloat(b)) * h_val).toFixed(1);
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">DikdÃ¶rtgenler PrizmasÄ±</span><br>a = ${a} cm, b = ${b} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = aÂ·bÂ·h</span><br>= ${a}Â·${b}Â·${h} = <b>${(taban * h_val).toFixed(1)} cmÂ³</b><br><span style="color:#ff00ff">Alan = 2Â·(aÂ·b) + Yanal Alan</span><br>= 2Â·${taban} + ${yanal} = <b>${(2 * taban + parseFloat(yanal)).toFixed(1)} cmÂ²</b>`;
                } else if (activeShape.shapeType.startsWith('prism_') || activeShape.shapeType.startsWith('pyramid_')) {
                    let isPrism = activeShape.shapeType.startsWith('prism_');
                    let sides = parseInt(activeShape.shapeType.split('_')[1]);

                    let a_val = (2 * r_val * Math.sin(Math.PI / sides)).toFixed(1); // Kenar uzunluÄŸu
                    let apothem = (r_val * Math.cos(Math.PI / sides)).toFixed(1); // Merkeze uzaklÄ±k
                    let tabanAlani = (sides * a_val * apothem / 2).toFixed(1);
                    let cevre = (sides * a_val).toFixed(1);

                    let sekilAdi = sides === 3 ? "ÃœÃ§gen" : sides === 5 ? "BeÅŸgen" : sides === 6 ? "AltÄ±gen" : sides + "gen";
                    let anaBaslik = isPrism ? `${sekilAdi} Prizma` : `${sekilAdi} Piramit`;

                    let sonucHacim = isPrism ? (tabanAlani * h_val).toFixed(1) : (tabanAlani * h_val / 3).toFixed(1);
                    let hacimFormulStr = isPrism ? "Taban AlanÄ± Â· h" : "(Taban AlanÄ± Â· h) / 3";
                    let hacimDegerStr = isPrism ? `${tabanAlani} Â· ${h}` : `(${tabanAlani} Â· ${h}) / 3`;

                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">${anaBaslik}</span><br>Taban AyrÄ±tÄ± (a) â‰ˆ ${a_val} cm, YÃ¼kseklik (h) â‰ˆ ${h} cm<br><span style="color:#ff00ff">Taban AlanÄ± â‰ˆ ${tabanAlani} cmÂ²</span><br><span style="color:#ff00ff">Hacim = ${hacimFormulStr}</span><br>= ${hacimDegerStr} = <b>${sonucHacim} cmÂ³</b>`;

                    if (isPrism) {
                        let yanalAlan = (cevre * h_val).toFixed(1);
                        formulMetni += `<br><span style="color:#ff00ff">Yanal Alan = Ã‡evre Â· h</span><br>= ${cevre} Â· ${h} = <b>${yanalAlan} cmÂ²</b>`;
                    }
                }

                info.innerHTML = formulMetni;

                // Åeklin saÄŸÄ±nda pozisyonlama
                const marginX = 20;
                let posX = activeShape.x + activeShape.width + marginX;
                let posY = activeShape.y;

                // EkranÄ±n saÄŸÄ±na taÅŸÄ±yorsa sola al
                if (posX + 250 > window.innerWidth) {
                    posX = activeShape.x - 250 - marginX;
                }

                info.style.left = posX + "px";
                info.style.top = posY + "px";
                info.style.bottom = "auto";
                info.style.transform = "none";
                // Panel tasarÄ±mÄ± artÄ±k tamamen style.css dosyasÄ±ndaki #info-tooltip id'si ile yÃ¶netiliyor.
            }
            const sInput = document.getElementById('shape-slider');
            if (sInput && document.activeElement !== sInput) sInput.value = (activeShape.openRatio || 0) * 100;
        } else {
            if (slider) slider.style.display = 'none';
            if (info) info.style.display = 'none';
            window.active3DSliderStroke = null;
        }

        if (activeShape !== window._lastActive3DShape) {
            window._lastActive3DShape = activeShape;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
        requestAnimationFrame(uiMotor);
    };

    // YUKARIDAKÄ° EKSÄ°K OLAN KAPANIÅ PARANTEZLERÄ° BURADA!
    requestAnimationFrame(uiMotor);
});

// AÃ‡ILIÅTA Ã‡Ä°ZGÄ° MENÃœSÃœNÃœ ZORLA KAPAT

// AÃ‡ILIÅTA Ã‡Ä°ZGÄ° MENÃœSÃœNÃœ ZORLA KAPAT
window.addEventListener('load', () => {
    const lineOptions = document.getElementById('line-options') || document.querySelector('.line-options');
    if (lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }
});

// =========================================================
// FÄ°ZÄ°KSEL ARAÃ‡LAR Ä°Ã‡Ä°N RADAR VE Ã–NÄ°ZLEME MOTORU
// =========================================================
let sonAracDurumlari = {};

window.araclariAgaGonder = function () {
    if (typeof isConnected === 'undefined' || !isConnected) return;

    const gelismisAraclar = [
        { id: 'ruler', obj: window.RulerTool, selector: '.ruler-container' },
        { id: 'gonye', obj: window.GonyeTool, selector: '.gonye-container' },
        { id: 'aciolcer', obj: window.AciolcerTool, selector: '.aciolcer-container' },
        { id: 'pergel', obj: window.PergelTool, selector: '#compass-container' }
    ];

    gelismisAraclar.forEach(arac => {
        if (arac.obj && arac.obj.state) {
            try {
                const el = document.querySelector(arac.selector);
                let isVisible = 'none';
                let elW = '', elH = '';

                if (el) {
                    isVisible = (el.style.display !== 'none' && !el.classList.contains('hidden')) ? 'block' : 'none';
                    elW = el.style.width;
                    elH = el.style.height;
                }

                // AraÃ§larÄ±n durumunu, dÃ¶nÃ¼ÅŸ aÃ§Ä±sÄ±nÄ± ve boyutunu tek metinde birleÅŸtirip deÄŸiÅŸiklik var mÄ± bakÄ±yoruz
                const durum = isVisible + JSON.stringify(arac.obj.state) + elW + elH;

                if (sonAracDurumlari[arac.id] !== durum) {
                    sonAracDurumlari[arac.id] = durum;

                    // EÄŸer veri henÃ¼z aÄŸdan geldiyse (son 500ms), geri yansÄ±tÄ±p yankÄ± yapmasÄ±nÄ± engelle!
                    if (arac.obj.lastNetworkReceiveTime && (Date.now() - arac.obj.lastNetworkReceiveTime) < 500) {
                        return;
                    }

                    // DeÄŸiÅŸiklik varsa PC'ye anÄ±nda gÃ¶nder
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({
                            type: 'arac_state_senkron',
                            arac: arac.id,
                            display: isVisible,
                            state: arac.obj.state,
                            width: elW,
                            height: elH
                        });
                    }
                }
            } catch (err) { }
        }
    });
};

// RadarÄ± saniyede 10 kez Ã§alÄ±ÅŸtÄ±r (GÃ¶rÃ¼nÃ¼m senkronizasyonu iÃ§in)
setInterval(window.araclariAgaGonder, 100);

// DIÅ DOSYALAR (cetvel.js, pergel.js) Ä°Ã‡Ä°N CANLI Ã–NÄ°ZLEME YAYINCISI
window.broadcastPreview = function (toolType, stateData) {
    if (typeof window.sendNetworkData === 'function' && window.isConnected) {
        window.sendNetworkData({ type: 'aktif_onizleme', arac: toolType, payload: stateData });
    }
};

// ğŸš¨ KESÄ°N Ã‡Ã–ZÃœM: 3D ÅEKÄ°LLERÄ° Ã‡Ä°ZÄ°MÄ°N ALTINA ALIRKEN BUTONLARI KORUMA ZIRHI
const canvasKatmanZirhi = document.createElement('style');
canvasKatmanZirhi.innerHTML = `
    /* ğŸš¨ Arka plan kanvasÄ±nÄ± en alta al (Sayfa PDF'leri araÃ§larÄ±n Ã¼stÃ¼nÃ¼ Ã¶rtemez) */
    #bg-canvas { position: absolute !important; z-index: 5 !important; top: 0; left: 0; pointer-events: none; }

    /* Ã‡izim tahtasÄ±nÄ± 3D cisimlerin Ã¼stÃ¼ne Ã§Ä±karÄ±yoruz */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 3D uzay sahnesi bg-canvas'Ä±n Ã¼stÃ¼nde (10), Ã§izimlerin altÄ±nda (50) kalmalÄ± */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; }
    
    /* ğŸ”´ BUTONLARIN VE FÄ°ZÄ°KSEL ARAÃ‡LARIN GERÄ° GELMESÄ°NÄ° SAÄLAYAN EN ÃœST KATMAN KORUMASI ğŸ”´ */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options, 
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options, 
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip,
    .ruler-container, .gonye-container, .aciolcer-container, #compass-container { 
        z-index: 10000 !important; 
    }
`;
document.head.appendChild(canvasKatmanZirhi);


// ==========================================
// --- TONY STARK MODU (Ä°LERÄ° DÃœZEY GESTURES) ---
// ==========================================
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

const tonyBtn = document.createElement('button');
tonyBtn.className = 'tool-button';
tonyBtn.style.position = 'static';
tonyBtn.style.transform = 'none';
tonyBtn.style.width = '100%';
tonyBtn.style.marginTop = '10px';
tonyBtn.style.padding = '10px 0';
tonyBtn.style.fontSize = '12px';
tonyBtn.style.borderRadius = '10px';
tonyBtn.style.backgroundColor = 'rgba(0, 150, 255, 0.2)';
tonyBtn.style.border = '2px solid #0096ff';
tonyBtn.style.color = '#fff';
tonyBtn.style.cursor = 'pointer';
tonyBtn.style.fontWeight = 'bold';
tonyBtn.innerHTML = 'ğŸ–ï¸ Sihirli El';

const oyunlarBtn = document.getElementById('btn-oyunlar');
if (oyunlarBtn && oyunlarBtn.parentNode) {
    oyunlarBtn.parentNode.appendChild(tonyBtn);
} else {
    document.body.appendChild(tonyBtn);
}

// Lazer Ä°mleci
const laserCursor = document.createElement('div');
laserCursor.style.position = 'absolute';
laserCursor.style.width = '20px';
laserCursor.style.height = '20px';
laserCursor.style.borderRadius = '50%';
laserCursor.style.backgroundColor = '#00ffff'; // Iron Man Blue
laserCursor.style.boxShadow = '0 0 15px 5px rgba(0, 255, 255, 0.8)';
laserCursor.style.pointerEvents = 'none';
laserCursor.style.transition = 'left 0.1s ease-out, top 0.1s ease-out, background-color 0.2s';
laserCursor.style.willChange = 'left, top';
laserCursor.style.zIndex = '999999';
laserCursor.style.display = 'none';
laserCursor.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(laserCursor);

let tonyActive = false;
let camera = null;
let hands = null;

function calculateDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

    tonyBtn.onclick = async () => {
        if (tonyActive) {
            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) {
                // Kamera donanim isigini ve kaydini TAMAMEN kapatmak icin MediaStream tracklerini durdurmaliyiz!
                if (vid.srcObject) {
                    vid.srcObject.getTracks().forEach(track => track.stop());
                }
                vid.remove();
            }
            tonyActive = false;
            laserCursor.style.display = 'none';
            tonyBtn.innerHTML = 'ğŸ¤– Sihirli El';
            tonyBtn.style.borderColor = '#0096ff';
            tonyBtn.style.boxShadow = 'none';
            return;
        }

        tonyBtn.innerHTML = 'â³ (KVKK)';
        tonyBtn.style.borderColor = '#ffff00';
        tonyBtn.style.boxShadow = '0 0 10px rgba(255,255,0,0.5)';

        try {
            // Scripts artik index.html icinde erkenden yukleniyor.

            const videoElement = document.createElement('video');
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('muted', '');
            videoElement.id = 'tony-video-elem';
            videoElement.style.position = 'fixed'; 
            videoElement.style.opacity = '0.001'; videoElement.setAttribute('webkit-playsinline', 'true'); 
            videoElement.style.transform = 'scaleX(-1)';
            videoElement.style.width = '100%'; 
            videoElement.style.height = '100%'; 
            videoElement.style.zIndex = '-9999'; 
            videoElement.style.top = '0'; 
            videoElement.style.left = '0'; 
            videoElement.style.pointerEvents = 'none'; 
            videoElement.muted = true;
            document.body.appendChild(videoElement);

            hands = new window.Hands({
                locateFile: (file) => 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/' + file
            });

            hands.setOptions({
                maxNumHands: 2, 
                modelComplexity: 1, // 1 yapildi, uzaktan daha iyi algilamasi icin
                minDetectionConfidence: 0.3,
                minTrackingConfidence: 0.3
            });

            let startX = 0, startY = 0;
            let startScaleDistance = 0, startScale = 1;
            let startOpenDistance = 0, startOpenRatio = 0;
            window.lastAISendTime = 0;

            hands.onResults((results) => {

                tonyBtn.innerHTML = 'AI Aktif';
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    tonyBtn.innerHTML = 'El GÃ¶rÃ¼ndÃ¼!';
                    const isTwoHands = results.multiHandLandmarks.length === 2;
                    const hand1 = results.multiHandLandmarks[0];
                    
                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.25; // 0.25 EMA Yumusatma Filtresi (Titremeyi yutar)
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.25;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';
                    
                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const handScale1 = calculateDistance(hand1[0], hand1[9]) || 0.001; // Elin ekrandaki boyutu (Bilek - Orta Parmak Koku)
                    // Gercek bir yumrukta parmak uclari koklere cok yaklasir (el boyutunun yarisi kadar veya daha az)
                    const isFist1 = (calculateDistance(hand1[8], hand1[5]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[12], hand1[9]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[16], hand1[13]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[20], hand1[17]) / handScale1) < 0.6;
                    const dynamicPinch1 = (handScale1 > 0.12) ? 0.30 : 0.45;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < dynamicPinch1); 

                    if (window.Scene3D) {
                        let mesh = window.Scene3D.currentMesh;
                        if (!mesh && window.Scene3D.scene) {
                            mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userData && m.userData.strokeData);
                        }
                        if (mesh) {
                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const handScale2 = calculateDistance(hand2[0], hand2[9]) || 0.001;
                                const isFist2 = (calculateDistance(hand2[8], hand2[5]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[12], hand2[9]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[16], hand2[13]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[20], hand2[17]) / handScale2) < 0.6;
                                const dynamicPinch2 = (handScale2 > 0.12) ? 0.30 : 0.45;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < dynamicPinch2);
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                // Hata onleme: Iki el birbirinden en az %15 uzak olmali (yanlis algilamalari onler)
                                if (handsDistance > 0.15) {
                                    if (!isPinched1 && !isPinched2) {
                                        laserCursor.style.backgroundColor = "#ff00ff"; 
                                        if (startScaleDistance === 0) {
                                            startScaleDistance = handsDistance;
                                            startScale = mesh.scale.x;
                                        } else {
                                            const distDiff = handsDistance - startScaleDistance;
                                            // Pruzsuz dogrusal buyutme (Sicramalari tamamen onler)
                                            let newScale = startScale + (distDiff * 4);
                                            // Cizim alanindan tasmamasi icin maksimum 3.5 siniri
                                            newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                            
                                            // Lerp ile gecisleri yag gibi kaydir
                                            mesh.scale.x += (newScale - mesh.scale.x) * 0.3;
                                            mesh.scale.setScalar(mesh.scale.x);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = mesh.scale.x;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }
                                        }
                                        startOpenDistance = 0; 
                                    } 
                                    else if (isPinched1 && isPinched2) {
                                        laserCursor.style.backgroundColor = "#ffff00"; 
                                        if (startOpenDistance === 0) {
                                            startOpenDistance = handsDistance;
                                            startOpenRatio = mesh.userData.strokeData?.openRatio || 0;
                                        } else {
                                            const distDiff = handsDistance - startOpenDistance;
                                            
                                            // ASIMETRIK CARPAN: Kapatmak (distDiff < 0) fiziksel olarak daha dar bir alanda
                                            // yapildigi icin kapatma ivmesini 2.5 yapiyoruz. Acmak 1.5 kaliyor.
                                            // ASIMETRIK CARPAN: Hizli acilip kapanmasi icin carpanlar artirildi
                                            let multiplier = distDiff < 0 ? 5.5 : 4.0;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Daha kolay kapanmasi icin sinirlar genisletildi
                                            if (newRatio > 0.85) newRatio = 1.0;
                                            if (newRatio < 0.18) newRatio = 0.0;
                                            
                                            const sInput = document.getElementById("shape-slider");
                                            if(sInput) sInput.value = newRatio * 100;
                                            
                                            // Lerp animasyonu icin update fonksiyonlari Scene3D.animate'e birakildi
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.openRatio = newRatio;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                        startScaleDistance = 0; 
                                    }
                                    else {
                                        startScaleDistance = 0;
                                        startOpenDistance = 0;
                                    }
                                }
                                startX = 0; 
                            } 
                            else {
                                startScaleDistance = 0;
                                startOpenDistance = 0;

                                const isFist = isFist1;

                                if (isFist) {
                                    laserCursor.style.backgroundColor = '#ff0000'; 
                                    const fistX = (1 - hand1[9].x) * window.innerWidth;
                                    const fistY = hand1[9].y * window.innerHeight;
                                    
                                    if (!window.Scene3D.isDraggingAI) {
                                        window.Scene3D.isDraggingAI = true;
                                        if (!window.Scene3D.dragOffset) window.Scene3D.dragOffset = new THREE.Vector3();
                                        window.Scene3D.dragPlane.setFromNormalAndCoplanarPoint(window.Scene3D.camera.getWorldDirection(new THREE.Vector3()), mesh.position);
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            window.Scene3D.dragOffset.subVectors(mesh.position, intersectPoint);
                                        }
                                    } else {
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            const targetPos = new THREE.Vector3().addVectors(intersectPoint, window.Scene3D.dragOffset);
                                            
                                            // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                                            targetPos.x = Math.max(-30, Math.min(30, targetPos.x));
                                            targetPos.y = Math.max(-30, Math.min(30, targetPos.y));
                                            targetPos.z = Math.max(-30, Math.min(30, targetPos.z));

                                            if (!mesh.userData.targetPosition) mesh.userData.targetPosition = mesh.position.clone();
                                            mesh.userData.targetPosition.copy(targetPos);
                                            
                                            const vec = targetPos.clone();
                                            vec.project(window.Scene3D.camera);
                                            const canvasEl = document.getElementById('drawing-canvas');
                                            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
                                            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.x = (vec.x * w) + w;
                                                mesh.userData.strokeData.y = -(vec.y * h) + h;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                    }
                                } else if (isPinched1) {
                                    window.Scene3D.isDraggingAI = false;
                                    laserCursor.style.backgroundColor = '#00ff00'; 
                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;
                                        
                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Sadece gercek hareketlerde don!

                                        // Gimbal Lock Fix + Trackball (Dunya Maketi) Eksen Donusumu
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        if (!mesh.userData.targetQuaternion) {
                                            mesh.userData.targetQuaternion = mesh.quaternion.clone();
                                        }
                                        const dummy = new THREE.Object3D();
                                        dummy.quaternion.copy(mesh.userData.targetQuaternion);
                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (YeÅŸil butonla ayni yapildi)
                                        mesh.userData.targetQuaternion.copy(dummy.quaternion);

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            const euler = new THREE.Euler().setFromQuaternion(mesh.userData.targetQuaternion, 'XYZ');
                                            sd.rotationX = euler.x;
                                            sd.rotationY = euler.y;
                                            sd.rotationZ = euler.z;
                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        } // Deadzone sonu
                                    }
                                    startX = px1;
                                    startY = py1;
                                } else {
                                    laserCursor.style.backgroundColor = '#00ffff'; 
                                    window.Scene3D.isDraggingAI = false;
                                    startX = 0;
                                    startY = 0;
                                }
                            }
                        }
                    }
                } else {
                    startX = 0; startY = 0;
                    startScaleDistance = 0; startOpenDistance = 0;
                    laserCursor.style.display = 'none';
                }
            });

            // YENI: Genis Acili 1080p Ozel Kamera (Dinamik Adaptasyon Modu)
            camera = {
                stream: null,
                isRunning: false,
                start: async function() {
                    try {
                        this.stream = await navigator.mediaDevices.getUserMedia({
                            video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' }
                        });
                        videoElement.srcObject = this.stream;
                        await videoElement.play();
                        this.isRunning = true;
                        window.isSniperModeActive = false;
                        
                        const processFrame = async () => {
                            if (!this.isRunning) return;
                            if (videoElement.readyState >= 2) {
                                // Dogrudan video elementini gonder (Kirpma YOK, Zoom YOK)
                                await hands.send({image: videoElement});
                            }
                            requestAnimationFrame(processFrame);
                        };
                        processFrame();
                    } catch(e) {
                        console.error('Kamera baslatilamadi', e);
                    }
                },
                stop: function() {
                    this.isRunning = false;
                    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
                }
            };
            camera.start();

            tonyBtn.innerHTML = 'ğŸ¤– Sihirli El';
            tonyBtn.style.borderColor = '#00ff00';
            tonyBtn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8)';
            tonyBtn.style.color = '#00ff00';
            tonyActive = true;

        } catch (e) {
            console.error('Tony Stark Modu HatasÄ±:', e);
            tonyBtn.innerHTML = 'âŒ Hata';
            tonyBtn.style.borderColor = '#ff0000';
            tonyBtn.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
            tonyBtn.style.color = '#ff0000';
        }
    };

// ==========================================


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

