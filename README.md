# 🚀 Yokeshwaran R — Personal Portfolio Website

A world-class, premium, modern, fully responsive personal portfolio website engineered for **Yokeshwaran R**, Undergraduate Computer Science student at **Hindustan College, Chennai** (Batch 2023–2027), alumnus of **MCTM School**.

---

## 🌟 Key Highlights & Engineering Features

- **Minimalist yet Futuristic Aesthetic**: Obsidian dark theme (`#07090E`) with neon cyan (`#00F2FE`), cyber violet (`#A855F7`), and emerald green accents.
- **Glassmorphism & Micro-Interactions**: Subtle frosted glass panels with `backdrop-filter: blur(16px)`, translucent borders (`rgba(255, 255, 255, 0.08)`), and ambient glow orbs.
- **Interactive Particle Constellation**: Battery-efficient HTML5 Canvas with mouse proximity physics, connective filaments, and `prefers-reduced-motion` support.
- **Physical 3D Card Tilt Engine**: Cards tilt smoothly on cursor hover with dynamic specular glare reflection.
- **Interactive Developer CLI Terminal**: A functional cyberpunk terminal modal (accessible via button or pressing `` ` `` / `Ctrl + K`) featuring commands: `help`, `whoami`, `education`, `skills`, `projects`, `chennai`, `sudo hire`, `date`, `clear`, and `exit`.
- **Live Chennai Local Time (IST)**: Real-time clock counter synced with `Asia/Kolkata` time and an active pulsing beacon status (`🟢 Available for SDE Internships • Batch 2023–2027`).
- **Interactive Project Modal**: In-depth architecture breakdown, engineering highlights, and GitHub links for each featured project.
- **Curated Resume Modal**: In-browser resume document preview with print/PDF export support.
- **Synthesized Web Audio Engine**: Soft, futuristic UI sound effects generated in real-time via the native Web Audio API (zero external audio files needed) with a global mute toggle.
- **1-Click Clipboard Utilities**: Copy email, location, and key contact details with animated toast feedback.
- **Cross-Platform & Zero Dependencies**: Runs out of the box in any browser or with Node.js.

---

## 📂 Project Architecture

```
c:\mia\
├── .github/workflows/deploy.yml # Automated CI/CD GitHub Pages deployment workflow
├── .gitignore                   # Git ignore rules for node_modules, logs, OS files
├── .nojekyll                    # Bypasses Jekyll processing on GitHub Pages
├── index.html                   # Semantic, SEO-optimized, accessible HTML5 architecture
├── css/
│   ├── style.css                # Custom design system, CSS variables, glassmorphism
│   ├── animations.css           # Keyframe sweeps, floating ambient orbs, beacon pulses
│   └── responsive.css           # Mobile-first and high-DPI responsive stylesheets
├── js/
│   ├── main.js                  # Navigation, scroll-spy, contact form, modal logic, live clock
│   ├── particles.js             # Interactive HTML5 Canvas constellation engine
│   ├── tilt.js                  # 3D Tilt and specular glare reflection engine
│   ├── terminal.js              # Interactive developer CLI terminal emulator
│   └── audio.js                 # Web Audio API futuristic micro-sound synthesizer
├── assets/
│   └── images/
│       └── og-preview.svg       # Vector OpenGraph preview card & emblem
├── netlify.toml                 # Netlify deployment configuration & cache headers
├── vercel.json                  # Vercel deployment configuration & security headers
├── server.js                    # Auto-fallback local Node.js HTTP preview server
├── package.json                 # npm scripts for start, build, dev, and test
└── README.md                    # Comprehensive documentation & deployment guide
```

---

## ⚡ Local Preview

### Option 1: Direct File Launch (Zero Setup)
Simply double click `index.html` in Windows File Explorer or open it in Chrome, Edge, Firefox, or Safari!

### Option 2: Local Node.js Server
Start the built-in HTTP server:
```bash
npm start
```
Then navigate to: **`http://localhost:3000`** in your browser (if port 3000 is occupied, it automatically falls back to 3001, 3002, etc.).

---

## 🌐 Instant Deployment Guide

### 1. Deploy to GitHub Pages (Automated via GitHub Actions)
1. Create a new repository on GitHub (e.g. `portfolio` or `yokeshwaran.github.io`).
2. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, select **GitHub Actions**
4. The included `.github/workflows/deploy.yml` workflow will automatically build and publish your site!

### 2. Deploy to Vercel
1. Install Vercel CLI (or connect GitHub on [vercel.com](https://vercel.com)):
   ```bash
   npx vercel
   ```
2. Accept the defaults — Vercel detects `vercel.json` and publishes your site with a free HTTPS `.vercel.app` domain in seconds!

### 3. Deploy to Netlify
- **Drag-and-Drop**: Drag the entire `c:\mia` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **CLI**: Run `npx netlify deploy --prod` — Netlify reads `netlify.toml` automatically.

---

*Engineered with precision for Yokeshwaran R.*
