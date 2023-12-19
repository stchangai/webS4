import 'normalize.css'

import Vue from 'vue'
import vdrag from "v-drag"
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(vdrag)

                           new Vue({
                             render: h => h(App),
                           }).$mount('#app')
