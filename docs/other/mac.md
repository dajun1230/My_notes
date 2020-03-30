# Mac终端配置

## Homebrew安装
Homebrew是一款Mac OS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。

### 1. Homebrew安装
进入[Homebrew官网](https://brew.sh/)，复制命令。

打开mac终端，输入如下命令进行安装：
``` js
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
等待安装完成后，输入 brew help 查看其它命令，同时查看git --version，已自动安装git。

### 2. 安装node
终端输入命令：
``` js
brew install node
```

### 3. 终端安装（iTem2）

[具体步骤可参考网址](http://www.siguoya.name/pc/home/article/256)

安装iTem2

[iTerm2官方下载地址](https://www.iterm2.com/downloads.html)

安装第一步选择是，第二步选择don't check。

iTem2设置窗口动态调节步骤：iTem2 =》 Preferences =》General => window =》 勾选 Zoom maximizes vertically only。

iTem2设置背景透明色：iTem2 =》 Preferences =》profiles => window =》 Transparenty(滚动条调节)。

``` warning
iTem2 里面选中即为复制。
```

### 4. 安装 on My Bash

终端输入命令：(此处一定要翻墙)
``` js
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## flutter环境配置问题
解决flutter环境配置之后，终端输入flutter doctor，每次都要重启终端后输入该命令才能起作用，解决方法如下：

1. 进入环境，更改：
``` js
vim ~/.zshrc
```
2.输入i编辑，在最后加入如下行：
``` js
source ~/.bash_profile
```
3. 重启终端，环境生效：
``` js
source ~/.zshrc
```