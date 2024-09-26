const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration of the services
const serviceOneURL = 'http://localhost:3001';
const serviceTwoURL = 'http://localhost:3002';
const serviceThreeURL = 'http://localhost:5000';
const serviceFourURL = 'http://localhost:5001';

// Proxy routes
app.use('/service-one', createProxyMiddleware({
  target: serviceOneURL,
  changeOrigin: true,
  pathRewrite: {
    '^/service-one': '', 
  },
}));

app.use('/service-two', createProxyMiddleware({
  target: serviceTwoURL,
  changeOrigin: true,
  pathRewrite: {
    '^/service-two': '', 
  },
}));

app.use('/service-three', createProxyMiddleware({
  target: serviceThreeURL,
  changeOrigin: true,
  pathRewrite: {
    '^/service-three': '', 
  },
}));

app.use('/service-four', createProxyMiddleware({
  target: serviceFourURL,
  changeOrigin: true,
  pathRewrite: {
    '^/service-four': '', 
  },
}));

// Start the API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
