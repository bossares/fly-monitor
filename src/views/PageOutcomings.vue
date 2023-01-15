<template>
  <div>
    <MainTable
      :isShownControls="getIsAdmin"
      :items="getOutcomings"
      cityFieldTitle="Куда"
      @toggleIsShownControls="toggleIsAdmin(getIsAdmin)"
      @create="toggleCreateDialog"
      @remove="
        (id) => {
          saveRemoveableId(id);
          toggleConfirmDialog();
        }
      "
      @edit="
        (id) => {
          saveEditeableId(id);
          toggleEditDialog();
        }
      "
    />
    <ConfirmDialog
      :isShown="isShownCancelDialog"
      @cancel="cancelConfirmDialog"
      @confirm="remove"
    />
    <EditDialog
      v-if="isShownEditDialog"
      :items="getOutcomings"
      :isShown="isShownEditDialog"
      :editeableItemId="editeableId"
      title="Изменить запись"
      @cancel="cancelEditDialog"
      @confirm="edit"
    />
    <EditDialog
      v-if="isShownCreateDialog"
      :items="getOutcomings"
      :isShown="isShownCreateDialog"
      :editeableItemId="editeableId"
      title="Создать запись"
      @cancel="toggleCreateDialog"
      @confirm="create"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MainTable from "../components/MainTable.vue";
import ConfirmDialog from "../components/popups/ConfirmDialog.vue";
import EditDialog from "../components/popups/EditDialog.vue";
import data from "../mokeData.json";

export default {
  name: "PageOutcomings",
  components: {
    MainTable,
    ConfirmDialog,
    EditDialog,
  },
  data() {
    return {
      isShownCancelDialog: false,
      isShownEditDialog: false,
      isShownCreateDialog: false,
      removeableId: "",
      editeableId: "",
    };
  },
  computed: mapGetters(["getIsAdmin", "getOutcomings"]),
  methods: {
    saveRemoveableId(id) {
      this.removeableId = id;
    },
    resetRemoveableId() {
      this.removeableId = "";
    },
    saveEditeableId(id) {
      this.editeableId = id;
    },
    resetEditeableId() {
      this.editeableId = "";
    },
    toggleEditDialog() {
      this.isShownEditDialog = !this.isShownEditDialog;
    },
    toggleConfirmDialog() {
      this.isShownCancelDialog = !this.isShownCancelDialog;
    },
    toggleCreateDialog() {
      this.isShownCreateDialog = !this.isShownCreateDialog;
    },
    cancelEditDialog() {
      this.resetEditeableId();
      this.toggleEditDialog();
    },
    cancelConfirmDialog() {
      this.resetRemoveableId();
      this.toggleConfirmDialog();
    },
    create(value) {
      this.createOutcoming(value);
      this.toggleCreateDialog();
    },
    remove() {
      this.removeOutcoming(this.removeableId);
      this.cancelConfirmDialog();
    },
    edit(value) {
      this.editOutcoming({ value: value, id: this.editeableId });
      this.cancelEditDialog();
    },
    ...mapActions([
      "toggleIsAdmin",
      "fetchOutcomings",
      "removeOutcoming",
      "editOutcoming",
      "createOutcoming",
    ]),
  },
  created() {
    if (!this.getOutcomings.length) this.fetchOutcomings(data.outcomings);
  },
};
</script>
