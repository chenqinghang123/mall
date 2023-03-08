<template>
    <div class="toast" :class="type">
        <i class="iconfont" :class="icons[type]"></i>
        {{ msg }}
    </div>
</template>

<script>

const icons = {
    error: 'icon-toast-shibai_huaban',
    success: 'icon-toast_chenggong',
    warning: 'icon-toast-jinggao'
}

export default {
    data() {
        return {
            msg: '默认信息',
            type: 'error',
            icons,
        }
    },
    mounted() {
        setTimeout(() => {
            this.$el.remove();
            // 通知 数组把对应的 instance 从数组中移除
            this.onClose();
        }, 2000);
    }
}
</script>
 
<style lang = "less" scoped>
.toast {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px 2px #ccc;
    max-width: 600px;
    word-break: break-all;
    transition: top .5s;
}

.error {
    border: 1px solid #f00;
    color: red;
}

.success {
    border: 1px solid #0f0;
    color: #0f0;
}

.warning {
    border: 1px solid #e9b20a;
    color: #e9b20a;
}
</style>