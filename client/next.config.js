// client/next.config.js
module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  
};
