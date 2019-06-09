import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// this is for font awesome icons
import { library } from '../node_modules/@fortawesome/fontawesome-svg-core'
import { faGithub } from '../node_modules/@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/vue-fontawesome'
library.add(faGithub)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
