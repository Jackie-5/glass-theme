glass-theme
================

glass-theme 是基于 [Yilia][http://litten.github.io/] 2.4+改版的主题。(感谢原著Yilia,感谢我仿照的作者[MOxFIVE][http://moxfive.xyz/])
崇尚简约优雅，以及极致的性能。 你可以点击 [我的博客](http://jackieblog.github.io/) 查看效果。           
 

—————————————————————

glass-theme主题改版后简介：

1. 我喜欢简约。所以近期文章，搜索框都拿掉了    
2. 接地气一点。友言评论       
3. 追求移动端的体验
3. 让大家把注意力放到内容上。这是本主题设计初衷      
4. 主题不支持IE6，7，8，9。以后也不会        

##一、主题修改

2015.12.1 - 修改整体样式风格
2015.12.2 - 修改并且整理左边栏样式风格
2015.12.4 - 修改友情链接展开样式.
2015.12.5 - 添加柔和的鼠标放上效果与页面自我感觉更有优化的地方.
2015.12.6 - 修改掉整体的font-icon 改为图片显示,为了兼容浏览器显示不全的问题           

##二、使用

#### 安装

``` bash
$ git clone https://github.com/litten/hexo-glass-theme.git
```

#### 配置

修改hexo根目录下的 `_config.yml` ： `theme: glass-theme`

#### 更新

``` bash
cd themes/glass-theme
git pull
```


##三、配置

主题配置文件在主目录下的`_config.yml`：

```
# Header
menu:
  博客主页: /
  所有文章: /archives/?page=1
  分类标签: /tags/?page=2
  关于留言: /about/?page=3

# SubNav 暂时只支持 github email QQ RSS sina 样式icon 其他的icon请自行修改
subnav:
  github: "#"
  sina: "#"
  QQ: "#"
  RSS: "#"
  Email: "#"
  zhihu: "#"
  #douban: "#"
  #facebook: "#"
  #google: "#"
  #twitter: "#"
  #linkedin: "#"
  #wechat: '#'

rss: /atom.xml
#目的是用来修改subnav的名称 支持 知乎,豆瓣,微信 的文字转换
subnavPush: [] 


# Content
excerpt_link: more
fancybox: true
mathjax: true

# Miscellaneous
google_analytics: ''
favicon: /favicon.png

#你的头像url
avatar: ""
#是否开启分享
share: true
#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key
#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论
duoshuo: true

#切换背景图片的个数
background_image: 10

# 是否开启动画效果
animate: true

# 是否在新窗口打开链接
open_in_new: false

#是否开启云标签
tagcloud: true

#是否开启友情链接
#不开启——
#friends: false
#开启——
friends:
  奥巴马的博客: http://localhost:4000/
  卡卡的美丽传说: http://localhost:4000/
  本泽马的博客: http://localhost:4000/
  吉格斯的博客: http://localhost:4000/
  习大大大不同: http://localhost:4000/
  托蒂的博客: http://localhost:4000/

#是否开启“关于我”。
#不开启——
#aboutme: false
#开启——
aboutme: 我是谁，我从哪里来，我到哪里去？我就是我，是颜色不一样的吃货…
```


