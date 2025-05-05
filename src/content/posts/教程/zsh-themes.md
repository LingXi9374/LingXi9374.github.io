---
title: 使用 Oh-My-Zsh 主题为你的 Zsh 美化！让你的终端更好看！
published: 2025-05-05
description: '安装 Zsh 并美化终端'
image: './zsh-config.png'
tags: [Linux]
category: '教程'
draft: false 
lang: 'zh_CN'
---

<style>
  .heimu, .heimu a, a .heimu, .heimu a.new {
      background-color: #252525;
      color: #252525; /* 初始颜色与背景相同，文字不可见 */
      text-shadow: none;
      transition: color 0.5s ease-in-out;
  }
  </style>
  <style>
  .heimu:hover, .heimu:active,
  .heimu:hover .heimu, .heimu:active .heimu {
    color: white !important;
  }
  </style>
  <style>
  .heimu:hover a, a:hover .heimu,
  .heimu:active a, a:active .heimu {
    color: lightblue !important;
  }
  </style>
  <style>
  .heimu:hover .new, .heimu .new:hover, .new:hover .heimu,
  .heimu:active .new, .heimu .new:active, .new:active .heimu {
    color: #BA0000 !important;
  }
</style>

# 一、小引

本博文参考自：
 1. [zsh 安装与配置，使用 oh-my-zsh 美化终端 | Leehow的小站](https://www.haoyep.com/posts/zsh-config-oh-my-zsh/)
 2. [Linux 效率神器——开始使用 Zsh - 知乎](https://zhuanlan.zhihu.com/p/63585679)

对于经常在 Linux 环境下干活的开发者来说，`Shell`是我们使用最频繁的程序了，`Shell`在程序员和服务器间建立了一个桥梁，它对外提供一系列命令，通过这些命令，可以让服务器知道我们的意图，有了`Shell`我们就可以和机器进行愉快的交流了。

比如，用`ls`命令列举当前目录的文件，用`find`命令查找文件，用`cp`命令拷贝文件，用`top`命令查看机器负载和进程等。常用的`Bash`就是`Shell`的一种，也是Linux下的默认`Shell`程序，现在让我们开始使用`Zsh`，重新定义一个更强大，更人性化的`Shell`。

# 二、介绍

## Zsh 是什么

[Zsh](https://www.zsh.org/)属于`Shell`的一种，和`Bash`一样，但比`Bash`更好用，`Zsh`完全兼容`Bash`，拥有极其丰富的插件，其强大的自动补全参数、文件名以及自定义功能，可以大大提高我们使用Linux的效率。

## 安装 Zsh

```bash
sudo apt install zsh   # Debian,Ubuntu,Mint等
sudo pacman -S zsh zsh-completions   # Arch,Manjaro,Endeavour OS等
```

## Oh-My-Zsh 是什么

传统的`bash`功能比较简陋，且不美观。`Zsh`虽然好用，但直接用起来还是比较麻烦，不过幸运的是，已经有大神给我们配置好了一个很棒的框架：`oh-my-zsh`，专门为`Zsh`打造。[Oh My Zsh](https://ohmyz.sh/)是基于`zsh`命令行的一个扩展工具集，提供了丰富的扩展功能。

## 安装 Oh-My-Zsh

|方式|命令|
|----|----|
|`curl`|`sh -c "$(curl -fsSL https://install.ohmyz.sh/)"`|
|`wget`|`sh -c "$(wget -O- https://install.ohmyz.sh/)"`|
|国内`curl`镜像|`sh -c "$(curl -fsSL https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)"`|
|国内`wget`镜像|`sh -c "$(wget -O- https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)"`|

注意：记得同意使用`Oh-my-zsh`的配置模板覆盖已有的`.zshrc`。

![install omz](https://img.haoyep.com/gh/leegical/Blog_img/cdnimg/202401012224221.png)

# 三、终端配置

## 安装 Powerlevel10k 主题

这是我推荐的首选`Zsh`主题，根据文章[What’s the best theme for Oh My Zsh?](https://www.slant.co/topics/7553/~theme-for-oh-my-zsh)中的排名，以及自定义化、美观程度，强烈建议使用`powerlevel10k`主题。

安装命令：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 中国用户可以使用 gitee.com 上的官方镜像加速下载
git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 或者
yay -S zsh-theme-powerlevel10k-git   # 试了一下在我这好像这样安装完用不了，如果你觉得可以这样在Arch上安装那你用这个
```

## 插件

`oh-my-zsh`已经内置了`git`插件，内置插件可以在`~/.oh-my-zsh/plugins`中查看，下面介绍一下我常用的插件，更多插件可以在`awesome-zsh-plugins`里查看。

### 1. zsh-autosuggestions

[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)是一个命令提示插件，当你输入命令时，会自动推测你可能需要输入的命令，按下右键可以快速采用建议。效果如下：

![zsh autosuggestions
](https://cdn.haoyep.com/gh/leegical/Blog_img/cdnimg/202401012250028.png?size=large)

安装方式：把插件下载到本地的`~/.oh-my-zsh/custom/plugins`目录。

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 中国用户可以使用下面的加速下载
git clone https://github.moeyy.xyz/https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 2. zsh-syntax-highlighting

[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)是一个命令语法校验插件，在输入命令的过程中，若指令不合法，则指令显示为红色，若指令合法就会显示为绿色。效果如下：

![zsh syntax highlighting
](https://cdn.haoyep.com/gh/leegical/Blog_img/cdnimg/202401012252786.png?size=large)

安装方式：把插件下载到本地的`~/.oh-my-zsh/custom/plugins`目录。

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 中国用户可以使用下面的加速下载
git clone https://github.moeyy.xyz/https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 3. z 插件

`oh-my-zsh`内置了`z`插件。`z`是一个文件夹快捷跳转插件，对于曾经跳转过的目录，只需要输入最终目标文件夹名称，就可以快速跳转，避免再输入长串路径，提高切换文件夹的效率。效果如下：

![z](https://cdn.haoyep.com/gh/leegical/Blog_img/cdnimg/202401012254065.png?size=large)

### 4. extract

`oh-my-zsh`内置了`extract`插件。`extract`用于解压任何压缩文件，不必根据压缩文件的后缀名来记忆压缩软件。使用`x`命令即可解压文件，效果如下：

![extract](https://cdn.haoyep.com/gh/leegical/Blog_img/cdnimg/202401012259966.png?size=large)

### 5. web-search

`oh-my-zsh`内置了`web-search`插件。`web-search`能让我们在命令行中使用搜索引擎进行搜索。使用搜索引擎`关键字`+`搜索内容`即可自动打开浏览器进行搜索。效果如下：

![web search](https://cdn.haoyep.com/gh/leegical/Blog_img/cdnimg/202401012302476.png?size=large)

:::important
最后，记得启用所有插件。
:::

<span class="heimu" title="你知道的太多了">写在这里：实际上我不用第四和第五个插件（，解压不如用tar -xf或者unzip,unrar等，搜索直接在浏览器主界面用））</span>

### 启用插件

修改`~/.zshrc`中插件列表为：

```bash
...
plugins=(git zsh-autosuggestions zsh-syntax-highlighting z extract web-search)
...
```

:::Tip
部分插件需要参考插件介绍进行安装。
:::

## 小技巧

### 1. 配置本地代理

如果你配置了本地代理，并希望终端的`git`等命令使用代理，那么可以在`~/.zshrc`中添加（假设本地代理端口为2080）：

```bash
# 为 curl wget git 等设置代理
proxy () {
  export ALL_PROXY="socks5://127.0.0.1:2080"
  export all_proxy="socks5://127.0.0.1:2080"
}

# 取消代理
unproxy () {
  unset ALL_PROXY
  unset all_proxy
}
```

以后在使用`git`等命令之前，只需要在终端中输入`proxy`命令，即可使用本地代理。

# 四、更新 or 卸载 Oh-My-Zsh

## 卸载

终端输入：

```bash
uninstall_oh_my_zsh
Are you sure you want to remove Oh My Zsh? [y/N]  Y
```

终端提示信息：
```PlainText
Removing ~/.oh-my-zsh
Looking for original zsh config...
Found ~/.zshrc.pre-oh-my-zsh -- Restoring to ~/.zshrc
Found ~/.zshrc -- Renaming to ~/.zshrc.omz-uninstalled-20170820200007
Your original zsh config was restored. Please restart your session.
Thanks for trying out Oh My Zsh. It's been uninstalled.
```

## 手动更新

终端输入：

```bash
upgrade_oh_my_zsh
```

# 结语

由以上可以看出，`Zsh`配合`oh-my-zsh`，可以大大方便我们在Linux下敲命令的任务，以上只是`Zsh`很少的一部分，`oh-my-zsh`还有很多插件和使用方法，等待大家去发掘。

(The End)