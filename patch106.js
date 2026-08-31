const fs = require("fs");
let js = fs.readFileSync("app.js", "utf8");

// 1. GONDERICI KISMINI GUNCELLE
const senderOld1 = `            let i = 0;
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            function paketGonder() {
                if (!myConnection || (!myConnection.open && !window.isConnected)) return;
                if (myConnection.dataChannel && myConnection.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonder, 50); return; }
                if (i < dataString.length) {
                    myConnection.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), isLast: (i + CHUNK_SIZE >= dataString.length) });
                    i += CHUNK_SIZE; setTimeout(paketGonder, 5);
                }
            }`;

const senderNew1 = `            let i = 0; let chunkIndex = 0;
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
            function paketGonder() {
                if (!myConnection || (!myConnection.open && !window.isConnected)) return;
                if (myConnection.dataChannel && myConnection.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonder, 50); return; }
                if (i < dataString.length) {
                    myConnection.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                    i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonder, 5);
                }
            }`;

const senderOld2 = `                    let i = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.dataChannel && conn.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonderTahta, 50); return; }
                        if (i < dataString.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), isLast: (i + CHUNK_SIZE >= dataString.length) });
                            i += CHUNK_SIZE; setTimeout(paketGonderTahta, 5);
                        }
                    }`;

const senderNew2 = `                    let i = 0; let chunkIndex = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
                    function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.dataChannel && conn.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonderTahta, 50); return; }
                        if (i < dataString.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                            i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonderTahta, 5);
                        }
                    }`;

// 2. ALICI KISMINI GUNCELLE
const receiverOld = `        if (data && data.type === 'chunk') {
            const id = data.msgId || 'genel';
            if (!window.chunkBuffers[id]) window.chunkBuffers[id] = "";
            window.chunkBuffers[id] += data.data;
            if (data.isLast) {
                try { veriyiIsle(JSON.parse(window.chunkBuffers[id])); } catch (e) { }
                delete window.chunkBuffers[id];
            }
            return;
        }`;

const receiverNew = `        if (data && data.type === 'chunk') {
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
        }`;

let p1 = false, p2 = false, p3 = false;

if (js.includes(senderOld1)) { js = js.replace(senderOld1, senderNew1); p1 = true; }
if (js.includes(senderOld2)) { js = js.replace(senderOld2, senderNew2); p2 = true; }
if (js.includes(receiverOld)) { js = js.replace(receiverOld, receiverNew); p3 = true; }

if (p1 && p2 && p3) {
    fs.writeFileSync("app.js", js, "utf8");
    console.log("Chunk reassembly logic patched.");
} else {
    console.log(`Failed. p1:${p1} p2:${p2} p3:${p3}`);
}
