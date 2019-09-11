import Counter from './hook';

// it('测试 Counter 增加 1 的功能', () => {
//   let counter = new Counter; // 每个测试用例都需要创建一个counter实例，防止相互影响
//   counter.add(1);
//   expect(counter.count).toBe(1)
// })

// it('测试 Counter 增加 2 的功能', () => {
//   let counter = new Counter; // 每个测试用例都需要创建一个counter实例，防止相互影响
//   counter.add(2);
//   expect(counter.count).toBe(2)
// })

let counter = null;

beforeAll(() => {
  console.log('before All');
})

afterAll(() => {
  console.log('after All');
})

beforeEach(() => {
  console.log('before Each');
  let counter = new Counter;
})

afterEach(() => {
  console.log('after Each');
})

it('测试 Counter 增加 1 的功能', () => {
  counter.add(1);
  expect(counter.count).toBe(1)
})

it('测试 Counter 增加 2 的功能', () => {
  counter.add(2);
  expect(counter.count).toBe(2)
})