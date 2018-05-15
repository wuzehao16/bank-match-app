const withWorkbox = require('next-workbox')
const withCSS = require('@zeit/next-css')
module.exports = withWorkbox(withCSS())
