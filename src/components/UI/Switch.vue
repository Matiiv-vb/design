<template>
  <div class="switch-wrapper">
    <label class="switch">
      <input
        type="checkbox"
        :checked="checked"
        @change="$emit('update:checked', !checked)"
      />
      <div class="slider round"></div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Switch",
  props: {
    checked: {
      type: Boolean,
      require: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.switch {
  position: relative;
  display: inline-block;
  width: 64px;
  height: 24px;
}

.switch-wrapper {
  display: flex;
  align-items: center;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-gray;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: $color-green;
}

input:focus + .slider {
  box-shadow: 0 0 1px $color-green;
}

input:checked + .slider:before {
  -webkit-transform: translateX(40px);
  -ms-transform: translateX(40px);
  transform: translateX(40px);
}

.slider.round {
  border-radius: 14px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
