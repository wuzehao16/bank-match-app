const withOffline = require('next-offline')

const withCSS = require('@zeit/next-css')
const path = require('path')
const fs = require('fs')

function moduleDir(m) {
  return path.dirname(require.resolve(`${m}/package.json`))
}

module.exports = withOffline(withCSS({
  webpack: (config, { dev }) => {
    config.resolve.extensions = ['.web.js', '.js', '.json']

    config.module.rules.push(
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
}))
