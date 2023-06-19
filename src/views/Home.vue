<template>
  <div class="home-wrapper">
    <div class="home-header">
      <div>Всі дизайни</div>
      <router-link :to="{ name: 'create_design' }">
        <my-button>Додати дизайн</my-button>
      </router-link>
    </div>

    <list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import List from "@/components/List.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default defineComponent({
  name: "Home",
  components: {
    List,
    MyButton,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.home {
  &-wrapper {
    background: $color-primary;
    padding: 24px 30px;
    font-size: $font-size-base;
    color: $color-ligth;
    @media screen and (max-width: 600px) {
      padding: 24px 10px;
    }
  }
  &-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
