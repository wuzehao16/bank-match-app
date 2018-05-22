const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const requireHacker = require('require-hacker')
// const theme = require('./package.json').theme

function setupRequireHacker () {
  const webjs = '.web.js'
  const webModules = ['antd-mobile', 'rmc-picker'].map(m => path.join('node_modules', m))

  requireHacker.hook('js', filename => {
    if (filename.endsWith(webjs) || webModules.every(p => !filename.includes(p))) return

    const webFilename = filename.replace(/\.js$/, webjs)
    if (!fs.existsSync(webFilename)) return

    return fs.readFileSync(webFilename, { encoding: 'utf8' })
  })

  requireHacker.hook('svg', filename => {
    return requireHacker.to_javascript_module_source(`#${path.parse(filename).name}`)
  })
}

// setupRequireHacker()

function moduleDir (m) {
  return path.dirname(require.resolve(`${m}/package.json`))
}


module.exports = {
  webpack: (config, { dev }) => {
    // config.resolve.extensions = ['.web.js', '.js', '.json','.css','.less']

    config.module.rules.push(
      // {
      //   test: /\.(less)/,
      //   loader:'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      //   options:{
      //     javascriptEnabled: true
      //   }
      // },
      // {
      //   test: /\.(less)/,
      //   loader: "emit-file-loader",
      //   options: {
      //     name: "dist/[path][name].[ext]"
      //   }
      // },
      // {
      //   test: /\.less$/,
      //   use: ["babel-loader", "raw-loader", "less-loader"]
      // },
      {
        test: /\.(svg)$/i,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        },
        include: [
          moduleDir('antd-mobile'),
          __dirname
        ]
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          moduleDir('antd-mobile'),
          __dirname
        ]
      } 
    )
    return config
  }
}
