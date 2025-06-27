import { MockMethod } from "vite-plugin-mock";
import { User, UserListRequest } from "../src/types/user";
import { ApiResponse } from "../src/types/response";

// 模拟用户数据
const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  username: `user_${i + 1}`,
  email: `user_${i + 1}@example.com`,
  role: i % 2 === 0 ? "admin" : "user",
  status: i % 3 === 0 ? 0 : 1,
  createTime: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  updateTime: new Date().toISOString(),
}));

export default [
  // 用户登录
  {
    url: "/api/auth/login",
    method: "post",
    response: ({ body }: { body: { username: string; password: string } }): ApiResponse => {
      const { username, password } = body;
      const user = mockUsers.find(u => u.username === username);

      if (user && password === "123456") {
        return {
          code: 200,
          success: true,
          message: "登录成功",
          data: {
            token: "mock_token_" + Date.now(),
            user,
          },
        };
      }

      return {
        code: 401,
        success: false,
        message: "用户名或密码错误",
        data: null,
      };
    },
  },

  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: ({ headers }: { headers: { authorization?: string } }): ApiResponse => {
      if (!headers.authorization) {
        return {
          code: 401,
          success: false,
          message: "未登录",
          data: null,
        };
      }

      return {
        code: 200,
        success: true,
        message: "获取成功",
        data: mockUsers[0],
      };
    },
  },

  // 获取用户列表
  {
    url: "/api/user/list",
    method: "get",
    response: ({ query }: { query: UserListRequest }): ApiResponse => {
      const { page = 1, pageSize = 10, keyword = "", status } = query;

      let filteredUsers = [...mockUsers];

      // 关键字过滤
      if (keyword) {
        filteredUsers = filteredUsers.filter(user =>
          user.username.toLowerCase().includes(keyword.toLowerCase()) ||
          user.email.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      // 状态过滤
      if (status !== undefined) {
        filteredUsers = filteredUsers.filter(user => user.status === status);
      }

      // 分页
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const list = filteredUsers.slice(start, end);

      return {
        code: 200,
        success: true,
        message: "获取成功",
        data: {
          list,
          total: filteredUsers.length,
        },
      };
    },
  },
] as MockMethod[];