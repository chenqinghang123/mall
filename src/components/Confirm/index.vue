<template>
    <div class="mask" @click.self="cancel">
        <div class="box">
            <div class="content">{{ content }}</div>
            <div class="flex">
                <span class="sure" @click="sure">确定</span>
                <span class="cancel" @click="cancel">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: 'default text'
        }
    },
    methods: {
        sure() {
            this.onSuccess();
            this.$el.remove();
        },
        cancel() {
            this.onCancel();
            this.$el.remove();
        }
    }
}
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

    .box {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        max-width: 400px;
        min-width: 200px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 4px 2px #ccc;
        background-color: #fff;

        .content {
            line-height: 40px;
            font-size: 24px;
        }

        .flex {
            padding-top: 20px;
            justify-content: space-between;

            .sure,
            .cancel {
                padding: 10px;
                border-radius: 4px;
                box-shadow: 0 0 4px 2px #ccc;
            }

            .sure {
                background-color: #0d0;
            }

            .cancel {
                background-color: #fff;
            }
        }
    }
}
</style>