<template>
  <header>
    <nav class="navbar container">
      <router-link :to="{ name: 'Home' }" class="brand"
        ><Logo color="#fafafa" /> Tracalorie</router-link
      >
      <ul v-if="isDropdownOpen">
        <li>
          <button @click="isDailyLimitOpen = true" :class="`btn`">
            Set Daily Limit
          </button>
        </li>
        <li>
          <button class="btn" @click="handleFlush">Reset Day</button>
        </li>
        <li v-if="!authStore.getIsLoggedIn">
          <router-link
            :to="{ name: 'Signup' }"
            class="btn btn-primary btn-orange"
          >
            Create Account
          </router-link>
        </li>
        <li v-else>
          <button class="btn" @click="authStore.logout">Logout</button>
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
      @on-submit="handleSubmit"
    >
      <template #extras>
        <p :class="`error-msg msg-${error.type}`" v-if="error.message">
          {{ error.message }}
        </p>
      </template>
    </FormBase>
  </DialogBase>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormBase from "../UI/FormBase.vue";
import DialogBase from "../UI/DialogBase.vue";
import Dots from "../icons/3Dots.vue";
import Logo from "../icons/Logo.vue";
import { useCalorieStore } from "../../store/Calorie";
import { useAuthStore } from "../../store/Authentication";

interface IError {
  type: "info" | "error";
  message: string;
}
const calorieStore = useCalorieStore();
const isDailyLimitOpen = ref(false);
const error = ref<IError>({
  type: "error",
  message: "",
});
async function handleSubmit(values: string[]) {
  const limit = parseInt(values[0]);
  error.value.message = "";
  Promise.resolve(calorieStore.editCalories(limit))
    .then((res) => {
      error.value.message = res;
      error.value.type = "info";
      isDailyLimitOpen.value = false;
    })
    .catch((e) => {
      error.value.message = e.message;
      if (e.message === "jwt malformed") {
        error.value.message = "You should create account first to use app";
      }
      error.value.type = "error";
    });
}

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

const authStore = useAuthStore();

async function handleFlush() {
  await authStore.flush();
}
</script>
