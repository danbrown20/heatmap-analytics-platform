# Development Setup Guide

## 🚀 Getting Started on Any Rig

This guide will help you set up the HeatMap Analytics Platform project on any of your computers/rigs.

### Prerequisites

Make sure you have these installed on your rig:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

### Initial Setup

1. **Clone the repository:**
```bash
git clone https://github.com/danbrown20/heatmap-analytics-platform.git
cd heatmap-analytics-platform
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
Visit `http://localhost:3000` to see the application

## 📁 Project Structure

```
heatmap-analytics-platform/
├── index.html              # Main HTML file
├── css/
│   └── main.css            # Main stylesheet
├── js/
│   └── main.js             # Main JavaScript
├── package.json            # Dependencies & scripts
├── README.md               # Project documentation
├── DEVELOPMENT.md          # This file
└── .gitignore             # Git ignore rules
```

## 🛠️ Development Workflow

### Making Changes

1. **Create a new branch for your feature:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** in the code

3. **Test your changes:**
```bash
npm run dev
```

4. **Commit your changes:**
```bash
git add .
git commit -m "Add your feature description"
```

5. **Push to GitHub:**
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request** on GitHub

### Sync Between Rigs

When switching between computers:

1. **Pull latest changes:**
```bash
git pull origin main
```

2. **Install any new dependencies:**
```bash
npm install
```

3. **Start development:**
```bash
npm run dev
```

## 🎯 Current Development Status

### ✅ Completed
- [x] Project structure setup
- [x] Git repository with proper .gitignore
- [x] Package.json with dependencies
- [x] Basic HTML structure
- [x] CSS foundation with custom properties
- [x] Basic JavaScript application class
- [x] Professional styling system

### 🔄 In Progress
- [ ] Heat map rendering components
- [ ] Chart.js integration
- [ ] Revenue tracking system
- [ ] Dashboard components

### 📋 TODO
- [ ] Real-time data updates
- [ ] Export functionality
- [ ] Mobile responsive design
- [ ] Testing setup
- [ ] Deployment configuration

## 🧰 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests (when implemented)
npm run lint     # Lint JavaScript code
npm run format   # Format code with Prettier
```

## 🎨 Working with the Code

### Adding New Features

1. **Heat Map Components** - Add to `js/components/`
2. **Utilities** - Add to `js/utils/`
3. **Styles** - Add to `css/` or extend `main.css`
4. **Assets** - Add to `assets/` directory

### CSS Guidelines

- Use CSS custom properties (variables) defined in `:root`
- Follow BEM naming convention for new classes
- Use the established color palette and spacing system
- Maintain responsive design principles

### JavaScript Guidelines

- Use ES6+ features (classes, modules, async/await)
- Keep functions small and focused
- Add comments for complex logic
- Follow the established error handling patterns

## 🚢 Deployment

The project is set up for easy deployment to:

- **Vercel** (recommended for static sites)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

Simply run `npm run build` and deploy the `dist/` folder.

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process using port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- --port 3001
```

**Node modules issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Git conflicts:**
```bash
# Pull latest changes and resolve conflicts
git pull origin main
# Fix conflicts in your editor
git add .
git commit -m "Resolve merge conflicts"
```

## 📞 Support

If you run into issues:

1. Check this guide first
2. Look at existing GitHub Issues
3. Create a new Issue with details
4. Ask in team chat/Discord

## 🎯 Next Sprint Goals

1. **Heat Map Renderer** - Create interactive heat map component
2. **Data Management** - Implement data loading and filtering
3. **Chart Integration** - Add Chart.js for analytics
4. **Revenue Tracking** - Build revenue analytics features

---

**Happy coding! 🔥**