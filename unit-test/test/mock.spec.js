// jest.mock('../4.mock.js'); // 使用 __mocks__ 下得文件
import { forEach, fetchUser, fetchList, mockTimer } from '../4.mock.js';

// let { forEach, mockTimer } = jest.requireActual('../4.mock.js')

/**
 * mock 的方式：
 * 1. jest.mock 函数 mock文件
 * 2. mock 某个第三方文件，比如 axios.js
 */

it('测试forEach是否靠谱', () => {
  // mock 函数： mock 出来的函数 可以记录状态、记录调用时的参数

  let fn = jest.fn();
  forEach([1, 2, 3], fn);
  expect(fn.mock.calls.length).toBe(3);
  expect(fn.mock.calls[0][0]).toBe(1);
  expect(fn.mock.calls[1][0]).toBe(2);
  expect(fn.mock.calls[2][0]).toBe(3);
}) 

it('测试fetchUser是否靠谱', async () => {
  expect.assertions(1)
  let data = await fetchUser();
  expect(data).toEqual({ name: 'lzr' });
})

it('测试fetchList 能否获取路径', async () => {
  let data = await fetchList();
  expect(data).toEqual([1, 2, 3]);
}) 

// mcok 定时器
jest.useFakeTimers();
it('测试mockTimer 时间到达后可以调用方法', async () => {
  let fn = jest.fn();
  mockTimer(fn);
  // jest.runAllTimers();
  // jest.runOnlyPendingTimers();// 只执行一次
  // expect(fn).toBeCalled();


  jest.advanceTimersByTime(4000);
  expect(fn).toBeCalledTimes(2);
}) 