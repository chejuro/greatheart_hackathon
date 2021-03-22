const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/requests', {target : 'http://localhost:8080'}));
    app.use(createProxyMiddleware('/blockchain', {target : 'http://79.174.13.214:8080'}));
    app.use(createProxyMiddleware('/entities', {target : 'http://80.87.197.233:8110'}));
    app.use(createProxyMiddleware('/enums', {target : 'http://80.87.197.233:8110'}));
    app.use(createProxyMiddleware('/fieldTypes', {target : 'http://80.87.197.233:8110'}));
    app.use(createProxyMiddleware('/card', {target : 'http://80.87.197.233:8080', changeOrigin: true, pathRewrite: function (path, req) {
        return req.originalUrl.replace('/card', '');   
    }}));
    app.use(createProxyMiddleware('/auth', {target : 'http://80.87.197.233:8090'}));
    app.use(createProxyMiddleware('/profile', {target : 'http://80.87.197.233:8110', changeOrigin : true}))
};