import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./Authentication.ts";
import axiosIns from "../axios/instance.ts";
import { AxiosResponse } from "axios";
import { IMeal } from "../types.ts";
import { useCalorieStore } from "./Calorie.ts";

interface IMealsResponse {
  success: boolean;
  data: {
    data: IMeal[];
    count: number;
  };
  message: string;
}
interface IMealPostResponse {
  success: boolean;
  data: {
    data: IMeal;
  };
  message: string;
}

const useMealStore = defineStore("mealStore", () => {
  const authStore = useAuthStore();

  const meals = ref<IMeal[]>([]);

  const getMeals = computed(() => meals.value);

  const addMeals = async (newObj: IMeal) => {
    const calorieStore = useCalorieStore();
    const token = authStore.isUserAuthenticatedCheck()!;
    if (token) {
      try {
        const res = (await axiosIns.post("/api/v1/meals", newObj, {
          headers: { Authorization: `Bearer ${token}` },
        })) as AxiosResponse<IMealPostResponse>;

        const { _id, title, calorie } = res.data.data.data;
        meals.value.push({ _id, title, calorie });

        await calorieStore.fetchCalorie();
      } catch (e: any) {
        const strError = e.response.data.message;
        throw new Error(strError);
      }
    }
  };

  const fetchMeals = async () => {
    const token = authStore.isUserAuthenticatedCheck()!;

    if (token) {
      try {
        const res = (await axiosIns.get("/api/v1/meals", {
          headers: { Authorization: `Bearer ${token}` },
        })) as AxiosResponse<IMealsResponse>;

        meals.value = res.data.data.data;
      } catch (e: any) {
        const strError = e.response.data.message;
        throw new Error(strError);
      }
    }
  };

  const editMeals = async (newObj: IMeal) => {
    const token = authStore.isUserAuthenticatedCheck()!;
    const calorieStore = useCalorieStore();
    if (token) {
      try {
        const res = (await axiosIns.put(
          `/api/v1/meals/${newObj._id}`,
          {
            title: newObj.title,
            calorie: newObj.calorie,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )) as AxiosResponse<IMealPostResponse>;

        const { _id, title, calorie } = res.data.data.data;

        const foundMeal = meals.value?.find((meal) => meal._id === _id);
        foundMeal!.title = title;
        foundMeal!.calorie = calorie;

        await calorieStore.fetchCalorie();
      } catch (e: any) {
        const errMsg = e.response.data.message;
        throw new Error(errMsg);
      }
    }
  };

  const deleteMeals = async (id: string) => {
    const token = authStore.isUserAuthenticatedCheck()!;
    const calorieStore = useCalorieStore();

    if (token) {
      try {
        // no need to specify request type (we don't need response even)
        await axiosIns.delete(`/api/v1/meals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const deletedMealIndex = meals.value?.findIndex(
          (meal) => meal._id === id
        );

        meals.value.splice(deletedMealIndex!, 1);
        await calorieStore.fetchCalorie();
      } catch (e: any) {
        const errMsg = e.response.data.message;
        throw new Error(errMsg);
      }
    }
  };

  return { addMeals, fetchMeals, editMeals, deleteMeals, getMeals };
});

export { useMealStore };
