# Scroll-Driven Frame Animation — Combined Prompt & Best Practices

Apple tarzı, scroll ile kontrol edilen ürün animasyonları oluşturmak için rehber.
Canvas üzerinde image sequence kullanarak yapılır. Apple'ın AirPods, MacBook ve iPhone ürün sayfalarında kullanılan tekniğin aynısıdır.

---

## Pipeline

```
Video (MP4) → FFMPEG → Image Sequence (WebP) → Canvas + Scroll Logic
```

---

## 1. FFMPEG ile Video'dan Frame Çıkarma

Render edilmiş bir videodan (3D animasyon, ekran kaydı vb.) frame'leri çıkar:

```bash
ffmpeg -i animation.mp4 -vf "fps=30" frames/frame-%04d.webp
```

- Frame sayısını pürüzsüzlük vs toplam dosya boyutuna göre seç
- 120–200 frame çoğu scroll bölümü için ideal
- FPS düşürerek veya videoyu keserek daha da azaltabilirsin

---

## 2. Frame'leri Preload Et

Tüm frame'leri scroll başlamadan ÖNCE yükle. Lazy loading KULLANMA — scroll sırasında gecikme oluşturur:

```js
const frames = [];
const totalFrames = 150;

function preloadFrames() {
  return new Promise((resolve) => {
    let loaded = 0;
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `frames/frame-${String(i+1).padStart(4, '0')}.webp`;
      img.onload = () => {
        loaded++;
        if (loaded === totalFrames) resolve();
      };
      frames[i] = img;
    }
  });
}
```

---

## 3. Canvas Üzerinde Render Et, Video Element KULLANMA

`<canvas>` ile pre-loaded `Image` nesneleri kullan:

```js
const canvas = document.getElementById('frame-canvas');
const ctx = canvas.getContext('2d');

// Frame çizmek aslında bir GPU blit — neredeyse anında
ctx.drawImage(frames[currentFrame], 0, 0, width, height);
```

Video elementi KULLANMAMA nedenleri:
- `video.currentTime` seek'i güvenilmez ve frame-accurate değil
- Tarayıcılar video frame'lerini agresif şekilde decode/drop eder
- Canvas blit'i çok daha hızlı ve tahmin edilebilir

---

## 4. Scroll Pozisyonunu Frame Index'e Map Et (GSAP ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: '#animation-section',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 0.5,  // 0.5s smooth catch-up
  onUpdate: (self) => {
    const frameIndex = Math.floor(self.progress * (totalFrames - 1));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
  }
});
```

---

## 5. Layout Yapısı (Keystone Tarzı)

```
┌─────────────────────────────┐
│         HERO SECTION        │  ← 100vh, fade on scroll
├─────────────────────────────┤
│                             │
│   ANIMATION SECTION         │  ← 500-700vh tall
│   ┌───────────────────┐     │
│   │  STICKY CANVAS    │     │  ← position: sticky; top: 0
│   │  (100vh viewport) │     │
│   └───────────────────┘     │
│                             │
│   ┌──────┐                  │  ← Info cards: position: fixed
│   │CARD 1│        ┌──────┐  │    opacity animated by scroll %
│   └──────┘        │CARD 2│  │    alternating left/right
│                   └──────┘  │
│   ┌──────┐                  │
│   │CARD 3│        ┌──────┐  │
│   └──────┘        │CARD 4│  │
│                   └──────┘  │
├─────────────────────────────┤
│       FOOTER / CTA          │  ← 100vh
└─────────────────────────────┘
```

---

## 6. Card Animasyonu Zamanlama

Her card belirli bir scroll aralığında görünür:

```
Scroll Progress:  0% ──────────────────────── 100%
Card 1:           |████|
Card 2:                  |████|
Card 3:                          |████|
Card 4:                                  |████|
```

Card geçişleri:
- Fade in + translateY(30px → 0) → %3 scroll mesafesi
- Visible (tam opacity) → %15-18 scroll mesafesi
- Fade out + translateY(0 → -20px) → %3 scroll mesafesi

---

## 7. Cover Mode Canvas Rendering

Frame'leri viewport'a sığdırırken aspect ratio koru:

```js
function drawFrame(index) {
  const img = frames[index];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cover mode: en boy oranını koruyarak viewport'u doldur
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (canvas.width - w) / 2;
  const y = (canvas.height - h) / 2;

  ctx.drawImage(img, x, y, w, h);
}
```

---

## 8. Performance İpuçları

- **WebP formatı kullan** — PNG'den %50-70 daha küçük, aynı kalite
- **Frame boyutunu optimize et** — 1920x1080 çoğu ekran için yeterli
- **requestAnimationFrame** ile render — GSAP bunu otomatik yapar
- **`scrub: 0.5`** kullan — anlık değil, yumuşak geçiş sağlar
- **Preload tüm frame'leri** — scroll başlamadan önce
- **Canvas resize'ı debounce et** — her resize'da tekrar çiz

---

## 9. Kullanım

### A) FFMPEG ile frame çıkar ve yükle:
```bash
ffmpeg -i video.mp4 -vf "fps=30" frames/frame-%04d.webp
```
Sonra JS'de:
```js
loadFrameSequence(150);
```

### B) Client-side video'dan frame çıkar:
```js
loadFramesFromVideo('video.mp4', 150);
```

### C) Drag & drop ile video sürükle (demo modu)
Sayfaya video dosyasını sürükle-bırak.