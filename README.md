# CreatorPlatform

A modern creative discovery platform that connects creators with their audience. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Creator Showcase** - Discover talented artists, gamers, musicians, and content creators
- 🔍 **Smart Filtering** - Filter projects by category and sort by popularity, recency, or trending
- 💫 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 📱 **Responsive** - Optimized for all devices from mobile to desktop
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd plateform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Deployment

### Option 1: Bolt Hosting (Recommended)

The easiest way to deploy your CreatorPlatform is using Bolt's built-in hosting:

1. Make sure your project is ready for production
2. In your Bolt environment, simply ask: "Deploy this project"
3. Bolt will automatically build and deploy your app
4. You'll receive a live URL to share with others

### Option 2: Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
   - Drag and drop the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or connect your GitHub repository for automatic deployments

3. Configure build settings (if using Git):
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

### Option 4: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js` to set the correct base path:
```js
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

4. Deploy:
```bash
npm run deploy
```

### Option 5: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```

3. Configure `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## Environment Variables

Currently, this project doesn't require any environment variables. All data is mocked for demonstration purposes.

For production use, you might want to add:
- API endpoints
- Authentication keys
- Analytics tracking IDs

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── FilterBar.tsx   # Category and sort filters
│   ├── ProjectCard.tsx # Individual project cards
│   └── CreatorSpotlight.tsx # Featured creators
├── data/
│   └── mockData.ts     # Mock data for projects and creators
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx             # Main app component
├── index.css           # Global styles and Tailwind imports
└── main.tsx            # App entry point
```

## Customization

### Adding New Categories

1. Update the `ProjectCategory` type in `src/types/index.ts`
2. Add the new category to the `categories` array in `src/components/FilterBar.tsx`
3. Update the `getCategoryIcon` function in `src/components/ProjectCard.tsx`

### Styling

The project uses Tailwind CSS with custom components defined in `src/index.css`:
- `.glass` - Glassmorphism effect
- `.glass-card` - Card with glass effect
- `.gradient-text` - Gradient text effect
- `.btn-primary` / `.btn-secondary` - Button styles

### Mock Data

Replace the mock data in `src/data/mockData.ts` with real API calls when ready for production.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help with deployment, feel free to reach out or create an issue in the repository.