import axios from "axios";
import { sleep } from "./utils";

const LOG_ROOT = "[HTTP]";

axios.interceptors.request.use(
  async (config) => {
    console.info(`${LOG_ROOT} ${config.method?.toUpperCase()} "${config.url}"`);
    return config;
  },
  (error) => {
    console.error(`${LOG_ROOT} error`, error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000); // simulate slow network
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);
