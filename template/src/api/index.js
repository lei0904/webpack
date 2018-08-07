let root = 'http://127.0.0.1:8080/';

import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

function api (method, url, params, loading) {
  if (params) {
    let qs = Qs.stringify(params);
    if (method === 'GET') {
      if (url.indexOf('?') > -1) {
        url = url + '&' + qs
      } else {
        url = url + '?' + qs
      }
    }
  }

  return new Promise(function (resolve, reject) {
    return axios({
      _loading: loading,
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? Qs.stringify(params) : null,
      baseURL: root,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response)
    }).catch(function(error){
      Vue.$toast({
        message: '网络请求失败'
      });
      Vue['$indicator'].close();
      console.error(error)
    })
  });
}

axios.interceptors.request.use(function (config) {
  let loading = config['_loading'];
  if (loading) {
    if (typeof loading === 'object') {
      Vue['$indicator'].open(loading.tip)
    } else {
      Vue['$indicator'].open('加载中...')
    }
  }
  return config
});

axios.interceptors.response.use(function (response) {
  let config = response.config;
  let loading = config['_loading'];
  if (loading) {
    Vue['$indicator'].close()
  }

  return response
});



export default {
  get: function (url, params, loading) {
    return api('GET', url, params, typeof loading === 'undefined' ? true : loading)
  },
  post: function (url, params, loading) {
    return api('POST', url, params, typeof loading === 'undefined' ? true : loading)
  },
  put: function (url, params, loading) {
    return api('PUT', url, params, typeof loading === 'undefined' ? true : loading)
  },
  delete: function (url, params, loading) {
    return api('DELETE', url, params, typeof loading === 'undefined' ? true : loading)
  }
}
