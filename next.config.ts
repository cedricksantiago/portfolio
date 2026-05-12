/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to produce static HTML/CSS/JS
  images: {
    unoptimized: true, // GitHub Pages doesn't support the default Next.js Image Optimization
  },
  // If your repository is NOT named 'yourusername.github.io' (e.g., it's 'portfolio')
  // basePath: '/portfolio', 
};

module.exports = nextConfig;