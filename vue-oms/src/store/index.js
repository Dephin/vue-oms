import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
            // sessionStorage.clear();
		},
        saveStore(state) {
            localStorage.setItem('store', JSON.stringify(state));
        },
        clearStore(state) {
            localStorage.setItem('store', '');
        }
	},
	getters: {
        count: state => {
            return state.count;
        }
    }
});
