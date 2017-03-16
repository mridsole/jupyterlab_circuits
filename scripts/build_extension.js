var buildExtension = require('@jupyterlab/extension-builder').buildExtension;
var parseArgs = require('minimist');

const argv = parseArgs(process.argv.slice(2));

// TODO: can we just make this use webpack instead?
buildExtension({

  name: 'jupyterlab_circuits',
  entry: './src/plugin.tsx',
  outputDir: './jupyterlab_circuits/static',

  config: {

    watch: argv.watch === "true",

    devtool: 'source-map',

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
      loaders: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ],
      preLoaders: [
        // Produces annoying warnings, but still could be useful for debugging
        //{ test: /\.js$/, loader: 'source-map-loader' }
      ]
    }
  }
});
