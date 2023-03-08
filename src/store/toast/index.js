export default {
    namespaced: true,
    state: {
        isShow: false,
        msg: ''
    },
    getters: {
    },
    mutations: {
        showToast(state, payload) {
            state.isShow = payload.show;
            state.msg = payload.msg;
        }
    },
    actions: {
        show(context, payload) {
            context.commit('showToast', payload)
            setTimeout(() => {
                context.commit('showToast', { show: false })
            }, 1000)
        }
    },
    modules: {
    }
}