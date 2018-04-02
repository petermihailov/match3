module.exports = ({file, options, env}) => ({
  plugins: {
    'autoprefixer': {
      'browsers': ['last 2 versions', 'not ie <= 11', 'not ie_mob <= 11'],
      'grid': true,
      'flexbox': 'no-2009'
    },
    'postcss-preset-env': {},
    'precss': {}
  }
});
