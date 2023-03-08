import Vue from 'vue';
import ConfrimVue from './index.vue';

const MyConfirm = Vue.extend(ConfrimVue);

function confirm(text) {
    return new Promise((resolve, reject) => {
        let instance = new MyConfirm({
            data() {
                return {
                    content: text
                }
            }
        });
        instance.$mount();
        document.body.append(instance.$el);

        // 在这准备一个可以让 确定按钮点击时调用的函数
        instance.onSuccess = function () {
            resolve();
        }
        instance.onCancel = function () {
            reject();
        }
    })
}

export { confirm }