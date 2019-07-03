module: {
    rules: [{
        loader: 'vue-loader',
        include: commonPath.src,
        exclude: /node_modules/
    },{
        test: /\.js$/,
        loader: 'babel-loader',
        include: commonPath.src,
        exclude: /node_modules/
    },{
        test: /\.html$/,
        loader: 'html-loader'
    },{
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
            limit: 10240, 
            name: 'img/[name]-[hash:6].[ext]'
        }
    },{
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options:{
            limit: 10240, 
            name: 'fonts/[name]-[hash:6].[ext]'
        }
    },{
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }, {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    }, {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    }],
}