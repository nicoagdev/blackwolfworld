module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.blackwolfworld.com',
      },
    ],
  },
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'https://app.blackwolfworld.com/wp-json/wc/v3/',
    WORDPRESS_CONSUMER_KEY: process.env.WORDPRESS_CONSUMER_KEY || '',
    WORDPRESS_CONSUMER_SECRET: process.env.WORDPRESS_CONSUMER_SECRET || '',
  },
};