import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "admin" | "auth" | "default" | "payment"
declare module "C:/vueJs/Khai_project/VSneaker/vsneaker/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}