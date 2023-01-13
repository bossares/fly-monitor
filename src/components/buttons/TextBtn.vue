<template>
  <button
    class="textBtn hover-bg-color-filter active-bg-color-filter transition"
    :class="bgColor"
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
    bgColor: {
      type: String,
      default: "bg-green",
      validator(value) {
        return ["bg-green", "bg-red", "bg-gray", "bg-blue"].includes(value);
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
</style>
