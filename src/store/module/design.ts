import type { DesignState } from "../type/design";
import { DesignModel } from "@/model/design-model";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { image, image2, image3 } from "@/assets/image64.ts";
import { useRouter } from "vue-router";

export const useDesignStore = defineStore("design", () => {
  const router = useRouter();
  const state = reactive<DesignState>({
    design: null,
    designs: [
      new DesignModel(
        1,
        "103",
        "Ostriv",
        "https://design104.horoshop.ua/",
        false,
        [image]
      ),
      new DesignModel(
        2,
        "104",
        "Flora",
        "https://design104.horoshop.ua/",
        false,
        [image3]
      ),
      new DesignModel(
        3,
        "105",
        "SunWear",
        "https://design104.horoshop.ua/",
        true,
        [image2, image3]
      ),
    ],
  }) as DesignState;

  const modalActive = ref(false);

  const toggleModal = (isActive: boolean) => {
    modalActive.value = isActive;
  };
  const removeCurrentDesign = () => {
    if (state.design) {
      removeDesign(state.design.id);
      router.push({ name: "home" });
      modalActive.value = false;
    }
  };

  const getDesign = computed((): DesignModel | null => state.design);
  const getDesigns = computed((): DesignModel[] => state.designs);
  const getNewId = computed((): number => state.designs.slice(-1)[0]["id"] + 1);

  const getDesignById = (designModelId: number): void => {
    const design: DesignModel | undefined = state.designs.find(
      (t: DesignModel): boolean => t.id === designModelId
    );
    if (!design) {
      return;
    }

    setDesign(design);
  };

  const addDesign = (designModel: DesignModel): void => {
    state.designs = [...state.designs, designModel];
    setDesignsLS();
  };

  const setDesign = (designModel: DesignModel): void => {
    state.design = designModel;
  };

  const setDesignsLS = (): void => {
    localStorage.setItem("designs", JSON.stringify(state.designs));
  };
  const getDesignsLS = (): void => {
    const designs = localStorage.getItem("designs");
    if (designs) {
      state.designs = [...JSON.parse(designs)];
    }
  };

  const removeDesign = (DesignModelId: number): void => {
    const index = state.designs.findIndex((todo) => todo.id === DesignModelId);
    state.designs.splice(index, 1);
    setDesignsLS();
  };

  const updateDesign = (designModel: DesignModel): void => {
    const index = state.designs.findIndex((todo) => todo.id === designModel.id);
    state.designs[index] = designModel;
    setDesignsLS();
  };
  const updateDesignPubliched = (designModel: {
    id: number;
    publiched: boolean;
  }): void => {
    const index = state.designs.findIndex((todo) => todo.id === designModel.id);
    state.designs[index].publiched = designModel.publiched;
    setDesignsLS();
  };

  return {
    getDesign,
    getDesigns,
    getNewId,
    getDesignById,
    addDesign,
    setDesign,
    removeDesign,
    updateDesign,
    updateDesignPubliched,
    modalActive,
    toggleModal,
    removeCurrentDesign,
    getDesignsLS,
  };
});
