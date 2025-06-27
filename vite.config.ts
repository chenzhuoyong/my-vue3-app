import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig({
  base: "/",
  resolve: {
    // 配置别名
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    dts({}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"], // 自动导入 Vue 和 Vue Router 的方法
      dts: "src/auto-imports.d.ts", // 自动生成类型声明文件
    }),
    // 按需加载 Element Plus 组件
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      enable: true, // 启用 Mock 功能
      mockPath: "mock", // mock 文件存放目录
      watchFiles: true, // 监听文件变化
      logger: true, // 控制台显示请求日志
    }),
  ],
});