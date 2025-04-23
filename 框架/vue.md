# compositionAPI

## setup函数

是compositionAPI实际编写函数的地方，可以替代之前所编写的大部分其他选项，比如methods，computed，watch，data，生命周期等

### setup函数的基本使用

#### 第一个参数：props

props非常好理解，它其实就是**父组件传递过来的属性**会被放到**props对象**中，我们**在setup中如果需要使用**，那么就可以直接**通过props参数获取**:

- 对于定义props的类型，我们还是和之前的规则是一样的，**在props选项中定义**;
- 并且在**template中依然是可以正常去使用props中的属性**，比如message；
- 如果我们在setup函数中想要使用props，那么不可以通过 this 去获取 (后面我会讲到为什么)
- 因为props有**直接作为参数传递到setup函数中**，所以我们可以**直接通过参数来使用**即可

#### 第二个参数：context

另外一个参数是context，我们也称之为是一个SetupContext，是一个相关上下文，它里面包含三个属性:

- attrs: 所有的非prop的attributer
- slots :父组件传递过来的插槽(这个在以染函数返时会有作用，后面会讲到);
- emit：当我们组件内部需要发出事件时会用到emit (因为我们不能访问this，所以不可以通过this.$emit发出事件)

### setup生命周期钩子

前面说过 setup 可以用来替代 data、 methods、computed 等等这些选项，也可以替代生命周期钩子，那么setup中如何使用生命周期函数呢?

- **可以使用直接导入的onX函数注册生命周期钩子**

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240222105451528.png" alt="image-20240222105451528" style="zoom: 80%;" />

```js

onBeforeMount(){//初始渲染,创建和插入 DOM 节点之前

},
onMounted(){//挂载之前

},
onBeforeUpdate(){//数据变化后，重新渲染之前

},
onUpdated(){//重新渲染之后

},
onBeforeUnmount(){//卸载之前
  
},  
onUnmounted(){//卸载时
  
}，
onActivated(callback: () => void){//注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用。
//这个钩子在服务器端渲染期间不会被调用。
 
}，
onDeactivated(callback: () => void){//注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，
//当组件从 DOM 中被移除时调用。
}

```

### watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

示例：

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
// -> 输出 1
```

**第一个参数**就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

**第二个参数**是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

默认情况下，侦听器将在组件渲染之前执行。设置 `flush: 'post'` 将会使侦听器延迟到组件渲染之后再执行。详见[回调的触发时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 `flush: 'sync'` 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。

返回值是一个用来停止该副作用的函数。

#### 停止侦听

```js
const stop = watchEffect(() => {})

