<template>
  <section
    class="item_base"
    @mouseleave="toggleIsDeleting(false), toggleIsEditing(false)"
  >
    <h5>akwjdawij</h5>
    <span>123 kcal</span>

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
          <button class="btn" @click="toggleIsDeleting(false)">Yes</button>
          <button class="btn" @click="toggleIsDeleting(false)">No</button>
        </div>
      </section>
      <form
        class="item_base-edit_confirm"
        v-if="isEditing"
        @submit.prevent="toggleIsEditing(false)"
      >
        <input
          type="text"
          value="akwdjkl"
          autofocus="true"
          class="edit_input"
        />
        <button class="btn" type="submit" @click="toggleIsEditing(false)">
          OK
        </button>
      </form>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isEditing = ref(false);
const isDeleting = ref(false);

const toggleIsDeleting = (value: boolean) => {
  isDeleting.value = value;
};
const toggleIsEditing = (value: boolean) => {
  isEditing.value = value;
};
</script>
