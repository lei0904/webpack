// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import FastClick from 'fastclick'
FastClick.attach(document.body);

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Vue.prototype.$mint = Mint;

import Vue from 'vue'
import App from './App'
import router from './router'


import Header from './components/Header/index'
Vue.component('Header', Header);

/*import AddressPicker from './components/AddressPicker/address-picker'
Vue.component('cui-address-picker', AddressPicker);*/
import AddressChild from './components/AddressPicker/address-child'
Vue.component('cui-address-child', AddressChild);

import  AttrPicker from './components/AttrPicker/index'
Vue.component('cui-attr-picker',AttrPicker)

import 'lib-flexible'

Vue.config.productionTip = false;

import Api from './api/index.js';
Vue.prototype.$api = Api;

import Ces from './components/ces/ces.js'
Vue.prototype.$ces = Ces;

Ces.ready(function () {
  /* eslint-disable no-new */
  new Vue({
    router,
    components: { App },
    template: '<App/>'
  }).$mount('#app');

});

