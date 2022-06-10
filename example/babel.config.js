module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    'plugins': [
      ['module-resolver',
        {
          alias: {
            '@monchilin/react-native-dropdown': './src/Dropdown',
          }
        }
      ]
    ]
  };
};
