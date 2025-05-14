const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const core = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;


// Configuration of the services within Docker's network
const client = 'http://localhost:3000';
const api_gateway = 'http://localhost:3001';
const main_server = 'http://main_server:3002';
const flask_server = 'http://flask_server:3003';



app.use(core());

app.use('/client', createProxyMiddleware({
  target: client,
  changeOrigin: true,
  pathRewrite: {
    '^/client': '', 
  },
}));

app.use('/main_server', createProxyMiddleware({
  target: main_server,
  changeOrigin: true,
  pathRewrite: {
    '^/main_server': '',
  },
}));

app.use('/flask_server', createProxyMiddleware({
  target: flask_server,
  changeOrigin: true,
  pathRewrite: {
    '^/flask_server': '', 
  },
}));



app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

