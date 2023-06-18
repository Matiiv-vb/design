<template>
  <div class="side-wrapper">
    <img src="@/assets/icons/LOGO.svg" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Side",
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.side-wrapper {
  background: $color-side;
  padding: 9px 0px;
  width: 40px;
  img {
    width: 20px;
  }
}
</style>
