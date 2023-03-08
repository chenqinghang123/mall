<template>
    <div class="mask" v-show="$store.state.loginState.showLoginModel"
        @click.self="$store.commit('loginState/showLoginModel', false)">
        <div class="login-box">
            <ul class="flex">
                <li @click="isPhoneLogin = true">手机登录</li>
                <li @click="showWXCode">微信登录</li>
            </ul>
            <div class="content">
                <div class="phone-login" v-if="isPhoneLogin">
                    <div class="row flex">
                        <input type="text" v-model="phone" placeholder="请输入手机号">
                    </div>
                    <div class="row">
                        <slide-verify :l="59" :r="10" :w="395" :h="136" slider-text="向右滑动" @success="onSuccess"
                            @fail="onFail" @refresh="onRefresh" :imgs="slides"></slide-verify>
                    </div>
                    <div class="row flex">
                        <input type="text" v-model="verifyCode" placeholder="请输入验证码">
                        <button @click="getVerifyCode">获取验证码</button>
                    </div>
                    <div class="row flex">
                        <div class="login-btn" @click="loginHandler">登录</div>
                    </div>
                </div>
                <div v-else class="wx-login" id="weixin">微信登录</div>
            </div>
        </div>
    </div>
</template>

<script>

// 作业1: 
// A.思考这里为什么要 import ， 
// B.思考还能否使用别的方式实现 ,   可以使用 require
// C.为什么不直接使用 路径就行
import img1 from '@/assets/images/integral-01.9386d4bf.png'
import img2 from '@/assets/images/integral-02.150d92a1.png'
import img3 from '@/assets/images/integral-03.9870f3f1.png'
import { mapMutations, mapActions } from 'vuex'
import { toast } from "@/components/Toast"
// 导入 api
import { getVerify, phoneLoginApi, getUserInfoByTokenApi, WXLoginApi, bingdingWX } from '@/api'


