import defAvatar from '@/assets/images/userImg.f8bbec5e.png'
export default {
    namespaced: true,
    state: {
        // username: '',
        // avatar: '',
        // coin: '--',
        user: {
            username: '游客',
            headImg: defAvatar,
            coin: '--',
        }
    },
    mutations: {
        changeUserInfo(state, payload) {
            // state.username = payload.username;
            // state.avatar = payload.avatar;
            // state.coin = payload.coin;

            // for (let key in payload) {
            //     state[key] = payload[key]
            // }

            // 是state.user 的情况才能使用
            // Object.assign(state.user, payload);
            state.user = payload;
            // state.user = { ...payload }
        }
    }
}