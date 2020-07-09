import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, {
  iconfont: "mdi"
});

export default new Vuetify({
  theme: {
    dark: true,
  }
});
