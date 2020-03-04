const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = {
  paths: function(paths) {
    paths.appIndexJs = path.resolve(__dirname, "src/client/index.tsx");
    paths.appSrc = path.resolve(__dirname, "src");
    paths.appBuild = path.resolve(__dirname, "dist/client");
    return paths;
  },
  webpack: function(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(
      plugin => !plugin instanceof ModuleScopePlugin
    );
    return config;
  }
};
