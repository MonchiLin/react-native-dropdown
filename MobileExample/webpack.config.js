const path = require('path');
const fs = require('fs');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const packageJSON = require('./package.json');

const pathGET = (dep) => {
  if (fs.existsSync(path.resolve('node_modules/' + dep))) {
    return path.resolve('node_modules/' + dep);
  } else {
    return path.resolve('..', '..', 'node_modules/', dep);
  }
};

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  Object.keys(packageJSON.dependencies).forEach((dep) => {
    if (config.resolve.alias[dep]) {
      return;
    }
    config.resolve.alias[dep] = pathGET(dep);
  });

  config.resolve.alias['react-native-vector-icons'] =
    pathGET('@expo/vector-icons');

  return config;
};
