// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuex from 'vuex'
import * as VuexLocal from 'vuex-local'
import store from './store'
import VueResource from 'vue-resource'


Vue.config.productionTip = false
Vue.use(BootstrapVue);

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    next();
});

Vue.component('icon', Icon)
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCWjqGmjH-OM0L-6cPf5eRYVxSIVeAFQjE',
		v: '3.27',
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App },
  store,
})

