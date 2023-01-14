<template>
  <div class="dialog" :class="{ hiding: isHiding }">
    <div class="popup bg-gray" :class="{ hiding: isHiding }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogAnimation",
  props: {
    isHiding: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dialog:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0;
  animation: showDialog 0.3s forwards;
}

.dialog.hiding:before {
  opacity: 0.5;
  animation: hideDialog 0.3s forwards;
}

.popup {
  position: absolute;
  left: calc(50% - 125px);
  top: calc(40% - 100px);
  width: 250px;
  min-height: 150px;
  border-radius: 5px;
  opacity: 0;
  animation: showPopup 0.3s 0.3s forwards;
}

.popup.hiding {
  opacity: 1;
  animation: hidePopup 0.3s forwards;
}

@keyframes showDialog {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}

@keyframes hideDialog {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
}

@keyframes showPopup {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes hidePopup {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
