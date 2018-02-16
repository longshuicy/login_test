import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
	currentView: 'home',
	currentLoggin: false,
	username: null
}

const mutations = {
  switchView (state, view) {
    state.currentView = view;
  },
  switchLoggin(state, bool){
    state.currentLoggin = bool;
  },
  changeUsername(state, username){
    state.username = username;
  },
  /*switchSoicalState(state, val){
  	switch(val){
 		   case 'instagram':
  			state.instagram = !state.instagram;
  			break;
  		case 'wikimedia':
  			state.wikimedia = !state.wikimedia;
  			break;
  		case 'stackoverflow':
  			state.stackoverflow = !state.stackoverflow;
  			break;
  		case 'pinterest':
  			state.pinterest = !state.pinterest;
  			break;
  		case 'weibo':
  			state.weibo = !state.weibo;
  			break;
  	}
  }*/
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [
  	createPersistedState()
  ],
})
