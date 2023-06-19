<template>
  <div class="images-wrapper">
    <draggable
      class="dragArea list-group"
      :list="images"
      @change="$emit('update:images', images)"
    >
      <div
        class="list-styles"
        v-for="(element, index) in images"
        :key="element"
      >
        <div class="im">
          <img class="img-preview" :src="element" alt="Image preview" />
          <div class="img-delete" @click="$emit('deleteImage', index)"></div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

export default defineComponent({
  name: "Images",
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    images: {
      type: Array<string>,
      require: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.images {
  &-wrapper {
    // border: 1px solid red;
    .list-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 10px;
      @media screen and (max-width: 600px) {
        justify-content: center;
      }
    }

    .img-preview {
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.3)
      );
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      width: 120px;
      object-fit: contain;
      cursor: grab;
    }

    .im {
      position: relative;
    }

    .im:hover .img-delete {
      position: absolute;
      width: 24px;
      height: 24px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 3px;
      bottom: 8px;
      right: 4px;
      background-image: url("@/assets/icons/delete.svg");
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
  }
}
</style>
