<template>
  <form class="form_base" @submit.prevent="handleSubmit" autocomplete="off">
    <section
      class="input_group"
      v-for="(input, index) in props.fields"
      :key="index"
    >
      <label :for="input.name">{{ input.label || input.name }}</label>
      <input
        :type="input.type || input.name"
        :name="input.name"
        :id="input.name"
        v-model="inputsValue[index]"
      />
    </section>

    <slot name="extras"></slot>
    <button type="submit" :class="`btn btn-primary ${calculateThemeValue}`">
      {{ props.buttonLabel }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { IInputShape } from "../../types.ts";

interface IEmitShape {
  (e: "onSubmit", values: string[]): void;
}

const emits = defineEmits<IEmitShape>();

interface IPropShape {
  fields: IInputShape[];
  buttonLabel?: string;
  theme?: string;
}

const props = withDefaults(defineProps<IPropShape>(), {
  fields: () => [],
  buttonLabel: "Create Account",
  theme: "",
});

const inputsValue = ref<string[]>([]);
function handleSubmit() {
  emits("onSubmit", inputsValue.value);
}

const calculateThemeValue = computed(() => {
  if (props.theme === "orange") return "btn-orange";
  if (props.theme === "green") return "btn-green";

  return "";
});
</script>
