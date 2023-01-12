<template>
  <input
    class="inputField bg-gray hover-bg-color-filter transition"
    :value="value"
    :name="name"
    :required="required"
    :placeholder="placeholder"
    type="text"
    @input="input"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Введите",
    },
  },
  methods: {
    input(v) {
      this.$emit("input", v.target.value);
    },
  },
};
</script>

<style scoped>
.inputField {
  border: none;
  border-radius: 2px;
  height: 28px;
  width: 100%;
  font-family: "Exo2";
  font-size: 14px;
  font-weight: 500;
  vertical-align: middle;
  padding-left: 8px;
}

.inputField:focus {
  outline: 1px solid #80808081;
}
</style>
