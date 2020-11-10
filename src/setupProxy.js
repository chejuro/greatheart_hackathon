const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/requests', {target : 'http://80.87.197.233:8080'}));
    app.use(createProxyMiddleware('/entities', {target : 'http://80.87.197.233:8110'}));
};