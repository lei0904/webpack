import Vue from 'vue'
import Vuex from 'vuex'

//import Logger from '../plugins/logger'

import openId from './modules/openId.js'


const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      openId
  },
  strict: debug,
  //  plugins: debug ? [Logger()] : []
    plugins: debug ? [] : []
})
