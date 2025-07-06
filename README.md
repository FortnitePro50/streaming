# StreamFlix - Modern Streaming Website

A modern, responsive streaming website built with React and integrated with VidSrc API for video streaming. Features a clean Netflix-inspired design with smooth animations and a great user experience.

## Features

### 🎬 Core Features
- **Stream Movies & TV Shows**: Watch thousands of movies and TV episodes
- **VidSrc API Integration**: Reliable streaming through VidSrc's extensive database
- **Search Functionality**: Search across movies and TV shows
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean UI**: Modern, Netflix-inspired interface with smooth animations

### 🎭 Content Features
- **Popular Movies**: Trending and popular movie collections
- **TV Shows**: Full season and episode support
- **Episode Navigation**: Easy season/episode selection for TV shows
- **Content Information**: Movie details, ratings, descriptions
- **Category Filtering**: Browse by popularity, ratings, trending content

### 🎨 Design Features
- **Beautiful Animations**: Smooth loading and hover effects
- **Skeleton Loading**: Professional loading states
- **Dark Theme**: Easy on the eyes design
- **Interactive Elements**: Hover effects, smooth transitions
- **Mobile Responsive**: Perfect experience on all devices

## Technology Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Pure CSS with modern features
- **API Integration**: 
  - TMDB API for movie/TV metadata
  - VidSrc API for video streaming
- **HTTP Client**: Axios for API requests
- **Build Tool**: Create React App

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vidsrc-streaming-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## Configuration

### API Keys

The app uses TMDB API for movie metadata. While a demo API key is included, you should get your own:

1. Register at [TMDB](https://www.themoviedb.org/settings/api)
2. Get your API key
3. Replace the API key in `src/services/api.js`:
   ```javascript
   const API_KEY = 'YOUR_TMDB_API_KEY';
   ```

### VidSrc Integration

The app is pre-configured to work with VidSrc API:
- Movie streaming: `https://vidsrc.xyz/embed/movie/{tmdb_id}`
- TV show streaming: `https://vidsrc.xyz/embed/tv/{tmdb_id}/{season}-{episode}`

## Usage

### Navigation
- **Home**: Browse trending and popular content
- **Movies**: Explore movie collections with filtering
- **TV Shows**: Browse TV shows by category
- **Search**: Find specific content

### Watching Content
1. Click on any movie or TV show card
2. For movies: Start watching immediately
3. For TV shows: Select season and episode
4. Use the back button to return to browsing

### Search
- Use the search bar in the header
- Search across both movies and TV shows
- Results show content type and ratings

## File Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── ContentCard.js     # Movie/TV show card
│   └── Loading.js         # Loading components
├── pages/
│   ├── Home.js           # Homepage
│   ├── Movies.js         # Movies page
│   ├── TVShows.js        # TV shows page
│   ├── Search.js         # Search results
│   └── Watch.js          # Video player page
├── services/
│   └── api.js            # API service layer
├── App.js                # Main app component
├── App.css               # Main styles
├── index.js              # App entry point
└── index.css             # Additional styles
```

## Customization

### Styling
- Modify colors in `src/App.css`
- Update the logo in `src/components/Header.js`
- Customize animations and transitions

### API Integration
- Add more streaming sources in `src/services/api.js`
- Implement additional metadata providers
- Add user authentication

### Features
- Add watchlist functionality
- Implement user ratings
- Add content recommendations

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set up redirects for React Router

### Deploy to Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Legal Notice

This application is for educational purposes only. The VidSrc API provides links to third-party content. Users are responsible for ensuring they have the right to access content in their jurisdiction.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions:
- Check the browser console for error messages
- Ensure all dependencies are installed
- Verify your internet connection
- Check that the APIs are accessible

## Acknowledgments

- TMDB for providing movie and TV show metadata
- VidSrc for streaming functionality
- React community for excellent documentation
- Netflix for design inspiration

---

**Happy Streaming! 🎬**