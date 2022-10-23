const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.(graphql)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-typescript', '@babel/preset-react'],
              },
            },
            { loader: 'graphql-let/loader' },
          ],
        },
      ],
    },
  });
};
