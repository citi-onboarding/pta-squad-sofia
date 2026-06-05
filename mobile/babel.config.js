// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@contexts': './src/contexts',
            '@icons':  './src/assets/icons',
            '@styles': './src/styles/theme',
          },
        },
      ],
      // Must be the last plugin (required by react-native-reanimated v4)
      'react-native-worklets/plugin',
    ],

  };
};