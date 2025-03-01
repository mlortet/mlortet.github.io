const path = require("path");
const serverConfig = {
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.node.js",
  },
};

const clientConfig = {
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "lib.js",
  },
};

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};

module.exports = [serverConfig, clientConfig];
