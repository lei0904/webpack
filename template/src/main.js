// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/base.css'
import store from './store'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import 'lib-flexible/flexible'

import Api from './api/api'
Vue.prototype.$api = Api;

import Ces from './ces/ces.js'
Vue.prototype.$ces = Ces;


Vue.config.productionTip = false;


Ces.ready(function () {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    render: h => h(App),
    methods:{},
    created(){
      console.log('init lei project--->')
    },
  });
});
