<template>
  <button
    class="iconedBtn hover-bg-color-filter active-bg-color-filter transition"
    :class="bgColor"
    :title="hint"
  >
    <img class="icon" :src="icon" :alt="imgAlt" />
  </button>
</template>

<script>
export default {
  name: "IconedBtn",
  props: {
    icon: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      default: "bg-green",
      validator(value) {
        return ["bg-green", "bg-red", "bg-gray", "bg-blue"].includes(value);
      },
    },
    imgAlt: {
      type: String,
      default: "button icon",
    },
    hint: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.iconedBtn {
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 2px;
  cursor: pointer;
}

.iconedBtn .icon {
  margin: auto auto;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 20px;
  max-height: 20px;
}
</style>
