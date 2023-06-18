<template>
  <div class="circle">
    <slot> Default text! </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Circle",
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.circle {
  color: $color-black;
  background: $color-ligth;
  font-size: $font-size-circle;
  line-height: 18px;
  padding: 0px 5px;
  border-radius: 10px;
}
</style>
