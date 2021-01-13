module.exports = function override(config, env) {
    if (env === 'production') {
        config.optimization.splitChunks = {
            cacheGroups: {
                default: false,
            },
        };

        config.optimization.runtimeChunk = false;
        config.output.filename = 'static/js/shopping-cart-widget.js';
        config.plugins[5].options.filename = 'static/css/shopping-cart-style.css';
    }
    return config
}
