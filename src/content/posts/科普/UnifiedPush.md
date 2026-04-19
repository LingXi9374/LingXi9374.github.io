---
title: UnifiedPush：自由的去中心化开源推送通知协议
published: 2026-04-18
description: 'UnifiedPush 是一个去中心化的推送通知系统，允许你选择你想使用的服务。它设计得注重隐私友好、灵活且开放。'
image: '../images/UnifiedPush.png'
tags: [开源, Android, Linux]
category: '科普'
draft: false 
lang: 'zh_CN'
---

![完整封面原图](../images/UnifiedPush.png)

> [!CAUTION] 注意！
> 本文章科普对象**不是** [统一推送联盟](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E6%8E%A8%E9%80%81%E5%B7%A5%E4%BD%9C%E5%A7%94%E5%91%98%E4%BC%9A) (`Unified Push Alliance` (UPA)，现名`“电信终端产业协会统一推送工委会”` (TAF) )
> ![原先的统一推送联盟已经转生力）](https://s41.ax1x.com/2026/04/19/pe6bM5Q.png)

## 引子

我之前为寻找一个体验最棒的移动设备浏览器发愁：Edge 部分插件未登录移动平台，Via 现在用不了大部分油猴脚本了，[Cromite](https://github.com/uazo/cromite) 使用体验下来也非常沟槽（插件不适用，不能自定义下载器……）。我尝试转战 Firefox (Gecko) 系列，但发现火狐系的浏览器依旧还是有性能问题：浏览网页很卡。

但本文主题依旧不是*浏览器*，而是我使用 [Fennec F-droid Browser](https://f-droid.org/packages/org.mozilla.fennec_fdroid/) (一款基于 Firefox 的注重隐私的浏览器分支) 时偶然发现一个新奇的设置选项：它一直提示我未配置`“UnifiedPush”`需要我去启用。于是激发我的好奇心去主动了解一下这到底是什么东东，花了好几个小时研究配置完体验了一下，才有了这么一个文章。

## 什么是「UnifiedPush」？

> UnifiedPush is a decentralized push notification system that lets you choose the service you want to use. It’s designed to be privacy-friendly, flexible, and open — making it perfect if you want control over your push notifications.
> —— [UnifiedPush 官网](https://unifiedpush.org/)
> 
> 翻译：
>
> UnifiedPush 是一个去中心化的推送通知系统，允许你选择你想使用的服务。它设计得注重隐私友好、灵活且开放——如果你想控制推送通知，它非常合适。

简单来说，**UnifiedPush** ~~(译名：统一推送)~~ 就是一个开源的通知推送协议。相较于 Google 的 [FCM](https://firebase.google.com/docs/cloud-messaging) (Firebase Cloud Messaging)，苹果的 [APNs](https://developer.apple.com/documentation/usernotifications/sending-notification-requests-to-apns) (Apple Push Notification service)，微软的 [WNS](https://learn.microsoft.com/en-us/windows/apps/develop/notifications/push-notifications/wns-overview) (Windows Push Notification Services)，以及中国大陆的 [统一推送联盟](https://upc.taf.org.cn/) (只是英文撞名了，与 UnifiedPush 无任何关系)，它的优势是 **去中心化**，即不依赖任何单一公司或服务，消息经服务器推送过程中保持点对点(端对端)加密，保障消息推送的隐私安全。

> :spoiler[貌似墙内的翻译：https://www.bilibili.com/read/cv21845282]

### 关于项目来历

> 参考链接：https://f-droid.org/zh_Hans/2020/02/03/openpush-talk.html

它的 原型/前身 可能是 [OpenPush](https://bubu1.eu/openpush)，旨在创建一个免费且开源的自架化方案，替代通常通过谷歌专有 Firebase 云消息平台发送的Android推送通知。这最初是 [PrototypeFund](https://www.prototypefund.de/projects/open-source-push-service-fuer-android-apps) 项目。开发仍在进行中。(存疑?):spoiler[我感觉 OpenPush 已经弃坑了，不然 UnifiedPush 也就不会出现了）]

> 关于 [**PrototypeFund**](https://www.prototypefund.de/) (以下摘抄自官网介绍)
>
> **Wer wir sind?   我们是谁?**
>
> Wir sind der Prototype Fund. Wir fördern Freie- und Open-Source-Software (FOSS) aus der Gesellschaft und für die Gesellschaft.
> 我们是原型基金。我们从社会和社会中推广自由开源软件（FOSS）。
>
>Wir erkennen die gesellschaftliche Dimension und das transformative Potential von FOSS. Wir glauben, dass die Verbreitung und bewusste Nutzung von FOSS die gesellschaftliche Teilhabe bestärkt. Wir sind davon überzeugt, dass FOSS bessere Technologien für alle möglich machen kann.
>我们认识到自由开源软件的社会维度和变革潜力。我们相信，自由开源软件的传播和有意识使用能够增强社会参与。我们坚信，自由开源软件能够让更好的技术惠及所有人。
>
>Der Prototype Fund richtet sich an User*innen, Entwickler*innen und Contributor-Communities. Wir unterstützen unabhängige Entwickler*innen und setzen uns für die Sichtbarkeit der Projekte und ihres gesellschaftlichen Impact ein. Wir ermöglichen User*innen einen unabhängigen und selbstbestimmten Zugang zu Software. Damit reagieren wir auf das gesellschaftliche Interesse an Freier- und Open-Source-Software.
>原型基金面向用户、开发者和贡献者社区。我们支持独立开发商，致力于项目的可见度及其社会影响。我们为用户提供独立且自主的软件访问权。通过这样做，我们是在回应社会对自由和开源软件的兴趣。
>
> 来自：https://www.prototypefund.de/ueber-uns/mission

它的诞生主要是为了解决 Android 平台上推送服务被 Google (FCM) 高度垄断，以及许多手机厂商推送标准碎片化的问题。

## 为什么要选择「UnifiedPush」？

> 摘自：https://unifiedpush.org/

UnifiedPush 的 **主要优势**：

 - **开放标准**： 具备互操作性且有韧性(弹性)。

 - **去中心化**： 不依赖任何单一公司或服务，减少对守门人的依赖。

 - **隐私优先**： 推送通知是加密的。

 - **自我托管**： 你可以自己运行通知服务器，以获得所需的控制权。

 - **用户控制**： 用户选择他们使用的服务，而不是开发者。

![所有分发器与应用都兼容](https://f-droid.org/assets/animation-options_MLZPGs9RJptxV8Q_3U4fEdo2mJcvJDSd4rYpMr7r9og=.svg)

**主要特点**：

 - **无需特权服务**： 使用轻量级服务并遵循最低权限原则。可在 **去谷歌化 (de-Googled)** 的安卓设备和自定义 ROM 上运行。也可作为用户服务在 Linux 设备上运行。

 - **多个发行版(分发商/服务端)**： 从[发行版列表](https://unifiedpush.org/users/distributors/)中选择。

 - **轻松集成**： 开发者可以轻松地为他们的应用添加 UnifiedPush 支持。

**工作原理** (如下图)：APP送出通知之后，需要一個服务端(Distributor)负责转发消息，再由手机上的APP收发。这里服务器可以自建，也能使用 Mozilla 的公共服务器代发。

![工作原理](https://s41.ax1x.com/2026/04/19/pe6btbT.jpg)

总之，你选择了 **UnifiedPush**，你将拥有很多**隐私与自由**，无需担心你接收的任何一条消息推送会被大厂**监管或拦截**，用户相比开发者拥有**更多自主权**（比如可以自己搭建消息推送服务器，以获得控制权）。

## 如何使用？

### Step 1: 安装发行版服务端 App

UnifiedPush 官网提供许多服务端，其中 [Ntfy](https://ntfy.sh//) 需要自建服务器，提供REST API。有公用节点，但需要注册账号才能使用。这里我推荐 [Sunup](https://f-droid.org/packages/org.unifiedpush.distributor.sunup/)，优势是不用注册与不用自建服务器，使用 Mozilla 的推送服务器 (https://push.services.mozilla.com)。

[grid]
![Sunup 服务端](https://s41.ax1x.com/2026/04/18/pe6wsTe.png)
![Sunup 设置界面](https://s41.ax1x.com/2026/04/18/pe6w6FH.png)
[/grid]

### Step 2: 安装要使用 UnifiedPush 的 App

以 Matrix 客户端 [FluffyChat](https://fluffychat.im/en/faq/#push_without_google_services) 为例。**注意：必需要在 [F-Droid](https://f-droid.org/packages/chat.fluffy.fluffychat/) 平台上下载！不要从 Google Play 商店下载！** 因为 F-Droid 的 APP 不能依赖 FCM，所以它会要求你使用 UnifiedPush。

![Fluffy 通知设置界面](https://s41.ax1x.com/2026/04/18/pe6whOf.png)

同理，上文提到的 Fennec 浏览器设置里也有 UnifiedPush 开关，开启后该浏览器的资讯等消息都经过 UnifiedPush 服务端推送。

![Fennec F-droid Browser 设置界面](https://s41.ax1x.com/2026/04/18/pe6woTg.png)

### Step 3: 安装后

所有 App 都安装完毕之后，FluffyChat 与 Fennec 都会自动检测到 Sunup 的存在，使用这个服务来推送通知。不过 Sunup 會有一个通知一直常驻在通知栏 (起到守护进程作用)，得将其长按关闭。

## 底层原理

> [!NOTE]
> 摘自：https://f-droid.org/zh_Hans/2022/12/18/unifiedpush.html
> 
> :spoiler[~~唉小泠熙怎么码字的时候又在摆烂，直接懒到去官方文档Ctrl+C Ctrl+V了）~~]

UnifiedPush 的核心是一个规范。该规范分为两半：

 - 在设备（客户）端，它定义了一个应用编程接口 (API) 以允许**任何最终用户应用**（例如您的消息应用）与**任何分发器应用**（ ntfy、NextPush 等）
 - 在服务器端，API 描述了**应用服务器**（Matrix homeserver、Mastodon 实例等）如何向**推送服务器**（ntfy 服务器、Nextcloud 服务器等）发送消息.

我们的客户端库和参考代理分别协助实施规范的两端。

为获得 UnifiedPush 端点（向其发送通知的功能 URL），最终用户应用向 UnifiedPush 分发器注册，该分发器与推送服务器保持持续连接。注册后，分发者向应用提供指向推送服务器的唯一 URL。该端点 URL 然后由应用客户端传输到应用服务器。

当应用服务器需要向最终用户应用发送推送消息时，它会使用简单的 HTTP POST 请求将消息发送到推送服务器。推送服务器然后将推送消息转发给分发器，分发器将其传递给最终用户应用。

UnifiedPush 的一个关键特性是不指定推送服务器和分发器之间的通信。这意味着可以采用多种技术，例如 WebSocket、服务器发送事件、XMPP、原始 TCP 甚至 SMS，只要最适合用户即可。

![UnifiedPush 底层原理](https://f-droid.org/assets/animation-flow_mn6UvHd72uYVuF8n36saeLBGpdRSR8O5O90R3delqI4=.svg)

分发器使用平台特定的 IPC 机制（例如 Android 上的 Broadcast Intents 或 Linux 上的 D-Bus）来唤醒应用并允许它处理推送消息。然后应用可以处理数据并根据内容决定是否显示通知。重要的是要注意 UnifiedPush 不处理用户可见通知的显示；它只向应用提供数据。因此，应用可以支持各种平台的通知功能，而无需 UnifiedPush 或服务器的参与。

在应用服务器本身不支持 UnifiedPush 的情况下，推送网关可以将特定于应用的通知转换为 UnifiedPush 服务器协议。一些流行的推送网关，例如用于 Matrix 的推送网关，被直接集成到推送服务器中以方便自托管。此外，Rewrite Proxies 用于推送服务器不支持 UnifiedPush 的极少数情况，例如 FCM 分发器发送 UnifiedPush-over-FCM。

![Push Provider = Push Server](https://f-droid.org/assets/detailed-component-diagram_6cGPhCr3oZVif0gAwk4LaZNwdXop9PIRvEg08dvCK4c=.png)

## 针对大陆用户的 FAQ

### Q1：哪些软件接入了「UnifiedPush」？

A1：参见 [Apps using UnifiedPush](https://unifiedpush.org/users/apps/)。

### Q2：这其中有包括来自国产(大陆与港澳台)的软件或开源项目吗？

A2：非常抱歉地告诉你们，我找遍了很多渠道，目前只有 **Nagram、Momogram** 、和一些**私有云工具、NAS管理插件、轻量级 IM 项目、以及自建推送网关(如 MollySocket)** 等，数量少到可怜，用手指头都能数过来的那种，并且还集中在 IM 领域。

还有，常用的**大众化商业软件**（比如 WeChat、Alipay、抖音:spoiler[~~不是Tiktok，其实这个也没有接入~~]等）都没有接入 UnifiedPush，原因在于这些软件主要依赖手机厂商自带的通道保证在国内网络环境下达到极高的到达率。:spoiler[~~资本家不会关心“去中心化”的推送方案的，对他们来说接入这个也没有利益，也无法实现监管达到对用户的控制欲了。~~]

### Q3：和“统一推送联盟 (UPA)”区别是什么？

A3：首先我要说明的是，**很多人容易将 UnifiedPush 与大陆的“统一推送联盟”混淆！** 它们是两套 **完全不同** 的推送系统！

 - **UnifiedPush** 由全球开源社区（主要由 F-Droid 引领）发起，更强调隐私和“去中心化”。
 - **UPA/UPS (统一推送联盟)** 是由 [中华人民共和国工业和信息化部](https://wap.miit.gov.cn/) (中国工信部) **直属机构 [中国信息通信研究院](http://www.caict.ac.cn/) (中国信通院)** 牵头，旨在推动华为、小米、OPPO 等厂商实现国内推送接口的统一，其背后依然是各家手机厂商的服务器。

### Q4：在国内开源生态的现状是：

A4：目前 UnifiedPush 在国内仍是属于**极客、开源爱好者**的**小众选择**。它经常与 **“去 Google 化”的系统** (如 LineageOS 等) **搭配使用**。我所见过的以及使用过的知名国人开源项目，都未曾针对它进行接入适配，，，

> ~~统一推送联盟已经沦陷，亿万人必须使用 UnifiedPush，，，~~

### Q5：我应该考虑去使用吗？

如果您完全使用自由的端到端加密的通讯软件客户端 (IM) ，以及需要使用其他有隐私保护需求的软件(浏览器等)，且不依赖任何大厂的产品，您可以完全摒弃 FCM 将 UnifiedPush 作为您的默认推送服务。

若您没有强烈的隐私需求，需要依赖使用许多未接入 UnifiedPush 的软件/项目，您可以选择多种推送服务共存，将 UnifiedPush 作为辅助。

### Q6：除了 Android 平台以外，它还支持什么平台？

A6：目前除安卓外仅支持 **Linux 平台** (KDE 提供的 [KUnifiedPush](https://unifiedpush.org/users/distributors/kunifiedpush/))。非常抱歉，很遗憾 UnifiedPush 并未登陆 **Windows**、**iOS/iPadOS**、**MacOS** 等 主流平台！

:spoiler[KDE还是太厉害了，连 FreeBSD 都支持了，But 一个自由的通知推送协议却没支持 GNU/Hurd，有点意外）]

### Q7：除了 Mozilla 的推送服务器，还有什么可用的适合大陆体质的推送服务器吗？

A7：还是非常抱歉，UnifiedPush 推送服务器**没有可用的大陆服务器公共节点**。目前最佳的方式只有使用 **ntfy 自建节点**，但学习成本较高且对**服务器的资源要求很高**：需要具备**实时处理长连接**的能力。

## 碎碎念

起初，我第一次从 Fennec 那边无意发现了它，UnifiedPush 激发我的好奇心比我第一次了解到 FCM、以及各家手机厂商的推送协议（MiPush、HMS Push、OPPO Push等）都更加强烈。毕竟我想不到一个小小的通知推送协议也可以开源透明，同时也符合少数人对隐私的敏感需求，这是在现在通知协议被各大手机厂商垄断的时代都意想不到的。

但这玩意儿的处境也非常艰难：

比如上文的 [FAQ](#针对大陆用户的-faq) 也提到，对于大陆用户，许多国产软件/开源项目，抑或是大众商业化软件，都不支持 UnifiedPush，这对于开发者与极客用户来说无疑是一个极大的**生态挑战**，这样的推送协议在大陆开源社区的存在感 ~~和棍母没啥区别~~ 非常低。简单类比，在车万社区中，灵梦厨、魔理沙厨和早苗厨:spoiler[不是那个早苗，是东风谷早苗]都非常多，在哪随便都能遇到；而冴月麟厨极少能被看见，像是被忽略了）））

~~(可能有点冒犯一些群体，属实抱歉)~~

![隐忍，，，](../images/CommonPushVersusUnifiedPush.png)

这是在大陆的现状。其实放眼全球，无论在哪个互联网社区，UnifiedPush 都依然非常小众，绝大部分国外用户都使用的是 FCM 与 APNs，其实与全球的开源社区/自由软硬件社区一样，终归属于特定的群体小范围传播，很难迈向大众化，同时还要面临大厂的垄断枷锁冲破软硬件市场的防线。如果有一天，某个知名开源软件大众化了，还能保持初心，我看到也没啥可遗憾了）

![这种东西小范围享受就可以了.jpg](https://s41.ax1x.com/2026/04/19/pe6jQcd.png)

补充：你们猜我为什么一直特别强调它的小众特点？因为我撰写这篇文章搜集素材的时候，发现国内关于 UnifiedPush 的记载少之甚少，全是被 腾讯云，CSDN，gitcode 等神秘内容农场充斥着，没有一点有价值的信息供我参考。最后发现只有一丢丢的极少部分的中文 Blog 文章对此有介绍，可见它在中文社区真的小众得不能再小众了。:spoiler[~~(它的用户群体估计都没 FreeBSD 的个人用户体量大)~~]

## 小结

如果你像我一样，对这个推送协议项目非常感兴趣，你可以根据上文的 [教程](#如何使用) 来**体验 UnifiedPush 带来的新鲜感**。如果你是接手了一个或多个 Android/Linux 软件开源项目的开发者，读完这篇文章希望你可以为自己的项目接入 UnifiedPush（官网也有开发者文档教你如何接入），**为开源推送协议社区献出一份力量**。如果有朝一日，一种注重隐私的推送服务能被普及开来，对于用户简直利大于弊，从此无论什么消息再也不必担心经过大厂服务器审查或被大厂截获触发警告了。我非常期待这一天的到来……

> [!NOTE] 推荐阅读 👉
>  - [UnifiedPush：去中心化的Android通知推送服務，替代Google FCM · Ivon的部落格](https://ivonblog.com/posts/unifiedpush-android/)
>  - [5 years of UnifiedPush | F-Droid](https://f-droid.org/2026/01/08/unifiedpush-5-years.html)
>  - [UnifiedPush: a decentralized, open-source push notification protocol for Android : r/androiddev | Reddit](https://www.reddit.com/r/androiddev/comments/zsr6ka/unifiedpush_a_decentralized_opensource_push/)
>  - [My recent F-Droid blog post explained what UnifiedPush is in detail, basically: ... | Hacker News](https://news.ycombinator.com/item?id=34382862)