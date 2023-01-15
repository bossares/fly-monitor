<template>
  <nav class="navigation">
    <router-link
      class="item bg-gray"
      :class="{ active: incomingsActive }"
      :to="incomingsLink"
      >Прилеты</router-link
    >
    <router-link
      class="item bg-gray"
      :class="{ active: outcomingsActive }"
      :to="outcomingsLink"
      >Вылеты</router-link
    >
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainNavigation",
  computed: {
    ...mapGetters(["getIsAdmin"]),
    incomingsLink() {
      if (this.getIsAdmin) return "/incomings/admin";
      else return "/incomings";
    },
    outcomingsLink() {
      if (this.getIsAdmin) return "/outcomings/admin";
      else return "/outcomings";
    },
    incomingsActive() {
      return this.$route.path.includes("incomings");
    },
    outcomingsActive() {
      return this.$route.path.includes("outcomings");
    },
  },
};
</script>

<style scoped>
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px 0;
}

.navigation .item {
  --toggler-border-radius: 3px;

  text-decoration: none;
  color: white;
  width: 100px;
  padding: 5px 0 7px 0;
  text-align: center;
  transition: 0.3s;
  font-size: 15px;
  font-weight: 600;
  font-family: "Exo2";
  text-transform: uppercase;
}

.navigation .item:first-child {
  border-top-left-radius: var(--toggler-border-radius);
  border-bottom-left-radius: var(--toggler-border-radius);
}

.navigation .item:last-child {
  border-top-right-radius: var(--toggler-border-radius);
  border-bottom-right-radius: var(--toggler-border-radius);
}

.navigation .item:not(.active):hover {
  filter: brightness(108%);
}

.navigation .item.active {
  background-color: #00a1f1;
}
</style>
