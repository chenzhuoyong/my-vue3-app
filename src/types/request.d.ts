// 请求配置
export interface RequestConfig extends AxiosRequestConfig {
  // 自定义配置
  showLoading?: boolean;
  showError?: boolean;
}

// 响应数据
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}