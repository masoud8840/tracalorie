<template>
  <Teleport to="body">
    <Transition name="dialog">
      <dialog
        class="dialog_base dialog-daily_limit"
        @mousedown="handleCloseDialog($event as MouseEvent)"
        v-if="props.isDialogOpen"
      >
        <slot></slot>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface IEmitsShape {
  (e: "onClose", value: boolean): void;
}
const emits = defineEmits<IEmitsShape>();

interface IPropsShape {
  isDialogOpen: boolean;
}
const props = defineProps<IPropsShape>();

const handleCloseDialog = (event: MouseEvent) => {
  if (event.currentTarget === event.target)
    emits("onClose", !props.isDialogOpen);
};
</script>
