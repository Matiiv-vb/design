import { ref, computed, Ref } from "vue";
import { DesignModel } from "@/model/design-model";
import { useDesignStore } from "@/store/module/design";

export default function useDesign() {
  const store = useDesignStore();

  let currentImages: Ref<string[]> = ref([]);
  const newDesignPublicId = ref("");
  const newDesignTitle = ref("");
  const newUrl = ref("");
  const newImages = ref([]);

  let currentDesign = ref(
    new DesignModel(
      0,
      newDesignPublicId.value,
      newDesignTitle.value,
      newUrl.value,
      false,
      newImages.value
    ) as DesignModel
  );

  const deleteImage = (inx: number) => {
    currentImages.value.splice(inx, 1);
  };

  const updateImages = (image: string) => {
    currentImages.value.push(image);
  };

  const setCurrentDesign = (design: DesignModel) => {
    currentDesign.value = design;
  };

  const toggleModal = () => {
    store.toggleModal(true);
  };

  const designs = computed(() => store.getDesigns);

  const getNewId = (): number => {
    const designsSlice = store.getDesigns.slice(-1);
    if (designsSlice.length > 0) {
      return store.getDesigns.slice(-1)[0]["id"] + 1;
    }

    return 1;
  };

  const addDesign = (designObject: DesignModel): void => {
    designObject.id = getNewId();
    store.addDesign(designObject);
  };

  const removeDesign = (id: number): void => {
    store.removeDesign(id);
  };

  const updateDesign = (design: DesignModel): void => {
    store.updateDesign(design);
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

  //validation
  let saveCliked = ref(false);

  const isValidId = computed(
    () => currentDesign.value.public_id.length > 0 || !saveCliked.value
  );
  const isValidTitle = computed(
    () => currentDesign.value.title.length > 0 || !saveCliked.value
  );
  const isValidUrl = computed(
    () => currentDesign.value.url.length > 0 || !saveCliked.value
  );
  const isValidIdImages = computed(
    () => currentDesign.value.images.length > 0 || !saveCliked.value
  );
  //

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
    toggleModal,
    currentDesign,
    setCurrentDesign,
    currentImages,
    deleteImage,
    updateImages,
    isValidId,
    isValidTitle,
    isValidUrl,
    isValidIdImages,
    saveCliked,
  };
}
