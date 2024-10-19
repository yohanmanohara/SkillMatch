const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration of the services
const api_gateway = 'http://localhost:3001';
const client = 'http://localhost:3001';
const main_server = 'http://localhost:3002';
const meeting_server = 'http://localhost:3003';
const headhunting_server = 'http://localhost:5000';
const job_suggestion_server = 'http://localhost:5001';

// Proxy routes
app.use('/client', createProxyMiddleware({
  target: client,
  changeOrigin: true,
  pathRewrite: {
    '^/service-one': '', 
  },
}));

app.use('/main_server', createProxyMiddleware({
  target: main_server,
  changeOrigin: true,
  pathRewrite: {
    '^/service-two': '',
  },
}));

app.use('/meeting_server', createProxyMiddleware({
  target: meeting_server,
  changeOrigin: true,
  pathRewrite: {
    '^/service-three': '', 
  },
}));

app.use('/headhunting_server', createProxyMiddleware({
  target: headhunting_server,
  changeOrigin: true,
  pathRewrite: {
    '^/service-four': '', 
  },
}));

app.use('/job_suggestion_server', createProxyMiddleware({
  target: job_suggestion_server,
  changeOrigin: true,
  pathRewrite: {
    '^/service-four': '', 
  },
}));

// Start the API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
