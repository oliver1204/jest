import HelloWorld from '@/components/HelloWorld';
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

describe('测试 HelloWorld 组件', () => {
  it('传人msg属性，能否渲染到h1标签内', () => {
    // const baseExtend = Vue.extend(HelloWorld);
    // // 获取当前组件的构造函数，并且挂载次组件
    // const vm = new baseExtend({
    //   propsData: {
    //     msg: 'hello'
    //   }
    // }).$mount();

    // expect(vm.$el.innerHTML).toContain('hello')
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg: 'hello'
      }
    })

  })
})