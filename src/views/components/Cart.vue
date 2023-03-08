<template>
    <div class="cart">
        <div class="row flex">
            <div>
                <span @click="changeCheckAll">
                    <i class="iconfont icon-yduifuxuankuang" v-show="!checkAll"></i>
                    <i class="iconfont icon-yduifuxuankuangxuanzhong checked" v-show="checkAll"></i>
                </span>
            </div>
            <div>礼品信息</div>
            <div>兑换分数</div>
            <div>数量</div>
            <div>小计</div>
            <div>操作</div>
        </div>
        <div class="row flex" v-for="item in carts" :key="item.id">
            <div>
                <span @click="item.checked = !item.checked">
                    <i class="iconfont icon-yduifuxuankuang" v-show="!item.checked"></i>
                    <i class="iconfont icon-yduifuxuankuangxuanzhong checked" v-show="item.checked"></i>
                </span>
            </div>
            <div class="flex">
                <img :src="'http://sc.wolfcode.cn' + item.coverImg" alt="">
                <ul>
                    <li>{{ item.title }}</li>
                    <li>{{ item.versionDescription }}</li>
                </ul>
            </div>
            <div>{{ item.coin }}鸡腿</div>
            <div>
                <div class="opration flex">
                    <span @click="add">+</span>
                    <input v-model="item.total" type="text">
                    <span @click="sub">-</span>
                </div>
            </div>
            <div>{{ item.coin * item.total }}鸡腿</div>
            <div>
                <input type="button" value="删除" @click="del(item.id)">
            </div>
        </div>
    </div>
</template>

<script>
import { getCartInfoApi } from '@/api'
import { confirm } from '@/components/Confirm'
export default {
    data() {
        return {
            carts: []
        }
    },
    created() {
        getCartInfoApi().then(res => {
            if (res.code === 0) {
                this.carts = res.data.map(item => ({
                    ...item,
                    checked: false
                }))
            }
        })
    },
    computed: {
        checkAll: {
            get() {
                // return !this.carts.find(item=>item.checked === false)   
                // return this.carts.filter(item=>item.checked === false).length === 0
                // return !this.carts.includes(item => item.checked === false)
                return this.carts.every(item => item.checked);
            },
            set(val) {
                // 修改我的依赖项
                this.carts.forEach(item => item.checked = val)
            }
        }
    },
    methods: {
        add() { },
        sub() { },
        changeCheckAll() {
            this.checkAll = !this.checkAll;
        },
        del(id) {
            confirm('确定要删除该商品吗？').then(() => {
                // 希望在点击确定的时候调用这个函数
                console.log('现在要删除的商品的id为：' + id);
            })
        }
    }
}
</script>
 
<style lang = "less" scoped>
.cart {
    margin-left: 20px;
    width: 100%;
    border: 1px solid #666;

    .checked {
        color: blue;
    }

    .row {
        justify-content: space-between;
        border-bottom: 1px dashed #ccc;

        &>div {
            padding: 20px;
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

    img {
        width: 80px;
    }
}
</style>