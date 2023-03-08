export default {
    namespaced: true,
    state: {
        // 是否已经登录
        isLogined: false,
        // 是否显示登录框
        showLoginModel: false,
    },
    getters: {
    },
    mutations: {
        showLoginModel(state, payload) {
            state.showLoginModel = payload
        }
    },
    actions: {
    },
    modules: {
    }
}