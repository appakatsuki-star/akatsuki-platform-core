import { storeConfig } from "../../data/store-data";

export type AuthVisualMode = "logo" | "image" | "minimal";
export const authBrand = { name: storeConfig.name, logoText: "P", visualMode: "logo" as AuthVisualMode };
