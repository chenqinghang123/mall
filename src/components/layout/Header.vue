<template>
    <header class="flex banxin">
        <h1>
            <a href="#">
                <img src="@/assets/images/indexLogo.6f8ac4f0.png" alt="">
            </a>
        </h1>
        <ul class="flex">
            <li @click="$router.push('/')">首页</li>
            <li @click="$router.push('/list')">全部商品</li>
            <li @click="$router.push('/person')">个人中心</li>
            <li @click="$router.push('/orders')">我的订单</li>
            <li @click="$router.push('/free')">专属福利</li>
        </ul>
        <div class="search flex">
            <input type="text">
            <span>

            </span>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
            index: 0

        }
    },
    methods: {
        navigateTo() {
            this.$router.push('/' + Math.random().toString(16).substring(3))
        }
    }
}
</script>
 
<style lang = "less" scoped>
.banxin {
    padding-bottom: 20px;
    justify-content: space-between;

    h1 {
        padding-top: 20px;
    }

    ul {
        padding: 40px 40px 0 40px;
    }

    li {
        cursor: pointer;
        margin: 0 20px;
    }

    .search {
        padding-top: 40px;

        input {
            border: 2px solid #ccc;
            height: 40px;
            box-sizing: border-box;
            border-radius: 20px 0 0 20px;
            border-right: none;
            padding-left: 20px;
            outline: none;
        }

        span {
            height: 40px;
            width: 60px;
            background-color: blue;
            box-sizing: border-box;
            border-radius: 0 20px 20px 0;
        }
    }
}
</style>