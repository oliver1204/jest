// 测试用例的写法 
// babel转义语法 babel-jest 
// @babel/core @babel/preset-env

import { parser, stringify } from '../1.qs.js';
// describe 是分组
// it 用例
describe('测试qs库是否合法', () => {
  it('测试parser是否能解析数据', () => {
    // 断言
    // toEqual 对象相等
    expect(parser("name=lzr&age=20")).toEqual({name:'lzr', age: "20"})
  }) 
  it('测试stringify是否符合功能', () => {
    // toBe => ===
    expect(stringify({name: 'lzr', 'age': 20})).toBe('name=lzr&age=20')
  }) 
})
