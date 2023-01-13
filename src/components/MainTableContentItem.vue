<template>
  <div class="contentItem">
    <div class="contentCell w-15p">{{ id }}</div>
    <div class="contentCell w-25p">{{ city }}</div>
    <div class="contentCell w-20p">{{ date }}</div>
    <div class="contentCell w-20p">{{ time }}</div>
    <div v-if="isShownControls" class="controlsCell w-20p">
      <IconedBtn
        bgColor="bg-blue"
        hint="Изменить"
        :icon="require('./../assets/icons/airplane-edit.svg')"
        @click="$emit('edit')"
      />
      <IconedBtn
        bgColor="bg-red"
        hint="Удалить"
        :icon="require('./../assets/icons/delete-empty.svg')"
        @click="$emit('remove')"
      />
    </div>
  </div>
</template>

<script>
import IconedBtn from "../components/buttons/IconedBtn.vue";

export default {
  name: "mainTableContentItem",
  components: {
    IconedBtn,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      validator(value) {
        return value.length > 0;
      },
    },
    date: {
      type: String,
      required: true,
      validator(value) {
        return value.length > 0;
      },
    },
    time: {
      type: String,
      required: true,
      validator(value) {
        return value.length > 0;
      },
    },
    isShownControls: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.contentItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.contentCell,
.controlsCell {
  height: min-content;
}

.controlsCell {
  display: flex;
  justify-content: center;
  gap: 2px;
}
</style>
