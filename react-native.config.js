module.exports = {
  dependencies: {
    'react-native-pure-tone': {
      platforms: {
        ios: null, // uses CocoaPods
        android: {
          sourceDir: './android',
        },
      },
    },
  },
};
