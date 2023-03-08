// 使用到 Vue.extends API 来实现
// 思路： 先准备一个 能弹出的基本组件
//       使用 Vue.extend 得到 一个 子类
//       通过 new 子类 得到一个新的组件
//       使用一个函数 ，让我们每次调用， new 一个新的组件来弹出

import Vue from 'vue';
// 现在 baseTemplate 就是一个组件选项对象
import baseTemplate from './ToastTemplate.vue'
// console.log(baseTemplate);

// 使用 Vue.extends 得到 一个 子类
const ToastComponent = Vue.extend(baseTemplate);

// 定义一个数组，把已经创建的组件存起来
const instances = [];

// 准备一个函数，调用函数可以new 子类
function toast(msg, type = 'success', duration = 2000) {
    return new Promise((resolve, reject) => {
        // type = type || 'success'
        let instance = new ToastComponent({
            // Vue的组件的 data 必须是函数
            data() {
                return {
                    msg,
                    type
                }
            }
        });
        instances.push(instance);
        // console.log(instance);
        // 把组件渲染到页面上
        instance.$mount(); // 为了让 instance 有一个真实dom
        document.body.append(instance.$el); // 把toast组件的真实dom添加为body的子元素

        // 把移除的代码放到 template 的组件里面的了
        // setTimeout(() => {
        //     // document.body.removeChild(instance.$el)
        //     instance.$el.remove();
        // }, 2000)

        // 根据 instances 数组 算出 每个组件应该在的位置
        // instances.forEach((item, index) => {
        //     let h = 0;
        //     let offset = 0;
        //     if (index === 0) {
        //         h = 0;
        //         offset = 20;
        //     } else {
        //         h = item.$el.previousElementSibling.offsetHeight;
        //         offset = item.$el.previousElementSibling.offsetTop;
        //     }
        //     item.$el.style.top = h + offset + 20 + 'px';
        // })

        // 优化 每次只计算当前新增的这个弹出的位置就行
        let h = 0;
        let offset = 0;
        if (instances.length === 1) {
            h = 0;
            offset = 20;
        } else {
            h = instance.$el.previousElementSibling.offsetHeight
            // offsetTop 得到的是当前的偏移量， 当动画在执行的过程中，偏移是当前动画的位置 
            // 解决方案是把 计算后的 偏移 存到 instance 身上，下次不获取offsetTop ，而直接获取 instance 身上的存储的 偏移
            offset = instance.$el.previousElementSibling.offsetTop
        }
        instance.$el.style.top = h + offset + 20 + 'px';

        //  在实例对象身上添加一个方法，让 定时器里面在删除 $el 的时候调用
        instance.onClose = function () {
            // 如果是 已经关闭了， 就是成功了
            resolve();
            // 把我自己从数组里面移除
            const index = instances.findIndex(item => item === this)
            instances.splice(index, 1)

            // 重新排列一下所有的元素
            instances.forEach((item, index) => {
                let h = 0;
                let offset = 0;
                if (index === 0) {
                    h = 0;
                    offset = 20;
                } else {
                    h = item.$el.previousElementSibling.offsetHeight;
                    offset = item.$el.previousElementSibling.offsetTop;
                }
                item.$el.style.top = h + offset + 20 + 'px';
            })

            // 当存在callback，就调用
            // callback && callback();
        }
    })
}


const plugin = {
    install(Vue) {
        // 把toast方法作为 Vue 的实例方法存在
        Vue.prototype.$toast = toast;
    }
}

export { toast }
export default plugin;
