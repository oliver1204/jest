module.exports = {
  moduleFileExtensions: [ // 支持的后缀
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: { // 测试的时候如何转化
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [ // jest 快照
    'jest-serializer-vue'
  ],
  testMatch: [ // 测试当前匹配的目录
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [ // 提示工具
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
