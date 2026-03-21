# Cybersecurity Portfolio & Terminal

A highly-aesthetic, immersive, and functional portfolio platform designed to showcase achievements in digital forensics, ethical hacking, OSINT, and security research.

Engineered with modern web technologies, the platform balances a classic CRT hacker visual profile with modern, high-performance 3D graphics and subtle contextual animations.

## 🚀 Key Features

* **Interactive Command Line Interface**: A dedicated `/terminal` route simulating a UNIX environment. Visitors can execute commands like `whoami`, `ls`, `cd`, and `cat resume` to navigate through your portfolio using standard CLI interactions.
* **Dynamic SOC Threat Map**: An interactive 3D globe powered by `@react-three/fiber` visualizing global attack vectors (via high-speed laser rendering) alongside a simulated, live Network Defense log overlay.
* **Serverless Backend Infrastructure**: Secures sensitive credentials (like contact form endpoints) via a lightweight Express backend deployed natively through Vercel. Includes active API Route rate-limiting and HTTP security headers (Helmet).
* **Glitch Art Aesthetics**: Implements complex CSS keyframe animations to render chromatic aberration (RGB splitting) over images, paired with a hidden global `Hacker Typer` trigger (`Backtick \` key).
* **Full Responsive Design**: Configured heavily through Tailwind CSS ensuring parity between intense 3D Desktop interactions and mobile responsiveness.

## 🛠️ Stack Architecture

* **UI Framework**: React.js 18, Vite.js
* **Styling & Motion**: Tailwind CSS v3, Framer Motion
* **3D Rendering**: Three.js, React Three Fiber, React Three Drei
* **Backend Layer**: Express.js, Helmet, Express-Rate-Limit (Optimized for Vercel Serverless Functions)

## 💻 Local Installation

Ensure Node.js (v18+) is installed.

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd cyber-portfolio
   ```

2. **Install core dependencies:**
   ```bash
   npm install
   ```

3. **Configure Secrets:**
   Rename `.env.example` to `.env` and supply your backend access keys:
   ```env
   WEB3FORMS_ACCESS_KEY=your_key_here
   ```

4. **Launch the build engine:**
   ```bash
   npm run dev
   ```

## 🌐 Production Deployment

The repository is inherently configured for zero-configuration deployment on [Vercel](https://vercel.com).
The included `vercel.json` file guarantees:
1. All requests to `/api/*` are reliably proxied to the secure Express instance.
2. The attachment of strict `HTTPS / HSTS`, `X-Frame-Options`, and `X-XSS-Protection` headers onto all outward-facing static payload deliveries.

Ensure that the Vercel branch has `WEB3FORMS_ACCESS_KEY` registered in the project's Environment Variables panel prior to triggering the first build to ensure functionality of the `/api/contact` endpoint.
