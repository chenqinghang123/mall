<template>
    <div class="toast" :style="{ display: $store.state.toastState.isShow ? 'block' : 'none' }">
        {{ $store.state.toastState.msg }}
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
.toast {
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translate(-50%);
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px 2px #ccc;
}
</style>