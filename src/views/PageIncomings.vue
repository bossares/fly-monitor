<template>
  <div>
    <MainTable
      :isShownControls="getIsAdmin"
      :items="getIncomings"
      @toggleIsShownControls="toggleIsAdmin(getIsAdmin)"
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
      :isShown="isShownEditDialog"
      :editeableItemId="editeableId"
      @cancel="cancelEditDialog"
      @confirm="edit"
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
    cancelEditDialog() {
      this.resetEditeableId();
      this.toggleEditDialog();
    },
    cancelConfirmDialog() {
      this.resetRemoveableId();
      this.toggleConfirmDialog();
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
    ]),
  },
  created() {
    if (!this.getIncomings.length) this.fetchIncomings(data.incomings);
  },
};
</script>
