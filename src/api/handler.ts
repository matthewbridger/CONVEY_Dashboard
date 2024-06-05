import axios from "axios";

export default (): any => {
  const instance = axios.create({ 
    baseURL: '/api/v1/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    response => {
      if (response.status) {
        return Promise.resolve(response);
      }
      else {
        return Promise.reject(response);
      }
    },
    error => {
      return Promise.reject(error);
    }
  )

  return instance;
};