import Vue from 'vue';
import App from './App.vue';
import './plugins/bootstrap-vue';
import router from './router';
import store from './store';
//Moment
import moment from 'vue-moment';
Vue.use(require('vue-moment'));
//FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faSortAmountUpAlt, faHatWizard, faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faSortAmountUpAlt, faHatWizard, faCalendarAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
