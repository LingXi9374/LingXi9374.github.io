---
title: 看到立马狠心卸载！K-Lite 默认安装偷流量的病毒 Infatica P2B！
published: 2026-11-15
description: '一个知名多媒体解码器包，居然捆绑了僵尸网络后门软件！'
image: '../images/k-lite-installs-the-traffic-stealing-virus-infatica-p2b-by-default.png'
tags: [开源,安全]
category: '杂谈'
series: 杂谈
seriesOrder: 4
---

> 你知道的，我不仅是一位 Blogger，还是一位媒体编解码器发烧友(?)

就像 Hi-Fi 发烧友，耳机发烧友一样，我也许是 ~~整个互联网难得一遇的~~ 多媒体编解码器烧友，对每个音视频编码格式与编解码原理感兴趣，以至于 [FFmpeg](ffmpeg.org) 项目是我心目中仅次于 [Linux](kernel.org) 的一大开源奇迹。

于是乎，我安装 PotPlayer 播放器之后不像以前一样啥都不配置直接开箱即用了，而是研究起怎样解码画质更好、效率更高、调用 GPU 更积极。

我参考了 [某乎上面的一篇文章](https://zhuanlan.zhihu.com/p/2055381775136952981) ，跟着配置了起来。但和文章不同的是，我并没有直接安装 [LAV Filters](https://github.com/Nevcairiel/LAVFilters) 与 [madVR](https://madshi.net/)，反而无意间在哔站上看到有人推荐 [K-Lite Codec Pack](https://www.codecguide.com/) 这个解码整合包:spoiler[~~懒人包~~]。那什么是 K-Lite Codec Pack你？

[K-Lite Codec Pack](https://en.wikipedia.org/wiki/K-Lite_Codec_Pack) 是一款适用于 Windows 系统的国外免费解码器合集，通过集成 `BSplayer`、`DivX`、`XviD` 等解码组件扩展多媒体播放功能，支持 `AVI`、`MKV`、`MP4` 等主流格式播放。软件包含 `Basic`、`Standard`、`Full` 及 `Mega` 等多种版本，其中 `Full` 版额外集成31种扩展组件，`Mega` 版本则整合 `Full` 版与 `Real Alternative` 等组件以支持更多影音格式。

它按照解码器集成度细分成不同体量的版本具体变化如下: 

 - Basic(基础版): Basic 版本仅包含少量必需的 DirectShow 滤镜。**基础版本不包含播放器。**
 - Standard(标准版): 小巧但功能极其强大的音视频播放包，它包含播放所有常见音频和视频文件格式所需的一切。
 - Full: 在标准版基础上增加 `用于 3D 视频解码的插件（H.264 MVC）` 以及 `采用高质量放大算法的高级视频渲染器`。
 - Mega: 在 Full 版本基础上再增加一系列的增强扩展 (如果只是单纯视频播放其实不需要它们，一般用户确实没必要上 Mega)

![](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/d80d843f-QQ20261111-223921-821bd8.png)

~~由于我的 M (Mega) 属性大爆发，~~我直接选了 Mega 版的解码器包然后边用翻译软件边配置安装，一通行云流水下来终于安装好了，之后照着那篇专栏给 DirectShow 滤镜、LAV Filters 与 PotPlayer 在设定中绑定起来。嗯，这下观影体验上升一大截了！

但这事表面上就这么潦草结束了吗？太想当然了，接下来等待的就是背后无人知晓，却有个未知软件在我 PC 上偷鸡摸狗的疑团了。

## 初见端倪与震惊瘫坐

前面如果你们感觉废话 \/ 无关紧要的事件小引有点太多了，那我在此抱歉。

我装上它是在上个月，这期间我并没有察觉到我笔记本的明显异常，只对共享热点的网络流量为何消耗的那么多感到奇怪，没做什么事就突然每秒几百K到几M的下行速度在跑。到了 11 月初，火绒突然告诉我有个网址访问时被阻止了，我一看根本没有印象，浏览器历史记录翻个遍都翻不到，这令我很是疑惑。

![](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/2cebb5eb-huorong-blocked-f2c85e.png)

9 号，那个网址阻挡提示还是收到了，与之不同的是这次火绒直接告诉我是具体哪个可执行程序在试图访问它。我定睛一看: `infatica_agent.exe`，这是个什么软件？名字看起来像某个智能体 Harness？俺寻思我除了装过 Codex 和 DSH 都没下过其他的啊。真凶是找到了，但我还没确定它的“身份”: 我到底是因为做了什么才给这个木马程序“放行”了呢？

![](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/89d5650e-infatica_agent-e92dd9.png)

惊疑之下我询问某群群友，然后得到了一个答案: 就是 `K-Lite Codec Pack Mega` 这个软件包引来的猫腻。起初我非常震惊，为什么一个“好端端”的解码器会携带一个“病毒”上来？在看了几篇论坛站友的报告反馈之后我才深信不疑。最后也是把 K-Lite 删了。

But，这个木马病毒只有用户选择了 Mega 包才会被作者 [RCE](https://zh.wikipedia.org/wiki/%E4%BB%BB%E6%84%8F%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C) 进行植入到用户电脑里去，而选择了 Basic \/ Standard \/ Full 版本的用户目前没有受到这种病毒的入侵。

[grid]
![](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/683375ce-IMG_20261115_163805-f377ca.png)
![](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/582b026d-IMG_20261115_163854-6433df.png)
![](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/5f1e0ec9-IMG_20261115_163956-d143ca.png)
[/grid]

## 初步分析与解决方案

### 它到底是个啥？

> [!NOTE] 引用来源参考
> - [​K-Lite默认安装偷流量的病毒Infatica P2B NGA玩家社区](https://ngabbs.com/read.php?tid=45433220)
> - [最近系统每隔几十分钟就会闪出个命令行窗口, 如何才能知道是哪个程序？ - 电脑讨论(新) -  Chiphell - 分享与交流用户体验](https://www.chiphell.com/thread-2575251-1-1.html)
> - [​K-Lite默认安装偷流量的病毒Infatica P2B - ＰＣ数码 -  Stage1st -  stage1/s1 游戏动漫论坛](https://stage1st.com/2b/thread-2267887-1-1.html)

经过几个论坛帖子交叉验证，笔者 <ruby>101.0000%<rt><big>~~A W M C~~</big></rt></ruby> 地确定，`Infatica P2B(程序名称infatica_agent.exe)` 妥妥就是个肉鸡程序，它利用你的宽带 IP 给别人的 PC 做代理跳板，好实施灰黑产活动，从而隐匿他们的作案痕迹。此类事件在臭名昭著的格式工厂偷偷安装 `BrightData` 程序一事中亦有记载。

![甚至日本网友比中国网友早发现两年](https://img.lingxi9374.top/lingxi-image-hosting/2026/11/15/0cd89243-trojan-horse-first-discovered-2a463c.webp)

欲了解格式工厂:spoiler[一个在 FFmpeg 耻辱柱名单上面的一个闭源转码专有软件]事件，请看 [可疑文件:新版格式工厂会无提醒偷偷安装Birght data - 卡饭论坛](https://bbs.kafan.cn/thread-2243168-2-1.html)

分析定性完这个[僵尸网络病毒](https://zh.wikipedia.org/wiki/%E6%AE%AD%E5%B1%8D%E7%B6%B2%E7%B5%A1)之后，我只能说还是要提高计算机安全意识啊，笔者以为顺利避开了 [P2P下崽器](https://www.google.com/search?q=p2p%E4%B8%8B%E8%BD%BD%E5%99%A8%E7%9A%84%E4%BD%9C%E8%80%85%E7%A5%96%E5%9D%9F%E5%9C%A8%E5%93%AA%E9%87%8C) 与 [银狐木马](https://zh.wikipedia.org/wiki/%E9%8A%80%E7%8B%90%E6%9C%A8%E9%A6%AC) 的“黑潮”就完全没事了，自以为安全防范与辨识能力已超越一般人，没想到还是栽在了一个看似人畜无害的多媒体类软件上😂。我要进行[忏悔](https://zh.wikipedia.org/wiki/%E5%BF%8F%E6%82%94)[反思](https://zh.wikipedia.org/wiki/%E5%86%85%E7%9C%81)！

### 既然有毒，那用啥替代品？

K-Lite 由于它是闭源的专有软件，打包者 \/ 作者未知且已不可考，所以我也无法~~诅咒~~问候它/它们的家人，但你们要知道我个人最痛恨的就这几种软件 (除了沉没成本太大不得不用那些互联网大厂的专有软件): 

 - 在软件供应链中主要维护者主动掺毒的 (无论开源闭源，被供应链攻击投毒的不算)
 - 软件许可证限制过于不合理的 (如 [LTCat](https://afdian.com/a/LTCat) 的 [PCL2](https://github.com/Meloong-Git/PCL) [发射器](https://zh.wikipedia.org/wiki/%E5%8F%91%E5%B0%84%E5%8F%B0))
 - 使用 <ruby>[LLM](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%99%BA%E8%83%BD#%E7%89%B9%E6%9C%97%E6%99%AE%E9%87%8D%E5%91%BD%E5%90%8D%E4%BA%8B%E4%BB%B6)<rt><big>~~溜溜梅~~</big></rt></ruby> 辅助开发却毫无工程思维规划，无心维护做出[一坨](https://zh.wikipedia.org/wiki/AI%E5%9E%83%E5%9C%BE)的

经过某群群友的指引明路下，[NOVA](https://github.com/hcmlab/nova) 和 [Shark007Codecs](https://shark007.net/index.html) 的确是不错的解码器(或类似物)替代品。至于好不好用只能等笔者以后亲自尝试体验一下咯）。

::github{repo="hcmlab/nova"}

## 总结与教训

从大陆互联网熟悉的 [P2P下崽器](https://zh.wikipedia.org/wiki/%E6%8E%92%E6%B3%84%E7%89%A9)，到 [银狐木马](https://pd.qq.com/g/pd29268637/post/B_c9122369b8cb04001441152197800729070X60)；从轰动全球的 [XZ 后门事件](https://zh.wikipedia.org/wiki/XZ%E5%AE%9E%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%90%8E%E9%97%A8)，到 [NPM 供应链大规模投毒事件](https://baike.baidu.com/item/2026%E5%B9%B4NPM%E9%81%AD%E4%BE%9B%E5%BA%94%E9%93%BE%E6%8A%95%E6%AF%92%E6%94%BB%E5%87%BB%E4%BA%8B%E4%BB%B6)，无一例外在向全球网友们警示: [网络威胁](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E9%95%BF%E6%9C%9F%E5%A8%81%E8%83%81)并不遥远，它与你我上网生活息息相关，筑牢[网安](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8)意识，是[冲浪](https://baike.baidu.com/item/%E7%BD%91%E4%B8%8A%E5%86%B2%E6%B5%AA)的必修课。一时的逃出生天，却不能完全保证下一次也是同样的顺利！

笔者在此只能希望大家引以为戒，尽量避免任何未经查证的软件。就像你在应用商店下载软件先看评分，边刷视频边跟着评论区思考一样，先判断这个软件是否[开源](https://opensource.org/)，许可证是否[自由](https://www.gnu.org/licenses/licenses.html)，再看它在网上各种论坛网友的评价与是否存在发生过的事故，最后再想想还要不要拿来用就下手。最后祝你们在计算机使用 \/ 开发过程中事事顺利，塑造一个健康绿色无毒的开发环境，共同维护开源社区撑起的一片天！