export default {
    data() {
        return {
            isPhoneLogin: true,
            // msg: '',
            slides: [img1, img2, img3],
            // bool类型的变量 ， 表示滑动验证是否成功
            isSlideSuccess: false,
            phone: '',
            verifyCode: '',
            // 用户判断是手机登录还是手机绑定微信的凭证
            uuid: ''
        }
    },
    methods: {
        showWXCode() {
            this.isPhoneLogin = false;
            // 使用一个闭包 ，把 this 先缓存起来
            var _this = this;
            this.$nextTick(() => {
                // 根据 微信 的 文档 生成二维码
                new WxLogin({
                    id: "weixin",
                    appid: "wx67cfaf9e3ad31a0d", // 这个appid要填死 ， 后端在接入微信登录的时候有的
                    scope: "snsapi_login",
                    // 扫码成功后重定向的接口 ， 后端在接入登录的时候，需要让微信服务器请求一个接口同步数据
                    redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
                    // state填写编码后的url
                    state: encodeURIComponent(
                        // 下面这个地方是微信登录成功后的跳转的地址，要写服务器的ip和端口
                        window.btoa("http://192.168.12.131:8080" + _this.$route.path)
                    ),
                    // 调用样式文件 , 要求是 一种 叫  base64编码的 文本
                    href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlLA0KLmltcG93ZXJCb3ggLmluZm8gew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQoNCi5pbXBvd2VyQm94IC5xcmNvZGUgew0KICAgIG1hcmdpbi10b3A6IDIwcHg7DQp9",
                });
            })
        },
        // ...mapMutations({
        //     showToast: 'toastState/showToast'
        // }),
        ...mapActions({
            showToast: 'toastState/show'
        }),
        onSuccess() {
            // 验证成功
            this.isSlideSuccess = true;
        },
        onFail() {
            this.isSlideSuccess = false;
        },
        onRefresh() {
            this.isSlideSuccess = false;
        },
        getVerifyCode() {
            // 1. 判断是否已经滑动验证成功
            if (!this.isSlideSuccess) {
                // 传入回调的用法，不是最终版本
                // this.$toast('请先滑动验证', 'warning', () => {
                //     console.log('弹出框消失了');
                // })

                // 最新版的提示框
                this.$toast('请先滑动验证', 'warning').then(() => {
                    console.log('弹出框消失了');
                })
                // 提示用户
                return;
            }
            // 2. 验证数据
            // 自己做
            // 3. 发信息
            getVerify(this.phone).then(res => {
                if (res.code === 0) {
                    // 提示用户
                    console.log('发送验证码成功');
                }
            })



        },
        async loginHandler() {
            // 验证数据 - 手机号
            // 是否已经 滑动成功
            if (!this.isSlideSuccess) {
                // 提示用户
                // this.showToast({
                //     show: true,
                //     msg: '请先进行滑块验证'
                // });
                // 编程式组件(弹出)
                toast('请先进行滑块验证', 'error')
                return;
            }

            // 判断 uuid ，如果有，就是手机绑定微信
            if (this.uuid) {
                let res = await bingdingWX({
                    phone: this.phone,
                    verifyCode: this.verifyCode,
                    uuid: this.uuid,
                })
                if (res.code === 0) {
                    // 绑定手机成功，并得到token
                    localStorage.setItem('token', loginRes['x-auth-token'])

                    // 登录成功后，把用户信息请求回来
                    let userInfoRes = await getUserInfoByTokenApi()
                    if (userInfoRes.code === 0) {
                        // 提示用户
                        // 更新用户展示信息
                        this.$store.commit('userState/changeUserInfo', userInfoRes.data.userInfo)
                    }
                }
            } else {
                // 如果没有uuid，就是正常的手机登录

                // 验证码非空
                // 发请求
                let loginRes = await phoneLoginApi({
                    phone: this.phone,
                    verifyCode: ''
                })
                if (loginRes.code === 0) {
                    // 提示用户
                    this.$toast('登录成功')
                    // this.$store.commit('toastState/showToast',true)
                    // this.showToast(true);
                    // 把token存起来
                    localStorage.setItem('token', loginRes['x-auth-token'])

                    // 登录成功后，把用户信息请求回来
                    let userInfoRes = await getUserInfoByTokenApi()
                    if (userInfoRes.code === 0) {
                        // 更新用户展示信息
                        this.$store.commit('userState/changeUserInfo', userInfoRes.data.userInfo)
                    }
                }
            }
        }
    },
    async created() {
        // console.log(this.$route.query.code);
        // 如果进来的时候有code，说明是扫完码，得到一个code，需要拿code到服务器换token
        if (this.$route.query.code) {
            let wxRes = await WXLoginApi({ code: this.$route.query.code })
            if (wxRes.code === 0) {
                this.$toast('登录成功')
                // 存token
                localStorage.setItem('token', wxRes['x-auth-token']);

                // 不光是用token换用户信息，还要把 code 删除
                this.$router.push(this.$route.path)

                let userInfoRes = await getUserInfoByTokenApi()
                if (userInfoRes.code === 0) {
                    // 更新用户展示信息
                    this.$store.commit('userState/changeUserInfo', userInfoRes.data.userInfo)
                }
            } else if (wxRes.code === 407) {
                // 首次使用微信扫码，没有绑定手机的情况
                // 把uuid存起来
                this.uuid = wxRes.uuid;
                // 提示用户
                this.$toast('请先绑定手机号', 'warning')
                // 切换到手机登录
                this.$store.commit('loginState/showLoginModel', true)
                this.isPhoneLogin = true;
            } else if (wxRes.code === 400) {
                // code 超时了， 微信给的 code 有效期只有2分钟
                // 提示用户
                this.$toast('二维码已经失效，请重新扫码', 'warning')
                // 刷新二维码
                this.$store.commit('loginState/showLoginModel', true)
                // this.isPhoneLogin = false;
                // 由于需要触发 微信登录 tab 栏的点击
                // this.$refs.xxx.click()

                // 已经封装好了一个函数，用来显示二维码的
                this.showWXCode();
            }
        }
    }
}


// 作业： 自己研究一下  XMLHttpRequest 

</script>
 
<style lang = "less" scoped>
.mask {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);

    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        background-image: url('../../assets/images/login-box-bg.png');
        width: 555px;
        height: 423px;
        box-sizing: border-box;
        padding: 40px;

        .flex {
            justify-content: center;

            li {
                cursor: pointer;
                padding: 0 20px;

                &:last-child {
                    border-left: 1px solid #000;
                }
            }
        }

        .content {
            padding: 40px 40px 0 40px;

            .phone-login {
                .row {
                    padding-bottom: 20px;
                }

                input,
                .login-btn {
                    flex: 1;
                }

                input {
                    height: 40px;
                    padding-left: 10px;
                    box-sizing: border-box;
                }

                button {
                    width: 120px;
                    background-color: #0a328e;
                    border: 0 none;
                    color: #fff;
                }

                .login-btn {
                    background-color: #0a328e;
                    height: 40px;
                    color: #fff;
                    line-height: 40px;
                }
            }
        }
    }

    /deep/.slide-verify {
        width: 100%;
        position: relative;
        box-sizing: border-box;

        canvas {
            position: absolute;
            left: 0;
            top: -120px;
            display: none;
            width: 100%;
            box-sizing: border-box;
        }

        .slide-verify-block {
            width: 85px;
            height: 136px;
        }

        .slide-verify-refresh-icon {
            top: -120px;
            display: none;
        }

        &:hover {
            canvas {
                display: block;
            }

            .slide-verify-refresh-icon {
                display: block;
            }
        }
    }
}
</style>