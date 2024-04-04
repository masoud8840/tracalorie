<template>
  <main class="home_view container">
    <section class="home_view-header_grid">
      <section class="header_grid-daily_limit primary">
        <span>{{ calorieStore.getCalorie?.limit || 0 }}</span>
        <h3>Daily Calorie Limit</h3>
      </section>
      <section class="header_grid-gain_loss primary">
        <span>{{ calorieStore.getCalorie?.gain_loss || 0 }}</span>
        <h3>Gain/Loss</h3>
      </section>
      <section class="header_grid-calories_consumed secondary">
        <span>{{ calorieStore.getCalorie?.consumed || 0 }}</span>
        <h3>Calories Consumed</h3>
      </section>
      <section class="header_grid-calories_burned secondary">
        <span>{{ calorieStore.getCalorie?.burned || 0 }}</span>
        <h3>Calories Burned</h3>
      </section>
      <section class="header_grid-calories_remaining secondary">
        <span>{{ calorieStore.getCalorie?.remaining || 0 }}</span>
        <h3>Calories Remaining</h3>
      </section>
    </section>

    <section class="progress_container">
      <progress
        :value="
          (calorieStore.getCalorie?.limit || 0) -
          (calorieStore.getCalorie?.remaining || 0)
        "
        :max="calorieStore.getCalorie?.limit"
      ></progress>
    </section>
    <section class="meals_workouts">
      <ListBase
        v-for="(list, index) in lists"
        :key="index"
        :list-title="list.listTitle"
        :button-label="list.buttonLabel"
        :list-items="list.listItems"
        :theme="list.theme"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ListBase from "../UI/ListBase.vue";
import { IListBaseProps } from "../../types";
import { useWorkoutStore } from "../../store/Workout";
import { useMealStore } from "../../store/Meal";
import { useCalorieStore } from "../../store/Calorie";

const mealStore = useMealStore();
const workoutStore = useWorkoutStore();
const calorieStore = useCalorieStore();

await mealStore.fetchMeals();
await workoutStore.fetchWorkouts();
await calorieStore.fetchCalorie();

const lists = ref<IListBaseProps[]>([
  {
    listTitle: "Meals",
    theme: "green",
    buttonLabel: "Add Meals",
    listItems: mealStore.getMeals,
  },
  {
    listTitle: "Workouts",
    theme: "orange",
    buttonLabel: "Add Workouts",
    listItems: workoutStore.getWorkouts,
  },
]);
</script>
