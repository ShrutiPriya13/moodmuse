const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://moodmuse.onrender.com',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};
