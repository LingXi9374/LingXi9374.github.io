---
title: 如何实现Markdown博文中的文字黑幕效果？
published: 2025-01-08
description: ''
image: ''
tags: []
category: ''
draft: true 
lang: ''
---

## 黑幕效果

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

<span class="heimu" title="你知道的太多了">这是一段文字，你需要把鼠标悬停在黑色块中才能看得见</span>

## 代码示范

把下面代码复制到markdown文件中

```html
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

<span class="heimu" title="你知道的太多了">这是一段文字，你需要把鼠标悬停在黑色块中才能看得见</span>
```

<span class="heimu" title="你知道的太多了">可惜我没找到使用单独的css文件的方法，只能直接在markdown文件上导入了。</span>