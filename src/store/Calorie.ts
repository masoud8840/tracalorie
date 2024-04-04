import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ICalorie } from "../types.ts";
import { useAuthStore } from "./Authentication.ts";
import axiosIns from "../axios/instance.ts";
import { AxiosResponse } from "axios";

interface ICalorieResponse {
  count: number;
  success: boolean;
  calories: ICalorie;
}

interface IPostCalorieResponse {
  success: boolean;
  data: {
    calories: ICalorie;
  };
  message: string;
}
const useCalorieStore = defineStore("calorieStore", () => {
  const authStore = useAuthStore();

  const calorie = ref<ICalorie>();

  const getCalorie = computed(() => {
    return calorie.value;
  });

  const fetchCalorie = async () => {
    const token = authStore.isUserAuthenticatedCheck();

    if (token) {
      try {
        const res = (await axiosIns.get("/api/v1/calories", {
          headers: { Authorization: `Bearer ${token}` },
        })) as AxiosResponse<ICalorieResponse>;

        calorie.value = {
          burned: res.data.calories.burned,
          limit: res.data.calories.limit,
          consumed: res.data.calories.consumed,
          gain_loss: res.data.calories.gain_loss,
          remaining: res.data.calories.remaining,
        };
      } catch (e: any) {
        const errMsg = e.response.data.message;
        throw new Error(errMsg);
      }
    }
  };

  const editCalories = async (limit: number) => {
    const token = authStore.isUserAuthenticatedCheck()!;
    try {
      const res = (await axiosIns.post(
        "/api/v1/calories",
        {
          limit,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )) as AxiosResponse<IPostCalorieResponse>;
      calorie.value = { ...res.data.data.calories };
      return res.data.message;
    } catch (e: any) {
      const errMsg = e.response.data.message;
      throw new Error(errMsg);
    }
  };

  return {
    fetchCalorie,
    getCalorie,
    calorie,
    editCalories,
  };
});

export { useCalorieStore };
