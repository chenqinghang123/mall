<template>
  <div class="top">
    <div class="banxin">
      <div class="wel">欢迎来到叩丁狼积分商城</div>
      <div class="top-right">
        <ul>
          <li>
            <a href="javascript:void(0);" style="display:flex;align-items:center;">
              <img :src="$store.state.userState.user.headImg" style="margin-right: 10px;" alt />
              <span class="name">用户名：{{ $store.state.userState.user.username }}</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">我的积分：{{ $store.state.userState.user.coin }}</a>
          </li>
          <li>
            <a href="javascript:void(0);">获取积分</a>
          </li>
          <li>
            <a href="javascript:void(0);">叩丁狼官网</a>
          </li>
          <li>
            <a href="javascript:void(0);" class="login" @click="loginClickHandle" v-show="!isLogined">登录</a>
            <a href="#" class="cart" v-show="isLogined">购物车</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      // isLogined: state => state.loginState.isLogined
      isLogined: state => state.userState.user.email
    })
  },
  methods: {
    loginClickHandle() {
      this.$store.commit('loginState/showLoginModel', true)
    }
  }
};
</script>
 
<style lang="less" scoped>
.top {
  height: 40px;
  background: #242b39;

  .banxin {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
  }

  .top-right {
    ul {
      display: flex;

      li {
        padding: 0 10px;

        a {
          color: #fff;

          &.cart,
          &.login {
            display: block;
            width: 124px;
            // height: 48px;
            background: #0a328e;
          }
        }

        img {
          width: 26px;
          height: 26px;
          border-radius: 13px;
        }
      }
    }
  }
}
</style>