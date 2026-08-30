const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// 1. Confidence (Ozgüven) düsürme
const confTarget = `minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5`;
const confReplace = `minDetectionConfidence: 0.3,
                minTrackingConfidence: 0.3`;
appJs = appJs.replace(confTarget, confReplace);

// 2. onResults icinde koordinat duzeltmesi (Keskin Nisanci Modu icin)
const resTarget = `hands.onResults((results) => {`;
const resReplace = `hands.onResults((results) => {
    // KESKIN NISANCI (SNIPER) KOORDINAT DUZELTMESI
    if (window.isSniperModeActive && results.multiHandLandmarks) {
        for (const hand of results.multiHandLandmarks) {
            for (const lm of hand) {
                lm.x = (lm.x * 0.6) + 0.2;
                lm.y = (lm.y * 0.6) + 0.2;
            }
        }
    }`;
appJs = appJs.replace(resTarget, resReplace);

// 3. Ozel Kamera Motoru
const camTarget = `camera = new window.Camera(videoElement, {
                onFrame: async () => {
                    await hands.send({image: videoElement});
                },
                width: 640,
                height: 480,
                facingMode: 'user'
            });

            camera.start();`;

const camReplace = `// 4LU UZUN MENZIL KOMBO (1080p + PTZ Zoom + Canvas Crop)
            camera = {
                stream: null,
                isRunning: false,
                start: async function() {
                    try {
                        this.stream = await navigator.mediaDevices.getUserMedia({
                            video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' }
                        });
                        videoElement.srcObject = this.stream;
                        
                        // PTZ Zoom Hack
                        const [track] = this.stream.getVideoTracks();
                        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
                        if (capabilities.zoom) {
                            try {
                                const zoomVal = Math.min(capabilities.zoom.max, capabilities.zoom.min + (capabilities.zoom.max - capabilities.zoom.min) * 0.5);
                                await track.applyConstraints({ advanced: [{ zoom: zoomVal }] });
                            } catch(e){}
                        }

                        await videoElement.play();
                        this.isRunning = true;
                        window.isSniperModeActive = true;
                        
                        if (!window.sniperCanvas) {
                            window.sniperCanvas = document.createElement('canvas');
                            window.sniperCtx = window.sniperCanvas.getContext('2d', { willReadFrequently: true });
                        }

                        const processFrame = async () => {
                            if (!this.isRunning) return;
                            if (videoElement.readyState >= 2) {
                                const vw = videoElement.videoWidth || 640;
                                const vh = videoElement.videoHeight || 480;
                                const cw = vw * 0.6;
                                const ch = vh * 0.6;
                                const cx = vw * 0.2;
                                const cy = vh * 0.2;
                                
                                window.sniperCanvas.width = cw;
                                window.sniperCanvas.height = ch;
                                window.sniperCtx.drawImage(videoElement, cx, cy, cw, ch, 0, 0, cw, ch);
                                
                                await hands.send({image: window.sniperCanvas});
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
            camera.start();`;

appJs = appJs.replace(camTarget, camReplace);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("Success: Sniper Mode and Camera patches applied.");
