<template>
  <main class="home_view container">
    <section class="home_view-header_grid">
      <section class="header_grid-daily_limit primary">
        <span>3000</span>
        <h3>Daily Calorie Limit</h3>
      </section>
      <section class="header_grid-gain_loss primary">
        <span>3000</span>
        <h3>Gain/Loss</h3>
      </section>
      <section class="header_grid-calories_consumed secondary">
        <span>3000</span>
        <h3>Calories Consumed</h3>
      </section>
      <section class="header_grid-calories_burned secondary">
        <span>3000</span>
        <h3>Calories Burned</h3>
      </section>
      <section class="header_grid-calories_remaining secondary">
        <span>3000</span>
        <h3>Calories Remaining</h3>
      </section>
    </section>

    <section class="progress_container">
      <progress value="1000" max="3000"></progress>
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
import ListBase from "../components/UI/ListBase.vue";
import type { IListBaseProps } from "../types.ts";
const lists = ref<IListBaseProps[]>([
  {
    listTitle: "Meals",
    theme: "green",
    buttonLabel: "Add Meals",
    listItems: [],
  },
  {
    listTitle: "Workouts",
    theme: "orange",
    buttonLabel: "Add Workouts",
    listItems: [],
  },
]);
</script>
