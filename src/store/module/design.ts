import type { DesignState } from "../type/design";
import { DesignModel } from "@/model/design-model";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useDesignStore = defineStore("design", () => {
  const state = reactive<DesignState>({
    design: null,
    designs: [
      new DesignModel(
        1,
        "103",
        "Ostriv",
        "https://design104.horoshop.ua/",
        false,
        []
      ),
      new DesignModel(
        2,
        "104",
        "Flora",
        "https://design104.horoshop.ua/",
        false,
        []
      ),
      new DesignModel(
        3,
        "105",
        "SunWear",
        "https://design104.horoshop.ua/",
        true,
        ["Ddsfasd", "GDF", "TRT"]
      ),
    ],
  }) as DesignState;

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
  };

  const setDesign = (designModel: DesignModel): void => {
    state.design = designModel;
  };

  const removeDesign = (DesignModelId: number): void => {
    const index = state.designs.findIndex((todo) => todo.id === DesignModelId);
    state.designs.splice(index, 1);
  };

  const updateDesign = (designModel: DesignModel): void => {
    const index = state.designs.findIndex((todo) => todo.id === designModel.id);
    state.designs[index] = designModel;
  };
  const updateDesignPubliched = (designModel: {
    id: number;
    publiched: boolean;
  }): void => {
    const index = state.designs.findIndex((todo) => todo.id === designModel.id);
    state.designs[index].publiched = designModel.publiched;
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
  };
});
