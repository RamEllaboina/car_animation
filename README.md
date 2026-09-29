# Scroll-Driven Hero Section Animation

A highly optimized, hardware-accelerated scroll-driven hero section built to demonstrate advanced frontend motion, smooth UI behavior, and cinematic scroll interactions. This project was built utilizing modern vanilla web technologies wrapped within a React architecture for component lifecycle efficiency.

## 🌟 Core Features & Implementation

1. **Cinematic Hero Layout & Typography**
   - The initial layout occupies the viewport (above-the-fold) gracefully.
   - Features a fully responsive, letter-spaced `W E L C O M E I T Z F I Z Z` headline implemented with `Orbitron` to inject a premium 3D perspective edge. 
   - Uses localized CSS clip-paths and WebKit masks paired with subtle atmospheric grids and glassmorphism UI elements to build a modern aesthetic.

2. **Sequential Load Animations (GSAP)**
   - Upon page load, a beautifully sequenced GSAP Timeline executes.
   - The headline chars individually stagger upwards via hardware-accelerated `translateY` and `rotateX` bindings with an aggressive `power4.out` easing.
   - The impact metrics elegantly bounce in right after, creating a dynamic, structured reveal that feels highly polished and organic.

3. **Smooth Scroll-Driven Core Feature**
   - Implements **Lenis Scroll** synchronized perfectly with **GSAP's ScrollTrigger** to hijack visual scroll progression natively without breaking accessibility. 
   - The core interaction ties page scroll linearly to the transform sequence of a luxury sports car background. It aggressively scales (`scale: 4`) into the lens as the content fades out and drifts to the top.
   - Uses zero CPU-heavy layout recalculations. All heavy lifting is passed onto the GPU (`transform-gpu`) for buttery smooth 120Hz-capable rendering.

## 🛠 Tech Stack

- **Framework:** React.js / Vite
- **Styling:** Tailwind CSS (v3) + Vanilla CSS Modules 
- **Animation Engine:** GSAP (GreenSock Animation Platform) + `@gsap/react`
- **Scroll Engine:** `@studio-freight/lenis` (for native-feeling fluid scrolling)
- **Typography:** Google Fonts (`Inter` & `Orbitron`)

## 🚀 Running Locally

To preview the project in your local development environment:

1. Clone or download the repository to your machine.
2. Navigate into the folder via your terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the Vite development server:
   ```bash
   npm run dev
   ```
5. Navigate to the `localhost` URL provided in the terminal (usually `http://localhost:5173/`).

## 🌐 Next Steps for Submission

To host this project on GitHub Pages:
1. Push this directory to a new public repository on your GitHub account. Ensure your `package.json` contains your `"homepage"` alias.
2. Install the `gh-pages` tracker:
    ```bash
    npm install gh-pages --save-dev
    ```
5. Deploy utilizing GitHub actions or directly via standard Vite build configuration `npm run build && npx gh-pages -d dist`.
