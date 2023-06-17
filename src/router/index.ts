import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [],
  },
  {
    path: "/create-design",
    name: "create_design",
    component: (): Promise<any> => import("@/views/CreateEditDesignItem.vue"),
  },
  {
    path: "/edit-design/:id(\\d+)",
    name: "edit_design",
    component: (): Promise<any> => import("@/views/CreateEditDesignItem.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
