var buildExtension = require('@jupyterlab/extension-builder').buildExtension;
var parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2));

// TODO: can we just make this use webpack instead?
buildExtension({

  name: 'jupyterlab_circuits',
  entry: './src/plugin.tsx',
  outputDir: './jupyterlab_circuits/static',
  useDefaultLoaders: false,

  config: {

    watch: argv.watch === "true",

    devtool: 'source-map',

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.svg']
    },

    module: {
      loaders: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        //{ test: /\.svg$/, loader: 'url-loader?mimetype=image:svg+xml' }
        //{ test: /\.svg$/, loader: 'react-svg-loader?jsx=1' }
        { test: /\.svg$/, loader: 'file-loader?name=[name].[ext]' }
      ],
      preLoaders: [
        // { test: /\.js$/, loader: 'source-map-loader' }
      ]
    }
  }
});
