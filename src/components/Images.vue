<template>
  <div>
    <draggable
      class="dragArea list-group w-full"
      :list="images"
      @change="$emit('update:images', images)"
    >
      <div
        class="list-styles"
        v-for="(element, index) in images"
        :key="element"
      >
        <img :src="element" height="200" alt="Image preview" />
        <div @click="$emit('deleteImage', index)">Delete me!</div>
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
