<template>
  <main class="signup_view containe r">
    <FormBase :fields="signupFormInputs" @on-submit="handleSignup">
      <template #extras>
        <p :class="`error-msg msg-${error.type}`" v-if="error.message">
          {{ error.message }}
        </p>
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
import { useAuthStore } from "../store/Authentication.ts";

const authStore = useAuthStore();

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

interface IError {
  type: "error" | "info";
  message: string;
}
const error = ref<IError>({ type: "error", message: "" });

async function handleSignup(values: string[]) {
  error.value.message = "";
  const email = values[0];
  const password = values[1];
  const confirmPassword = values[2];

  if (!(email && password && confirmPassword && password === confirmPassword)) {
    error.value.message = "ValidationError: Incorrect fields data";
    return;
  }

  Promise.resolve(authStore.signup(email, password))
    .then((res) => {
      error.value.type = "info";
      error.value.message = res.message;
    })
    .catch((e) => {
      console.log(e.valueOf());
      error.value.message = e.message.valueOf();
    });
}
</script>
../store/Authentication.ts
