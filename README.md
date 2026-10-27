<div align="center">

# 🌍 Travel — Discover Sri Lanka

### A responsive travel website for discovering destinations and planning your next trip.

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Responsive-Design-2EA44F?style=for-the-badge" alt="Responsive design" />
</p>

### 🔴 Live Demo

**[Explore the live website →](https://travel-website-sri-lanka.vercel.app/)**

</div>

---

## 📌 About the Project

**Travel — Discover Sri Lanka** is a front-end travel website designed to give visitors a clean, modern way to explore travel destinations and start planning a trip. It combines a responsive layout with destination discovery tools, interactive UI elements, theme switching, and smooth, performance-conscious animations.

This project is built with **HTML, CSS, and vanilla JavaScript**. It does not require a framework or a backend server to run locally.

## ✨ Features

- 📱 **Responsive layout** for desktop, tablet, and mobile screens.
- 🧭 **Mobile slide-in navigation** with close and keyboard interaction support.
- 🔎 **Destination search and filters** to help visitors find places.
- ❤️ **Favorite destinations** saved in the browser with `localStorage`.
- 🌓 **Light/dark theme toggle**.
- 🧳 **Trip-plan estimator** for a simple trip-cost estimate.
- 🎞️ **Destination carousel** powered by Swiper when its JavaScript library is available.
- ✨ **Scroll reveal and hover effects** designed to avoid heavy continuous animations.
- 📈 **Scroll progress indicator** and back-to-top control.
- ❔ **Interactive FAQ accordion**.
- 📬 **Newsletter form demo** with basic client-side validation.
- ♿ **Keyboard focus styles** and reduced-motion preference support.

> **Note:** Favorites, newsletter feedback, and trip plans are front-end demonstrations. Data is stored locally in the current browser. The website does not currently submit real newsletter emails, process bookings, or accept payments.

## 🛠️ Built With

- **HTML5** — page structure
- **CSS3** — responsive layout, visual styling, transitions, and animations
- **Vanilla JavaScript** — navigation and interactive behavior
- **Swiper** — destination carousel (the Swiper JavaScript file must be included locally)
- **Remix Icon** — interface icons loaded from a CDN
- **Google Fonts** — typography loaded externally, with fallback fonts

## 🚀 Getting Started

### Prerequisites

You only need a modern web browser. For convenient local development, install [Visual Studio Code](https://code.visualstudio.com/) and its **Live Server** extension.

### 1. Download the project

Clone your repository after uploading this project, or download the ZIP from GitHub and extract it.

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub details.

### 2. Check the project files

Keep the existing images, favicon, and video assets in their expected locations. The page may still open without some optional assets, but the related sections will not display as intended.

```text
project-root/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   ├── styles.css
    │   └── swiper-bundle.min.css
    ├── js/
    │   ├── main.js
    │   └── swiper-bundle.min.js  # Required for the Swiper carousel
    ├── img/
    │   └── favicon.png
    ├── images/                   # Keep your destination images here
    └── video/
        └── Video Tour.mp4        # Optional, if used by your HTML
```

### 3. Run the website

**Using VS Code Live Server:**

1. Open the project folder in VS Code.
2. Install the Live Server extension if needed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

You can also open `index.html` directly in a browser, although a local server is recommended for development.

## 🎨 Customization

- **Text and sections:** edit `index.html`.
- **Colors, layout, and animations:** edit `assets/css/styles.css`.
- **Menu, search, filters, favorites, and interactions:** edit `assets/js/main.js`.
- **Images and video:** replace the existing files while keeping their paths in sync with the HTML.
- **Destination content:** update the destination cards in the HTML and ensure search/filter behavior matches the card markup.

## ⚡ Performance Tips

- Compress large images before adding them to the project.
- Prefer WebP or AVIF images where practical, with suitable fallbacks if needed.
- Avoid adding large autoplay videos or multiple animation libraries unless necessary.
- Keep animations focused on `transform` and `opacity` where possible.
- Test the layout on both mobile and desktop sizes.

## 🗺️ Roadmap

- [ ] Add a real booking backend and reservation workflow.
- [ ] Connect newsletter signup to an email service.
- [ ] Add destination details pages and shareable trip plans.
- [ ] Add real-time prices, availability, and travel information.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork this repository.
2. Create a branch for your change: `git checkout -b feature/your-feature`.
3. Make and test your changes in a browser.
4. Commit your work: `git commit -m "Add your feature"`.
5. Push your branch and open a Pull Request.

For bugs or feature ideas, open an issue in the repository and include steps to reproduce the problem when possible.

## 📄 License

No license has been specified for this project yet. Unless you add a license file, normal copyright rules apply and others may not have permission to reuse, modify, or distribute the code. If you want to publish this as an open-source project, choose a suitable license and add a `LICENSE` file.

## 🙏 Acknowledgements

- [Swiper](https://swiperjs.com/) for the carousel library.
- [Remix Icon](https://remixicon.com/) for interface icons.
- [Google Fonts](https://fonts.google.com/) for typography.
- [GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) for README guidance.

---

<div align="center">
  <i>Built for travelers who want to discover more.</i>
</div>
