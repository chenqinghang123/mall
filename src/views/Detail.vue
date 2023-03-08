<template>
    <div class="detail banxin">
        <div class="navs">面包屑</div>
        <div class="main flex">
            <div class="pro-info flex">
                <div class="imgs">
                    <div class="big">
                        <img :src="'http://sc.wolfcode.cn' + currentCover" alt="">
                    </div>
                    <ul class="flex">
                        <li @mouseenter="currentCover = item.src" v-for="item in productInfo.imgAltas" :key="item.id">
                            <a href="javascript:void(0);">
                                <img :src="'http://sc.wolfcode.cn' + item.src" alt="">
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="info">
                    <div class="name">{{ productInfo.name }}</div>
                    <div class="desc">{{ productInfo.seriesSubTitle }}</div>
                    <div class="price">{{ productInfo.coin }}</div>
                    <div class="size">
                        <div v-for="p in productInfo.parameterJson" :key="p.name">
                            <h4>{{ p.title }}</h4>
                            <ul class="flex">
                                <li @click="$router.push('/detail?id=' + c.id)" class="item"
                                    :class="{ checked: c.id == $route.query.id }" v-for="c in p.parameters" :key="c.id">{{
                                        c.title }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="opration flex">
                        <span @click="add">+</span>
                        <input v-model="count" type="text">
                        <span @click="sub">-</span>
                    </div>
                    <div class="btns flex">
                        <div class="btn" @click="addToCart">加入购物车</div>
                        <div class="btn">立即购买</div>
                    </div>
                </div>
            </div>
            <div class="canbuy"></div>
        </div>
        <div class="bot-info">
            <ul class="flex">
                <li @click="showDetail = true">商品详情</li>
                <li @click="showDetail = false">常见问题</li>
            </ul>
            <div v-show="showDetail" class="detail-html" v-html="detailHtml"></div>
            <div v-show="!showDetail" class="qa">
                <h4>兑换后运费如何收取？</h4>
                <p>商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。</p>

                <p>（注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）</p>

                <h4>如何申请退换货？</h4>
                <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；</p>

                <p>如因喜好不同，或到货后后悔等原因，不支持退货；</p>

                <p>因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；</p>

                <p>如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；</p>

                <p>如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。</p>

            </div>
        </div>
    </div>
</template>

<script>
import { getGoodDetailApi, addToCartApi } from '@/api'
export default {
    data() {
        return {
            nav: [],
            productInfo: {
            },
            youCanBuy: [],
            currentCover: '',
            count: 1,
            showDetail: true
        }
    },
    methods: {
        addToCart() {
            // 判断已经登录
            if (!this.$store.state.userState.user.phone) {
                this.$toast('请先登录').then(() => {
                    // 弹出登录
                    this.$store.commit('loginState/showLoginModel', true)
                })
                return;
            }

            // 加入购物车
            addToCartApi({
                productId: this.productInfo.id,
                total: this.count
            }).then(res => {
                if (res.code === 0) {
                    this.$toast('添加成功')
                }
            })
        },
        add() {
            if (this.count >= this.productInfo.stock) {
                this.$toast('没了，别点了', 'warning')
                return;
            }
            this.count++
        },
        sub() {
            if (this.count <= 1) {
                this.$toast('不能再少了', 'warning');
                return;
            }
            this.count--
        },
        getInfo() {
            // 获取 路由参数
            if (this.$route.query.id) {
                // 向服务器发请求
                getGoodDetailApi(this.$route.query.id).then(res => {
                    if (res.code === 0) {
                        this.nav = res.data.nav
                        this.productInfo = res.data.productInfo
                        this.youCanBuy = res.data.themYouCanBuy
                        this.currentCover = res.data.productInfo.coverImg
                    }
                })
            }
        }
    },
    created() {
        this.getInfo();
    },
    watch: {
        '$route.query.id': {
            handler() {
                this.getInfo();
            }
        },
        count(newVal, oldVal) {
            if (!/^\d+$/.test(newVal)) {
                this.$toast('请输入数字', 'error');
                this.count = oldVal;
            }
        }
    },
    computed: {
        detailHtml() {
            return this.productInfo.description.replace(/upload/g, 'https://sc.wolfcode.cn/upload')
        }
    }
}
</script>
 
<style lang = "less" scoped>
.detail {
    .main {
        .info {
            padding: 0 40px;

            div {
                line-height: 40px;
            }

            .size {
                .item {
                    border: 1px solid #000;
                    cursor: pointer;
                    margin-right: 20px;
                    padding: 0 20px;
                }

                .checked {
                    border: 1px solid skyblue;
                    color: skyblue;
                }
            }

            .opration {
                padding-top: 40px;

                span {
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    cursor: pointer;
                    border: 1px solid #000;
                    box-sizing: border-box;
                }

                input {
                    outline: none;
                    width: 60px;
                    box-sizing: border-box;
                    height: 40px;
                    border: 1px solid #000;
                    border-left: none;
                    border-right: none;
                    text-align: center;
                }
            }

            .btns {
                padding-top: 40px;

                .btn {
                    width: 120px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    color: #fff;

                    &:first-child {
                        background-color: #0d0;
                    }

                    &:last-child {
                        background-color: rgb(232, 17, 103);
                        margin-left: 40px;
                    }
                }
            }
        }

        .imgs {
            width: 400px;

            ul {
                justify-content: space-between;
            }

            li {
                width: 22%;
            }
        }
    }

    .bot-info {
        ul {
            li {
                width: 160px;
                height: 60px;
                background-color: skyblue;
                text-align: center;
                line-height: 60px;
                font-size: 24px;
            }
        }

        .qa {
            h4 {
                font-weight: 700;
                line-height: 60px;
            }

            p {
                line-height: 40px;
            }
        }
    }
}
</style>