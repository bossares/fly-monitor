<template>
  <DialogAnimation v-if="isShown" :isHiding="isHiding">
    <p class="title">Удалить запись</p>
    <div class="controls">
      <TextBtn :fixedWidth="true" bgColor="bg-dark-gray" @click="cancel"
        >Отмена</TextBtn
      >
      <TextBtn :fixedWidth="true" @click="confirm">Ок</TextBtn>
    </div>
  </DialogAnimation>
</template>

<script>
import TextBtn from "../buttons/TextBtn.vue";
import DialogAnimation from "./DialogAnimation.vue";

export default {
  name: "ConfirmDialog",
  components: {
    TextBtn,
    DialogAnimation,
  },
  props: {
    isShown: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isHiding: false,
    };
  },
  methods: {
    toggleHide() {
      this.isHiding = !this.isHiding;
    },
    cancel() {
      this.toggleHide();

      setTimeout(() => {
        this.toggleHide();
        this.$emit("cancel");
      }, 300);
    },
    confirm() {
      this.toggleHide();

      setTimeout(() => {
        this.toggleHide();
        this.$emit("confirm");
      }, 300);
    },
  },
};
</script>

<style scoped>
.title {
  font-family: "Exo2";
  font-weight: 600;
  font-size: 20px;
  padding: 35px 0 0 0;
  margin: 0;
  text-align: center;
}

.controls {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}
</style>
