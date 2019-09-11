# 1. 前端自动化测试
目前开发大型应用，测试是一个非常重要的环节，但是大多数前端对测试相关的知识是比较匮乏的，因为可能项目开发周期短，根本没机会写。所以你没有办法体会到前端自动化测试的重要性！

来说说为什么前端自动化测试如此重要！

先来看看常见的前端的问题：

* 修改某个模块的时候，其他模块也受影响，很难快速定位bug
* 多人开发代码越来越难以维护
* 不方便迭代，代码无法重构
* 代码质量差

增加自动化测试后：

* 我们为核心功能编写测试后可以保障项目的可靠性
* 强迫开发者，编写更容易别测试的代码，提高代码质量
* 编写的测试有文档的作用，方便维护

## 1.1 测试

### 1.1.1 黑盒测试和白盒测试

* 黑盒测试一般也称为功能测试，黑盒测试要求测试人员将程序看作一个整体，不考虑起内部结构和性能， 只是按照期望验证程序是否正常工作。

* 白盒测试是基于代码本身的测试，一般指对代码逻辑结构的测试。

### 1.1.2 测试分类

> 单元测试（ Unit Testing ）

单元测试是指对程序中最小的测试单元进行的测试，例如测试 <strong>一个函数、一个模块、一个组件...</strong>

> 集成测试（ Integration Testing ）

将已测试过的单元测试函数进行组合集成暴露出的高层函数或类的封装，对这些函数或类进行的测试

> 端到端测试（ E2E Testing ）

打开应用程序模拟输入，检查功能以及界面是否正确

### 1.1.3 TDD & BDD

> TDD 是测试驱动开发 ( Test-Driven Development )

TDD 的原理是在开发功能代码之前，先编写单元测试用例代码

> BDD 是行为驱动开发 ( Behavior-Driven Development )

系统业务专家、开发者、测试人员一起合体，分析软件的需求，然后将这些需求写成一个个的故事。开发者负责填充这些故事的内容，保证程序实现效果与用户需求一致。

总结： TDD 是先写测试再开发（一般都是单元测试，白盒测试），而 BDD 则是按照用户的行为来开发，在根据用户的行为编写测试用例（一般是集成测试和黑盒测试）

### 1.1.4 测试框架

* Karma Karma为前端自动化测试提供了跨浏览器测试的能力，可以在浏览器中执行测试用例
* Mocha 前端自动化测试框架, 需要配合其他库一起使用， 像chai、sinon... 
* Jest 是facebook推出的一款测试框架，集成了 Mocha、chai、sinon、jsdom等功能。
* ....

## 1.2 Jest 的核心应用

在说Jest测试之前，先来看看我们以前是怎么样测试的：
```js
// name=lzr&age=20 => {name: 'lzr', age: '20'} 
const parser = str => {
	const obj = {}; 
	str.replace(/([^=&]+)=([^=&]+)/g, function() {
		obj[arguments[1]] = arguments[2];
	});
	return obj;
}

// {name: 'lzr', age: 20} => name=lzr&age=20 
const stringify = obj => {
  const arr = []

  Reflect.ownKeys(obj).forEach(key => {
    arr.push(`${key}=${obj[key]}`);
  })
  return arr.join("&");
}

console.log(parser('name=lzr&age=20'));
console.log(stringify({name: 'lzr', age: 20}));
```
但是 `console` 不能出现在正式环境代码中保留，所以我们可以引入测试代码

### 1.2.1 分组、用例

```js
// it 用例

it('测试parser是否能解析数据', () => {
  // 断言
  expect(parser("name=lzr&age=20")).toEqual({name:'lzr', age: "20"})
}) 

```
```js
// describe 是分组

describe('测试qs库是否合法', () => {
  it('测试parser是否能解析数据', () => {
    // 断言
    // toEqual 对象相等
    expect(parser("name=lzr&age=20")).toEqual({name:'lzr', age: "20"})
  }) 
})
```

### 1.2.2 matchers 匹配器

按照匹配器的分类不同，我们将常见api分为 <strong>相等、不相等、包含</strong> 三类。

```js

it('测试两个人是否全等', () => {
  expect(1+1).toBe(2); // js 中的 ===
  expect({ name: 1 }).toEqual({ name: 1 });
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
})


it('测试不相等', () => {
  expect(1+1).not.toBe(3); 
  expect(3).toBeLessThan(5);
  expect(10).toBeGreaterThan(5);
})

it('测试包含', () => {
  expect('hello world').toContain('hello'); 
  expect('hello world').toMatch(/hello/); 
})

```
### 1.2.3 测试操作节点方法

```js
// dom.js

export const removeNode = node => {
  node.parentNode.removeChild(node);
}

// dom.spec.js
import { removeNode } from './2.dom.js';

it('测试能否删除元素 removeNode', () => {
  document.body.innerHTML = '<div><button></button></div>'; // 非真实的dom ,是jest虚拟的dom
  let button = document.querySelector('button');
  expect(button).not.toBe(null);

  removeNode(button);

  button = document.querySelector('button');
  expect(button).toBe(null);
})

```

# 2. 前端自动化测试进阶
### 1. 测试异步方法

