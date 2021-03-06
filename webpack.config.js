const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    //0.-Establecer el modo del configurador
    mode: 'development',
    //1.- Especificamos el archivo de entrada 
    entry: './client/index.js',
    // 2.- Especificamos la salida
    output:{
        //3.-Ruta absoluta de salida 
        path: path.join(__dirname,'public'),
        // 4.-Nombre del archivo de salida
        filename:'js/bundle.js',
        //5.-Ruta del path publica para fines del servidor del desarrollo
        publicPath:'/'

    },
    module: {
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader:'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    'modules':false,
                                    'useBuiltIns' : 'usage',
                                    'targets': {"chrome": "80"},
                                    'corejs': 3
                                }
                            ]
                        ],
                        "plugins":[
                            [
                                "module-resolver",
                                {
                                    "root": ["./"],
                                    "alias": {
                                        "@client": "./client",
                                    }
                                }
                            ]
                        ]
                    }
                }]
            },
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        })
    ]
}