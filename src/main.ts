import { createApp } from "vue";
// import "@/style.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import "@/assets/style.scss";
import "@/assets/scss/global.scss";
const app = createApp(App);

app.use(createPinia()).use(router).mount("#app");
