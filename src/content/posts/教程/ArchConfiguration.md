---
title: Arch Linux 安装后配置（可能也会更新）
published: 2024-12-21
description: '讲述安装Arch Linux后，需要干什么'
image: './1920px-Archlinux_chan.png'
tags: [Linux]
category: '教程'
draft: false 
lang: 'zh_CN'
---
## 前言

自上一篇博文写完之后，我就想补充一下安装完系统后要干什么了，因为学业原因拖到这时候写，实在不好意思（

没看过上一篇博文的朋友可以点击[这里](https://lingxi9374.github.io/posts/%E6%95%99%E7%A8%8B/archinst/)查看。

## 第一件事

### 1. 安装Fastfetch

`Fastfetch`是一个用于快速获取系统信息的工具，可以帮助你快速了解系统的配置信息。

```bash
sudo pacman -S fastfetch
```

执行`fastfetch`命令，即可看到系统配置信息。

![pAXikBn.png](https://s21.ax1x.com/2024/12/21/pAXikBn.png)

### 2. 添加archlinuxcn仓库

:::caution
1. archlinuxcn 社区源的 keyring 包 archlinuxcn-keyring 由 farseerfc 的 key 签署验证，而 Arch Linux 官方 keyring 中包含了 farseerfc 的 key 。自12月初 archlinux-keyring 中删除了一个退任的 master key 导致 farseerfc 的 key 的信任数不足，由 GnuPG 的 web of trust 推算为 marginal trust，从而不再能自动信任 archlinuxcn-keyring 包的签名。

2. 因为上述原因，所以需要手动导入 farseerfc 的 key 到系统的 keyring 中，才能正确验证 archlinuxcn-keyring 包的签名。

3. 具体请参阅[此链接](https://www.archlinuxcn.org/archlinuxcn-keyring-manually-trust-farseerfc-key/)
:::

`Archlinuxcn仓库`是Arch Linux中文社区维护的仓库，里面有一些常用的软件包，可以提高Arch Linux中文用户的使用体验。

编辑`/etc/pacman.conf`文件，在文件末尾添加以下内容：

```bash
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.bfsu.edu.cn/archlinuxcn/$arch
```

之后执行以下命令添加farseerfc的key到系统的keyring中并更新软件源：


```bash
sudo pacman-key --lsign-key "farseerfc@archlinux.org"
sudo pacman -Sy archlinuxcn-keyring
```

### 3. 安装yay

:::important
Arch Linux官方仓库中并没有yay，因此没有添加archlinuxcn源来安装yay很麻烦，需要git clone yay仓库到本地，然后手动编译安装。上文已经给出添加archlinuxcn源的方法，可以直接安装。
:::

`yay`是一个AUR包管理器，可以帮助你更方便地安装Arch Linux软件。

```bash
sudo pacman -S yay
```

### 4. 安装Xorg

`Xorg`是Arch Linux官方支持的开源显示服务器，可以让你在Linux上运行图形界面程序。

```bash
sudo pacman -S xorg
```

## 第二件事

### 1. 安装桌面环境

Arch Linux官方仓库中有很多桌面环境，你可以根据自己的喜好安装。

KDE Plasma:

```bash
sudo pacman -S plasma-meta konsole dolphin kate sddm
```

GNOME:

```bash
sudo pacman -S gnome gnome-extra gnome-tweaks gnome-shell seahorse nautilus nautlius-sendto gnome-nettool gnome-usage gnome-multi-writer fwupd adwaita-icon-theme xdg-user-dirs-gtk gdm
```

XFCE:

```bash
sudo pacman -S xfce4 xfce4-goodies sddm
```

记得把对应的`登录管理器`添加到启动项中。

```bash
sudo systemctl enable sddm.service
## 或者
sudo systemctl enable gdm.service
## 重启以生效
reboot
```

重启后记得桌面环境设置中文，每个桌面环境都有自己的设置方法，请自行查找 ~~（好像像XFCE这类桌面没有中文支持）））~~。

### 2. 安装中文字体

Arch Linux官方仓库中有很多中文字体，你可以根据自己的喜好安装。

```bash
sudo pacman -S ttf-dejavu noto-fonts wqy-microhei wqy-zenhei noto-fonts-cjk noto-fonts-emoji
```

### 3. 安装常用软件

Arch Linux官方仓库中有很多常用软件，你可以根据自己的需要安装。

```bash
sudo pacman -S firefox git curl wget zip unzip 
```

## 第三件事

### 1. 安装显卡驱动（以NVIDIA为例）

:::caution
安装NVIDIA显卡驱动这步骤稍微复杂，特别需要注意，只要错了一步就从头再来。

如果你是虚拟机，那就没必要安装驱动了，用nouveau罢 ~~（因为实体机才需要安装显卡驱动）~~

此步骤参考网站：[点我](https://blog.groveer.com/blog/archlinux-install-nvidia)
:::

首先，确认你的显卡型号，在终端中输入`lspci | grep -i nvidia`命令，如果有输出，说明你的显卡是NVIDIA的。

然后，安装NVIDIA驱动（以我的电脑是搭载了MX450的笔记本为例，其他型号显卡需要调整一下命令）~~（注意安装的时候会等待很久，别急）~~。

```bash
sudo pacman -S egl-gbm egl-wayland libvdpau libxnvctrl nvidia-dkms nvidia-prime nvidia-utils
```

编辑initramfs配置文件`/etc/mkinitcpio.conf`，在`MODULES`字段里添加以下内容：

```bash
MODULES=(... nvidia nvidia_modeset nvidia_uvm nvidia_drm...)
```

生成新的initramfs：

```bash
sudo mkinitcpio -P
```

-----

配置内核启动参数，编辑grub配置文件`/etc/default/grub`，在`GRUB_CMDLINE_LINUX`字段里添加以下内容：

```bash
GRUB_CMDLINE_LINUX="... ibt=off nvidia-drm.modeset=1"
```

`ibt=off`参数是为了防止新的硬件导致无法开机问题，此问题在11代以上 Intel CPU 出现，参考[这里](https://wiki.archlinux.org/title/NVIDIA#Installation)

重新生成grub配置文件：

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

适配待机唤醒：

```bash
sudo systemctl enable nvidia-suspend.service nvidia-hibernate.service nvidia-resume.service
```

重启电脑后检查，输入`nvidia-smi`命令，如果有输出，说明驱动安装成功。

![pAXivr9.png](https://s21.ax1x.com/2024/12/21/pAXivr9.png)

### 2. 开启独显直连

敬请参阅这篇文章：[Arch Linux 启用独显直连(NVIDIA)](https://lingxi9374.github.io/posts/%E6%95%99%E7%A8%8B/arch-nvidia/)

## 第四件事

### 1. 安装中文输入法（雾凇拼音）

:::important
参考网站：[点我](https://sspai.com/post/89281)
:::

Arch Linux官方仓库中有很多中文输入法，你可以根据自己的喜好安装。

```bash
sudo pacman -S fcitx5 fcitx5-gtk fcitx5-qt fcitx5-configtool fcitx5-material-color fcitx5-rime
```

安装完成后，在终端里运行`fcitx5-configtool`（或在应用程序启动器中检索「Fcitx」关键字），打开 `Fcitx 设置工具`。然后，在右侧的`「可用输入法」`中找到 `RIME`，双击它，以将其添加到`「当前输入法」`列表。

最后，在系统托盘右击` Fcitx 图标`（通常显示为键盘图案，或者是一只小企鹅），选择`「RIME」`，这样就成功激活了。

使用 Git 来下载东风破工具，假设把工具下载到当前用户的主目录下：

```bash
git clone --depth 1 https://github.com/rime/plum ~/plum
```

然后，运行以下命令安装雾凇拼音：

```bash
# 切换到东风破的目录
cd ~/plum

# 我们使用的是Fcitx5，需要加入参数，让东风破把配置文件写到正确的位置
rime_frontend=fcitx5-rime bash rime-install iDvel/rime-ice:others/recipes/full
```

稍等片刻，雾凇拼音输入方案就安装成功了。

如何激活：接下来，只需要按「Ctrl+~」快捷键（其中，「~」键位于 Tab 键的正上方），打开 RIME 的输入方案选择菜单：

![pAXisEt.webp](https://s21.ax1x.com/2024/12/21/pAXisEt.webp)

然后，按下相应的数字键（或直接点击），选择「雾凇拼音」，那么雾凇拼音将正式激活，你可以畅快地打字了！

## 第五件事

### 1. 配置hosts文件

由于我们日常使用Arch Linux过程中，往往都需要与Github打交道，但很多时候终端执行一些命令时总是连不上，因此，我们需要配置hosts文件。

这里我推荐Github Hosts项目：

::github{repo="maxiaof/github-hosts"}

根据项目说明，我们可以将项目中的内容复制到hosts文件中（具体你们自己操作）。

激活生效：我们重启网络

```bash
sudo systemctl restart NetworkManager.service
```

这样，我们就减少了很多麻烦，终端执行命令时，可以顺利连接到Github。

### 2. 使用AUR安装软件

我们将使用上文提到的`yay`来安装软件，以下是安装软件格式：

```bash
yay -S <软件名>
```

我的常用软件：
 - `linuxqq`: QQ聊天（基于ntqq内核的新版QQ）
 - `visual-studio-code-bin`: VSCode编辑器
 - `nekoray`: 科学上网软件（基于sing-box和xray-core）
 - `teamviewer`：TeamViewer远程控制软件
 - more and more...


## 后记

至此，Arch Linux安装完毕，配置完毕，可以愉快地玩耍了。

当然也有可能有不足的地方，后续将会完善这篇文章。

（The End）