const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString(),
    priority: 1.0,
  },
  {
    path: "/about",
    lastmod: new Date().toISOString(),
    priority: 0.8,
  },
];

module.exports = {
  entry: "./src/index.tsx",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },

  plugins: [
    new SitemapPlugin({ base: "http://localhost:3000", paths }),
    new ForkTsCheckerWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
  },
  
  resolve: {
    extensions: [".jsx", ".js", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "swc-loader",
      },
      {
        test: /\.css$/, // CSS 파일에 대한 정규식 패턴
        use: [
          "style-loader", // 스타일 태그를 생성하여 DOM에 적용
          "css-loader", // CSS를 CommonJS 모듈로 변환
          "postcss-loader", // postcss를 CSS로 컴파일
        ],
      },
    ],
  },
};
