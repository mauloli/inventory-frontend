import axios from 'axios';
import { useRouter } from 'next/navigation';

const axiosApiIntances = axios.create({
  baseURL: 'http://localhost:3030'
});
// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return config;
  },
  function (error) {
    const router = useRouter('/login');
    if (error.response.data.className == 'not-authenticated') {
      router.push('/login');
    } return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // if (error.response.status === 403) {
    //   alert(error.response.data.msg);
    //   localStorage.clear();
    //   window.location.replace("/login");
    // }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosApiIntances;
