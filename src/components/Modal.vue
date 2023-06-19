<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          <i @click="close" class="icon-close">
            <img src="@/assets/icons/icons8-close.svg" alt=""
          /></i>

          <div class="body-wrapper">
            <slot name="body"></slot>
          </div>

          <div class="buttons-wrapper">
            <slot name="button"></slot>
            <my-button @clicked="close">Скасувати</my-button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyButton from "@/components/UI/MyButton.vue";
export default defineComponent({
  name: "modal",
  components: {
    MyButton,
  },
  props: {
    modalActive: {
      type: Boolean,
      require: true,
    },
  },
  // props: ["modalActive"],
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.2);
    background-color: $color-gray;
    padding: 54px 26px;
    display: flex;
    justify-content: space-between;

    .icon-close {
      position: absolute;

      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
    
      img {
        width: 18px;
      }
    }

    .body-wrapper {
      display: flex;
      align-items: center;
    }
  }
}
</style>
