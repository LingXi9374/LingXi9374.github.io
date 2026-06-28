---
title: 如何给 Linux Mint 22.3 换上 CachyOS 的用户自编译内核
published: 2026-06-28
description: '分享在 Mint 上更换自编译带优化的内核且保留 N 卡驱动的经验'
image: '../images/using-the-cachyos-customized-kernel-with-linux-mint.png'
tags: [Linux]
category: '教程'
draft: false 
lang: 'zh_CN'
---

## 前言

书接上回，我给新游戏本（宏碁暗影骑士擎7）加了硬盘之后立马将 Linux Mint 安装上去了，我选择该发行版的原因一是对新手友好开箱即用，二是稳定可作为生产环境。但是由于它上游是 Ubuntu 24.04 LTS，内核停留在了 6.17+，在 7.x 内核开启两个多月后且修复大批提权漏洞的当下看起来有点过时了。

于是我有了想升级到 7.x 内核的心思。你肯定疑惑：想这么玩为什么不上 Fedora, Arch 这类发行版呢？而非要选择 Debian/Ubuntu 系发行版？其实我本来的打算是装 CachyOS 可直接享受它的特调内核的，但碰巧 AUR 仓库木马攻击事件在当时还未停止（现在已经结束且清理解决了），看在风险这么高的份上我望而却步了。我宁可在看似不 Geek 的发行版上做点 Geek 的事情，也不想在 Arch 系上承担时刻面临未知的风险。

给一个发行版换上自编译内核，这不仅是一次实验，更是一次值得深究的尝试。曾经，我试过给 Ubuntu 换 Zen 内核，但以失败告终 —— NVIDIA DKMS 一直显示编译失败 ~~(fxxk nvidia)~~，导致驱动不上 N 卡。后面在网上反复寻找相关文章，发现很多教程都只讲怎么换内核，而没讲换了内核之后干的事，比如补上驱动；甚至那些内核都是从 Debian/Ubuntu 仓库薅来的编译好的官方 Deb 包，完全和自编译沾不上边。想了又想：既然没人在这方面尝试，那我做第一个好了！

Linux Mint 相比 Ubuntu 去掉了很多 Canonical 留下的非必要的服务 (Services) 与套件 (如 Snap)，对此次尝试看来是一个比较纯净的值得实践的环境，对于用户自定义方面可能会更加开放。废话不多说，直接上手！

