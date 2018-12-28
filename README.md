# electron-video

> 一个本地视频播放器,以本地视频或者图片作为服务器资源,该项目只是自己无聊的产品,编写时间不定

### 2018年12月28日
``` bash
播放器开发效果如下
录制的gif图片比较卡加上github有点慢,so看图片看看大致功能
```
#### 具体效果如下
![播放器](./dist/screenshot/1.gif)
![播放器](./dist/screenshot/2.gif)
![播放器](./dist/screenshot/3.gif)
![播放器](./dist/screenshot/4.gif)
![播放器](./dist/screenshot/5.gif)
![播放器](./dist/screenshot/6.gif)
![播放器](./dist/screenshot/7.gif)

### 2018年9月28日
``` bash
1. 今天把页面结构搭建起来了
2. 组件划分了一下
3. 左侧边栏组件功能编写完毕
```

### 2018年9月29日
``` bash
1. 今天重构了一下页面结构和组件分类
2. 基础搜索组件ui编写完毕
3. 基础logo组件编写完毕
```
#### 具体效果如下
![页面基础骨架1](./dist/screenshot/1.png)
![页面基础骨架2](./dist/screenshot/2.png)

### 2018年10月22日
``` bash
1. 好久没写了,太忙了最近,带着写了如下
2. 编写了添加快速查看nav的组件
3. vuex存储系统的分类编写
```
#### 具体效果如下
![组件](./dist/screenshot/3.png)
![组件](./dist/screenshot/4.png)
![组件](./dist/screenshot/5.png)
![组件](./dist/screenshot/6.png)
![组件](./dist/screenshot/7.png)
![组件](./dist/screenshot/8.png)
![组件](./dist/screenshot/9.png)

### 2018年10月24日
``` bash
1. 今天编写完快速查看中导航的 增 删 改 功能
2. home组件逻辑写的差不多
```

### 2018年10月26日
``` bash
1. 今天编写了视频播放页 截图,打开视频目录,使用电脑默认程序打开视频功能
```

### 2018年11月14日
``` bash
1. 写了好多,懒得说的了,看图就明白了
2. 下图效果的ui及功能逻辑都编写完毕
```
#### 具体效果如下
![组件](./dist/screenshot/10.png)
![组件](./dist/screenshot/11.png)
![组件](./dist/screenshot/12.png)
![组件](./dist/screenshot/13.png)
![组件](./dist/screenshot/14.png)
![组件](./dist/screenshot/15.png)

### 2018年11月26日
``` bash
1. 搜索功能编写完毕
2. 增加了缓存机制,避免总是读取文件
3. 部分ui添加返回按钮
4. 优化首页banner加载机制
5. 设置新增清楚当前数据按钮
6. 新增部分基础组件
7. 编写了部分web api get接口(为移动端页面开发做准备)
   获取导航信息接口：
       http://192.168.130.164:1314/get_nav_list
   获取视频列表通过导航名称接口：
       http://192.168.130.164:1314/get_video_list_by_nav?tag=推荐&num=10&forceUpdate=true
   获取收藏视频接口：
       http://192.168.130.164:1314/get_collect_video
   获取视频记录接口：
       http://192.168.130.164:1314/get_video_record
   搜索视频根据搜索关键词接口
       http://192.168.130.164:1314/search?key=http&forceUpdate=true
```
#### 具体效果如下
![组件](./dist/screenshot/16.png)
![组件](./dist/screenshot/17.png)
![组件](./dist/screenshot/18.png)

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```
# electron-video
# electron-video
