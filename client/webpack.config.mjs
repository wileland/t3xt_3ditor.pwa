import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackPwaManifest from "webpack-pwa-manifest";
import path from "path";
import { GenerateSW } from "workbox-webpack-plugin";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const plugins = [
  new HtmlWebpackPlugin({
    template: "./index.html",
    title: "Text Editor PWA",
  }),
  new WebpackPwaManifest({
    fingerprints: false,
    inject: true,
    name: "Text Editor PWA",
    short_name: "TextEditor",
    description: "A browser-based text editor that runs as a PWA",
    background_color: "#225ca3",
    theme_color: "#225ca3",
    start_url: ".",
    publicPath: ".",
    icons: [
      {
        src: "./src/assets/icons/logo.png",
        sizes: [96, 128, 192, 256, 384, 512],
        destination: "assets/icons",
      },
    ],
  }),
  new GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    exclude: [/\.map$/, /manifest$/, /\.htaccess$/],
  }),
];

export default {
  mode: "development",
  entry: {
    main: "./src/js/index.js",
    install: "./src/js/install.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    port: 3001,
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
