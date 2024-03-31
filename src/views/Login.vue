<template>
  <main class="signup_view containe r">
    <FormBase
      :fields="loginFormInputs"
      @on-submit="handleLogin"
      button-label="Login To Account"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormBase from "../components/UI/FormBase.vue";
import type { IInputShape } from "../types.ts";

const loginFormInputs = ref<IInputShape[]>([
  {
    name: "email",
  },
  {
    name: "password",
  },
]);

function handleLogin(values: string[]) {
  console.log("From Signup.vue", values);
}
</script>
