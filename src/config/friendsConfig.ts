import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "Cloverta 的博客",
		imgurl: "https://blog.cloverta.top/images/marisa.png",
		desc: "见字如晤，展信舒颜。楮墨有限，不尽欲言。\n欢迎来到三叶的博客。",
		siteurl: "https://blog.cloverta.top",
		tags: ["Blog"],
		weight: 10, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "A Moment's Rest",
		imgurl: "https://a-moment096.github.io/avatar.jpg",
		desc: "AMoment 的 Blog",
		siteurl: "https://a-moment096.github.io/",
		tags: ["Blog"],
		weight: 9,
		enabled: true,
	},
	{
		title: "極限風味 Blog",
		imgurl: "https://save1.ex-tasty.com/media/tasty-icon.webp",
		desc: "邪惡與極限伴您一生……🥰",
		siteurl: "https://ex-tasty.com",
		tags: ["Blog"],
		weight: 8,
		enabled: true,
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
