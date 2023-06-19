<template>
  <div class="app-wrapper">
    <side />
    <router-view class="app-wrapper__view" />
    <Modal @close="store.toggleModal(false)" :modalActive="store.modalActive">
      <template v-slot:body> Видалити {{ store.getDesign?.title }}? </template>
      <template v-slot:button>
        <my-button type="delete" @clicked="store.removeCurrentDesign"
          >Видалити</my-button
        >
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import Side from "@/components/Side.vue";
import Modal from "@/components/Modal.vue";
import { useDesignStore } from "@/store/module/design";
import MyButton from "@/components/UI/MyButton.vue";

export default defineComponent({
  name: "App",
  components: { Side, Modal, MyButton },
  setup() {
    const store = useDesignStore();
    onBeforeMount((): void => {
      store.getDesignsLS();
    });
    return { store };
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";
.app-wrapper {
  display: flex;
  min-width: 320px;
  width: 100%;
  min-height: 100vh;

  &__view {
    padding: 24px 30px;
    width: calc(100vw - 100px);
  }
}
</style>
