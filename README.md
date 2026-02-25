# 📦 Livrili – Delivery App Website

A modern, responsive website for **Livrili**, a smart delivery app that revolutionizes the delivery experience. This site showcases the app's features and provides users with easy access to download and learn more.

## 🌟 Features

- **Multi-Language Support** – English, French, and Arabic
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI** – Smooth animations and transitions
- **Delivery Tracking** – Showcase real-time delivery tracking capabilities
- **Agency Selection** – Help users choose their preferred delivery agency
- **Return Management** – Eliminate return headaches for clients and shop owners
- **Smart Insights** – Display delivery analytics and performance metrics

## 🎯 Project Overview

Livrili is a delivery solution that puts control in the hands of users. The website serves as the marketing and information hub where:
- Clients can track every step of their delivery
- Shop owners get smart insights into their deliveries
- Deliveries are routed accurately to the right destination every time

## 📁 Project Structure

```
.
├── index.html          # Main HTML file with complete website structure
├── style.css           # Responsive styling and animations
├── script.js           # Core JavaScript functionality and i18n engine
├── translations.js     # Translation dictionary (EN, FR, AR)
├── README.md           # This file
└── LICENSE             # Project license
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required – it's vanilla HTML, CSS, and JavaScript

### Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/Delivery_App_Website.git
   cd Delivery_App_Website
   ```

2. **Open in browser:**
   - Simply open `index.html` in your preferred web browser
   - Or serve it with a simple HTTP server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

3. **Visit your local site:**
   - Open `http://localhost:8000` in your browser

## 🌐 Language Support

The website supports three languages:
- **English (EN)** – Default language
- **French (FR)** – French translation
- **Arabic (ع)** – Right-to-left Arabic UI

Language preference is saved to browser's local storage, so users' choice persists across sessions.

## 🎨 Website Sections

1. **Navigation Bar** – Clean navbar with language switcher and CTA button
2. **Hero Section** – Eye-catching hero with animated typing effect
3. **Features Section** – Highlights key benefits and features
4. **Download Section** – Call-to-action for app downloads
5. **Contact Section** – Get in touch form
6. **Footer** – Links and additional information

## 💨 Performance Features

- **Lightweight** – No external frameworks or heavy libraries
- **Fast Loading** – Optimized assets and minimal dependencies
- **Smooth Animations** – CSS transitions and JavaScript effects
- **Mobile Optimized** – Viewport meta tags and responsive breakpoints

## 📱 Responsive Design

The website is fully responsive with optimized layouts for:
- 📱 Mobile phones (320px and up)
- 📇 Tablets (768px and up)
- 🖥️ Desktop screens (1024px and up)

## 🔧 Customization

### Change Content
Edit the translation keys in `translations.js` for all languages:
```javascript
const TRANSLATIONS = {
    en: {
        nav_home: 'Home',
        // ... more translations
    },
    fr: { /* French translations */ },
    ar: { /* Arabic translations */ }
};
```

### Modify Styling
Update `style.css` to customize:
- Colors and branding
- Typography and fonts
- Animations and effects
- Layout breakpoints

### Add Functionality
Extend `script.js` to add new features like:
- Form validation
- API integration
- Analytics tracking
- Dynamic content loading

## 📄 File Details

### index.html
The main website structure containing:
- Navigation with language switcher
- Hero section with call-to-action buttons
- Features showcase
- Download promotion
- Contact form
- Footer

### style.css
Complete styling for:
- Responsive grid layouts
- Color schemes and themes
- Animation keyframes
- Mobile-first design approach

### script.js
Functionality for:
- i18n (internationalization) engine
- Language switching and persistence
- Smooth scrolling and navigation
- Form interactions
- Responsive burger menu

### translations.js
Translation dictionary with comprehensive support for:
- All UI text elements
- Dynamic content sections
- Form labels and placeholders

## 📈 Browser Compatibility

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 👤 Author

Created for the Livrili delivery app project.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest improvements
- Submit pull requests
- Translate to additional languages

## 📞 Support & Contact

For inquiries about Livrili or the website, please use the contact form on the website or reach out through the contact section.

---

**Last Updated:** February 2026
