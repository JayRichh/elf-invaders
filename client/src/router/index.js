import { createRouter, createWebHistory } from "vue-router";
import GameWindow from "../views/GameWindow.vue";
import SplashScreen from "../views/SplashScreen.vue";

const routes = [
  {
    path: "/",
    name: "Splash",
    component: SplashScreen,
  },
  {
    path: "/game",
    name: "Game",
    component: GameWindow,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
