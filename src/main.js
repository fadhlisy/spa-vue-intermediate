import Vue from 'vue'
import Vuex from 'vuex'

import './assets/styles.css'
import './assets/media.css'
import './assets/highlighter.css'
import './assets/tooltip.css'

import App from './App.vue'
import pengguna from './store/pengguna'
import notifikasi from './store/notifikasi'
import kode from './store/kode'
import DataCode from './components/presets/DataCode'
import DataLsp from './components/presets/DataLsp'
import DataErr from './components/presets/DataErr'

Vue.use(Vuex)
Vue.config.productionTip = false

Vue.component(DataCode.name, DataCode)
Vue.component(DataLsp.name, DataLsp)
Vue.component(DataErr.name, DataErr)

const store = new Vuex.Store({
  state() {
    return {}
  },
  modules: {
    pengguna,
    notifikasi,
    kode
  }
})

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
