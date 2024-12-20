import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import ActivityListComponent from "../components/Activity/ActivityListComponent.vue";
import AddFriendView from "../views/AddFriendView.vue";
import FriendsView from "../views/FriendsView.vue";
import GardenView from "../views/GardenView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MapView from "../views/MapView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import PlantsView from "../views/PlantsView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingView from "../views/SettingView.vue";
import SocialView from "../views/SocialView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/map",
      name: "Map",
      component: MapView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/plants",
      name: "Plants",
      component: PlantsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/garden",
      name: "Garden",
      component: GardenView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
    {
      path: "/addFriend",
      name: "AddFriend",
      component: AddFriendView,
    },
    {
      path: "/friends",
      name: "Friends",
      component: FriendsView,
    },
    {
      path: "/activity",
      name: "Activity",
      component: ActivityListComponent,
    },
    {
      path: "/social",
      name: "Social",
      component: SocialView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
