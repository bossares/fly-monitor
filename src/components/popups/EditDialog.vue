<template>
  <DialogAnimation v-if="isShown" :isHiding="isHiding">
    <p class="title">{{ title }}</p>
    <div class="inputs">
      <InputField v-model="result.id" placeholder="Рейс" />
      <InputField v-model="result.city" placeholder="Город" />
      <InputField v-model="result.date" placeholder="Дата" type="date" />
      <InputField v-model="result.time" placeholder="Время" type="time" />
    </div>
    <div v-if="validationErrorText" class="error-text">
      *{{ validationErrorText }}
    </div>
    <div class="controls">
      <TextBtn :fixedWidth="true" bgColor="bg-dark-gray" @click="cancel"
        >Отмена</TextBtn
      >
      <TextBtn :fixedWidth="true" :disabled="!isValid" @click="confirm"
        >Ок</TextBtn
      >
    </div>
  </DialogAnimation>
</template>

<script>
import { mapGetters } from "vuex";
import TextBtn from "../buttons/TextBtn.vue";
import InputField from "../inputs/InputField.vue";
import DialogAnimation from "./DialogAnimation.vue";

export default {
  name: "EditDialog",
  components: {
    TextBtn,
    DialogAnimation,
    InputField,
  },
  props: {
    title: {
      type: String,
      default: "Изменить запись",
    },
    editeableItemId: {
      type: String,
      default: "",
    },
    isShown: {
      type: Boolean,
      required: true,
    },
  },
  computed: mapGetters(["getIncomings"]),
  data() {
    return {
      isHiding: false,
      isValid: false,
      validationErrorText: "",
      result: {
        id: "",
        city: "",
        date: "",
        time: "",
      },
      oldId: "",
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
    async confirm() {
      this.toggleHide();

      setTimeout(() => {
        this.toggleHide();
        this.writeCorrectDate("-", ".");
        this.$emit("confirm", this.result);
      }, 300);
    },
    validate() {
      let isIdHasOnlyNumbers = /^\d+$/.test(this.result.id);
      let isUniqueId =
        this.result.id === this.oldId ||
        this.getIncomings.find((item) => item.id === this.result.id) ===
          undefined;
      let isAllFieldsAreNotEmpty = Object.values(this.result).every(
        (value) => value.length > 0
      );

      if (!isAllFieldsAreNotEmpty)
        this.validationErrorText = "Заполните все поля";
      else if (!isUniqueId)
        this.validationErrorText = "Рейс с таким номером уже существует";
      else if (!isIdHasOnlyNumbers)
        this.validationErrorText = "Номер рейса может состоять только из цифр";
      else this.validationErrorText = "";

      this.isValid = isAllFieldsAreNotEmpty && isIdHasOnlyNumbers && isUniqueId;
    },
    writeCorrectDate(replacedSymbol, newSymbol) {
      let splitted = this.result.date.split(replacedSymbol);
      this.result.date = splitted.reverse().join(newSymbol);
    },
  },
  updated() {
    this.validate();
  },
  mounted() {
    if (this.editeableItemId)
      Object.assign(
        this.result,
        this.getIncomings.find((item) => item.id === this.editeableItemId)
      );

    this.oldId = this.result.id;

    if (this.result.date) this.writeCorrectDate(".", "-");
  },
};
</script>

<style scoped>
.title {
  font-family: "Exo2";
  font-weight: 600;
  font-size: 20px;
  padding: 10px 0 0 0;
  margin: 0;
  text-align: center;
}

.controls {
  bottom: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}

.inputs {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error-text {
  font-family: "Exo2";
  font-size: 12px;
  font-weight: 600;
  padding: 10px;
  color: #ea4335;
}
</style>
