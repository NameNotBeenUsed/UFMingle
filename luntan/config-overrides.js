const {
    override,
    fixBabelImports
} = require('customize-cra');

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }), (config) => {
            config.output.publicPath = './';

            // config.module.rules.unshift({
            //     test: /\.txt$/,
            //     use: 'raw-loader'
            // });
            config.module.rules[2].oneOf.unshift({
                test: /\.tpl$/,
                use: 'raw-loader'
            })
            // console.log("config = ", config.module.rules[2].oneOf)
            // d
            return config;
        }),
};