---
title: 记一次使用 DSH "Vibe" 博客模板从立项到放弃的经历
published: 2026-10-08
description: '一位 Blog 网站维护者想摆脱原本的模板而"叛逃"，最后却又屁颠回来了'
image: api
tags: [DeepSeek,AI,DSH]
category: '杂谈'
series: 杂谈
seriesOrder: 3
---

## 写在前面

在我这个站点长草的三个月期间:spoiler[~~问为什么长草，因为这个铸币作者几个月以来一直贪玩然后忘记回来写博客了~~]，一个 Harness 工具横空出世: 它就是 DeepSeek Harness (缩写为 DSH)，这位世人皆知的国民级 AI 大模型厂商，终于发布了自家的智能体协作工具。相较于 OpenCode，Codex 与 Zcode，DSH 的优势是开源，易于上手，以及庞大的社区插件生态。

我个人是喜欢那种什么新东西都要抢先试一试的人，正好我使用 DeepSeek API 和 OpenCode CLI/Desktop 也有好长一段时间了，这个 DSH 也一定要尝鲜一下。最近我也看到有个群友用 AI Agent 工具重构了一个 Blog 网页，而且制作的很完美，令我羡慕不已。

于是，我萌生了一个想法：我不想用原来一直在用的 Firefly 模板了 (况且这个模板还是 Fork 自 Fuwari，如今已经有 ~~114514~~ 数以万计个站点使用了这种千篇一律的博客主题)，我要自己手搓一个模板出来。

也看到网络上实测 DeepSeek V4.1 Flash 模型能力相比 V4 Pro 有非常大的进步，况且还首次将视觉能力合并到文本模型。借此我想测测这个模型对于前端工作的处理会如何。

## 技术选型 & 前期准备

个人感觉 Astro 还是太重了，在这个惜内存如金的时代软件运作还是越轻量越好，于是把目光投向了 Nuxt.js —— 一个使用 Vue3 的前端框架。相比 Next.js + React，Nuxt 的核心优势是 `开发体验流畅，上手门槛低`、`部署灵活性高`、`中文文档和社区支持完善`、`默认 JavaScript 体积更小`，的确是个博客地基的最佳选型。可惜的是我没看到有多少站点用了 Nuxt，站点框架基本成为 Astro / Hexo / Hugo 三国鼎立的天下了。所以这些想法要是实现了我也许可以当第一个使用 Nuxt 的 Blogger 以及模板维护者。

包管理与构建系统我使用 bun + vite，在速度上相比 npm / pnpm + vite 也有提升。

