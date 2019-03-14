//let  root  = 'http://coxsh.natapp1.cc/api';
let  root  = 'https://shmyhyxh.mobilepms.com/am/api/';
import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

function api (method, url, params, loading) {
  if (params) {
    let qs = Qs.stringify(params)
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
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        //'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        let _tempData = response.data;
        console.log('response.config.url---',getRoot()+'wx/pay')
        if(response.config.url == getRoot()+'wx/pay'){
          resolve(response.data)
        }else if (_tempData.status === 'OK') {
          resolve(_tempData)
        }
        else {
          Vue.$toast({
            message: _tempData.message,
            className: 'with-icon',
            iconClass: 'failed'
          })
          if (reject) {
            reject( _tempData)
          }
        }
      } else {
        Vue.$toast({
          message: '网络请求失败',
          className: 'with-icon',
          iconClass: 'failed'
        })
      }
    }).catch(function (error) {
      Vue.$toast({
        message: '网络请求失败',
        className: 'with-icon',
        iconClass: 'failed'
      })
      Vue['$indicator'].close()
      console.error(error)
    })
  })
}

axios.interceptors.request.use(function (config) {
  let loading = config['_loading']
  if (loading) {
    if (typeof loading === 'object') {
      Vue['$indicator'].open(loading.tip)
    } else {
      Vue['$indicator'].open('加载中...')
    }
  }
  return config
})

axios.interceptors.response.use(function (response) {
  let config = response.config
  let loading = config['_loading']
  if (loading) {
    Vue['$indicator'].close()
  }
  console.log(response.data)

  return response
})

export  const getRoot = ()=>{
  return root;
}

export const get = (url, params, loading) => {
  return api('GET', url, params, typeof loading === 'undefined' ? true : loading)
}

export const post = (url, params, loading) => {
  return api('POST', url, params, typeof loading === 'undefined' ? true : loading)
}

export const handleParamters = (parameters) => {
  if (!parameters['token']) {
    parameters['token'] = sessionStorage.getItem('token')
  }
  if (!parameters['storeId']) {
    parameters['storeId'] = sessionStorage.getItem('storeID')
  }
}

export default {
  handleParamters,
  get,
  post,
  getRoot
}

