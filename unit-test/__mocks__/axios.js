export default {
  get(url) {
    return new Promise((resolve, reject) => {
      if(url === '/user') {
        resolve({ name: 'lzr' })
      } else if(url === '/list') {
        resolve([1, 2, 3])
      }
    })
  }
}