<template>
  <section :class="`list_base theme-${props.theme}`">
    <input
      type="text"
      name="search"
      id="search"
      class="search_input"
      :placeholder="`Search Within ${props.listTitle}`"
      v-model="searchText"
    />
    <section class="list_base-header">
      <section class="list_base-header_title">
        <h3>{{ props.listTitle }}</h3>
        <span>({{ props.listItems.length }})</span>
      </section>
      <button
        type="button"
        :class="`btn btn-${props.theme}`"
        @click="isDialogOpen = true"
      >
        {{ props.buttonLabel }}
      </button>
    </section>
    <ul>
      <li v-for="item in listOutput" :key="item._id">
        <ItemBase
          :_id="item._id"
          :title="item.title"
          :calorie="item.calorie"
          @on-edit="handleEdit"
          @on-delete="handleDelete"
        />
      </li>
    </ul>
  </section>

  <DialogBase :is-dialog-open @on-close="handleClose">
    <FormBase
      :fields="dialogForms"
      :button-label="`Add ${props.listTitle}`"
      :theme="props.theme"
      @on-submit="addToList"
    ></FormBase>
  </DialogBase>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type {
  IListBaseProps,
  IInputShape,
  IListItemShape,
} from "../../types.ts";
import ItemBase from "./ItemBase.vue";
import DialogBase from "./DialogBase.vue";
import FormBase from "./FormBase.vue";
import { useMealStore } from "../../store/Meal";
import { useWorkoutStore } from "../../store/Workout";

const props = defineProps<IListBaseProps>();
const isDialogOpen = ref(false);
const handleClose = () => {
  isDialogOpen.value = false;
};

const dialogForms = ref<IInputShape[]>([
  { name: "name", type: "text", label: `${props.listTitle} Name` },
  { name: "calorie", type: "number", label: "Calorie" },
]);

const mealsStore = useMealStore();
const workoutsStore = useWorkoutStore();

async function addToList(values: string[]) {
  if (values.length === 2) {
    if (props.listTitle === "Meals") {
      await mealsStore.addMeals({
        _id: "",
        title: values[0],
        calorie: parseInt(values[1]),
      });
    }

    if (props.listTitle === "Workouts") {
      await workoutsStore.addWorkouts({
        _id: "",
        title: values[0],
        calorie: parseInt(values[1]),
      });
    }
    isDialogOpen.value = false;
  }
}
async function handleEdit(newObj: IListItemShape) {
  if (props.listTitle === "Meals") {
    await mealsStore.editMeals({ ...newObj });
  }
  if (props.listTitle === "Workouts") {
    await workoutsStore.editWorkouts({ ...newObj });
  }
}
async function handleDelete(id: string) {
  if (props.listTitle === "Meals") await mealsStore.deleteMeals(id);
  if (props.listTitle === "Workouts") await workoutsStore.deleteWorkouts(id);
}
const searchText = ref("");

const listOutput = computed(() => {
  if (searchText.value.trim() === "") return props.listItems;
  else
    return props.listItems.filter(
      (item) =>
        item.title.includes(searchText.value.toLocaleLowerCase()) ||
        item.calorie.toString().includes(searchText.value)
    );
});
</script>
