const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {

    entry: './src/components/Dropzone.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        require("babel-plugin-transform-react-jsx"),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}