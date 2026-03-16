import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.png",

	// 名字
	name: "泠熙_LingXi_",

	// 个人签名
	bio: "一个普通的 Bilibili UP主",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/LingXi9374",
			showName: false,
		},
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/396529360",
			showName: false,
		},
		{
			name: "Ottohub",
			icon: "streamline-plump:wheelchair-2-solid",
			url: "https://www.ottohub.cn/u/4728",
			showName: false,
		},
		{
			name: "Cloudmusic",
			icon: "simple-icons:neteasecloudmusic",
			url: "https://y.music.163.com/m/user?id=1380609119",
			showName: false,
		},
	],
};
