<template>
  <main class="signup_view containe r">
    <FormBase
      :fields="loginFormInputs"
      @on-submit="handleLogin"
      button-label="Login To Account"
    >
      <template #extras>
        <p :class="`error-msg msg-${error.type}`" v-if="error.message">
          {{ error.message }}
        </p>
      </template>
    </FormBase>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormBase from "../components/UI/FormBase.vue";
import type { IInputShape } from "../types.ts";
import { useAuthStore } from "../store/Authentication.ts";
import { useRouter } from "vue-router";

const loginFormInputs = ref<IInputShape[]>([
  {
    name: "email",
  },
  {
    name: "password",
  },
]);

interface IError {
  type: "error" | "info";
  message: string;
}
const error = ref<IError>({ type: "error", message: "" });

const authStore = useAuthStore();

const router = useRouter();
function handleLogin(values: string[]) {
  const email = values[0];
  const password = values[1];

  Promise.resolve(authStore.login(email, password))
    .then((res) => {
      error.value.message = res.message;
      error.value.type = "info";

      localStorage.setItem("auth", JSON.stringify(res.data));
      router.push({ name: "Home" });
    })
    .catch((e) => {
      error.value.message = e.message;
    });
}
</script>
