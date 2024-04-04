import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./Authentication.ts";
import axiosIns from "../axios/instance.ts";
import { AxiosResponse } from "axios";
import { IWorkout } from "../types.ts";
import { useCalorieStore } from "./Calorie.ts";

interface IWorkoutResponse {
  success: boolean;
  data: {
    data: IWorkout[];
    count: number;
  };
  message: string;
}

interface IWorkoutPostResponse {
  success: boolean;
  data: {
    data: IWorkout;
  };
  message: string;
}

const useWorkoutStore = defineStore("workoutStore", () => {
  const authStore = useAuthStore();

  const workouts = ref<IWorkout[]>([]);

  const getWorkouts = computed(() => workouts.value);

  const addWorkouts = async (newObj: IWorkout) => {
    const token = authStore.isUserAuthenticatedCheck()!;
    const calorieStore = useCalorieStore();
    if (token) {
      try {
        const res = (await axiosIns.post("/api/v1/workouts", newObj, {
          headers: { Authorization: `Bearer ${token}` },
        })) as AxiosResponse<IWorkoutPostResponse>;

        const { _id, title, calorie } = res.data.data.data;
        workouts.value.push({ _id, title, calorie });
        await calorieStore.fetchCalorie();
      } catch (e: any) {
        const strError = e.response.data.message;
        throw new Error(strError);
      }
    }
  };
  const fetchWorkouts = async () => {
    const token = authStore.isUserAuthenticatedCheck()!;

    if (token) {
      try {
        const res = (await axiosIns.get("/api/v1/workouts", {
          headers: { Authorization: `Bearer ${token}` },
        })) as AxiosResponse<IWorkoutResponse>;

        workouts.value = res.data.data.data;
      } catch (e: any) {
        const strError = e.response.data.message;
        throw new Error(strError);
      }
    }
  };
  const editWorkouts = async (newObj: IWorkout) => {
    const token = authStore.isUserAuthenticatedCheck()!;
    const calorieStore = useCalorieStore();

    if (token) {
      try {
        const res = (await axiosIns.put(
          `/api/v1/workouts/${newObj._id}`,
          {
            title: newObj.title,
            calorie: newObj.calorie,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )) as AxiosResponse<IWorkoutPostResponse>;

        const { _id, title, calorie } = res.data.data.data;

        const foundMeal = workouts.value?.find(
          (wokrout) => wokrout._id === _id
        );
        foundMeal!.title = title;
        foundMeal!.calorie = calorie;
        await calorieStore.fetchCalorie();
      } catch (e: any) {
        const errMsg = e.response.data.message;
        throw new Error(errMsg);
      }
    }
  };

  const deleteWorkouts = async (id: string) => {
    const token = authStore.isUserAuthenticatedCheck()!;
    const calorieStore = useCalorieStore();

    if (token) {
      try {
        // no need to specify request type (we don't need response even)
        await axiosIns.delete(`/api/v1/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const deleteWorkoutIndex = workouts.value!.findIndex(
          (wokrout) => wokrout._id === id
        );

        workouts.value.splice(deleteWorkoutIndex!, 1);
        await calorieStore.fetchCalorie();
      } catch (e: any) {
        const errMsg = e.response.data.message;
        throw new Error(errMsg);
      }
    }
  };
  return {
    addWorkouts,
    fetchWorkouts,
    editWorkouts,
    deleteWorkouts,
    getWorkouts,
  };
});

export { useWorkoutStore };
