import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reservation from "../views/Reservation.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Profile from "../views/Profile.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/form",
    name: "Reservation",
    component: Reservation,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresVisitor: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresVisitor: true },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.loggedInUser) {
    store.commit("setRedirectAfterLogin", to.path);
    next("/login");
  }
  if (to.meta.requiresVisitor && store.state.loggedInUser) {
    next("/");
  }
  next();
});
export default router;
