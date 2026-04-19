---
title: 谈Ｍ＄的“忏悔录”：我对 Windows 未来质量发展的看法
published: 2026-03-26
description: '微软公开信：全面整改 Win11 质量，如任务栏可停靠顶部 / 侧边等'
image: '../images/microsoft-commitment-to-windows-quality-2026.png'
tags: [Windows,微软,操作系统]
category: '杂谈'
draft: false 
lang: 'zh_CN'
---

:::note
以下文字包含个人主观意见，如有错误欢迎指点！
:::

## 前言

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1nVAFzsEJ7&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" &autoplay=0> </iframe>

这几天看资讯，发现微软竟史无前例地发表了“公开信”，称**会整改 Windows 11 的质量**。自 2021 年 Windows 11 发布以来，用户使用下来发现 Win11 体验非常不尽人意:spoiler[(何止是不尽人意啊，这分明是 **一坨大份** 啊！)]微软对 Win11 的开发也力不从心：阿三的管理层 + 堆砌如屎山的代码 + 乱砍好用的功能 + BUG 与 CVE漏洞 频发 + 强制推进 AI 功能 …… 这一连套操作下来，微软给 Windows 打了 40 多年的口碑在 Win11 开发时期一下子塌下来了。

另一边，苹果近几年的 Mac 系列产品逐渐走向大众视野，连微软项目经理都用上 Mac 了 <sup>[[来源]](https://m.ithome.com/html/849706.htm)</sup>。尤其今年 MacBook Neo 平价 Mac 笔记本的推出，着实给微软带来了行业压力。

Linux侧也在发力，自从 Windows 10 停止支持后，End of 10 等民间项目鼓励使用中低端硬件的 Win10 用户转向 Linux 桌面。<sup>[[来源1]](https://www.techtarget.com/searchenterprisedesktop/feature/End-of-10-How-Linux-could-help-Windows-10-PCs-live-on) [[来源2]](https://endof10.org/)</sup>:spoiler[依旧今年是 **Linux 桌面元年**，，，]

面对愈演愈烈的信任危机，Ｍ＄也是意识到了事情的严重性，Windows 作为公司的根基不应该减少重心投入 ~~ (Ｍ＄许多产品业务重心是投向B端了，比如 Azure) ~~，于是他们在 Windows Insider Blog 上写下了这篇“保证书”，试图恢复 Windows 与 Ｍ＄ 在消费市场的声誉。

那么，在这轰轰烈烈的“罪已诏”背后，究竟是真的 **“真心悔改”**，还是Ｍ＄对用户临时 **“画大饼”** 呢？下面有请请我逐句分析。

:::important
原微软官方 Blog 页面指路，欢迎本Blog读者前去拜读：[Our commitment to Windows quality | Windows Insider Blog](https://blogs.windows.com/windows-insider/2026/03/20/our-commitment-to-windows-quality/)
:::

## 对于《我们对 Windows 质量的承诺》的解读

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1GqAKzAE9A&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" &autoplay=0> </iframe>

<div align=center>
   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAawAAAAgCAMAAAB5E7yJAAAAUVBMVEUAAABQUFBRUVFRUVHh4eFRUVFVVVVaWlpRUVFQUFBRUVFRUVFQUFBUVFRQUFD///+oqKj7+/uVlZXc3Ny5ublnZ2fo6OjFxcWgoKCFhYVZWVmhrYXcAAAADnRSTlMAyfS+AmUZCkPhqX5WLfQjEqoAAAD/SURBVGje7dq5koMwEEXRFjKLtwuSjbf//9AJKMqesokmmBZ+J1PKLVQNkon8i7Zr7Jema018ClRHe3GsCBsTj1og2osINCYuBeDwXB6AYOJTB2zbedVugc7EqR2wnxd7YGfi0aYOFW+qUGvEcKeJLIiaMZzZRBjz8CaPEPVu+VJDTv0HKUNt4klgTP1HadT87kxF7hdkKhNPYOgXDGDiiWIVZIqV7o/bs9LtcU+K5dAU6wpc5lYX4KpYDk2xzsBpjnUCzuuKRRH+GGstT4EiKBasaYP4hm1wJTRgFESje0H0UVwQxSqIfuQWREckBdHhY0F0rF8SXZgpia6iiSc/nbVO7v4LFEcAAAAASUVORK5CYII=" alt="Base64 Image">
</div>

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1H5APzgEdi&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" &autoplay=0> </iframe>

### 一、回归设计初心：任务栏自定义位置功能回归

Ｍ＄在文章首先提到：回归任务栏自定义位置功能，将支持任务栏移至底部、顶部、左右四侧。该功能从 Win98 时期伴随着 Windows 的发展一直存在，在 Win11 首次发布时被砍掉，这令用户大失所望，让工作空间布局的痛点+1。这种复活旧功能的举措，也许能提高用户对 Win11 的印象与对Ｍ＄的期望值。

:spoiler[我主力系统是Win10，没咋用过Win11，我竟然不知道它把这玩意儿给砍了）]

![回归任务栏自定义位置](https://winblogs.thesourcemediaassets.com/sites/44/2026/03/02_Vertical-Taskbar-1024x621.png)

### 二、减少 Copilot AI 与系统的捆绑

这次对系统功能的整改，令人拍手叫好。虽然说迈入 AI 时代，许多互联网龙头都向 AI 伸出橄榄枝，但微软的做法比其他企业却更为激进：与 OpenAI 合作，推出自家基于 ChatGPT :spoiler[残血版]的 Copilot AI:spoiler[ ~~(智能 Microsoft 365 Copilot 副驾驶®.jpg)~~ ] :spoiler[ ~~(依旧微软式翻译发力)~~ ]，并将它植入到 Win11 系统功能的任何一个角落。:spoiler[是的，那个时候甚至你能在**记事本**看到 Copilot 的身影]

:spoiler[岁月史书时间：在微软疯狂推广自家AI的时期，发生了一件令人深感愤懑的事情：微软高管称用户对Windows增加AI功能不感兴趣的态度感到不解。]
:spoiler[本来这事消停了一点，但之后微软AI业务的 CEO `Mustafa Suleyman` 的表态又火上添油了，他对**大家对微软增加AI功能“不感兴趣”的态度**感到**震惊和不解**，还把这些人称之为**愤世嫉俗的人**，换我们能理解的词其实就是**喷子**。<sup>[[来源]](https://x.com/mustafasuleyman/status/1991179913303363902)</sup>]

而现在，Ｍ＄承诺将更有针对性地在 Windows 中集成 Copilot，减少不必要的入口点，从截图工具、照片应用、小组件和记事本等应用中移除冗余的 Copilot 集成。

~~(我最希望微软真的这么做吧，万物缝入AI真的非常不可取甚至会让人反感，反面教材多的是，希望微软以及各个互联网企业吸取教训)~~

### 三、降低 Windows 更新推送频率

自 Win10 占据市场份额以来，Windows Update 饱受诟病，它在不经意间就会弹出来提醒用户，还会自动重启与通知，让用户疯狂吐槽，也造就了经典的直播名场面。~~(某yt博主直播玩游戏到一半，电脑突然自动更新重启.jpg)~~

这种情况直到 Win11 普及都没有改善反而变本加厉。用户工作活动时常常被 Windows 补丁更新所干扰，令人非常头疼，给人感觉自己掌控的设备与权利不是自己的而是互联网企业的。

:spoiler[这里我需要辟谣一件事：Windows 10 的停止支持不代表不会自动推送更新，只是不发布新的补丁罢了。(除非遇到像2017年WannaCry勒索病毒这样的重大事件，当年微软紧急给XP系统发布补丁)自动弹窗与重启仍会在旧系统复现 ~~(你在虚拟机上装个Win7或者WinXP甚至还能收到往年发布的更新补丁（（)~~ ]

对此，Ｍ＄做出了:spoiler[~~违背祖宗的决定~~]这样前所未有的决定：减少 Windows 更新带来的干扰！Ｍ＄终于意识到*接收更新应该是* **可预测且易于安排的**，将赋予用户更多的控制权，具体举措为：

 1. 在设备设置期间跳过更新以更快进入桌面、重启或关机而不安装更新
 2. 在需要时暂停更新更长时间
 3. 通过减少自动重启和通知来降低更新带来的干扰

私认为，该措施绝对让用户感到无比的激动：自己的电脑终于不用收到那么厌烦的更新推送了！它将重新定义用户的数字主权与自由，重新调整用户与各互联网企业之间的关系，营造良性消费市场与企业竞争

:spoiler[谷歌你学着点，别搁这把 Android 封闭化了，没有苹果的命却得了苹果的病，以所谓反诈为噱头封锁侧载与刷机绝对是*杀敌一千自损八百*的做法]

### 四、改进 Explorer 资源管理器

文件资源管理器是 Windows 系统中最常用的界面之一。微软宣称，第一轮改进将着重于提升启动速度、减少闪烁、优化导航体验，并增强日常文件操作的可靠性能。

的确，Explorer 的卡顿、闪退现象着实让用户抓耳挠腮。这样一个非常基础的系统软件，如果连正常体验都做不到，~~鲁棒性~~Robustness弱到谷底，那对于用户将是重大灾难。

 > 接下来依旧是我最爱的~~皮豆~~环节：~~你们微软工程师是没碰过Windows吗？.jpg~~
  
- [B站 · Epcdiy | Win中使用率最高的软件，为何那么容易卡死崩溃？](https://www.bilibili.com/video/BV1gZ421x7b3)
- [B站 · Epcdiy | 为什么打开文件夹会那么卡？我们找到了真相！](https://www.bilibili.com/video/BV1HD37zaE7p7)

好在Ｍ＄在承诺中有所反思，这些恶性现象有望得到改善。:spoiler[最好带上任务管理器Taskmgr，这玩意排查进程问题时经常卡死，什么时候考虑来修一修━━(￣ー￣*|||━━]

### 五、对小组件的信息流改进

在一个几乎无人在意的角落，Ｍ＄居然也考虑到了。小部件应该实用且相关，而不是分散注意力或让人眼花缭乱。微软将采用更安静的默认设置，增加用户对小组件显示时机和方式的控制，并优化 Discover 订阅源的个性化推荐。

### 六、其他方面的整改

 > 啥都别说了，让我们先：
 >
 > :\(
 >
 > Windows 预▯体验成员内▯版本遇到问题，需要重启。
 >
 > 我们只收集某些错误信息，然后为你重新启动。
 >
 > 114514% 完成
 >
 > 二维码     有关此问题的详细信息和可能的解决方法，请访问 https://www.windows.com/stopcode
 >
 > 二维码     如果致电支持人员，请向他们提供以下信息：
 >
 > 二维码     终止代码：~~MICROSOFT_IS_BIG_BAKA~~

- 更简洁、更透明的 Windows 预览体验计划： Windows 预览体验计划(Windows Insider Preview)是用户参与塑造 Windows 未来发展的重要途径，因此，Ｍ＄意识到用户应该能够轻松了解计划内容和参与方式。巨硬正在进行一些改进，让用户能够更轻松地浏览计划，包括更清晰的频道定义、更便捷地获取新功能、更高质量的预览版本、更清晰地了解用户的反馈如何影响 Windows，以及更多与巨硬直接互动的机会。
- 改进后的反馈中心于今日(3月20日)起正式上线：将面向 Windows 预览体验成员推出迄今为止规模最大的反馈中心更新，重新设计的界面让用户能够更快、更轻松地提交反馈并与社区互动。

![正式上线翻新后的反馈中心](https://winblogs.thesourcemediaassets.com/sites/44/2026/03/03_FeedbackHub2.0-1024x624.png)

:::note
以下内容摘抄于[此网页](https://windiscover.com/posts/microsoft-commitment-to-windows-quality-2026.html)，其实是原版 Windows 官方 Blog 的翻译）

对于以下内容，我将不会继续解读，让用户自主感受。
:::

 1. 性能优化：

    微软致力于让 Windows 11 的响应更加迅速和一致：

    - 系统性能提升：降低 Windows 资源占用，减少应用启动时间（如文件资源管理器），优化内存效率，确保在高负载下仍保持响应。
    - 应用交互流畅性：将核心 Windows 体验迁移至 WinUI3 框架，降低交互延迟，提升开始菜单等核心组件的响应速度。
    - 文件资源管理器优化：显著降低搜索、导航和上下文菜单的延迟，提升大文件复制/移动的速度和可靠性。
    - WSL 体验升级：提升 Linux 与 Windows 之间的文件传输速度，改善网络兼容性和吞吐量，简化首次设置流程，并加强企业级策略控制。

 2. 可靠性增强:

    可靠性是用户信任的基石，微软将在以下方面重点投入：

    - Windows Insider 计划质量提升：明确各频道功能范围，提供更灵活的频道切换，提高构建版本质量，并建立更强的反馈循环机制。
    - 系统、驱动和应用的稳定性：减少操作系统崩溃，提升驱动质量和应用稳定性；优化蓝牙配件连接稳定性，减少 USB 相关崩溃，改善打印机发现和连接体验；提升摄像头和音频连接的可靠性；改进设备唤醒一致性，特别是扩展坞场景。
    - Windows Update 体验改进：减少更新干扰，将设备统一为每月一次重启；提供更直接的更新控制，包括无限期暂停更新和无需安装即可关机；加快更新速度，提供更清晰的进度显示，并内置恢复机制。
    - Windows Hello 生物识别优化：提升面部识别可靠性，加快指纹识别速度并减少重试次数，为游戏掌机（如 ROG Xbox Ally X）提供完整的游戏手柄支持以创建 PIN。
 
 3. 用户体验打磨：

    微软将投入资源提升整体可用性，提供更多个性化选项，减少干扰：

    - 开始菜单和任务栏优化：提供更一致、可靠的应用和文件访问体验；扩展任务栏个性化选项，包括替代位置和更小尺寸；优化开始菜单”推荐”部分，显示更相关的内容并提供清晰的自定义控制。
    - 减少干扰，提升专注度：简化新设备设置流程，减少页面和重启次数；小组件默认采用更克制的信息展示方式；简化设置选项，便于用户根据个人偏好自定义小组件和订阅源内容；减少通知干扰。
    - 搜索体验增强：提供更快、更准确的搜索结果，清晰区分本地内容和网络结果；在任务栏、开始菜单、文件资源管理器和设置中提供一致的搜索体验。
  
 4. 开发流程改进

    微软正在改进 Windows 的内部构建流程，以提高质量标准：

    - 在新功能到达 Windows Insider 之前，进行更深入的验证和更广泛的测试，覆盖真实硬件和使用场景。
    - 更有针对性地引入新功能，确保构建版本质量更高、创新更有意义。
    - 为用户提供更大的灵活性，让其自主选择想要尝试的功能。

 5. 此外，微软将继续遵循 [Secure Future Initiative(Microsoft 未来安全计划)](https://www.microsoft.com/en-us/trust-center/security/secure-future-initiative)，在每个版本中增强 Windows 安全性，构建新功能并默认加强安全保护，以保护用户、设备和数据。

## 总体看法 & 评价：是**“画大饼”**还是**“诚意满满”**？

虽然Ｍ＄的整改清单看起来颇具诚意，但聪明的你应该发现，仍然有不少“牢问题”被刻意回避。

比如<ins>强制微软账户登录的问题</ins>，从 Windows 11 发布至今一直备受吐槽，尤其是在重装系统时，不登录账户几乎无法完成基础使用，**但此次整改并未提及**。~~(虽然说有方法可以绕过它，但是有部分用户不了解方法或者不想搞这么麻烦)~~

再比如<ins>系统广告与推送</ins>，微软只提到 **“减少通知干扰”**，却**没有明确**是否会**移除系统内嵌的广告**，想要**彻底摆脱“广告系统”，恐怕仍然为时过早**。

也有人质疑，<ins>“更有分寸地融入 AI”</ins>，是否只是**换一种方式继续植入 Copilot**，而非**真正减少干扰**。

> 就连国外科技媒体 Ars Technica 也直言：“就像餐厅主厨反复强调自己重视菜品质量，反而会让人怀疑，为什么他需要说这么多次？”
>
> :spoiler[非常恰当的比喻，我就喜欢这么痛快的锐评！]

个人评价是，即便一部分人对Ｍ＄的信任已然崩塌，但作为介于软粉与软黑的中立用户而言，巨硬写下“忏悔录”的那一刻，意味着它还有想着改过自新的信心，重新审视自己，重新建立与用户之间的信任，摆脱孤高自傲、对外界声音不理不睬的企业作风。这样的做法已经比其他互联网龙头优秀很多了！:spoiler[你说是吧，谷歌？]

当然，我个人对巨硬的期望不会太高。:spoiler[上面是我作为软粉的一面，接下来我换成软黑的视角评价。~~(不是左右脑互搏)~~]有句古话是：

> 期望越大，就失望越大；只要降低期望，就会发现原来的也不会太失望了。

对于一个体系非常庞大且盘踞多年市场的互联网巨头，其团队内部也许会有矛盾与冲突的时候，这次的发言可能是一个CEO热衷于整肃，想在自己手中收拾前几任的烂摊子，于是拍案即合，带领团队一起撰写、一起挖坑画大饼；然后几年后下一任CEO追求所谓效率与KPI，直接把它当成一张烂纸，不了了之；又或者说没过几个月内部就谈崩了，拿下级没办法直接糊弄过去……😂

(以上全是个人猜测，我们也不是什么预言家，还是让我们等待后续如何吧……)

**The END**

Date: 2026.03.26
