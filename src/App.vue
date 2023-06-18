<template>
  <div class="app-wrapper">
    <side />
    <router-view class="app-wrapper__view" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Side from "@/components/Side.vue";

export default defineComponent({
  name: "App",
  components: { Side },
});
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";
.app-wrapper {
  display: flex;
  min-width: 320px;
  width: 100%;
  min-height: 100vh;

  &__view {
    padding: 24px 30px;
    width: calc(100vw - 100px);
  }
}
</style>
