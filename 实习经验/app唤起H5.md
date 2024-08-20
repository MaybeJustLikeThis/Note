# H5唤起app

因为手机的原因，为了保护个人隐私信息，所以如何在保护个人隐私信息的情况下进行使用app，是H5和app开发者的关注点

智能手机应用了名为沙盒的机制，应用只能访问它声明可能访问的资源。但沙盒也阻碍了应用间合理的信息共享，某种程度上限制了应用的能力。

因此我们需要一种工具去实现应用通信， URL Scheme 就是这个工具。

## URL Scheme

### 是什么

组成

``` 
[scheme:][//authority][path][?query][#fragment]
｜												｜				｜
应用标识									行为		参数
```

比如说， 我们拿 `https://www.baidu.com` 来举例，scheme 自然就是 `https` 了。

就像给服务器资源分配一个URL一样，以便我们去访问它一样，我们同样也可以给手机APP分配一个特殊格式的 URL，用来访问这个APP或者这个APP中的某个功能(来实现通信)。APP得有一个标识，好让我们可以定位到它，它就是 URL 的 Scheme 部分。

#### 常用APP的 URL Scheme

|    APP     |   微信    |  支付宝   |   淘宝    |     微博     |   QQ   |   知乎   |  短信  |
| :--------: | :-------: | :-------: | :-------: | :----------: | :----: | :------: | :----: |
| URL Scheme | weixin:// | alipay:// | taobao:// | sinaweibo:// | mqq:// | zhihu:// | sms:// |

#### Intent

安卓的原生谷歌浏览器自从 chrome25 版本开始对于唤端功能做了一些变化，URL Scheme 无法再启动Android应用。 例如，通过 iframe 指向 `weixin://`，即使用户安装了微信也无法打开。所以，APP需要实现谷歌官方提供的 `intent:` 语法

#### Intent 语法

```
intent:
   HOST/URI-path // Optional host 
   #Intent; 
      package=[string]; 
      action=[string]; 
      category=[string]; 
      component=[string]; 
      scheme=[string]; 
   end;
```

如果用户未安装 APP，则会跳转到系统默认商店。当然，如果你想要指定一个唤起失败的跳转地址，添加下面的字符串在 `end;` 前就可以了:

```
S.browser_fallback_url=[encoded_full_url]
```