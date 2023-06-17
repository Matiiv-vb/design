<template>
  <div class="navbar navbar-expand-lg navbar-light bg-light mb-2">
    <router-link :to="{ name: routeName }" class="btn btn-primary">
        <img src="@/assets/icons/ArrowLeft.svg" alt="" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackLink",
  props: {
    routeName: {
      type: String,
      require: true,
    },
  },
});
</script>
