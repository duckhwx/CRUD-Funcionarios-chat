// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueTheMask from 'vue-the-mask'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import router from './router'
import Axios from 'axios';
import io from 'socket.io-client';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// instancia do socket no front
const socket = io.connect('http://localhost:8081');

Vue.config.productionTip = false

// Definição de variaveis globais a serem utilizadas em qualquer componente
Vue.prototype.$axios = Axios;
Vue.prototype.$socket = socket;

Vue.use(Vuetify)
Vue.use(VueTheMask);

new Vue({
	icons: {
		iconfont: 'fa'
	},
	el: '#app',
	router,
	vuetify: new Vuetify(),
	components: { App },
	template: '<App/>'
})