// 当不再需要此侦听器时:
stop()
```

### watch函数

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

```js
const count = ref(0)
watch(count, (count, prevCount) => {
  /* 侦听ref数据
})
```

```js
const state = reactive({ count: 0 })
watch(
  () => state,
  (newValue, oldValue) => {
    // newValue === oldValue
  },
  { deep: true }
)
/*侦听一个函数
```

当使用 getter 函数作为源时，回调只在此函数的返回值变化时才会触发。如果你想让回调在深层级变更时也能触发，你需要使用 `{ deep: true }` 强制侦听器进入深层级模式。在深层级模式时，如果回调函数由于深层级的变更而被触发，那么新值和旧值将是同一个对象。

------

`watch()` 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

**第一个参数**是侦听器的**源**。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

**第二个参数**是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

**第三个可选的参数**是一个对象，支持以下这些选项：

- **`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。
- **`deep`**：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考[深层侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)。
- **`flush`**：调整回调函数的刷新时机。参考[回调的刷新时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)及 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)。
- **`onTrack / onTrigger`**：调试侦听器的依赖。参考[调试侦听器](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)。
- **`once`**: 回调函数只会运行一次。侦听器将在回调函数首次运行后自动停止。 

与 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 相比，`watch()` 使我们可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。

#### 停止侦听

```js
const stop = watch(source, callback)

// 当已不再需要该侦听器时：
stop()
```

## reactive函数

### ref

定义简单的响应式数据，string，number，Boolean；**也可以定义复杂数据**

- 在模板内用ref时，vue会自动帮助我们进行解包操作。所以我们并不需要在模板中通过ref.value的方式来使用。

- 但是在 setup 函数内部它依然是一个ref引用，所以对其进行操作时，我们依然需要使用 ref.value的方式
- **基本上场景都使用ref（），从网络中获取的数据也是使用ref**

```js
const music = ref([]);
onMounted (()=>{
const serverMusic = ['disco','hip-hop','k-pop'];
music.value =  serverMusic;//直接将空数组变成网络请求内容
})
```

 

#### 浅层解包

在template内使用时不需要写.value，修改时需要写.value。

### reactive

定义复杂类型的数据（对象，数组），并为其提供响应式的特性。

- **一般情况下应用于本地数据**
- **多个数据之间有联系，组合在一起有特殊作用**

#### 为什么可以变成响应式呢？

- 这是因为当我们使用reactive函数处理我们的数据之后，数据再次被使用时就会进行依赖收集；
- 当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作（比如更新页面）；

### 通过ref获取元素和组件

只需要定义一个ref对象，绑定到元素或者组件的ref属性上即可



### 单向数据流

子组件拿到数据后，只能使用，不能修改

如果确实想修改，那应该传递出去让父组件来修改。

#### readonly函数

用法：

```js
const readonly_info = readonly(info)
```

我们通过reactive或者ref可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方(组件)的这个响应式对象**希望在另外一个地方(组件)被使用**，但是**不能被修改**，这个时候如何防止这种情况的出现呢?

- Vue3为我们提供了readonly的方法
- readonly会返回原生对象的只读代理(也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不能对其进行修改）；

readonly**常见会传入三个类型的参数**：

- 类型一：普通对象
- 类型二：reactive返回的对象
- 类型三：ref的对象

### 其他ref函数

#### torefs

如果我们使用ES6的解构语法，对reactive返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改reactive返回的state对象，数据都不再是响应式的:

```js
const state = reactive({
name :"why",
age: 18
})
const { name ,age } = state；
```


那么有没有办法让我们解构出来的属性是响应式的呢?

- Vue为我们提供了一个**toRefs**的函数，可以将reactive返回的对象中的属性都转成ref;
- **那么我们再次进行结构出来的 name 和 age 本身都是 ref的**

#### toref 

```js
const name = toRef(state,"name")
```

#### shallowRef

创建一个浅层的ref对象

```js
const info = shallowRef({name:"why"});
info.value.name = "kobe"//修改这里时，就不是一个响应式
```

#### triggerRef

手动触发shallowRef相关的副作用

```js
const info = shallowRef({name:"why"});

const changeinfo =（）=>{
  info.value.name = "kobe"//修改这里时，就不是一个响应式
	//手动触发 info所有依赖的响应式
  triggerRef（info）；
}
```

## computed函数

计算函数，直接包裹使用

```js
const state = reactive({
  firstName: 'John',
  lastName: 'Doe'
});

const fullName = computed({
  get() {
    return `${state.firstName} ${state.lastName}`;
  },
  set(value) {
    const parts = value.split(' ');
    state.firstName = parts[0];
    state.lastName = parts[1];
  }
});

console.log(fullName.value); // 输出 "John Doe"

fullName.value = 'Jane Smith';

console.log(state.firstName); // 输出 "Jane"
console.log(state.lastName); // 输出 "Smith"
```

### getter和setter方法

计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，**不要改变其他状态、在 getter 中做异步请求或者更改 DOM！**

因此 getter 的职责**应该仅为计算和返回该值**

setter方法处理`computed`属性的写入操作的函数。当使用`v-model`或直接赋值方式修改`computed`属性时，`setter`函数会被调用，您可以在其中执行自定义逻辑。

## 依赖注入

### provide和inject

通常情况下，当我们需要从父组件向子组件传递数据时，会使用 [props](https://cn.vuejs.org/guide/components/props.html)。想象一下这样的结构：有一些多层级嵌套的组件，形成了一颗巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分数据。在这种情况下，如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦。

`provide` 和 `inject` 可以帮助我们解决这一问题 一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  }
}
```

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
```

注意：

vue中数据一般是响应式的，在使用provide和inject时不会将数据自动变为响应式，所以需要给对应的数据添加响应式。