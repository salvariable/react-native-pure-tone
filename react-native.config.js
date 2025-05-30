module.exports = {
  dependencies: {
    'react-native-pure-tone': {
      platforms: {
        android: {
          sourceDir: './android',
        },
        ios: {
          podspecPath: './react-native-pure-tone.podspec',
        },
      },
    },
  },
};
