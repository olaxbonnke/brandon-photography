# Brandon Photography — Nigeria

> **The art of remembering.**  
> A luxury fine-art and editorial photography studio for couples and brands. Weddings, portraits, and campaigns crafted across Lagos, Abuja, and destination locations worldwide.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

---

## 🏛️ Project Overview

**Brandon Photography** is a bespoke, high-end editorial website built for a Lagos-based fine-art photographer. Inspired by luxury print publication aesthetics and the Fitzrovia editorial design language, the website combines cinematic movement, immersive full-screen sections, and rich interactive portfolio exploration.

---

## ✨ Key Features

- 🎬 **Luminous Video Hero**: Full-bleed cinematic video playback in an ambient silent loop with refined color-grade overlays and responsive typography.
- 🖼️ **Side-by-Side Split Lightbox**: Interactive gallery viewer displaying high-resolution imagery alongside editorial narrative story subtext, shoot metadata, and keyboard navigation (`←`, `→`, `Esc`).
- 📁 **Curated Archive & Dynamic Filtering**: Filter by *Weddings*, *Portraits*, *Commercial*, *Lifestyle*, *Beauty*, and *Accessories*, with an initial curated selection and interactive "Show More" expansion.
- 🌫️ **Faded Dark Mist Navigation**: Atmospheric translucent header and mobile drawer with soft frosted backdrop blur.
- 📜 **Interactive Inclusions Accordion**: Expandable service offerings detailing coverage, deliverables, and investment pricing for Nigerian and destination commissions.
- 💬 **Stable Testimonial Carousel**: Auto-advancing client review slider with manual controls and fixed window-ratio sizing.
- 📱 **Full-Screen Responsive Architecture**: Every section fills the viewport (`min-h-screen`) on desktop and mobile viewports.
- 👑 **Brand Emblem & Favicon**: Custom **`BP`** gold-on-black monogram logo badge.

---

## 🎨 Design System & Palette

### Typography
- **Headlines & Pull Quotes**: *Cormorant Garamond* (Serif display)
- **Body & Story Narratives**: *EB Garamond* (Editorial serif)
- **Navigation, Buttons & Labels**: *Jost* (Uppercase, wide letter-spaced sans)

### Color Tokens
| Token | Hex Value | Description |
| :--- | :--- | :--- |
| **Ink Charcoal** | `#15120F` | Primary deep atmospheric background |
| **Ivory Linen** | `#F3EEE4` | Warm editorial text & contrasting canvas sections |
| **Antique Gold** | `#B08D3F` | Primary metallic accent |
| **Bright Gold** | `#D4AF6A` | Interactive hover & active state accent |
| **Aged Bronze** | `#5C4423` | Subtle border depth and shadows |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (or Node.js 20+ recommended)
- `pnpm` (or `npm` / `yarn`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/olaxbonnke/brandon-photography.git
   cd brandon-photography
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Open in browser**:
   - Desktop: [http://localhost:3000](http://localhost:3000)
   - Mobile (on local Wi-Fi): `http://<your-local-ip>:3000` (e.g. `http://10.126.90.217:3000`)

---

## 🛠️ Production Build

To test and generate the optimized static production build:

```bash
pnpm build
pnpm start
```

---

## 📂 Project Structure

```
brandon-photography/
├── app/
│   ├── globals.css          # Tailwind CSS v4 tokens, animations & glass styles
│   ├── layout.tsx           # Google Fonts (Cormorant, EB Garamond, Jost), SEO metadata
│   ├── page.tsx             # Main editorial single-page architecture & lightbox
│   └── useScrollReveal.ts   # Custom IntersectionObserver scroll-trigger hook
├── components/
│   └── ui/                  # Reusable UI component primitives
├── public/                  # High-res client photography, hero video, and icons
├── next.config.mjs          # Next.js 16 configuration with allowedDevOrigins
├── package.json             # Dependencies and build scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

---

## 📄 License & Attribution

- Designed and developed for **Brandon Photography** (Lagos, Nigeria).
- All photographs, videos, and brand assets belong to their respective owners.
