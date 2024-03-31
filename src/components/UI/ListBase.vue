<template>
  <section :class="`list_base theme-${props.theme}`">
    <input
      type="text"
      name="search"
      id="search"
      class="search_input"
      :placeholder="`Search Within ${props.listTitle}`"
    />
    <section class="list_base-header">
      <h3>{{ props.listTitle }}</h3>
      <button
        type="button"
        :class="`btn btn-${props.theme}`"
        @click="isDialogOpen = true"
      >
        {{ props.buttonLabel }}
      </button>
    </section>
    <ul>
      <li><ItemBase /></li>
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
import { ref } from "vue";
import type { IListBaseProps, IInputShape } from "../../types.ts";
import ItemBase from "./ItemBase.vue";
import DialogBase from "./DialogBase.vue";
import FormBase from "./FormBase.vue";

const props = defineProps<IListBaseProps>();
const isDialogOpen = ref(false);
const handleClose = () => {
  isDialogOpen.value = false;
};

const dialogForms = ref<IInputShape[]>([
  { name: "name", type: "text", label: `${props.listTitle} Name` },
  { name: "calorie", type: "number", label: "Calorie" },
]);

function addToList(values: string[]) {
  console.log(values);
}
</script>
