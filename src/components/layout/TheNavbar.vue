<template>
  <header>
    <nav class="navbar container">
      <router-link :to="{ name: 'Home' }" class="brand"
        ><Logo color="#fafafa" /> Tracalorie</router-link
      >
      <ul v-if="isDropdownOpen">
        <li>
          <button
            @click="isDailyLimitOpen = true"
            :class="`btn`"
          >
            Set Daily Limit
          </button>
        </li>
        <li>
          <button :class="`btn`">Reset Day</button>
        </li>
        <li>
          <router-link
            :to="{ name: 'Signup' }"
            class="btn btn-primary btn-orange"
          >
            Create Account
          </router-link>
        </li>
      </ul>
      <button
        class="btn dropdown_toggler"
        @click="toggleDropdown"
        v-if="isMobileDevice"
      >
        <Dots :width="28" />
      </button>
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
import Dots from "../icons/3Dots.vue";
import Logo from "../icons/Logo.vue";

const isDailyLimitOpen = ref(false);
function handleCloseDialog() {
  isDailyLimitOpen.value = false;
}

const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const isMobileDevice = ref(false);
window.addEventListener("resize", calculateResponsiveDevice);
function calculateResponsiveDevice() {
  isMobileDevice.value = window.innerWidth <= 576;
  if (isMobileDevice.value) {
    isDropdownOpen.value = false;
    return;
  }
  isDropdownOpen.value = true;
}
calculateResponsiveDevice();
</script>
