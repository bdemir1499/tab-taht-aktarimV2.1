const fs = require("fs");
let appJs = fs.readFileSync("app.js", "utf8");

// 1. Koordinat duzeltmesini kaldir
const resTarget = `    // KESKIN NISANCI (SNIPER) KOORDINAT DUZELTMESI
    if (window.isSniperModeActive && results.multiHandLandmarks) {
        for (const hand of results.multiHandLandmarks) {
            for (const lm of hand) {
                lm.x = (lm.x * 0.6) + 0.2;
                lm.y = (lm.y * 0.6) + 0.2;
            }
        }
    }`;
appJs = appJs.replace(resTarget, "");

// 2. Dinamik Matematik (Pinch 1)
const pinch1Target = `const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < 0.45); // Hassasiyet artirildi`;
const pinch1Replace = `const dynamicPinch1 = (handScale1 > 0.12) ? 0.30 : 0.45;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < dynamicPinch1);`;
appJs = appJs.replace(pinch1Target, pinch1Replace);

// 3. Dinamik Matematik (Pinch 2)
const pinch2Target = `const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < 0.45);`;
const pinch2Replace = `const dynamicPinch2 = (handScale2 > 0.12) ? 0.30 : 0.45;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < dynamicPinch2);`;
appJs = appJs.replace(pinch2Target, pinch2Replace);

// 4. Kamerayi temiz 1080p yap (Zoom ve Crop IPTAL)
const camTarget = `// 4LU UZUN MENZIL KOMBO (1080p + PTZ Zoom + Canvas Crop)
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

const camReplace = `// YENI: Genis Acili 1080p Ozel Kamera (Dinamik Adaptasyon Modu)
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
            camera.start();`;

appJs = appJs.replace(camTarget, camReplace);

fs.writeFileSync("app.js", appJs, "utf8");
console.log("Success: Smart Dynamic Adaptation applied.");
