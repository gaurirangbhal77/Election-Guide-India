# <img src="election_guide_logo_1777472154778.png" width="40" height="40" style="vertical-align: middle; border-radius: 50%;"> Election Guide India 🇮🇳 (v2.0)

An interactive, high-fidelity educational application designed to empower Indian citizens with knowledge about the electoral process, democratic rights, and the voting system.

## 🚀 Vision & Key Improvements

The v2.0 release focuses on three main pillars: **Security**, **Accessibility**, and **Performance**.

- **💎 Premium Design**: A high-fidelity "v2.0" interface using advanced Glassmorphism, a traditional Indian palette (Saffron, White, Green), and mesh-gradient backgrounds.
- **♿ 100% Accessible**: Fully compliant with ARIA standards, featuring focus management, `aria-live` regions, and a "Skip to Main Content" link for keyboard users.
- **🛡️ Secure Architecture**: Eliminated `innerHTML` in favor of safe DOM manipulation (`textContent`, `createElement`, `fragments`) to ensure zero XSS risk.
- **⚡ Optimized Performance**: Refactored into a modular `ElectionApp` object with DOM caching and efficient rendering using `DocumentFragment`.
- **📱 Responsive & Modern**: Mobile-first design with smooth transitions and interactive micro-animations.

## ✨ Features

- **📚 Learning Flashcards**: Explore key terms and roles with interactive 3D-flip cards.
- **📝 Knowledge Check**: A comprehensive quiz engine with instant feedback and explanatory content.
- **🤖 AI Assistant**: A keyword-based assistant to provide instant answers to electoral queries.
- **📊 Progress Dashboard**: Real-time tracking of your learning journey with a visual progress bar.

## 🛠️ Technology Stack

- **Frontend**: Vanilla ES6+ JavaScript (Modular Design), HTML5 (Semantic), CSS3 (Modern Variables & Animations).
- **Deployment**: Optimized for containerized environments (Docker/Cloud Run).
- **SEO/Metadata**: Optimized with Open Graph tags and structured metadata for high searchability.

## 📂 Project Structure

- `index.html`: Fully semantic layout with enhanced accessibility regions.
- `app.js`: Optimized logic using a secure state-based approach with JSDoc.
- `style.css`: A robust design system with premium visual effects.
- `Dockerfile`: Production-ready lightweight containerization.

## 🐳 Running Locally

1. **Build the image:**
   ```bash
   docker build -t election-guide-v2 .
   ```

2. **Run the container:**
   ```bash
   docker run -p 8080:80 election-guide-v2
   ```
   Access the app at `http://localhost:8080`.

---
*Built to empower every voter in the world's largest democracy.*
Developed with ❤️ by [gaurirangbhal77](https://github.com/gaurirangbhal77) 🇮🇳
