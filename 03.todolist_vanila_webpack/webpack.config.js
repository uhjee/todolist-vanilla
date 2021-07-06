// import
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    // 경로에서 확장자 생략 설정
    extensions: ['tsx', '.ts', '.js'],
    // 경로 별칭 설정
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  entry: './src/index.ts',
  // entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // nodeJS에서 필요로하는 절대경로
    filename: 'main.js',
    clean: true, // 기존 번들링 아웃풋 삭제 후, 새로운 번들링 아웃풋 반환(webpack 5부터 지원)
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], // 순서 중요(뒤에서부터 적용)
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    //
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyPlugin({ patterns: [{ from: 'static' }] }),
  ],
};
