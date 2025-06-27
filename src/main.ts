import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "./store"; // 引入 Pinia store
import "element-plus/dist/index.css"; // Element Plus 样式
import "virtual:windi.css"; // Windi CSS 核心样式
import "./styles/main.css"; // 全局自定义样式（可选）

const app = createApp(App);
app.use(pinia); // 使用 Pinia store
app.use(router);
app.mount("#app");