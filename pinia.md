#  pinia

## 引入pinia

1. 在src文件夹下的stores文件夹的index.js文件写入

   ```js
   import { createPinia } from "pinia";
   
   const pinia = createPinia();
   
   export default pinia;
   
   ```

2. main.js文件内写入

   ```js
   import { createApp } from "vue";
   import App from "./App.vue";
   import pinia from "./stores";
   
   createApp(App).use(pinia).mount("#app");
   ```

3. 之后根据需求在stores文件夹下新建js文件管理数据,e.g.

   ```js
   import { defineStore } from "pinia";
   
   //定义关于counter 的store
   const useCounter = defineStore("counter", { //返回一个函数，命名格式是use+id
     state: () => ({
       count: 99,
     }),
   });
   defineStore("user", {});
   
   export default useCounter
   
   ```

4. 使用时

   ```js
   <template>
     <h2>Home</h2>
     <h2>count:{{ counterStore.count }}</h2>
   </template>
   
   <script setup>
   import useCounter from "@/stores/counter";
   const counterStore = useCounter();
   </script>
   
   <style scoped></style>
   ```

 ## 认识Store

### 什么是Store?
- 一个 store (如 Pinia)是一个**实体**，它会持有为绑定到你**组件树**的**状态和业务逻辑**，也就是保存了全局的状态;
- 它有点像始终存在，并且**每个人都可以读取和写入的组件**;
- 你可以在你的应用程序中**定义任意数量的store来管理你的状态;**

### store有三个核心概念:

**state、getters,actions**

- 等同于组件的data,computed,methods;
- 一旦 store 被实例化，你就可以**直接在 store 上访问 state、getters 和 actions** 中定义的任何属性; 

### 定义一个Store

store使用defineStore()定义,需要一个唯一名称,作为第一个参数传递,命名为useX

这个id是必要的,Pinia使用它来将store连接到devtools

### 操作state

#### 读取和写入 state:
默认情况下，您可以通过 store 实例访问状态来直接读取和写入状态
```js
const counterStore = useCounter()
counterStore.counter++
counterStore.name ='coderwhy'
```
#### 重置 State:
你可以通过调用 store 上的 `$reset()`方法将状态重置到其初始值

#### 改变State:
除了直接用 store.counter++ 修改 store，你还可以调用 `$patch` 方法
它允许您使用部分“state”对象同时应用多个更改

```js
const counterStore = useCounter()
counterStore.$patch({
counter: 100
name :"kobe"
})
```
#### 替换State:
您可以通过将其`$state` 属性设置为新对象来替换Store的整个状态
```js
counterStore.$state ={
counter: 1.
name :"why"
}
```

## gtters

Getters相当于Store的计算属性

- 它们可以用 defineStore0 中的 getters 属性定义
- getters中可以定义接受一个state作为参数的函数

```js
const useCounter = defineStore("counter", {
  //返回一个函数，命名是use+id
  state: () => ({
    count: 99,
    friends: [
      {
        id: 111,
        name: "why",
      },
      {
        id: 222,
        name: "kobe",
      },
    ],
  }),
  getters: {
    //1.基本使用
    doubleCount(state) {
      return state.count * 2;
    },
    //2.一个gtter引入另外一个gettet
    doubleCountAddOne() {
      return this.doubleCount + 1;
    },
    //3.getter也支持返回一个函数
    getFrienfById(state) {
      return function (id) {
        let payloadID = id;
        return state.friends.find(() => {
          state.friends.id == payloadID;
          return 1243;
        });
      };
    },
    //4.gtters中用到别的Store中的数据
    showMessage(state) {
      //引入的数据 
      const userStore = useUser();
      //修改信息
      return `name:${userStore.name}-count:${state.count}`;
    },
  },
});
```

### acitons

Actions 相当于组件中的 methods。

- 可以使用 defineStore0 中的 **actions 属性**定义，并且它们非常适合定义业务逻辑

```js
 actions: {
    increament() {
      this.count++;
    },
    increamentNum(num) {
      this.count += num;
    },
```

和getters一样，在action中可以**通过this访问整个store实例的所有操作**

#### actions的异步操作

并且Actions中是支持异步操作的，并且我们可以编写异步函数，在函数中使用await;

```js
actions:{
increment(){}，
randomCounter() {}，
async fetchHomeDataAction() {
	const res = await fetch("http://123.207.32.32:8000/home/multidata“)
	const data= await res .json()
	console.log("data:",data)
	return data
}
```

