<template>
  <header>
    <nav class="navbar container">
      <router-link :to="{ name: 'Home' }" class="brand">Tracalorie</router-link>
      <ul>
        <li>
          <button class="btn">Set Daily Limit</button>
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
</template>
