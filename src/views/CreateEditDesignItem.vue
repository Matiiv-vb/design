<template>
  <div class="edit-design-wrapper">
    <div class="display-flex">
      <back-link route-name="home" />
      <div class="edit-design-main">
        <div class="edit-design-main-header">
          <div class="switch-wrap">
            <Switch v-model:checked="design.publiched" />
            <div v-if="design.publiched" class="text-success">
              Опублікований
            </div>
            <div v-else>Неопублікований</div>
          </div>
          <div class="display-flex">
            <my-button
              type="delete"
              v-if="isDelete"
              @clicked="remove(design.id)"
              >Видалити</my-button
            >
            <my-button @clicked="saveItem">Зберегти і вийти</my-button>
          </div>
        </div>
        <div class="images-dropzone-wrapper">
          <images
            v-if="images.length"
            v-model:images="images"
            @deleteImage="deleteImage"
          />
          <div
            class="dropzone-wrapper"
            :class="images.length ? 'add' : 'empty'"
          >
            <dropzone
              :type="images.length ? 'add' : 'empty'"
              @updateImages="updateImages"
            />
            <div v-if="!isValidIdImages" class="error">
              Обов'язкове поле Фото
            </div>
          </div>
        </div>

        <div class="inputs-wrapper">
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="###"
              v-model.trim="design.public_id"
            />
            <div v-if="!isValidId" class="error">Обов'язкове поле</div>
          </div>

          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Назва дизайну"
              v-model.trim="design.title"
            />
            <div v-if="!isValidTitle" class="error">Обов'язкове поле Title</div>
          </div>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="https://design###.horoshop.ua/"
              v-model.trim="design.url"
            />
            <div v-if="!isValidUrl" class="error">Обов'язкове поле Url</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  Ref,
  ref,
  computed,
  ComputedRef,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import useDesign from "@/hooks/useDesigns";
import { DesignModel } from "@/model/design-model";
import BackLink from "@/components/BackLink.vue";
import Dropzone from "@/components/Dropzone.vue";
import Images from "@/components/Images.vue";
import Switch from "@/components/UI/Switch.vue";
import MyButton from "@/components/UI/MyButton.vue";

interface SetupData {
  design: Ref<DesignModel>;
  saveItem: () => void;
  deleteImage: (inx: number) => void;
  updateImages: (image: string) => void;
  images: Ref<string[]>;
  isDelete: Ref<boolean>;
  remove: (id: number) => void;
  isValidId: ComputedRef<boolean>;
  isValidTitle: ComputedRef<boolean>;
  isValidUrl: ComputedRef<boolean>;
  isValidIdImages: ComputedRef<boolean>;
}

export default defineComponent({
  name: "CreateEditDesignItem",
  components: {
    BackLink,
    Dropzone,
    Images,
    Switch,
    MyButton,
  },

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
    let saveCliked = ref(false);

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

    const isValidId = computed(
      () => design.value.public_id.length > 0 || !saveCliked.value
    );
    const isValidTitle = computed(
      () => design.value.title.length > 0 || !saveCliked.value
    );
    const isValidUrl = computed(
      () => design.value.url.length > 0 || !saveCliked.value
    );
    const isValidIdImages = computed(
      () => design.value.images.length > 0 || !saveCliked.value
    );

    const saveItem = () => {
      saveCliked.value = true;
      design.value.images = images.value;

      if (
        isValidId.value &&
        isValidTitle.value &&
        isValidUrl.value &&
        isValidIdImages.value
      ) {
        if (route.name === "edit_design" && route.params.id) {
          updateDesign(design.value);
        } else {
          addDesign(design.value);
        }
        router.push({ name: "home" });
      }
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
      isValidId,
      isValidTitle,
      isValidUrl,
      isValidIdImages,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.edit-design {
  &-wrapper {
    display: flex;
    flex-direction: column;
    background-color: $color-ligth;

    .inputs-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 24px 8px;
      margin-top: 36px;
      max-width: 600px;

      & input {
        color: $color-black;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        padding: 8px 12px;
        width: -webkit-fill-available;
      }

      & .input-wrapper:first-child {
        width: 80px;
      }
      & .input-wrapper:nth-child(2) {
        flex: 1;
      }
      & .input-wrapper:nth-child(3) {
        width: 100%;
      }

      & .input-wrapper input::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }

      & .input-wrapper:nth-child(2) input::placeholder {
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }

    .images-dropzone-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 10px;
      margin-top: 40px;
    }

    .error {
      font-size: 12px;
      color: red;
    }

    .switch-wrap {
      display: flex;
      align-items: center;
      gap: 0px 10px;
    }
  }

  &-main {
    flex: 1;
    margin-left: 50px;

    &-header {
      display: flex;
      justify-content: space-between;
    }
  }
}

.dropzone-wrapper:not(.add) {
  width: 100%;
  .error {
    max-width: 600px;
  }
}
</style>
