const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path")

const BASE_INPUT_PATH = "./src/client/js/";

module.exports = {
    entry:{
        main:`${BASE_INPUT_PATH}main.js`,
        videoPlayer:`${BASE_INPUT_PATH}videoPlayer.js`,
        recorder:`${BASE_INPUT_PATH}recorder.js`,
        commentSection:`${BASE_INPUT_PATH}commentSection.js`
    },
    plugins: [new MiniCssExtractPlugin({
        filename:"css/style.css"
    })],
    output: {
        filename:"js/[name].js",
        path:path.resolve(__dirname,"assets"),
        clean:true,
    },
    module:{
        rules:[
            {
                test:/\.js$/i,
                use:{
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ]
                    },
                },
            },
            {
                test:/\.scss$/i,
                use:[
                    MiniCssExtractPlugin.loader,"css-loader","sass-loader"
                ]
            }
        ],
    },
};