<template>
  <div class="item-wrapper">
    <router-link
      class="item-link"
      :to="{ name: 'edit_design', params: { id: item?.id } }"
    >
      <img :src="item?.images[0]" alt="Image preview" />
      <div class="item-footer">
        <Circle> {{ item?.public_id }}</Circle>
        <div class="item-footer__text">{{ item?.title }}</div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DesignModel } from "@/model/design-model";
import Circle from "@/components/UI/Circle.vue";

export default defineComponent({
  name: "DesignItem",
  components: {
    Circle,
  },
  props: {
    item: {
      type: DesignModel,
      require: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.item {
  &-wrapper {
    width: 24%;
    margin: 10px 0px;
    filter: drop-shadow(0px 1px 7px rgba(0, 0, 0, 0.05));

    img {
      border-radius: 3px;
      object-fit: contain;
      width: 100%;
    }

    @media screen and (max-width: 1100px) {
      width: 32%;
    }
    @media screen and (max-width: 800px) {
      width: 49%;
    }
    @media screen and (max-width: 630px) {
      width: 100%;
    }
  }
  &-link {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  &-footer {
    display: flex;
    margin-top: 6px;

    &__text {
      font-size: $font-size-text;
      margin: 0px 8px;
    }
  }
}
</style>
