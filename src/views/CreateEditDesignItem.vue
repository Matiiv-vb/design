<template>
  <back-link route-name="home" />
  <div v-if="isDelete" @click="remove(design.id)">DELETE</div>
  <!-- <pre>{{ design }}</pre> -->
  <images v-model:images="images" @deleteImage="deleteImage"  />
  <dropzone @updateImages="updateImages" />
  <input
    type="text"
    class="form-control mr-sm-2 mb-2"
    v-model.trim="design.public_id"
  />
  <input
    type="text"
    class="form-control mr-sm-2 mb-2"
    v-model.trim="design.title"
  />
  <input
    type="text"
    class="form-control mr-sm-2 mb-2"
    v-model.trim="design.url"
  />

  <div @click="saveItem" class="home">Зберегти і вийти</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useDesign from "@/hooks/useDesigns";
import { DesignModel } from "@/model/design-model";
import BackLink from "@/components/BackLink.vue";
import Dropzone from "@/components/Dropzone.vue";
import Images from "@/components/Images.vue";

interface SetupData {
  design: Ref<DesignModel>;
  saveItem: () => void;
  deleteImage: (inx: number) => void;
  updateImages: (image: string) => void;
  images: Ref<string[]>;
  isDelete: Ref<boolean>;
  remove: (id: number) => void;
}

export default defineComponent({
  name: "CreateEditDesignItem",
  components: { BackLink, Dropzone, Images },

  setup(): SetupData {
    const route = useRoute();
    const router = useRouter();
    let images: Ref<string[]> = ref([]);
    let isDelete: Ref<boolean> = ref(false);
    const {
      getDesignById,
      newDesignPublicId,
      newDesignTitle,
      newUrl,
      newImages,
      updateDesign,
      addDesign,
      getNewId,
      removeDesign,
    } = useDesign();

    let design = ref({} as DesignModel);

    onBeforeMount((): void => {
      if (route.name === "edit_design" && route.params.id) {
        const existDesign = getDesignById(Number(route.params["id"]));

        design.value = new DesignModel(
          existDesign.id,
          existDesign.public_id,
          existDesign.title,
          existDesign.url,
          existDesign.publiched,
          existDesign.images
        );
        images.value = [...existDesign.images];
        isDelete.value = true;
      } else {
        design.value = new DesignModel(
          getNewId(),
          newDesignPublicId.value,
          newDesignTitle.value,
          newUrl.value,
          false,
          newImages.value
        );
      }
    });

    const deleteImage = (inx: number) => {
      images.value.splice(inx, 1);
    };
    
    const updateImages = (image: string) => {
      images.value.push(image);
    };

    const saveItem = () => {
      design.value.images = images.value;
      if (route.name === "edit_design" && route.params.id) {
        updateDesign(design.value);
      } else {
        addDesign(design.value);
      }
      router.push({ name: "home" });
    };

    const remove = (id: number) => {
      removeDesign(id);
      router.push({ name: "home" });
    };

    return {
      design,
      saveItem,
      deleteImage,
      updateImages,
      images,
      isDelete,
      remove,
    };
  },
});
</script>
