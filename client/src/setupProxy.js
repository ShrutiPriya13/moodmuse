module.exports = function (app) {
  // In production, API calls should go directly to the server
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};
