# vue-router

## 基本配置

1. 创建路由需要映射的组件（打算显示的页面）
2. 通过`createRouter`创建路由对象，并且传入`routes`和`history`模式
   - 配置路由配置：组件和路径映射关系的routes数组；
   - 创建基于hash或者history的模式；
3. 使用app注册路由对象（`.use(router)`方法）
4. 路由使用：通过`<router-link>`和`<router-view>`
5. `<router-link>`的样式添加用 `active-class=“css样式名”`

### 路由的其他属性

- name属性：路由的名字 
- meta属性：自定义数据

## 懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载:
- 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
- 也可以提高首屏的渲染效率

其实这里还是我们前面讲到过的webpack的分包知识，而Vue Router默认就支持动态来导入组件:
- 这是因为component可以传入一个组件，也可以接收一个函数，该函数 需要放回一个Promise;
- 而import函数就是返回一个Promise;

  ```js
  const routes =[
  [ path:'/,redirect: ' /home' },
  [ path: ' /home', component: () *> import('../pages/Home.vue')}
  path: '/about', component: () => import(' ../pages/About.vue') ]
  ```

打包后效果：

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240301090755173.png" alt="image-20240301090755173" style="zoom:50%;" />

## 动态路由基本匹配

很多时候我们需要将给定匹配模式的路由映射到同一个组件:
- 例如，我们可能有一个User 组件，它应该对所有用户进行染，但是用户的ID是不同的
- 在Vue Router中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数 

```js
path:'/user/:id'
component:() => import('../pages/User .vue')
```

在router-link中进行如下跳转:
```js
<router-link to="/user/123">用户:123</router-link>
```

在模板中获取到id：

```js
{{$route.params.id}}
```

获取route跳转id

```js
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id);
```

### NotFound页面的匹配

```js
{     
  path: "/:pathMatch(.*)",
  component: () => import("../07_路由的练习/views/notFound.vue"),
},
```

#### 匹配规则加*

```js
{     
  path: "/:pathMatch(.*)*",
  component: () => import("../07_路由的练习/views/notFound.vue"),
},
```

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240302164301540.png" alt="image-20240302164301540" style="zoom:50%;" />

## 路由嵌套

```js
{
     path: "/home",
     component: Home, //component:()=>import ('../07_路由的练习/views/homeXX.vue)效果同上分包
     children: [
        {
          path: "recommend", // home/recommend
          component: () => import("../07_路由的练习/views/homeXXrecomend.vue"),
        },
        { path: "", component: "" },
      ],
 },
```

之后在对应的组件里添加router-link即可

## 路由导航守卫

vue-router 提供的导航守卫主要用来通过跳转或取消的方式安卫导航。
- 全局的前置守卫beforeEach是在导航触发时会被回调的:
- 它有两个参数:
  - to:即将**进入的路由**Route对象;
  - from:即将**离开的路由**Route对象
- 它有返回值:
  - false:取消当前导航;
  - 不返回或者undefined:进行**默认导航**;
  - 返回一个路由地址:
    - 可以是一个**string类型的路径**;
    - 可以是一个**对象**，对象中包含path、query、params等信息;
- 可选的第三个参数:next(不推荐使用)
- 在Vue2中我们是通过next函数来决定如何进行跳转的;
- 但是在Vue3中我们是通过返回值来控制的，不再推荐使用next函数，这是因为开发中很容易调用多次next;

### 登录逻辑

路由文件：

```js
//路由导航守卫
//进行任何的路由跳转之前，传入的beforeEach中的函数都会被回调
//1:需求:进入到订单(order)页面时，判断用户是否登录(isLogin  ->  localstorage保存token）
//情况一: 用户没有登录，那么跳转到登录页面，进行登录的操作
//情况二: 用户已经登录，那么直接进入到订单页面
router.beforeEach((to, from) => {
  //to是要跳过去的页面，from是从哪来的页面
  console.log("被回调");
  console.log(to);
  console.log(from);
  //进入到任何别的页面时，判断用户是否登录
  // if (to.path !== "/login") {
  //   return "/login";
  // }

  //2.进入到订单页面时,判断用户是否登录
  const token = localStorage.getItem("token");
  if (!token && to.path === "/order") {
    return "/login";
  }
});

```

`login.vue`文件：

```js
import { useRouter } from "vue-router";
const router = useRouter();
function loginClick() {
  console.log("登录");
  //向服务器发送请求,服务器会返回token
  localStorage.setItem("token", "token_content");
  router.push("/order");
}
```



## 编程式路由

```js
<button @click="homebtnClick">首页</button>
    <button @click="homebtnback">返回</button>
  </div>


<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function homebtnClick() {
  router.push({
    path: "/home",
  });
  // router.replace("/home");
}
function homebtnback() {
  //返回方法
  router.back();
  //向前一步
  router.forward();
}
</script>
```

## 动态管理路由

### 根据判断动态添加路由

某些情况下我们可能需要动态的来添加路由:
- 比如根据用户不同的权限，注册不同的路由
- 这个时候我们可以使用一个方法addRoute去动态添加一个路由
```js
const categoryRoute = [
path:' /category!
component:()=> import('../pages/Category.vue')
router.addRoute(categoryRoute)
```

**如果我们是为route添加一个children路由，那么可以传入对应的name:**

```js
const categoryRoute ={
path:'/category'
component:() => import('../pages/Category.vue')
}
router.addRoute(categorRoute);
```
### 也可以动态地添加嵌套路由

```js
const homeMomentRoute = {
path: "moment",
component:() => import(' ../pages/HomeMoment.vue')
}
router.addRoute('home',homeMomentRoute)
```
下面也是一种写法：
```js
 router.addRoute("home", {
    path: "vip",
    component: () => import("../07_路由的练习/views/vipXX.vue"),
  });
```



##  删除路由

删除路由有以下三种方式:
- 方式一:添加一个name相同的路由

```js
router.addRoute([ path: '/about', name: 'about', component: About
//这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute([ path: ' /other', name: 'about' , component: Home })
```
- 方式二:通过removeRoute方法,传入路由名称

```js
router .addRoute({ path:'/about',name:'about',component: About })
//删除路由
router.removeRoute('about')
```
- 方式三:通过addRoute方法的返回值回调
```js
const removeRoute = router.addRoute(routeRecord)
removeRoute();
```

## 其他方法

路由的其他方法补充
- routerhasRoute(): 检查路由是否存在
- router.getRoutes(): 获取一个包含所有路由记录的数组

## 完整的导航守卫流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。