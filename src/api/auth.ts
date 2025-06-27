import { ApiResponse, PaginationResponse } from "@/types";
import { User, UserListRequest } from "@/types/user";
import request from "@/utils/request";

// 用户登录
export const login = (credentials: { username: string; password: string }) => {
  return request({
    url: "/auth/login",
    method: "post",
    data: credentials,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: "/user/info",
    method: "get",
  });
};

// 获取用户列表
export const getUserList = (params: UserListRequest) => {
  return request({
    url: "/user/list",
    method: "get",
    params, // 自动转换为查询字符串
  });
};

// // 获取用户列表
// export const getUserList = (
//   params: UserListRequest
// ): Promise<ApiResponse<PaginationResponse<User>>> => {
//   return request({
//     url: "/user/list",
//     method: "get",
//     params, // 自动转换为查询字符串
//   });
// };
