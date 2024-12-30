import { host } from "./config";
import axios from "axios";
import { errorAlert } from "@/utils/alert"; // Import errorAlert from the new utility

const instance = axios.create({
  timeout: 100000,
  //允许携带cookie
  withCredentials: true,
});

// request拦截器
instance.interceptors.request.use(async (config) => {
  config.headers["access-token"] = window.localStorage.getItem("access-token");
  return config;
});

export const ajax = (opts = {}) =>
  new Promise((resolve, reject) => {
    const { url } = opts;
    instance({
      url: host + url,
      method: opts.method || "GET",
      headers: {
        "content-type": "application/json",
        "Cache-Control": "no-transform",
        ...opts.headers,
      },
      data: opts.data || {},
      params: opts.params,
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        }
      })
      .catch((e) => {
        errorAlert("请求失败"); // Use errorAlert from the new utility
        reject(e);
      });
  });
