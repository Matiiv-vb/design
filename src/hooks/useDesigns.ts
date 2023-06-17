import { ref, computed } from "vue";
import { DesignModel } from "@/model/design-model";
import { useDesignStore } from "@/store/module/design";

export default function useDesign() {
  const store = useDesignStore();
  const newDesignPublicId = ref("");
  const newDesignTitle = ref("");
  const newUrl = ref("");
  const newImages = ref([]);

  const designs = computed(() => store.getDesigns);

  const getNewId = (): number => {
    const designsSlice = store.getDesigns.slice(-1);
    if (designsSlice.length > 0) {
      return store.getDesigns.slice(-1)[0]["id"] + 1;
    }

    return 1;
  };

  const addDesign = (designObject: DesignModel): void => {
    // const title = newDesignTitle.value && newDesignTitle.value.trim();
    // const publicId = newDesignPublicId.value && newDesignPublicId.value.trim();
    // const url = newUrl.value && newUrl.value.trim();
    // console.log("ADDDSD", title);
    // if (!title) {
    //   return;
    // }

    // const payload = new DesignModel(
    //   getNewId(),
    //   publicId,
    //   title,
    //   url,
    //   false,
    //   []
    // );
    designObject.id = getNewId();

    store.addDesign(designObject);

    // newDesignPublicId.value = "";
    // newDesignTitle.value = "";
    // newUrl.value = "";
  };

  const removeDesign = (id: number): void => {
    store.removeDesign(id);
  };

  const updateDesign = (todo: DesignModel): void => {
    store.updateDesign(todo);
  };

  const updateDesignPubliched = (id: number, publiched: boolean): void => {
    store.updateDesignPubliched({ id: id, publiched: publiched });
  };

  const getDesignById = (id: number): DesignModel => {
    store.getDesignById(id);
    const design: DesignModel | null = store.getDesign;

    if (design === null) {
      throw Error("todo cant be null.");
    }

    return design;
  };

  return {
    addDesign,
    newDesignPublicId,
    newDesignTitle,
    newUrl,
    newImages,
    updateDesign,
    updateDesignPubliched,
    removeDesign,
    designs,
    getDesignById,
    getNewId,
  };
}
