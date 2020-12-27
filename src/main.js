// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Varticle from './components/varticle'
import Vuex from 'vuex'
import axios from "axios"
import './TweenLite.min.js'
import './EasePack.min.js'

axios.get('https://l2d.fab.moe/js/autoload.js').then(res=>eval(res.data));

Vue.use(Vuetify) //使用vuetify
Vue.use(Varticle) //使用我自制插件varticle
Vue.use(Vuex) //使用vuex
Vue.config.productionTip = false

const vuetify = new Vuetify({});

const store = new Vuex.Store({ //Vuex
  state: {
    bgm: {
      ref: {}, //bgm控件
      on: false //bgm状态
    }
  },
  mutations: {
    setBgm(state, playload) {
      state.bgm.ref = playload;
    },
    bgmOn(state) {
      state.bgm.ref.play();
      state.bgm.on = true;
    },
    bgmOff(state) {
      state.bgm.ref.pause();
      state.bgm.on = false;
    }
  },
  actions: {


  }
})


let vm = new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: {
    App
  },
  template: '<App/>'
})
