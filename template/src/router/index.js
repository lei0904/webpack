import Vue from 'vue'
import Router from 'vue-router'
import TestAddressIndex from '@/views/TestAddressIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TestAddressIndex',
      component: TestAddressIndex
    }
  ]
})
