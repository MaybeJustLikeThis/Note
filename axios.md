# axios

## 请求方式

支持多种请求方式:
- axios(config)
- axios.request(config)
- **axios.get(url[, config])**
- axios.delete(url[, config])
- axios.head(url[, config])
- **axios.post(url, data, config]])**
- axios.put(url[, datal, config]])
- axiospatch(urll, datal, config]l)

有时候，我们可能需求同时发送两个请求

- 使用axios.all,可以放入多个请求的数组
- axios.all(l)返回的结果是一个数组，使用 axios.spread 可将数组[res1,res2] 展开为 res1,res2

### 常见的配置选项

| 请求地址           | url: '/user'                                 |
| ------------------ | -------------------------------------------- |
| 请求类型           | method: 'get'                                |
| 请根路径           | baseURL:http://www.mt.com/api                |
| 请求前的数据处理   | transformRequest:[function(data){}]          |
| 请求后的数据处理   | transformResponse: [function(data){}]        |
| 自定义的请求头     | headers：{'x-Requested-With:XMLHttpRequest'} |
| URL查询对象        | params:( id: 12 )                            |
| 查询对象序列化函数 | paramsSerializer: function(params)           |
| request body       | data: ( key: 'aa')                           |
| 超时设置           | timeout: 1000                                |

## axios创建实例

为什么要创建axios的实例呢?
- 当我们从axios模块中导入对象时，使用的实例是**默认的实例:**
当给该实例设置一些默认配置时，这些配置就被固定下来了
- 但是后续开发中,某些配置可能会不太一样
- 比如**某些请求需要使用特定的baseURL或者timeout**等
- 这个时候,我们就可以**创建新的实例**，并且**传入属于该实例的配置信息**
```js
const instance = axios .create({
baseURL:"http://123.207.32.32:1888"
instance.post("/02_param/postjson",
name :"why"
age: 18
}).then(res =>{
console.log("res:",res)
})
```

### 拦截器

```js
// axios.interceptors.request.use("请求成功的回调", "请求失败的回调");
axios.interceptors.request.use(
  (config) => {
        //1.显示loading动画
        //2.对原来配置文件的修改
        //2.1.认证登录
        //2.3.请求参数进行转化
    return config;
  },
  (err) => {
    console.log("失败");
    return err;
  }
);

// axios.interceptors.response.use("响应成功的回调", "响应失败的回调");

axios.interceptors.response.use(
  (res) => {
        //1.结束loading动画
        //2.数据进行转化
    return res.data;
  },
  (err) => {
    console.log("失败");
    return err;//后续可以对err进行操作
  }
);

axios
  .get("http://123.207.32.32:8000/home/multidata", {
    //url后的参数
    // params: {
    //     id:
    // }
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {});

```

