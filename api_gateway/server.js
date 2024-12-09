const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const core = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;


// Configuration of the services within Docker's network
const client = 'http://localhost:3000';
const api_gateway = 'http://api_gateway:3001';
const main_server = 'http://main_server:3002';
const meeting_server = 'http://meeting_server:3003';
const headhunting_server = 'http://localhost:5000';
const job_suggestion_server = 'http://localhost:5001';



app.use(core());
// Proxy routes
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

app.use('/meeting_server', createProxyMiddleware({
  target: meeting_server,
  changeOrigin: true,
  pathRewrite: {
    '^/meeting_server': '', 
  },
}));

app.use('/headhunting_server', createProxyMiddleware({
  target: headhunting_server,
  changeOrigin: true,
  pathRewrite: {
    '^/headhunting_server': '', 
  },
}));

app.use('/job_suggestion_server', createProxyMiddleware({
  target: job_suggestion_server,
  changeOrigin: true,
  pathRewrite: {
    '^/job_suggestion_server': '', 
  },
}));


app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

