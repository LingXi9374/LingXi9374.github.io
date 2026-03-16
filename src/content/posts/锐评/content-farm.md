---
title: 如何清理「内容农场」？
published: 2025-12-12
description: '铲除**内容农场**产生的垃圾信息，还你一个清净的中文搜索体验！'
image: './images/content_farm.png'
tags: []
category: '锐评'
draft: false 
lang: 'zh_CN'
---

## 前言

这几个月，我一直使用Bing搜索引擎，使用中文关键词搜索很多技术类问题，发现一个很严重的现象：搜索引擎弹出来的一些搜索结果中，有些网站文章粗略读起来有点合情合理，而仔细一读却错漏百出！这些文章都有个共同点：东拼西凑，前言不搭后语，牛头不对马嘴，甚至有浓烈的AI生成味……

没错！这些毫无营养的内容，我们都把它们称之为——**``内容农场``**！

我因此被这些互联网~~垃圾~~化粪池困扰了许久，它们的出现，无异于每次使用搜索引擎，都需要我在屎里淘金。

更绝的是，这些内容农场，它不仅仅抢占SEO，污染搜索引擎，甚至还会污染各大具有联网搜索功能的AI的引用源！(没办法开了联网搜索这些AI必然会被影响，目前也没有任何方法可以做到让LLM排除特定网站，唯一的方法就是关闭联网搜索)

