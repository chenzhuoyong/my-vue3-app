import { MockMethod } from "vite-plugin-mock";
import { ApiResponse } from "../src/types/response";

export default [
  // 应用基础信息
  {
    url: "/api/app/info",
    method: "get",
    response: (): ApiResponse => {
      return {
        code: 200,
        success: true,
        message: "获取成功",
        data: {
          name: "Vue3 Admin",
          version: "1.0.0",
          description: "基于 Vue3 + TypeScript + Vite 的后台管理系统",
        },
      };
    },
  },
] as MockMethod[];