module.exports = {
  presets: ['module:metro-react-native-babel-preset', "babel-preset-expo"],
  plugins: [
    [
        'react-native-reanimated/plugin', {
            relativeSourceLocation: true,
        },
    ],
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
    }]
  ],
};
