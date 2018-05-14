MyAlbum
===
---

# 我的相册

- 浏览指定目录的所有视频。
- 标记图片、视频文件，不修改原文件名；(*)

## 版本说明
v0.01                   建立目录结构，完成测试代码中stream服务及视频seek功能。
v0.02                   视频服务器启动时自动生成缩略图。(*)

## 目录结构
```
config/                 全局配置
test/                   测试代码存放目录
videoserver/            视频服务器
www/                    前端页面服务程序
README.md               本说明文件
```
## 安装配置
###  下载本项目
```
$ git clone https://github.com/leonstill/myalbum.git 
```

###  配置videoserver视频服务器

- 打开config/config.js
- 配置fileRoot为视频文件存储服务器的本地绝对路径;
- 配置videoserver为视频文件存储服务器的ip地址及port;
如：
    ```
    ...
    fileRoot: "/home/liang/backup/phone/Camera/video",
    videoserver: "http://127.0.0.1:8081", 
    ...
    ```

###  配置web服务
- 配置文件为www/config/config.js
- port为web服务端口号；
- pageSize为每页显示的视频预览数量，0表示全部显示；

###  生成视频缩略图
- 为了加速预览，web浏览视频时，加载的实际是对应视频的缩略图，路径位置在www/public/thumbnails下，该目录下的缩略图可由takescreenshots.js（位于www/utils/下）生成。该工具读取www/config/下的配置文件作为缺省路径配置。
    ```
    $ cd www/utils
    $ node takescreenshots.js
    ```
- 运行`node takescreenshots.js -h`可以查看该工具帮助。

## 启动
- 运行videoserver服务
    + 打开一个控制台，进入myalbum根目录：
    ```
    $ cd videoserver/ && node index.js
    ```
- 运行web服务
    + 打开另外一个控制台，进入myalbum根目录：
    ```
    $ cd www/ && npm start
    ```

6.  访问
    如果web服务器运行在本地，则在浏览器中打开"http://localhost:4000/video"即可看到内容。
    
    
## 备注
- （*） 说明还未完成的功能。