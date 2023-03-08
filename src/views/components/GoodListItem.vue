<template>
    <li @click="$router.push('/detail?id=' + data.id)">
        <a href="javascript:void(0);">
            <span class="top-icon">
                <img v-if="data.isHotSale === 1" src="@/assets/images/section_hot.png" alt="">
                <img v-if="data.isLatest === 1" src="@/assets/images/section_new.png" alt="">
            </span>
            <img :src="'http://sc.wolfcode.cn' + data.coverImg" alt="">
            <p>{{ data.name }}</p>
            <p>{{ data.coin }}</p>
            <p>
                <span>立即兑换</span>
            </p>
        </a>
    </li>
</template>

<script>
export default {
    props: {
        data: {
            // pros里面的数据的类型
            type: Object,
            // 表示这个数据必须要从外面传入
            required: true
        }
    },
    data() {
        return {


        }
    }
}
</script>
 
<style lang = "less" scoped>
li {
    width: 285px;
    background-color: #fff;
    position: relative;

    .top-icon {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;

        img {
            width: 100%;
            height: 100%;
        }
    }

    img {
        width: 100%;
        height: 330px;
    }

    p {
        line-height: 40px;
    }
}
</style>