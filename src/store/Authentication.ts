import { defineStore } from "pinia";
import axiosIns from "../axios/instance";
import { AxiosResponse } from "axios";
import { computed, ref } from "vue";

interface ILoginResponse {
  success: boolean;
  message: string;
  data: { token: string; expiresIn: Number };
}
interface ISignupResponse {
  success: boolean;
  message: string;
  data: { token: string; expiresIn: Number };
}
const useAuthStore = defineStore("authSore", () => {
  const isLoggedIn = ref(false);

  const getIsLoggedIn = computed(() => isLoggedIn.value);

  const signup = async (email: string, password: string) => {
    try {
      const postSignup = (await axiosIns.post("/api/v1/auth/signup", {
        email,
        password,
      })) as AxiosResponse<ISignupResponse>;

      return postSignup.data;
    } catch (e: any) {
      const errText = e.response.data.message;
      throw new Error(errText);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const postLogin = (await axiosIns.post("/api/v1/auth/login", {
        email,
        password,
      })) as AxiosResponse<ILoginResponse>;

      isLoggedIn.value = true;
      return postLogin.data;
    } catch (e: any) {
      const errText = e.response.data.message;
      throw new Error(errText);
    }
  };

  const isUserAuthenticatedCheck = () => {
    const localData = localStorage.getItem("auth") || undefined;
    if (localData) {
      const savedAuthInfo = JSON.parse(localData) as {
        token: string;
        expiresIn: number;
      };
      if (Date.now() > savedAuthInfo.expiresIn) {
        return false;
      }
      isLoggedIn.value = true;
      return savedAuthInfo.token;
    }
  };

  // instead of setting all states to 0 or null,
  // I prefer to remove token and reload current window,
  // so no information could be retrieved
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const flush = async () => {
    const token = isUserAuthenticatedCheck()!;
    if (token) {
      try {
        await axiosIns.get("/api/v1/flush", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // still prefer to refresh browser :)
        window.location.reload();
      } catch (e: any) {
        const errMsg = e.response.data.message;
        throw new Error(errMsg);
      }
    }
  };
  return {
    signup,
    login,
    isUserAuthenticatedCheck,
    getIsLoggedIn,
    flush,
    logout,
  };
});

export { useAuthStore };