如果你对如何抗击内容农场感兴趣，不妨先读读以下两篇博客：

 1. [清理「内容农场」，还你清爽的 Google 中文搜索体验 - 少数派](https://sspai.com/post/69407)
 2. [「内容农场」属实在玷污 Google 搜索结果 | ChrAlpha's blog](https://blog.ichr.me/post/evil-content-farm/)

## 什么是「内容农场」？

以下是[Wikipedia(中文维基)](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E8%BE%B2%E5%A0%B4)对「内容农场」的解释：

 > **内容农场**（英语：_content farm_）是指为了牟取广告费等商业利益或出于控制舆论、带风向等特殊目的，快速生产大量网络文章来吸引流量的网站，通常，其也利用搜索引擎来达到吸睛点击；农场文或灌水文则是此类网站制造的文章。

简单来说，所谓的 **``内容农场``**，就是快速产出大量低质内容、不择手段吸引流量、借此牟取暴利的网站。放任甚至鼓励小编体营销号生长的部分国内平台，个人认为应当同样归类为内容农场。

先从 **`快速产出大量低质内容`** 说起，它到底有多快，有多少？本博客上面的文章，迄今为止十根手指头都能数得过来；而一个内容农场站群所掌握的域名数量可能数以千计，如果把每个页面都打印后连起来，内容农场的内容产出速度很可能会超越光速——但这并未推翻狭义相对论，因为其中不传递任何信息 ~~(确实，因为它们没有任何质量可言)~~。

此等更新速度，显然不是因为雇了一个集团军的写手团队。内容农场的文章通常直接爬取自其它平台，用自动化程序实现从采集到发布的一整套流程。甚至有些网站不用爬虫，直接让AI批量生成毫无营养的文章然后上传，爬虫都省了(～￣▽￣)～ 

在此特地点名一个内容农场——它就是臭名昭著，人见人恨的*****(算了不提名字，怕给人家引流)，玛德我每次搜索技术类问题，天天在我的搜索结果中冒出来，里面的内容可以说就像是印度恒河水与日本核污水混合起来一样——人一碰就死！我一看到那个网站上的AI味十足的男胡子程序员logo，心里直犯恶心，呕呕呕！🤢🤮

![pZMCdPS.png](https://s41.ax1x.com/2025/12/12/pZMCdPS.png)

## 如何屏蔽

内容农场往往手握众多域名，一个被降权、套娃立刻上线，`-example.com`等`搜索语法`也只能作为临时措施。

由于各大搜索引擎的举报系统有时候是摆设来的，短期内我们很难指望搜索引擎优化相关算法，也不太可能通过人工手段干预搜索结果。如果你不想切换到其它搜索引擎（当然其它搜索引擎也不会好到哪去），更实际的方案是设法将内容农场从搜索结果中剔除。

下面介绍几种可行方案：

### uBlacklist 插件

:::caution
 - 由于该插件未上架Edge 扩展商店，Edge 浏览器用户需要手动下载crx插件包手动安装，国内可用的uBlacklist crx下载链接：
 [uBlacklist | Chrome扩展 - Crx搜搜](https://www.crxsoso.com/webstore/detail/pncfbmialoiaghdehhbnbhkkgmjanfhe)

:::

眼不见为净，最直接的方式当然是避免搜索结果中出现内容农场。[uBlacklist](https://ublacklist.github.io/docs)这款浏览器扩展就能自动屏蔽搜索引擎页面中出现的低质量结果，支持[Chrome](https://chrome.google.com/webstore/detail/ublacklist/pncfbmialoiaghdehhbnbhkkgmjanfhe/)、[Firefox](https://addons.mozilla.org/en/firefox/addon/ublacklist/) 和 [Safari](https://apps.apple.com/us/app/ublacklist-for-safari/id1547912640) 等主流平台。 ~~(可惜了没有上架Edge扩展商店)~~ 安装后，搜索结果的网址后面就会出现「加入黑名单」按钮，允许你通过域名、标题和正则表达式屏蔽不想看到的站点。例如，规则 /^https:\/\/www\.example\./ 将匹配所有以 `https://www.example.` 开头的 URL。

规则的进阶用法，不妨参阅 MDN 文档对[匹配模式](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Match_patterns)和[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)的讲解，uBlacklist 官网也给出了[部分范例](https://ublacklist.github.io/docs/advanced-features#match-patterns)。

成功创建规则后，下次搜索时，uBlacklist 便会帮你隐藏已屏蔽的域名，并在顶部显示屏蔽数量。如果没搜到想要的结果，也可以暂时取消屏蔽，检查是否有误伤，uBlacklist 会高亮展示这些条目。对了，在扩展的选项页中，能够自定义高亮的颜色模式，还可以单独高亮指定搜索结果。

![pZMC4xJ.png](https://s41.ax1x.com/2025/12/12/pZMC4xJ.png)

<center><font color="#D3D3D3">红色为被屏蔽的搜索结果</font></center>

uBlacklist 默认仅为 Google 搜索结果启用，你可以在扩展的选项页中手动开启支持必应、DuckDuckGo、Ecosia 和 Startpage 四款搜索引擎，需要同意「存取相关网页数据」的额外权限。同页面还提供更多自定义选项，手动编辑、导入、导出规则，使用 Google 云端硬盘或 Dropbox 云端同步数据等功能。

![pZMCIM9.png](https://s41.ax1x.com/2025/12/12/pZMCIM9.png)

内容农场茫茫多，单靠自己添加，怕是得把这当成全职工作才行。这种时候，就有必要借助社区的力量了，一份由全球网友贡献并维护的优质规则列表可以极大地节约我们的时间。

目前更新最及时、社区最活跃的中文项目是 Google Chinese Results Blocklist，自 2016 年不断完善至今，已覆盖数千网址，提供 精确匹配 和 模糊匹配 两种规则，复制订阅链接后直接添加即可。uBlacklist subscription compilation 是一个较为激进的项目，整合网络上大部分订阅列表，通过 GitHub Actions 自动更新。也欢迎你参与上述项目，分享遇到的垃圾站点，让更多人受益。

::github{repo="cobaltdisco/Google-Chinese-Results-Blocklist"}

### 终结内容农场

 > ~~先说一句，这插件名字好中二啊（~~

只屏蔽搜索结果，有时还是难免一脚踏入陷阱，被某个看似无害的超链接带进内容农场的地盘。「[终结内容农场](https://github.com/danny0838/content-farm-terminator)」这款扩展就是对付它们的利器，不论身处何方，它都能在每个指向内容农场的链接前加上醒目的红色感叹号标志，与正常链接区分，并在进入农场前再次贴心提醒。

若依然执迷不悟，不妨点击「查看」按钮，浏览屏蔽多媒体内容和内嵌脚本后的纯净版页面，不让农场主骗取一分钱广告收益；想浏览完整网页，只能通过「解锁」按钮，但必须输入验证码，而且有冷却时间，避免频繁使用失去屏蔽的意义。

![pZMCzMd.png](https://s41.ax1x.com/2025/12/12/pZMCzMd.png)

「终结内容农场」扩展自然也支持订阅网络屏蔽列表，除了预设的 标准内容农场清单，在[GitHub 项目资料库](https://danny0838.github.io/content-farm-terminator/zh/subscriptions)，还提供了较为主观的`类内容农场清单`、聚焦社交网站账户的`社群内容农场清单`、报道罔顾事实的`假新闻网站清单`和谋财害命的`诈骗网站清单`等，可以根据自己的实际情况导入使用。

屏蔽名单的语法在扩展选项页有详细说明，支持正则表达式匹配和通用转换规则。用户还能填写[Google 表单](https://goo.gl/forms/4nsmTmGjJUzQtr0p1)，报告新发现的内容农场或被误杀的正规网站，让扩展更加完善。

![pZMPpqI.png](https://s41.ax1x.com/2025/12/12/pZMPpqI.png)

除了专用扩展，[uBlock Origin](https://github.com/gorhill/uBlock)、[AdGuard](https://adguard.com/zh_cn/welcome.html)等现代广告过滤工具同样支持自定义拦截规则列表，亦可用来屏蔽内容农场；在 Android 设备上，我更推荐使用 Firefox、Kiwi Browser 等支持安装扩展的浏览器，再借助上文介绍的方法提升搜索体验。

自 iOS 15 开始，移动端 Safari 浏览器也支持安装扩展，目前 uBlacklist 已经适配，相信未来会出现更多实用工具。

## 结语

个人抵制内容农场的最佳方法，是无视它。不点击、不阅读、不分享，不给对方贡献任何流量，唯有令运营者无利可图，才可能甘愿退出。如果你是内容创作者，可以开设属于自己的博客，或者在对搜索引擎友好的平台撰文，好内容不应当是微信公众号独享。

每个人都做力所能及之事，改善严峻的简中互联网环境，才是根绝弊病的治本之道。