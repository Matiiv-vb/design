<template>
  <router-link :to="{ name: routeName }" class="back-link">
    <img src="@/assets/icons/ArrowLeft.svg" alt="" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackLink",
  props: {
    routeName: {
      type: String,
      require: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.back-link {
  display: flex;
  align-self: start;
  margin-top: 4px;
}
</style>