由于我不会自己搓 `AGENTS.md`，前期的准备也是叫 D 指导给我生成一份我自己复制到项目根目录了，对话链接在此👉[博客模板 AGENTS 规范](https://chat.deepseek.com/share/i0l6k4uc01pwylu79b) 。

Blog 主题的 Demo 样式图我使用 Canvas 设计网站自己搓了一个出来，如图所示: 

[grid]
![Stardust](https://github.com/LingXi9374/picx-images-hosting/raw/master/Stardust.2ocb8lqwi0.png)
![Stardust-(1)](https://github.com/LingXi9374/picx-images-hosting/raw/master/Stardust-(1).58i5l8qv47.png)
[/grid]

DSH 我使用 NPX (NPM) 运行然后安装了亿些必备的插件后就动手用了

## 前面顺心后面艰难的 ~~Vibe~~ 过程

我除了向 LLM 反馈小问题与 Bug 用短提示词外，其余提示词均使用如下形式: 

```plaintext
第一行概括此轮任务的大致方向
第二 ~ N 行使用 "-" 符号分点列出任务 & 需求
如有必要最后一行列出注意事项与警告
```

编好提示词，扔出 Demo 效果图给 DS 后，它花了一刻钟就给我生成好了 Demo 页面，符合我的预期

> 注: 下面放的图是中后期的样子了，Demo 大致就是除掉下图中的搜索框、相册页等功能

[grid]
![主界面](https://github.com/LingXi9374/picx-images-hosting/raw/master/QQ20261008-203516.4clo72mdke.png)
![文章列表页](https://github.com/LingXi9374/picx-images-hosting/raw/master/QQ20261008-203531.3uvmihkzzk.png)
[/grid]

[grid]
![友链页面](https://github.com/LingXi9374/picx-images-hosting/raw/master/QQ20261008-203537.6f1gv4kylt.png)
![关于页面](https://github.com/LingXi9374/picx-images-hosting/raw/master/QQ20261008-203545.7zr7uli62b.png)
![相册页](https://github.com/LingXi9374/picx-images-hosting/raw/master/QQ20261008-203557.3k8spc5ruf.png)
[/grid]

> [!IMPORTANT] 注意
> 以上图中所有引用图片资源均由模型爬虫获取，侵删。

接着，Demo 做出来后就开始疯狂加功能了: 从主题配色，到 CSS 样式调整；从文章合集功能的实现，到 Mermaid & PlantUML 图表渲染；从网页图片压缩算法实现，到网页内照片查看器功能实现……总之我曾经用的 Blog 主题有什么我就拿什么）。

上述我说的几轮任务开头几轮大肥鱼可以说它能轻松完成，效果达到预期。但是，到了后面逐渐力不从心，比如代码块主题样式、Mermaid/PlantUML 渲染主题与深色模式冲突导致可读性变差，花了两轮对话才修好；图表的放大预览功能花了三轮才完善……可以说越到后面就越是在修 Bug 缝缝补补的过程中越来越远，，，

大肥鱼在前 100M token 劲地发力很意外的让我爽翻，当时给我了 DS 完全可以秒杀前端开发的幻觉；总消耗量破了 200M token 它的短板就逐渐暴露出来。用一个很恰当的比喻就是: **这个模型有脑子，但看起来很像是个 ADHD (注意力缺陷多动障碍)**。一个项目越做到后面，大肥鱼的注意力就越来越散，Vibe 起来就越举步维艰。即使加了很多优化上下文压缩的插件，即使我的用户提示词做的很系统性了，也救不了这个模型本身的缺陷。

![项目总 Toekn 耗费](https://github.com/LingXi9374/picx-images-hosting/raw/master/ebd56fba-c8f9-4473-948c-3c76fb94a3ba.lwilyssm4.png)

你说我为什么不换成其他模型呢？我也有过这个考虑，但在 DSH 我自定义接入了一个模型平台的模型却不能正常触发对话，报 PI_AI_ERROR 或者 400 错误，我接入的是 [AstraFlow 星图](https://astraflow.ucloud.cn/modelverse) 模型平台 ~~(绝不是打广告！！！)~~，至今为止只能推断是我代理软件配置问题或者是这个模型平台没有兼容 DSH，，， 再加上我属于钱少事多的学生群体，GPT 和 Claude 早属于我想用也用不起的范畴，Kimi-K3 与 GLM 5.3 也是超预算的一线模型咱也就有时候干瞪着流口水，要不是这样我也不会用:spoiler[~~小南梁~~]梁圣出的性价比模型了）

![你这吃白饭的蓝色大肥鱼.jpg](https://github.com/LingXi9374/picx-images-hosting/raw/master/image.szqheeit6.png)

最后，仅仅提交了几次 Git，项目就仓促上传到 [GitHub](https://github.com/LingXi9374/Stardust) 存档了，~~依旧投放 Slop 这一块~~，后续也没有意愿维护 (如果你想接手我乐意奉陪，但应该许多人都不会愿意吧））)

::github{repo="LingXi9374/Stardust"}

## 总结

这次的 Vibe 过程不是很顺心的结束了。与以前我使用 Gemini CLI 白嫖 Gemini 3.1 Pro 进行 Vibe Coding 好几个月的经历 (详见[此视频](https://www.bilibili.com/video/BV143tbz1Eb2/)) 对比来看，现在的 Vibe 项目不单单只依靠“许愿”与所谓的基本工程素养撑起来了，还需要用户对模型 Agent 能力的把握与精准调教。但无论怎样，实际上 Vibe 这样的“实践”根本不可能从中获取到新知，宁愿拿这点钱去烧 Token <ruby><rb>许愿</rb><rt><big>Wish/Vow</big></rt></ruby>，不如让我抱着啃 Python 教程电子书有用。我现在难以理解哔站上那些动不动用 GPT 6 Astra，Claude Fable/Opus 5.5 这种烧钱大户的小登 UP 主，去 Vibe 一个超级屎山的意图与价值了，甚至他们的工程思维也许没有我的强 (笑)，如果后面闲得慌了我可能还会专门写长篇大论去锐评 (绷)。

~~若是从此开始的半年内我还没有在编程方面得到任何进步，我当场就把整个 Blog 站点吃了！ (bushi)~~