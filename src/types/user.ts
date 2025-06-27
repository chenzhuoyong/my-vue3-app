// 用户信息接口
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: number;
  createTime: string;
  updateTime: string;
}

// 用户列表请求参数
export interface UserListRequest {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: number;
}

// 用户列表响应
export interface UserListResponse {
  list: User[];
  total: number;
}
