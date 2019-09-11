// 传入callback 1s后获取最终数据
export const getDataThroughCallback = fn => {
  setTimeout(() => {
    fn({ name: "lzr" });
  }, 1000);
};
// 获取数据通过promise的方式
export const getDataThroughPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "lzr" });
    }, 1000);
  });
};