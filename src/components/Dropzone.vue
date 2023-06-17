<template>
  <div>
    <div v-bind="getRootProps()">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
    </div>
    <button @click="open">open</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useDropzone } from "vue3-dropzone";

export default defineComponent({
  name: "Dropzone",
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
