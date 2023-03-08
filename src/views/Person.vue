<template>
    <div class="person banxin flex">
        <div class="left">

        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {


        }
    }
}
</script>
 
<style lang = "less" scoped>
.person {
    .left {
        width: 200px;
        background-color: #ccc;
    }
}
</style>