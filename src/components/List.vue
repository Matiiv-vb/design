<template>
  <div class="list-wrapper">
    list
    <design-item v-for="design in designs" :item="design" :key="design.id" />
  </div>
</template>

<script lang="ts">
import type { ComputedRef } from "vue";
import { defineComponent } from "vue";
import DesignItem from "@/components/DesignItem.vue";
import useDesigns from "@/hooks/useDesigns";

interface SetupData {
  designs: ComputedRef;
}

export default defineComponent({
  name: "DesignList",
  components: {
    DesignItem,
  },
  setup(): SetupData {
    const { designs } = useDesigns();

    return {
      designs,
    };
  },
});
</script>
