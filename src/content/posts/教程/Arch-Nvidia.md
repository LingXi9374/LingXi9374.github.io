---
title: Arch Linux 启用独显直连(NVIDIA)(更新于2026.03.27)
published: 2025-01-01
description: '如何在Arch Linux上启用NVIDIA独显直连，让应用程序直接使用独显渲染'
image: '../images/Arch-Nvidia.png'
tags: [Linux]
category: '教程'
draft: false 
lang: 'zh_CN'
---

## 前言

:::important
~~这篇博客很多文字是照搬那个参考链接的，感觉即使我自己手打文稿也觉得和原文讲的差不多，就懒得想了直接Ctrl+C Ctrl+V了。~~
:::

本博客参考网页：[点我1](https://blog.caiyi1.me/2024/03/06/Linux-nvidia/) [点我2](https://blog.hifuu.ink/2024/11/06/arch-nvidia/)

有一次周末，我在安装好的`Arch Linux`系统和`NVIDIA驱动`之后玩MC，发现帧数撑死只有100多，查看`nvidia-smi`发现能正常使用命令行，但是游戏画面还是卡的很严重，于是我开始排查问题。（如图，MC打开F3界面发现视频驱动使用的是Intel核显）

![Minecraft Java F3 显示界面](https://s21.ax1x.com/2025/01/01/pAzxyqA.png)


## 解决方法

上篇文章我介绍了安装`NVIDIA驱动`，没看过的[先点这里](https://blog.lingxi9374.top/posts/%E6%95%99%E7%A8%8B/archconfiguration/#1-%E5%AE%89%E8%A3%85%E6%98%BE%E5%8D%A1%E9%A9%B1%E5%8A%A8%E4%BB%A5nvidia%E4%B8%BA%E4%BE%8B)

### 1. 配置 X11 下的 Nvidia 显卡优先

可以通过配置`/etc/X11/xorg.conf`实现 Nvidia 独显输出。幸运的是，Nvidia 提供了自动生成配置文件的工具，用户无需手动编写：

```bash
sudo nvidia-xconfig --prime
```

该命令会根据硬件情况自动生成配置文件。执行后**重新登录会话**即可生效（即使是 Wayland 用户也可以执行一次此命令）。

![X11 Nvidia 配置](https://blog.hifuu.ink/images/1613f5602b203b38230f19699deb0219454454985.png)

### 2. 配置 Wayland 下的 Nvidia 显卡优先

在 Wayland 下优先启用 Nvidia 显卡的步骤如下：

 1. 编辑 **GRUB配置** 文件
    打开`/etc/default/grub`文件，在`GRUB_CMDLINE_LINUX_DEFAULT=""`中添加`nvidia_drm.modeset=1`：
    ```bash title="/etc/default/grub"
    GRUB_CMDLINE_LINUX_DEFAULT="nvidia_drm.modeset=1"
    ```
 2. 重新生成 grub 配置：
    ```bash
    sudo grub-mkconfig -o /boot/grub/grub.cfg
    ```
 3. 配置`Plasma 环境`文件：
    在`~/.config/plasma-workspace/env/nvidia.sh`中写入以下内容：
    ```bash title="~/.config/plasma-workspace/env/nvidia.sh"
    #!/bin/bash 

    export __NV_PRIME_RENDER_OFFLOAD=1 
    export __GLX_VENDOR_LIBRARY_NAME=nvidia
    ```
 4. 保存并重启电脑，即可生效。
    ![Wayland Nvidia 配置](https://blog.hifuu.ink/images/b2054bbaf6197624d38cc2007d885fd1454454985.png)

### 3. Intel + Nvidia 混合显卡方案

如果不希望全局启用独显，可以选择让大部分程序默认使用核显，而少数高性能需求的程序使用独显。这种方法能有效节省功耗，同时将独显资源集中分配给需要的程序（如 Steam 游戏、Blender 等）。缺点是每个程序需要手动配置启动项。

#### 配置步骤

 1. 打开程序的`.desktop`启动文件：
    位置可能在`/usr/share/applications`或`~/.local/share/applications`中。
 2. 在`Exec=`后添加`prime-run`参数。例如：
    ```bash title="XXX.desktop"
    Exec=prime-run <程序启动命令>
    ```
    ![ ](https://blog.hifuu.ink/images/71a5357ef4bd808b10429bc2ea46cb6f454454985.png)
 3. Vim 快捷配置
    如果使用 Vim，可以使用以下快捷键快速批量替换`Exec=`为`Exec=prime-run`：
    ```vim
    v -> G -> :s/Exec=/Exec=prime-run /g Enter -> :wq Enter
    ```

### 4. 安装切换工具(不建议)

:::caution
此方法已过时，请忽略
:::

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

```plaintext
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

```plaintext
xrandr --setprovideroutputsource modesetting NVIDIA-0
xrandr --auto
```

#### GNOME

在`/usr/share/gdm/greeter/autostart/optimus.desktop`和`/etc/xdg/autostart/optimus.desktop`中添加以下相同的内容:

```plaintext
[Desktop Entry]
Type=Application
Name=Optimus
Exec=sh -c "xrandr --setprovideroutputsource modesetting NVIDIA-0; xrandr --auto"
NoDisplay=true
X-GNOME-Autostart-Phase=DisplayServer
```

#### 不使用DM

如果不使用DM，在`~/.xinitrc`中添加以下内容：

```plaintext
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

