const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const packageJSON = require('./package.json');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  Object.keys(packageJSON.dependencies)
    .forEach(dep => {
      if (config.resolve.alias[dep]) {
        return;
      }
      config.resolve.alias[dep] = path.resolve('node_modules/' + dep);
    });

  return config;
};
