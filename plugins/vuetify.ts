import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxt) => {
  const vueityfy = createVuetify({
    ssr: true,
    components,
    directives,
  });
  nuxt.vueApp.use(vueityfy);
});
