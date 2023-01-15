<template>
  <div>
    <MainTable
      :isShownControls="getIsAdmin"
      :items="getIncomings"
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
      :items="getIncomings"
      :isShown="isShownEditDialog"
      :editeableItemId="editeableId"
      title="Изменить запись"
      @cancel="cancelEditDialog"
      @confirm="edit"
    />
    <EditDialog
      v-if="isShownCreateDialog"
      :items="getIncomings"
      :isShown="isShownCreateDialog"
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
  name: "PageIncomings",
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
  computed: mapGetters(["getIsAdmin", "getIncomings"]),
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
      this.createIncoming(value);
      this.toggleCreateDialog();
    },
    remove() {
      this.removeIncoming(this.removeableId);
      this.cancelConfirmDialog();
    },
    edit(value) {
      this.editIncoming({ value: value, id: this.editeableId });
      this.cancelEditDialog();
    },
    ...mapActions([
      "toggleIsAdmin",
      "fetchIncomings",
      "removeIncoming",
      "editIncoming",
      "createIncoming",
    ]),
  },
  created() {
    if (!this.getIncomings.length) this.fetchIncomings(data.incomings);
  },
};
</script>
