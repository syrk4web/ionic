import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ModePage from "../views/ModePage.vue";
import ManagePage from "../views/ManagePage.vue";
import AddFlashcardPage from "@/views/AddFlashcardPage.vue";
import EditFlashcardPage from "@/views/EditFlashcardPage.vue";
import DeleteFlashcardPage from "@/views/DeleteFlashcardPage.vue";
import ClassicPage from "@/views/ClassicPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/mode",
    name: "Mode",
    component: ModePage,
  },
  {
    path: "/classic",
    name: "Classic",
    component: ClassicPage,
  },
  {
    path: "/manage",
    name: "manage",
    component: ManagePage,
  },
  {
    path: "/addFlashcard",
    name: "addFlashcard",
    component: AddFlashcardPage,
  },
  // Case no id, redirect to manage
  {
    path: "/editFlashcard",
    redirect: "/manage",
  },
  {
    path: "/deleteFlashcard",
    redirect: "/manage",
  },
  // Add dynamic id
  {
    path: "/editFlashcard/:id",
    name: "editFlashcard",
    component: EditFlashcardPage,
  },
  {
    path: "/deleteFlashcard/:id",
    name: "deleteFlashcard",
    component: DeleteFlashcardPage,
  },
];

const router = createRouter({
  // permet d'utiliser un back bouton
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
