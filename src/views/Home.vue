<template>
  <div class="home">
    <router-link :to="{ name: 'create_design' }"> create </router-link>
    home
    <list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import List from "@/components/List.vue";

export default defineComponent({
  name: "Home",
  components: {
    List,
  },
});
</script>
