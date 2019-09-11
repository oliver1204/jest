import { getDataThroughCallback, getDataThroughPromise } from '../3.async.js';

it('测试 传人Callback是否能拿到最终结果', (done) => {
  expect.assertions(1)
  getDataThroughCallback(data => {
    expect(data).toEqual({ name: "lzr" });
    done(); // 标识调用完成
  })
})

it('测试 传人Promise是否能拿到最终结果', () => {
  expect.assertions(1)
  return getDataThroughPromise().then(data => {
    expect(data).toEqual({ name: "lzr" });
  })
})
// 仅测试一个用例
it.only('测试 传人Promise是否能拿到最终结果', async () => {
  expect.assertions(1)
  
  let data = await getDataThroughPromise()
  expect(data).toEqual({ name: "lzr" });
})