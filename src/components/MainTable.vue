<template>
  <div class="mainTable">
    <div class="mainTable-head bg-blue">
      <div class="panel">
        <div class="search">
          <InputField v-model="filters.id" placeholder="Рейс" />
          <InputField v-model="filters.city" placeholder="Город" />
          <IconedBtn
            class="resetBtn"
            bgColor="bg-dark-gray"
            hint="Сброс"
            :icon="require('./../assets/icons/filter-remove.svg')"
            @click="resetFilters"
          />
        </div>
        <div class="controls">
          <TextBtn
            :bgColor="`${isShownControls ? 'bg-red' : 'bg-green'}`"
            @click="toggleIsShownControls"
            >Админ</TextBtn
          >
        </div>
      </div>
      <div class="titles">
        <div class="w-15p"><p>Рейс</p></div>
        <div class="w-25p">
          <p>{{ cityFieldTitle }}</p>
        </div>
        <div class="w-20p"><p>Дата</p></div>
        <div class="w-20p"><p>Время</p></div>
        <div v-if="isShownControls" class="controls-cell w-20p">
          <IconedBtn
            hint="Добавить"
            :icon="require('./../assets/icons/plus.svg')"
            @click="$emit('add')"
          />
        </div>
      </div>
    </div>
    <div class="mainTable-content">
      <MainTableContentItem
        v-for="(item, idx) in filteredItems"
        :key="idx"
        :isShownControls="isShownControls"
        v-bind="item"
        @edit="$emit('edit', item.id)"
        @remove="$emit('remove', item.id)"
      />
    </div>
  </div>
</template>

<script>
import MainTableContentItem from "./MainTableContentItem.vue";
import TextBtn from "../components/buttons/TextBtn.vue";
import InputField from "../components/inputs/InputField.vue";
import IconedBtn from "../components/buttons/IconedBtn.vue";

export default {
  name: "MainTable",
  components: {
    MainTableContentItem,
    TextBtn,
    InputField,
    IconedBtn,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isShownControls: {
      type: Boolean,
      required: true,
    },
    cityFieldTitle: {
      type: String,
      default: "Откуда",
      validator(value) {
        return ["Откуда", "Куда"].includes(value);
      },
    },
  },
  data() {
    return {
      filters: {
        id: "",
        city: "",
      },
    };
  },
  computed: {
    filteredItems() {
      let result = this.items;

      function filterBy(array, fieldName, fieldValue) {
        if (fieldValue.length === 0) return array;

        return array.filter((item) =>
          item[fieldName].toLowerCase().includes(fieldValue.toLowerCase())
        );
      }

      for (let key in this.filters)
        result = filterBy(result, key, this.filters[key]);

      return result;
    },
  },
  methods: {
    toggleIsShownControls() {
      this.$emit("toggleIsShownControls");
    },
    resetFilters() {
      for (let key in this.filters) this.filters[key] = "";
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.mainTable {
  max-height: calc(100vh - 75px);
  max-width: 1200px;
  margin: auto auto;
  overflow: auto;
  position: relative;
  border-radius: 3px;
  background-color: #eceff1;
  font-family: "Exo2";
  font-size: 14px;
  text-transform: uppercase;
}

.mainTable-head {
  position: sticky;
  top: 0;
  color: white;
}

.titles {
  display: flex;
}

.titles div,
.mainTable-head div,
.mainTable-content div {
  height: 42px;
  text-align: center;
}

.mainTable-head div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.mainTable-head .panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 7px;
}

.search {
  gap: 5px;
}

.mainTable-head div p {
  display: block;
  font-weight: 600;
}

.mainTable-content div:nth-child(even) {
  background-color: #d7e1e6;
}

.controls-cell {
  min-width: 58px;
}
</style>
