import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 5000,
});

// 请求拦截器（处理 token）
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器（处理业务状态码）
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.success) {
      ElMessage.error(res.message || "请求失败");
      return Promise.reject(new Error(res.message || "请求失败"));
    }

    return res;
  },
  (error) => {
    console.error("响应错误:", error);
    ElMessage.error(error.message || "网络异常，请稍后重试");
    return Promise.reject(error);
  }
);

export default service;