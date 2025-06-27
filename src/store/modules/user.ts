import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login, getUserInfo, getUserList } from "@/api/auth";
import { User, UserListRequest } from "@/types/user";

export const useUserStore = defineStore("user", () => {
  // 状态
  const userInfo = ref<any>(null);
  const isLoggedIn = ref(false);
  const userList = ref<User[]>([]);
  const total = ref(0);

  // Getters
  const username = computed(() => userInfo.value?.username || "");

  // Actions
  const loginAction = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await login(credentials);
      localStorage.setItem("token", response.data.token);
      await fetchUserInfo();
      isLoggedIn.value = true;
      return true;
    } catch (error) {
      console.error("登录失败", error);
      return false;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      userInfo.value = response.data;
    } catch (error) {
      console.error("获取用户信息失败", error);
    }
  };

  const fetchUserList = async (params: UserListRequest) => {
    try {
      const response = await getUserList(params);
      userList.value = response.data.list || [];
      total.value = response.data.total || 0;
    } catch (error) {
      userList.value = [];
      total.value = 0;
      console.error("获取用户列表失败", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    userInfo.value = null;
    isLoggedIn.value = false;
  };

  return {
    userInfo,
    isLoggedIn,
    userList,
    total,
    username,
    loginAction,
    fetchUserInfo,
    fetchUserList,
    logout,
  };
});