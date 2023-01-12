<template>
  <div>
    <TextBtn>ок</TextBtn>
    <IconedBtn
      bgColor="bg-blue"
      hint="Изменить"
      :icon="require('./../assets/icons/airplane-edit.svg')"
    />
    <IconedBtn
      bgColor="bg-gray"
      hint="Открыть"
      :icon="require('./../assets/icons/chevron-down.svg')"
    />
    <IconedBtn
      bgColor="bg-red"
      hint="Удалить"
      :icon="require('./../assets/icons/delete-empty.svg')"
    />
    <IconedBtn hint="Добавить" :icon="require('./../assets/icons/plus.svg')" />
    <InputField />
  </div>
</template>

<script>
import TextBtn from "../components/buttons/TextBtn.vue";
import IconedBtn from "../components/buttons/IconedBtn.vue";
import InputField from "../components/inputs/InputField.vue";

export default {
  name: "PageIncomings",
  components: {
    TextBtn,
    IconedBtn,
    InputField,
  },
};
</script>
