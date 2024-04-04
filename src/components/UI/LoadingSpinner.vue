<template>
  <section class="loading_spinner-container">
    <span></span>
    <span></span>
    <span></span>
  </section>
</template>

<style lang="scss" scoped>
.loading_spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  span {
    width: 20px;
    height: 20px;
    background-color: #599f3d;
    border-radius: 50px;
    animation: Loading 1.5s ease-in-out infinite;
    scale: 0.1;
    &:nth-child(2) {
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      animation-delay: 0.5s;
    }
  }
}

@keyframes Loading {
  0% {
    scale: 0.1;
  }
  50% {
    scale: 1;
  }
  100% {
    scale: 0.1;
  }
}
</style>
