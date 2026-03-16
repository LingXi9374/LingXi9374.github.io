import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "公告",

	// 公告内容
	content: "本Blog于2026年从Fuwari迁移至更稳定的Firefly模板，让我们恭喜泠熙_LingXi_的博客得到大翻新！可惜原先的Blog文章评论全部丢失力(悲)",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "了解更多",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