提到异步无非就是两种情况，一种是回调函数的方式，一种就是现在流行的promise方式

```js
// js

export const getDataThroughCallback = fn => {
  setTimeout(() => {
    fn({ name: "lzr" });
  }, 1000);
};

// spec.js
import { getDataThroughCallback } from '../3.async.js';

it('测试 传人Callback是否能拿到最终结果', (done) => {
  expect.assertions(1)
  getDataThroughCallback(data => {
    expect(data).toEqual({ name: "lzr" });
    done(); // 标识调用完成
  })
})
```

```js

//js
export const getDataThroughPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "lzr" });
    }, 1000);
  });
};

// import { getDataThroughPromise } from '../3.async.js';
it.only('测试 传人Promise是否能拿到最终结果', async () => {
  expect.assertions(1)
  
  let data = await getDataThroughPromise()
  expect(data).toEqual({ name: "lzr" });
})
```

### 2. Jest 中的 mock

* 2.1 模拟函数jest.fn()
* 2.2 模拟文件jest.mock()
* 2.3 模拟Timer

参考 4.mock.js 文件

### 3. Jest 中的钩子函数

为了测试的便利，Jest 中也提供了类似vue一样的钩子函数，可以在执行测试用例前或者后执行

```js
class Counter {
  constructor() {
    this.count = 0;
  }
  add(count) {
    this.count += count;
  }
}
module.exports = Counter;
```

我们要测试 Counter 类中的 add 方法是否符合预期，来编写测试用例

```js
import Counter from './hook';

it('测试 Counter 增加 1 的功能', () => {
  let counter = new Counter; // 每个测试用例都需要创建一个counter实例，防止相互影响
  counter.add(1);
  expect(counter.count).toBe(1)
})

it('测试 Counter 增加 2 的功能', () => {
  let counter = new Counter; // 每个测试用例都需要创建一个counter实例，防止相互影响
  counter.add(2);
  expect(counter.count).toBe(2)
})

```

我们发现每个测试用例都需要基于一个新的counter实例来测试，防止测试用例间的相互影响，这时候我们可以把重复的逻辑放到钩子中！

Jest 为我们提供了四个测试用例的钩子：<strong>beforeAll()、afterAll()、beforeEach()、afterEach()</strong>。

* beforeAll() 和 afterAll() 会在所有测试用例之前和所有测试用例之后执行一次。
* beforeEach() 和 afterEach() 会在每个测试用例之前和之后执行。

```js
import Counter from './hook';

let counter = null;

beforeAll(() => {
  console.log('before All');
})

afterAll(() => {
  console.log('after All');
})

beforeEach(() => {
  console.log('before Each');
  let counter = new Counter;
})

afterEach(() => {
  console.log('after Each');
})

```

### 4. Jest 中的配置文件

参考 vue-project 中的 `jest.config.js` 文件。

### 5. Jest覆盖率

首先在命令行 `$ npx jest --init`，生产jest.config.js 文件。

然后在 package.json, 的 script 属性下添加 `"test": "jest --coverage" `。

# 3. Vue 中集成 Jest

我们可以通过 vue 官网提供的@vue/cli 直接创建vue项目，在创建前需要先安装好@vue/cli

这里直接创建项目：

```js
vue create vue-unit-project 
```

```js
? Please pick a preset: 
  default (babel, eslint) 
❯ Manually select features // 手动选择
```

```js
? Check the features needed for your project: 
❯◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
 ◉ Vuex
 ◯ CSS Pre-processors
 ◯ Linter / Formatter
 ◉ Unit Testing
 ◯ E2E Testing
```
都选择完成后回车，初始化成功后，我们先来查看项目文件，因为我们主要关注的是测试，所以先来查看下 `jest.config.js` 文件（具体见备注）。

通过配置文件的查看我们知道了所有测试豆子啊tests/unit 目录下。

我们可以查看 package.json 来执行对应的测试命令。

```js
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit --watch" // 这里添加了一个 --watch 参数
},

```

# 4. Vue 组件测试

### 1. 测试 HelloWorld 组件

```js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

```

HelloWorld 组件需要提供一个msg属性，将msg属性渲染到h1标签中，测试代码：

```js
describe('测试 HelloWorld 组件', () => {
  it('传人msg属性，能否渲染到h1标签内', () => {
    const baseExtend = Vue.extend(HelloWorld);
    // 获取当前组件的构造函数，并且挂载次组件
    const vm = new baseExtend({
      propsData: {
        msg: 'hello'
      }
    }).$mount(); // 默认挂载到vm.$el,也可以指定真实节点如：$mount(#app)

    expect(vm.$el.innerHTML).toContain('hello')；
    vm.$destroy(); 消除 组件挂载
  })
})
```

这样一个简单的vue 组件就测试成功了，但是写起来感觉不简洁也不方便！所以为了更方便的测试vue官方提供给我们了个测试工具 Vue Test Utils,而这个工具为了方便应用，采用了同步的更新策略

```js
import HelloWorld from '@/components/HelloWorld';
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

describe('测试 HelloWorld 组件', () => {
  it('传人msg属性，能否渲染到h1标签内', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg: 'hello'
      }
    })
    expect(wrapper.find('h1').text()).toMatch(/hello/);
  })
})
```

