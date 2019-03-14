const state = {
    OPENID : null
}

const mutations = {
    SET_OPENID(state,data){
        state['OPENID'] = data;
         console.log('---OPENID---',data)
    }
}

const getters = {
    GET_OPENID(state){
        // console.log('---GET_NATION---',state['NATION'])
        return state['OPENID'];
    }
}

export default {
    state,
    mutations,
    getters
}