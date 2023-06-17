import type { DesignModel } from "@/model/design-model";

export type DesignState = {
  design: DesignModel | null;
  designs: DesignModel[];
};
