const expectExport = require("expect")

// 匹配 相等 不相等 包含

it('测试两个人是否全等', () => {
  expect(1+1).toBe(2); // js 中的 ===
  expect({ name: 1 }).toEqual({ name: 1 });
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
})


it('测试不相等', () => {
  expect(1+1).not.toBe(3); 
  expect(3).toBeLessThan(5);
  expect(10).toBeGreaterThan(5);
})

it('测试包含', () => {
  expect('hello world').toContain('hello'); 
  expect('hello world').toMatch(/hello/); 
})

 