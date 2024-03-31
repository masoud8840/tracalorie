<template>
  <header>
    <nav class="navbar container">
      <router-link :to="{ name: 'Home' }" class="brand">Tracalorie</router-link>
      <ul>
        <li>
          <button class="btn" @click="isDailyLimitOpen = true">
            Set Daily Limit
          </button>
        </li>
        <li>
          <button class="btn">Reset Day</button>
        </li>
        <li>
          <router-link :to="{ name: 'Signup' }" class="btn-primary btn-orange">
            Create Account
          </router-link>
        </li>
      </ul>
    </nav>
  </header>

  <DialogBase :is-dialog-open="isDailyLimitOpen" @on-close="handleCloseDialog">
    <FormBase
      :fields="[{ name: 'dailyLimit', label: 'Daily Limit', type: 'text' }]"
      button-label="Set Daily Limit"
    />
  </DialogBase>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormBase from "../UI/FormBase.vue";
import DialogBase from "../UI/DialogBase.vue";

const isDailyLimitOpen = ref(false);
function handleCloseDialog() {
  isDailyLimitOpen.value = false;
}
</script>
