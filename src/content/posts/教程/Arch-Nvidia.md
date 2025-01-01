---
title: Arch Linux 启用独显直连(NVIDIA)
published: 2025-01-01
description: '如何在Arch Linux上启用NVIDIA独显直连，让应用程序直接使用独显渲染'
image: './Arch-Nvidia.png'
tags: [Linux]
category: '教程'
draft: false 
lang: 'zh_CN'
---

## 前言

:::important
~~这篇博客很多文字是照搬那个参考链接的，感觉即使我自己手打文稿也觉得和原文讲的差不多，就懒得想了直接Ctrl+C Ctrl+V了。~~
:::

本博客参考网页：[点我](https://blog.caiyi1.me/2024/03/06/Linux-nvidia/)

有一次周末，我在安装好的`Arch Linux`系统和`NVIDIA驱动`之后玩MC，发现帧数撑死只有100多，查看`nvidia-smi`发现能正常使用命令行，但是游戏画面还是卡的很严重，于是我开始排查问题。（如图，MC打开F3界面发现视频驱动使用的是Intel核显）

![pAzxyqA.png](https://s21.ax1x.com/2025/01/01/pAzxyqA.png)


## 解决方法

上篇文章我介绍了安装`NVIDIA驱动`，没看过的[先点这里](https://lingxi9374.github.io/posts/%E6%95%99%E7%A8%8B/archconfiguration/#1-%E5%AE%89%E8%A3%85%E6%98%BE%E5%8D%A1%E9%A9%B1%E5%8A%A8%E4%BB%A5nvidia%E4%B8%BA%E4%BE%8B)

### 1. 安装切换工具

网上的大多数博客仅仅是在hybrid模式下仅使用独显允许所有进程，并非真正的独显直连。这种配置下独立显卡绘制完成后，会将framebuffer交由集成显卡然后输出至显示器，不仅延迟更高，性能也会受到总线带宽的限制。

[system76](https://system76.com/)的[Pop!_OS](https://pop.system76.com/)是为数不多的自带独显驱动和管理器的发行版，并且`system76`编写了一个优秀的电源管理器`system76-power`用于控制电源配置和显卡模式。根据我的使用经验，我更倾向于使用`system76-power`而不是`optimus-manager`或其他管理器。并且`optimus-manager`只能在混合模式下使用独显，而不是真正的独显直连。

对于`Arch Linux`用户，`system76-power`已经包含在`aur`中，软件包名为`system76-power`。该工具由`Rust`编写，并依赖多个`crates`。

使用`yay`安装：

```bash
yay -S system76-power
```

### 启用system76-power守护服务

```bash
sudo systemctl enable com.system76.PowerDaemon.service
sudo systemctl start com.system76.PowerDaemon.service
```

### 切换到独显渲染

```bash
sudo system76-power graphics nvidia
```

此时仍然不是独显直连状态，仅仅是只使用nvidia显卡渲染。

### 允许Nvidia-drm作为默认渲染源

:::caution
目前独显直连通过`XRandR`的`--setprovideroutputsource`实现，这意味着`Wayland`目前无法使用独显直连。（未考证）
:::

检查`/etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf`和`/usr/share/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf`，其中有一个文件已经存在了类似一下的内容，这意味着它是你要修改的配置文件。

~~（如果/etc/X11/xorg.conf.d/10-nvidia-drm-outputclass.conf的文件不存在就直接复制一模一样的过去），不影响也不冲突。~~

```Plaintext
Section "OutputClass"
    Identifier "nvidia"
    MatchDriver "nvidia-drm"
    Driver "nvidia"
    Option "AllowEmptyInitialConfiguration"
    ModulePath "/usr/lib/nvidia/xorg"
    ModulePath "/usr/lib/xorg/modules"
EndSection
```

在`Option "AllowEmptyInitialConfiguration"`后添加一行`Option "PrimaryGPU" "yes"`。

### 配置显示源自动切换

如果此时重启，在进入DE时应该会导致黑屏。这是由于Xorg将集成显卡作为了输出源而不是独立显卡。我们需要在DE实际启动前将显示源切换成Nvidia显卡。

根据不同的DM，需要进行不同的配置。

#### SDDM

在`/usr/share/sddm/scripts/Xsetup`中添加以下内容:

```Plaintext
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

#### GNOME

在`/usr/share/gdm/greeter/autostart/optimus.desktop`和`/etc/xdg/autostart/optimus.desktop`中添加以下相同的内容:

```Plaintext
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

#### 不使用DM

如果不使用DM，在`~/.xinitrc`中添加以下内容：

```Plaintext
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

#### LightDM

参考[Arch Wiki](https://wiki.archlinux.org/title/NVIDIA_Optimus#LightDM)

### 重启

重新启动后，应该能够进入DM和桌面。在终端中执行`nvidia-smi`，应该能够发现所有的GUI进程都由Nvidia显卡渲染，并且`Xorg`占用数百兆内存。

![pAzziIx.png](https://s21.ax1x.com/2025/01/01/pAzziIx.png)

## 效果

在进行上文的步骤后，我立刻打开Minecraft，按下F3查看渲染模式，发现已经切换到了Nvidia显卡渲染，游戏画面立刻变得流畅，帧数也上去了。~~（请选择你的拍屏大师.png）~~

![pAzzVzD.jpg](https://s21.ax1x.com/2025/01/01/pAzzVzD.jpg)

