<template>
  <div>
    <!-- <IconedBtn
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
    <IconedBtn hint="Добавить" :icon="require('./../assets/icons/plus.svg')" />-->
    <MainTable
      :isShownControls="isAdminModeActive"
      @toggleIsShownControls="isAdminModeActive = !isAdminModeActive"
      @filter="test"
    />
  </div>
</template>

<script>
import MainTable from "../components/MainTable.vue";

export default {
  name: "PageIncomings",
  components: {
    MainTable,
  },
  data() {
    return {
      isAdminModeActive: false,
    };
  },
  methods: {
    test(v) {
      console.log(v);
    },
  },
};
</script>
