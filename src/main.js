import Vue from 'vue'
import VueResource from 'vue-resource'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import VueNativeSock from 'vue-native-websocket'
import App from './App'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueNativeSock, 'ws://rocket.pelidev.com/ws/game')
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
