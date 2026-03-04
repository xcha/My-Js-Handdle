// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead', 'ie >= 11']
        },
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3,            // 指定 core-js 版本
        modules: false        // 保留 ES6 模块语法（利于 tree shaking）
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // 避免 polyfill 污染全局
  ]
}