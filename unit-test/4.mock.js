import axios from 'axios';
export const forEach = (arr, fn) => {
  arr.forEach(fn);
};

export const fetchUser = () => {
  return axios.get("/user");
};
export const fetchList = () => {
  return axios.get("/list");
};

export const mockTimer = callback => {
  setInterval(() => {
    callback();
  }, 2000);
};

// 30分钟