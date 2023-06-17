<template>
  <div class="item-wrapper">
    {{ item?.title  }}
    {{ item?.id }}
    <router-link
      class=""
      :to="{ name: 'edit_design', params: { id: item?.id } }"
    >
      detail
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DesignModel } from "@/model/design-model";

export default defineComponent({
  name: "DesignItem",
  props: {
    item: {
      type: DesignModel,
      require: true,
    },
  },
});
</script>
