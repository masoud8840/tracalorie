<template>
  <main class="signup_view containe r">
    <FormBase :fields="signupFormInputs" @on-submit="handleSignup">
      <template #extras>
        <router-link :to="{ name: 'Login' }"
          >Already have a account? Login</router-link
        >
      </template>
    </FormBase>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormBase from "../components/UI/FormBase.vue";
import type { IInputShape } from "../types.ts";

const signupFormInputs = ref<IInputShape[]>([
  {
    name: "email",
  },
  {
    name: "password",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
  },
]);

function handleSignup(values: string[]) {
  console.log("From Signup.vue", values);
}
</script>
