<template>
  <button
    type="button"
    :disabled="disabled"
    :class="type"
    class="btn-my"
    @click="$emit('clicked')"
  >
    <slot> Default text! </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyButton",
  props: {
    type: String,
    disabled: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.btn-my {
  border: 1px solid rgba($color-black, 0.2);
  color: $color-ligth;
  background: $color-blue;
  appearance: none;
  font: inherit;
  font-size: $font-size-button;
  padding: 7px 11px;
  border-radius: 3px;
  cursor: pointer;
  margin: 0px 4px;
  &.delete {
    background-color: $color-ligth;
    color: $color-red;
  }
  &[disabled] {
    cursor: not-allowed;
  }
}
</style>
