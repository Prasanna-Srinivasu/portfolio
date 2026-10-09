# Lakshmi Prasanna Manthena — Production Portfolio

A quiet, high-performance personal portfolio website built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Lenis**.

Engineered following Awwwards "Site of the Day" principles: calm monochromatic palette (`--paper: #f4f2ee`, `--card: #ffffff`, `--ink: #0d0d0d`), zero fabrication (100% extracted from the official résumé), self-hosted typography, and a seamless looping hero video with sample-accurate audio cross-fading.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+
- Python 3.7+ with `numpy`, `pillow`, and `ffmpeg` (only if regenerating video assets)

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Create optimized production build
npm run build

# 4. Preview production build
npm run start
```
The site will run at `http://localhost:3000`.

---

## 2. Sections Table

| Order | Section | Component Path | Purpose & Résumé Source | Key Features |
|---|---|---|---|---|
| 00 | **Navigation** | `src/components/Navigation.tsx` | Global header | Scroll-reactive initials mark, frosted glass link pill, 2px ink scroll-progress bar, fullscreen clip-path mobile menu. |
| 01 | **Hero** | `src/components/hero/Hero.tsx` | Résumé Role & Video | Centered seamless looping video (`hero.mp4` / `hero.webm`), multiply blend mode, ghost typography, autoplay sound unlock & pause-on-scroll observer. |
| 02 | **About** | `src/components/sections/About.tsx` | Résumé Summary & Credentials | Verbatim professional summary, 3D hanging lanyard ID card with pendulum physics and card flip, quick facts, focus quote. |
| 03 | **Skills** | `src/components/sections/Skills.tsx` | Technical Skills & Tools | 36-element periodic table grid, family filter chips, diagonal reveal animation, 320px sticky inspector with 150px logo pop animation. |
| 04 | **Work** | `src/components/sections/Work.tsx` | Projects (Shopper & FoodieGo) | Expanding horizontal accordion gallery (flex-8 active panel, slim spines), verbatim deliverables, grayscale illustrative mini-UIs. |
| 05 | **Certifications** | `src/components/sections/Certifications.tsx` | Certifications | Sticky heading, white band background, numbered rows with left-to-right ink-flood hover animation and arrow slides. |
| 06 | **Experience** | `src/components/sections/Experience.tsx` | Experience & Education | Unified chronological timeline (Education → Datapro Internship → HCL Experience) with scroll-drawn spine and "Next — Your team?" card. |
| 07 | **Achievements** | `src/components/sections/Achievements.tsx` | Quantified Résumé Milestones | Pinned horizontal scroll gallery (`100svh`), 1.4s `easeOutQuart` number counter, center card lift, metrics strictly from résumé. |
| 08 | **Contact** | `src/components/sections/Contact.tsx` | Contact & Footer | Letter-hopping interactive headline, clipboard email copy chip, phone/social links, spinning hello badge, back-to-top button. |

---

## 3. How to Rebuild Hero Video Assets

The hero video pipeline script converts raw 16:9 footage into a portrait 768×960 loop:

```bash
python scripts/build-hero-assets.py
```

### Pipeline Details:
1. **Centering & Crop**: Crops a 576×720 window centered on the subject and scales to 768×960.
2. **Color Level Adjustment**: Whitens background using `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so it blends seamlessly into the page background.
3. **Seamless Video Loop**: Uses `ffmpeg xfade` to cross-fade the last 0.5s into the start of the loop over a 9.5s cycle.
4. **Sample-Accurate Audio Cross-fade**: Uses `numpy` linear fading on raw PCM audio to prevent clicks or drops while preserving lip-sync.
5. **Output Exports**:
   - `public/hero/hero.mp4` (H.264 / AAC, CRF 24)
   - `public/hero/hero.webm` (VP9 / Opus, CRF 36)
   - `public/portrait-bust.webp` (480×600 head-to-chest portrait)
   - `public/og.jpg` (1200×630 OpenGraph card)

---

## 4. Typography & Assets

### Self-Hosted Fonts
Stored in `src/fonts/` and loaded via `next/font/local`:
- **Inter Tight** (`inter-tight-var.woff2`): Primary sans-serif display and body font.
- **Instrument Serif** (`instrument-serif-regular.woff2`, `instrument-serif-italic.woff2`): Accent serif for heading tags and quotes.
- **JetBrains Mono** (`jetbrains-mono-var.woff2`): Monospace metadata, indices, and tags.

### Brand Logos & Licences
Official SVGs stored in `public/logos/`:
- **Devicon** icons (Java, JavaScript, React, Angular, HTML5, CSS3, Bootstrap, Tailwind CSS, Spring, MySQL, Git, GitHub, Postman, IntelliJ IDEA, Eclipse, Maven, Docker, Netlify, JUnit) are licensed under the [MIT License](public/logos/LICENSE).
- **Simple Icons** (OpenAI ChatGPT, JWT) are licensed under [CC0 1.0 Universal](public/logos/LICENSE).
- All brand logos remain the trademarks of their respective owners.