![ ](https://github.com/LingXi9374/picx-images-hosting/raw/master/i-created-wallpaper-for-linux-mint-v0-rmhmplodt54f1.5trp701y67.png)

## 为什么我选择 CachyOS 内核？

众所周知 CachyOS 内核带来了许多针对性能和安全的优化，但具体是哪些呢？

CachyOS 内核通过多种调度器和高级优化技术，为用户提供卓越的系统性能和灵活性。

### 内核特点

CachyOS 内核支持多种调度器，包括 **BORE**（面向突发的响应增强器）、**EEVDF**（最早可用虚拟截止时间）和 **BMQ**（位图队列调度器）。这些调度器根据不同的使用场景优化系统性能，用户可以根据需求选择最适合的调度器。

内核还支持 **x86-64-v3** 和 **x86-64-v4** 指令集优化，特别适用于现代 CPU 架构。此外，CachyOS 内核通过 **Clang 编译器** 和 **LTO（链接时优化）** 技术进一步提升了性能。

![ ](https://github.com/LingXi9374/picx-images-hosting/raw/master/cachyos-kavratech.5c1nifr23t.jpg)

### 性能优化

CachyOS 内核包含以下性能增强：

 - **AMD P-State** 支持：优化 AMD 处理器的功耗和性能。

 - **ZFS 文件系统支持**：提供更高效的存储管理。

 - **内存管理改进**：包括防止内存压力下的页面抖动。

 - **I/O 调度器优化**：支持 **bfq** 和 **mq-deadline** 调度器。

### 实际效果

根据测试，将默认 Arch 内核替换为 CachyOS 内核后，单线程和多线程性能均提升约 **6%**。这种通过软件优化实现的性能提升，尤其在现代硬件上，表现尤为显著。

### 适用场景

CachyOS 内核适合希望提升系统性能的 Arch Linux 高级用户，同时也为新手提供了易用的优化工具。其灵活的调度器和硬件支持，使其成为桌面、服务器和开发环境的理想选择。

CachyOS 内核通过其先进的优化技术和灵活的配置选项，为用户提供了一个高效、安全的 Linux 体验。

![ ](https://github.com/LingXi9374/picx-images-hosting/raw/master/wallpaperflare.com_wallpaper.8z775yqwuc.jpg)

## 准备环境

> [!CAUTION] 告知
> 在非 Arch Linux 衍生发行版上自行编译 CachyOS 内核是可行的，但必须明确一个核心观点：CachyOS 的补丁(Patch)、配置文件以及构建脚本（PKGBUILD）是专门针对 Arch Linux 的软件生态（如特定版本的 GCC/Clang、mkinitcpio、systemd）进行优化和测试的。在其他发行版上手动编译可能会遇到依赖缺失、编译报错、内核模块不兼容或系统无法正常引导的风险。此操作不受 CachyOS 官方支持。
> 另外，自编译内核往往需要用户**对 Linux 有一定的理解**，部分过程都**涉及敏感操作**，错了关键一步就得**还原重走**！请记住备份好官方内核镜像（相对于新内核来说的旧内核）。

给 Mint 自编译 CachyOS 内核的核心思想就是从 PKGBUILD 脚本中提取核心逻辑，转化为我们可理解的通用编译流程命令。

我使用的 CachyOS 内核源码版本为 `7.1.1-2` ，默认 BORE 调度器，不同版本也许部分步骤会有所不同，请知悉。另源码仓库与补丁仓库在下方链接：

::github{repo="CachyOS/linux"}

<div class="text-center"><font color="#717988" size="2">CachyOS 内核源码仓库</font></div>

::github{repo="CachyOS/kernel-patches"}

<div class="text-center"><font color="#717988" size="2">CachyOS 内核补丁仓库</font></div>

### 安装编译依赖

CachyOS 内核编译需要常规的 Linux 内核构建工具链以及 Rust 编译器（用于内核中的 Rust 代码）。因为我使用的是 Mint，就用**Debian / Ubuntu 系列**的通用命令：

```bash
sudo apt update
sudo apt install build-essential bc bison flex libssl-dev libelf-dev libncurses-dev zlib1g-dev cpio wget tar xz-utils zstd python3 perl rustc cargo librust-bindgen-dev pahole dwarves
```

### 下载源码、补丁与配置文件

根据 PKGBUILD 中的变量定义，当前版本为 `7.1.1-2`。

```bash
# 1. 新建专门用于存放源码与补丁的文件夹，方便管理（在 $HOME 目录下新建）
mkdir kernel-build && cd kernel-build/

# 2. 下载并解压内核源码
wget https://github.com/CachyOS/linux/releases/download/cachyos-7.1.1-2/cachyos-7.1.1-2.tar.gz
tar -xf cachyos-7.1.1-2.tar.gz
cd cachyos-7.1.1-2

# 3. 下载 CachyOS 默认配置文件
wget https://raw.githubusercontent.com/CachyOS/linux-cachyos/master/config -O .config

# 4. 下载并应用默认调度器补丁 (BORE)
wget https://raw.githubusercontent.com/cachyos/kernel-patches/master/7.1/sched/0001-bore-cachy.patch
patch -Np1 < 0001-bore-cachy.patch

# 5. 下载并应用 CJKTTY 补丁（让tty可显示中文等CJK字符）
wget https://raw.gihubusercontent.com/bigshans/cjktty-patches/master/v7.x/cjktty-7.1.patch
patch -Np1 < cjktty-7.1.patch
```
*注：如果您需要应用其他补丁（如 RT 实时补丁、ZFS 支持等），需自行从 `https://github.com/cachyos/kernel-patches` 下载并使用 `patch -Np1 < {补丁文件}` 应用。*

## 调整内核配置

调整之前，让我们先**使旧配置适配当前内核源码树**。

```bash
make olddefconfig
```
由于 `make menuconfig` 优先级大于 `scripts/config` 脚本，会覆盖脚本保存的修改配置，所以先 `menuconfig` 微调一下喜欢的选项再使用脚本修改内核配置。

### 预 emption（游戏优化）

```plaintext
General setup  --->
    Preemption Model  --->
        (X) Preemptible Kernel (Low-Latency Desktop)
```

### Tick Rate

```plaintext
General setup  --->
    Timer frequency  --->
        (X) 1000 HZ    # 游戏推荐
```

### 内存/性能相关

```plaintext
Processor type and features  --->
    Transparent Hugepage support  --->
        (X) Always
    [*] Memory compaction
    [*] Page migration
    # 游戏性能提升明显
```

### 网络优化（游戏）

```plaintext
Networking support  --->
    Networking options  --->
        [*] TCP: advanced congestion control  --->
            (X) BBR v3    # 如果 7.0 menuconfig 有的话
        [*] Network packet filtering framework (Netfilter)
```

### 文件系统

因个人而异，由于我使用 XFS 文件系统作为根目录文件系统，所以开启 XFS 相关支持

```plaintext
File systems  --->
    <*> XFS filesystem support
    [*]   XFS Quota support
    [*]   XFS POSIX ACL support
    [*]   XFS Realtime subvolume support
    [*]   XFS online repair support    # 7.0 新特性
```

PKGBUILD 中使用 `scripts/config` 脚本对默认配置进行了大量修改。`menuconfig` 配置完之后，我们需要使用脚本将这些 CachyOS 的核心优化应用到 `.config` 中。

```bash
# 关闭内核调试，不然会因为 image 过大无法启动
scripts/config -d CONFIG_DEBUG_INFO
scripts/config -d CONFIG_DEBUG_KERNEL

# 启用 BORE 调度器
scripts/config -e SCHED_BORE

# 启用 O3 编译优化 (PKGBUILD 中 _cc_harder=yes)
scripts/config -d CC_OPTIMIZE_FOR_PERFORMANCE -e CC_OPTIMIZE_FOR_PERFORMANCE_O3

# 设置 Tick Rate 为 1000Hz (PKGBUILD 中 _HZ_ticks=1000)
scripts/config -d HZ_300 -e HZ_1000 --set-val HZ 1000

# 设置 Transparent Hugepages 为 always (PKGBUILD 中 _hugepage=always)
scripts/config -d TRANSPARENT_HUGEPAGE_MADVISE -e TRANSPARENT_HUGEPAGE_ALWAYS

# 设置抢占模式为 full (PKGBUILD 中 _preempt=full)
scripts/config -e PREEMPT -d PREEMPT_LAZY

# 开启 x86_64-v3 微架构
scripts/config -d GENERIC_CPU
scripts/config -d GENERIC_CPU2
scripts/config -e GENERIC_CPU3
scripts/config -d GENERIC_CPU4
scripts/config -d NATIVE
```

如果您需要开启 TCP BBR3 或修改 CPU 架构优化（如 Zen4），可以追加相应的 `scripts/config` 命令进行微调。

接下来，让我们验证目前所有的修改有没有生效

```bash
# 验证所有修改
echo "=== 取消 DEBUG 调试 ==="
grep CONFIG_DEBUG_INFO
grep CONFIG_DEBUG_KERNEL
echo "=== CPU 架构 ==="
grep CONFIG_GENERIC_CPU .config
echo "=== BORE ==="
grep CONFIG_SCHED_BORE .config
echo "=== O3 ==="
grep CC_OPTIMIZE_FOR_PERFORMANCE .config
echo "=== HZ ==="
grep CONFIG_HZ .config
echo "=== THP ==="
grep TRANSPARENT_HUGEPAGE .config
echo "=== Preempt ==="
grep CONFIG_PREEMPT .config
```

如果验证结果看起来符合你的预期(开启为`=y`，关闭为`is not set`)，接下来就到了正式构建你亲手配置的内核的时间了！

## 编译内核与安装

不同于其他发行版的`make install`， Debian/Ubuntu 系列使用 Deb 包安装内核且使用 dpkg 进行管理，我们可以用现代内核自带的 deb 打包目标，同时拉满 CPU 核心进行编译：

```bash
# 构建内核 Deb 包
make -j$(nproc) bindeb-pkg LOCALVERSION=-cachyos-bore-lto-{在这里可自定义你自己的后缀} KDEB_PKGVERSION=3

# 构建内核模块
make -j$(nproc) modules
```

等待编译完成生成 image，会自动打包成 deb 包供我们安装，日后也方便卸载。Deb 包会在上一级目录出现，编译完成后我们进行安装环节：

```bash
cd ~/kernel-build
sudo dpkg -i linux-headers-7.1.1-cachyos-bore-lto-{你自定义的后缀}_3_amd64.deb
sudo dpkg -i linux-image-7.1.1-cachyos-bore-lto-{你自定义的后缀}_3_amd64.deb
```

安装完成后，定位到内核源码目录，进行内核模块安装：

```bash
cd cachyos-7.1.1-2
sudo make modules_install
```

## 【重要】NVIDIA DKMS 模块

### 为新内核安装英伟达显卡开源驱动

> [!CAUTION] 注意
> Ubuntu 提供的 NVIDIA DKMS 开源驱动虽然带有`open`后缀，但它提供的模块却是闭源的(`/lib/modules/{内核版本}/updates/dkms/nvidia.ko.zst`，开源模块为`/lib/modules/{内核版本}/kernel/drivers/video/nvidia.ko`)。闭源模块对于自编译内核来说不兼容，记得需要禁用闭源模块或者卸载相关驱动包。

每张 NVIDIA 显卡都有对应的驱动版本，例如我的游戏本搭载的 RTX 5060 Laptop 在安装完 Linux Mint 后执行 `nvidia-smi` 显示的驱动版本为 `595.71.05`。非必要情况下尽量操作时保持驱动版本一致！

保持在`~/kernel-build`目录，下载 DKMS 开源模块源码包，解压、构建并安装

```bash
cd ~/kernel-build

# 这里记得把版本号替换为你的驱动版本，以我的595.71版本为例
wget https://github.com/NVIDIA/open-gpu-kernel-modules/archive/refs/tags/595.71.05.tar.gz

# 解压并进入模块源码目录
tar -xf 595.71.05.tar.gz
cd open-gpu-kernel-modules-595.71.05

# 编译并安装
make -j$(nproc) modules IGNORE_CC_MISMATCH=yes SYSSRC=/lib/modules/$(uname -r)/build
sudo make modules_install IGNORE_CC_MISMATCH=yes SYSSRC=/lib/modules/$(uname -r)/build
```

### 清理 Ubuntu 提供的闭源驱动模块

安装完模块后不要急着更新引导重启，让我们先把干扰我们的 Ubuntu 提供的闭源模块清理掉：

```bash
# 1. 确认当前加载的是哪个模块
modinfo nvidia | grep filename

# 2. 删除之前 DKMS 编译的闭源模块（已废弃）
sudo rm -f /lib/modules/$(uname -r)/updates/dkms/nvidia*.ko*

# 3. 从 DKMS 中移除 7.1 内核的闭源模块记录（保留 6.14 和 6.17 的）
sudo dkms remove nvidia/595.71.05 -k 7.1.1-cachyos-bore-lto-{你的自定义后缀}

# 4. 更新模块依赖
sudo depmod -a

# 5. 验证 DKMS 状态（应该只剩旧内核的条目）
sudo dkms status
```

## 更新 Initramfs 与引导加载程序（关键）

`make install` 在 Arch Linux 之外通常不会自动处理 Initramfs 的生成和 GRUB 引导菜单的更新。您必须根据您所使用的发行版手动执行以下操作（依旧以 Debian/Ubuntu 系列为例）：

```bash
# 获取刚安装的内核版本号
KERNEL_VER=$(cat include/config/kernel.release)
sudo update-initramfs -c -k $KERNEL_VER
```

接下来，编辑 GRUB 引导程序配置：

```bash title="/etc/default/grub"
# 找到 GRUB_CMDLINE_LINUX_DEFAULT，添加以下参数：

GRUB_CMDLINE_LINUX_DEFAULT="... nvidia-drm.modeset=1 nowatchdog mitigations=off threadirqs loglevel=5..."

# 去掉 quiet splash     - 禁用对系统启动过程中内核输出的详细信息的抑制，禁用显示启动画面（通常为品牌或发行版LOGO的图形界面）
# nvidia-drm.modeset=1  - 启用 NVIDIA Wayland/DRM 支持
# nowatchdog            - 禁用看门狗，降低延迟
# mitigations=off       - 关闭 Spectre/Meltdown 缓解（性能提升，安全性略降）
# threadirqs            - 线程化 IRQ 处理
# loglevel=5            - 显示内核启动日志等级为 5
```

应用 GRUB 配置：

```bash
sudo update-grub
sudo reboot
```

## 验证环节

打开终端，输入以下命令：

```bash
# 确认启动的是 CachyOS 内核
uname -r
# 期望输出类似：7.1.1-cachyos-bore-lto-{你的自定义后缀}

# 确认 NVIDIA 独显是否成功驱动
nvidia-smi
# 如果没有报错即为驱动安装成功

# 确认 BORE 调度器
dmesg | grep -i bore

# 确认 LTO 优化
cat /proc/version
# 应该包含你设置的 LOCALVERSION

# 确认构建选项是否与你刚刚操作的一致
echo "=== CPU 架构 ==="
grep CONFIG_GENERIC_CPU /boot/config-$(uname -r)
echo "=== BORE ==="
grep CONFIG_SCHED_BORE /boot/config-$(uname -r)
echo "=== O3 ==="
grep CC_OPTIMIZE_FOR_PERFORMANCE /boot/config-$(uname -r)
echo "=== HZ ==="
grep CONFIG_HZ /boot/config-$(uname -r)
echo "=== THP ==="
grep TRANSPARENT_HUGEPAGE /boot/config-$(uname -r)
echo "=== Preempt ==="
grep CONFIG_PREEMPT /boot/config-$(uname -r)
```

确认是否使用了 NVIDIA 开源驱动模块：

```bash
# 最准确的方式：查看模块文件路径和元数据
modinfo nvidia | grep -E "filename|version|description|author|license"

# 查看模块实际存放位置（判断来源）
find /lib/modules/$(uname -r) -name "nvidia.ko*" -exec ls -la {} \;

# 直接查看模块内字符串（开源模块会包含特定标识）
strings $(modinfo nvidia | grep filename | awk '{print $2}') | grep -i "open.*gpu\|nvidia.*open\|GPL" | head -5
```

Open 驱动判断依据：

| 特征              | 闭源模块 (DKMS)                                   | 开源模块 (GitHub 手动编译)                                |
| --------------- | --------------------------------------------- | ------------------------------------------------- |
| **路径**          | `/lib/modules/.../updates/dkms/nvidia.ko.zst` | `/lib/modules/.../kernel/drivers/video/nvidia.ko` |
| **license**     | `NVIDIA`                                      | `GPL` 或 `Dual MIT/GPL`                            |
| **description** | `NVIDIA Linux Kernel Module`                  | `NVIDIA open gpu kernel module`                   |
| **strings 内容**  | 无 `open-gpu` 字样                               | 包含 `open-gpu-kernel-modules`                      |

如果你判断不了预期结果符不符合，可以参考我的输出：

```bash
lingxi@lingxi-Shadow-SH16-74:~$ uname -r
7.1.1-cachyos-bore-lto-lingxi9374
lingxi@lingxi-Shadow-SH16-74:~$ dmesg | grep -i bore
[    0.000000] Linux version 7.1.1-cachyos-bore-lto-lingxi9374 (lingxi@lingxi-Shadow-SH16-74) (gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0, GNU ld (GNU Binutils for Ubuntu) 2.42) #3 SMP PREEMPT_DYNAMIC Tue Jun 23 01:19:49 CST 2026
[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-7.1.1-cachyos-bore-lto-lingxi9374 root=UUID=3239xxxx-xxxx-xxxx-xxxx-xxxxxxxx2dab ro nvidia-drm.modeset=1 nowatchdog mitigations=off threadirqs loglevel=5
[    0.030901] Kernel command line: BOOT_IMAGE=/boot/vmlinuz-7.1.1-cachyos-bore-lto-lingxi9374 root=UUID=3239xxxx-xxxx-xxxx-xxxx-xxxxxxxx2dab ro nvidia-drm.modeset=1 nowatchdog mitigations=off threadirqs loglevel=5
[    0.064552] BORE CPU Scheduler modification 6.6.3 by Masahito Suzuki
[    0.923421] usb usb1: Manufacturer: Linux 7.1.1-cachyos-bore-lto-lingxi9374 xhci-hcd
[    0.926580] usb usb2: Manufacturer: Linux 7.1.1-cachyos-bore-lto-lingxi9374 xhci-hcd
lingxi@lingxi-Shadow-SH16-74:~$ cat /proc/version
Linux version 7.1.1-cachyos-bore-lto-lingxi9374 (lingxi@lingxi-Shadow-SH16-74) (gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0, GNU ld (GNU Binutils for Ubuntu) 2.42) #3 SMP PREEMPT_DYNAMIC Tue Jun 23 01:19:49 CST 2026
```

## 后续维护备忘

使用了自编译内核意味着维护成本也会增加，它不同于官方内核的自动化配置，一切后续更新维护都需要你的决策下才可进行。这里给出备忘列表，方便你我参考：

| 场景 | 你需要做的事 |
| ---- | ------------ |
| **7.1 内核小版本更新**（比如你自己重新编译 7.1.2） | 重新去 GitHub 下载 open-gpu-kernel-modules 源码，重新 `make modules && make modules_install` |
| **NVIDIA 发布 595.72 等驱动更新** | Ubuntu 包会自动更新用户空间库，但**内核模块需要手动重新编译** |
| **回退到 6.14/6.17 内核** | 什么都不用做，DKMS 的闭源模块自动工作 |
| **系统 apt upgrade 升级了 nvidia-dkms-595-open** | 注意检查 `/lib/modules/7.1.1.../updates/dkms/` 是否又被写入闭源模块，如果有就删掉 |

![ ](https://github.com/LingXi9374/picx-images-hosting/raw/master/avantages-de-linux-mint-sur-windows-11-1536x864.99u0z3wrdl.png)

## 额外建议

换内核后可以装个 `gamemode` 配合 CachyOS 内核的 BORE 调度器：

```bash
sudo apt install gamemode
# Steam 启动选项添加：gamemoderun %command%
```

以及启用 CPU 性能模式：

```bash
sudo apt install linux-cpupower
sudo cpupower frequency-set -g performance
# 或者在 CPU Power GUI 调整
```

## 总结

如果一切结果正常，那么恭喜你，成功跟着我在 Linux Mint 制作并使用了自编译内核的同时保留了 NVIDIA 独显驱动！你的 **Linux Mint 22.3 + Linux CachyOS BORE 7.1 Kernel + NVIDIA Open 模块** 组合现在已经完全可用。BORE 调度器对游戏帧时间稳定性的改善应该能感觉得到，Enjoy！🎮

![ ](https://github.com/LingXi9374/picx-images-hosting/raw/master/Screenshot_20260625_231305.77e86zjgbw.png)