<template>
  <div
    class="dropzone-wrapper"
    :class="[type, isDragActive ? 'active' : '']"
    v-bind="getRootProps()"
  >
    <input v-bind="getInputProps()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useDropzone } from "vue3-dropzone";

export default defineComponent({
  name: "Dropzone",
  props: {
    type: String,
  },
  setup(_, { emit }) {
    let preview: Ref<string[]> = ref([]);

    const saveFiles = (files: any) => {
      if (files) {
        files.forEach((file: any) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event: any) => {
            emit("updateImages", event.target.result);
          };
          reader.onerror = (event: any) => {
            console.log("erorr", event);
          };
        });
      }
    };

    function onDrop(acceptFiles: any, rejectReasons: any) {
      saveFiles(acceptFiles);
      console.log("rejectReasons:", rejectReasons);
    }

    const { getRootProps, getInputProps, ...rest } = useDropzone({
      onDrop,
    });

    return {
      getRootProps,
      getInputProps,
      ...rest,
      preview,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.dropzone {
  &-wrapper {
    height: 120px;
    // margin-bottom: 200px;
    background: $color-ligth;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    border-radius: 3px;

    &.empty {
      max-width: 600px;
      width: 100%;
      background-image: url("@/assets/icons/_iImage.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
    &.add {
      width: 120px;
      background-image: url("@/assets/icons/Union.svg");
      background-repeat: no-repeat;
      background-position: center;
    }

    &.active {
      background-color: darken($color-ligth, 5%);
    }
  }
}
</style>
