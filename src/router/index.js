import Vue from "vue";
import VueRouter from "vue-router";
import PageIncomings from "../views/PageIncomings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "incomings",
    component: PageIncomings,
  },
  {
    path: "/outcomings",
    name: "outcomings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PageOutcomings.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
