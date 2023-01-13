<template>
  <input
    class="inputField bg-gray hover-bg-color-filter transition"
    :value="value"
    :name="name"
    :required="required"
    :placeholder="placeholder"
    :type="type"
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
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "date", "time"].includes(value);
      },
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
  height: 26px;
  width: 100%;
  max-width: 250px;
  font-family: "Exo2";
  font-size: 14px;
  font-weight: 500;
  vertical-align: middle;
  padding-left: 8px;
  opacity: 0.7;
}

.inputField:focus {
  outline: 1px solid #80808081;
  opacity: 1;
}
</style>
