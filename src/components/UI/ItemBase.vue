<template>
  <section
    class="item_base"
    @mouseleave="toggleIsDeleting(false), toggleIsEditing(false)"
  >
    <h5>{{ props.title }}</h5>
    <span>{{ props.calorie }} kcal</span>

    <section class="item_base-overlay">
      <section class="item_base-actions" v-if="!isDeleting && !isEditing">
        <button type="button" class="btn" @click="toggleIsEditing(true)">
          Edit
        </button>
        <button type="button" class="btn" @click="toggleIsDeleting(true)">
          Delete
        </button>
      </section>

      <section class="item_base-delete_confirm" v-if="isDeleting">
        <p>Are you sure to delete?</p>
        <div>
          <button class="btn" @click="handleDelete">Yes</button>
          <button class="btn" @click="toggleIsDeleting(false)">No</button>
        </div>
      </section>
      <form
        class="item_base-edit_confirm"
        v-if="isEditing"
        @submit.prevent="toggleIsEditing(false)"
      >
        <input type="text" class="edit_input" v-model="editValues.title" />
        <input type="number" class="edit_input" v-model="editValues.calorie" />
        <button class="btn" type="submit" @click="handleEdit">OK</button>
      </form>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IListItemShape } from "../../types.ts";

interface IEmits {
  (e: "onEdit", newObj: IListItemShape): void;
  (e: "onDelete", id: string): void;
}

const emits = defineEmits<IEmits>();

const props = defineProps<IListItemShape>();

const isEditing = ref(false);
const isDeleting = ref(false);
const editValues = ref({
  title: props.title,
  calorie: props.calorie,
});
const toggleIsDeleting = (value: boolean) => {
  isDeleting.value = value;
};
const toggleIsEditing = (value: boolean) => {
  isEditing.value = value;
};

function handleEdit() {
  if (editValues.value.title.trim() === "") {
    editValues.value.title = props.title;
    isEditing.value = false;
    return;
  }
  emits("onEdit", {
    _id: props._id,
    title: editValues.value.title,
    calorie: editValues.value.calorie,
  });
}

function handleDelete() {
  emits("onDelete", props._id);
}
</script>
