import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index.vue'


let routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            value: 1
        }
    },
];

Vue.use(Router);

let router = new Router({
  routes
});

export default router
