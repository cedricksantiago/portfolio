/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to produce static HTML/CSS/JS
  images: {
    unoptimized: true, // GitHub Pages doesn't support the default Next.js Image Optimization
  },
  // Only use basePath in production (GitHub Pages)
  // basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '', 
};

export default nextConfig;