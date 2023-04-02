const path = require("path"); //nos permite saber donde está ubicado este proyecto
//Si está en un servidor o computadora local
//PLUGINS
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.jsx", //punto de entrada del proyecto
    output: { //punto de salida del proyecto optimizado y terminado
        path: path.resolve(__dirname, "dist"),
        filename:"[name].[contenthash].js", //nombre del archivo optimizado(el index.js)
        publicPath:"/",
    },
    mode:"development",
    devtool:"source-map",
    resolve: {//Con que extensiones va a trabajar webpack
        extensions:[".js", ".jsx"],
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@machines": path.resolve(__dirname, "src/machines"),
            "@containers": path.resolve(__dirname, "src/containers"),

        }
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test:/\.html$/,
                use: {
                    loader: "html-loader", 
                }
            },
            {
                test:/\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader"],  
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                type:"asset/resource",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename:"index.html",
                title: "AireLine tikects",
                inject: true,
                template: "./public/index.html"
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename:"[name].[contenthash].css",
            }
        ),
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        historyApiFallback: true, //para tener un historial
        port: 9000, //configura el puerto
        open: true,
    },
  
}