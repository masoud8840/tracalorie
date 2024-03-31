<template>
  <svg
    :width="props.width"
    :height="props.height || props.width"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.35 4.725C7.035 4.725 6.825 5.04 6.825 5.25V7.875H5.775V5.25C5.775 4.935 5.565 4.725 5.25 4.725C4.935 4.725 4.725 5.04 4.725 5.25V7.875H3.675V5.25C3.675 4.935 3.465 4.725 3.15 4.725C2.835 4.725 2.625 5.04 2.625 5.25V8.715C2.625 9.66 3.36 10.395 4.2 10.5V17.85C4.2 18.48 4.62 18.9 5.25 18.9C5.88 18.9 6.3 18.48 6.3 17.85V10.5C7.14 10.395 7.875 9.66 7.875 8.715V5.25C7.875 5.04 7.665 4.725 7.35 4.725ZM9.45 5.25V11.55H10.5V17.85C10.5 18.48 10.92 18.9 11.55 18.9C12.18 18.9 12.6 18.48 12.6 17.85V2.1C10.815 2.1 9.45 3.465 9.45 5.25ZM16.8 4.2C15.33 4.2 14.175 5.775 14.175 7.665C14.07 8.925 14.7 10.08 15.75 10.815V17.85C15.75 18.48 16.17 18.9 16.8 18.9C17.43 18.9 17.85 18.48 17.85 17.85V10.815C18.9 10.08 19.53 8.925 19.425 7.665C19.425 5.775 18.27 4.2 16.8 4.2Z"
      fill="#FAFAFA"
    />
  </svg>
</template>

<script setup lang="ts">
interface IPropsShape {
  width?: number;
  height?: number;
  color?: string;
  hoverColor?: string;
}

const props = withDefaults(defineProps<IPropsShape>(), {
  width: 54,
  height: 54,
  color: "rgba(250,250,250,0.75)",
  hoverColor: "#fafafa",
});
</script>

<style lang="scss" scoped>
svg path {
  stroke: v-bind("$props.color");
}
svg {
  path {
    stroke: v-bind("$props.color");
  }
  &:hover {
    path {
      stroke: v-bind("$props.hoverColor");
    }
  }
}
</style>
