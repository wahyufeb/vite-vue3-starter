import Axios from 'axios';
import { ElMessage } from 'element-plus';
const baseURL = 'https://api.github.com';
const axios = Axios.create({
  baseURL,
  timeout: 20000
});

// Intercept before sending HTTP requests
axios.interceptors.request.use(
  (response) => {
    /**
     * config process here
     */
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept after receiving HTTP response
axios.interceptors.response.use(
  (response) => {
    /**
     * config process here
     */
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(`Code: ${code}, Message: ${msg}`);
      console.error(`[Axios Error]`, error.response);
    } else {
      ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  }
);

export default axios;
