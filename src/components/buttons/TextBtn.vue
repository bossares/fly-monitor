<template>
  <button
    class="textBtn hover-bg-color-filter active-bg-color-filter transition"
    :class="[bgColor, fixedWidth ? 'fixed-width' : '']"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <p class="title">
      <slot />
    </p>
  </button>
</template>

<script>
export default {
  name: "TextBtn",
  props: {
    fixedWidth: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: "bg-green",
      validator(value) {
        return [
          "bg-green",
          "bg-red",
          "bg-gray",
          "bg-blue",
          "bg-dark-gray",
        ].includes(value);
      },
    },
  },
};
</script>

<style scoped>
.textBtn {
  margin: 0;
  padding: 0;
  border: none;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
}

.textBtn:disabled {
  pointer-events: none;
  opacity: 0.25;
}

.textBtn .title {
  margin: 0;
  padding: 0 3px 1px 3px;
  color: white;
  font-family: "Exo2";
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
}

.fixed-width {
  width: 80px;
}
</style>
