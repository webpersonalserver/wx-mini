/**
 * webpack配置文件
 */
import path, {
  resolve
} from 'path';
import { DefinePlugin, EnvironmentPlugin } from 'webpack';
import webpack from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import uglifyPlugin from 'uglifyjs-webpack-plugin';

const { NODE_ENV } = process.env;
const environment = NODE_ENV;
const srcDir = resolve('src');
const relativeFileLoader = (ext = '[ext]') => {
  return {
    loader: 'file-loader',
    options: {
      useRelativePath: true,
      name: `[name].${ext}`,
      context: srcDir
    }
  };
};

export default {
  entry: {
    app: [
      `es6-promise/dist/es6-promise.auto${JSON.stringify(environment) === 'development' ? '.min' : ''}.js`,
      './src/app.js',
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: resolve('dist'),
  },
  resolve: {
    modules: [resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'src': resolve(__dirname, './src'),
      'components': resolve(__dirname, './src/components'),
      'images': resolve(__dirname, './src/images'),
      'sass': resolve(__dirname, './src/sass')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: /src/,
        use: [
          'babel-loader'
        ].filter(Boolean)
      },
      {
        test: /\.js$/,
        include: /src/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: /src/,
        use: relativeFileLoader()
      },
      {
        test: /\.json$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
          {
            loader: 'webpack-comment-remover-loader',
            options: {
              includePaths: [
                resolve('src'),
              ],
            },
          },
        ].filter(Boolean)
      },
      {
        test: /\.(scss|wxss)$/,
        include: /src/,
        use: [
          relativeFileLoader('wxss'),
          {
            loader: 'sass-loader',
            options: {
              includePaths: [resolve('src', 'styles'), srcDir]
            }
          }
        ]
      },
      {
        test: /\.(wxml|axml|xml)$/,
        include: /src/,
        use: [
          relativeFileLoader('wxml'),
          {
            loader: 'wxml-loader',
            options: {
              root: srcDir,
              enforceRelativePath: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new DefinePlugin({
      ENVIRONMENT: JSON.stringify(environment)
    }),
    new CopyWebpackPlugin([{
        from: __dirname + '/src/images',
        to: __dirname + '/dist/images'
      },
      {
        from: __dirname + '/src/components',
        to: __dirname + '/dist/components'
      },
      {
        from: '**/*.wxml',
        to: 'pages',
        context: path.join(__dirname, 'src/pages')
      }
    ], {
      ignore: [
        '**/*.scss',
        '**/*.js'
      ]
    }),
    new WXAppWebpackPlugin(),
    new uglifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: NODE_ENV === 'development' ? false : true,
        drop_console: NODE_ENV === 'development' ? false : true
      }
    })
  ],
  watchOptions: {
    ignored: /dist|manifest/,
    aggregateTimeout: 300,
  }
};