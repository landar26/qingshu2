import { useCallback, useEffect, useState } from "react";

export type Lang = "zh" | "en";

const STORAGE_KEY = "qingshu.lang";

function initialLang(): Lang {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === "zh" || saved === "en") return saved;
	} catch {
		// 隐私模式等情况下 localStorage 不可用，退回浏览器语言。
	}
	return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function useLang() {
	const [lang, setLangState] = useState<Lang>(initialLang);

	useEffect(() => {
		document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
		document.title = strings[lang].meta.title;
	}, [lang]);

	const setLang = useCallback((next: Lang) => {
		setLangState(next);
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// 记不住也没关系，本次会话仍然生效。
		}
	}, []);

	return [lang, setLang] as const;
}

export interface Feature {
	icon: string;
	title: string;
	body: string;
}

export interface Faq {
	q: string;
	a: string;
}

export interface Section {
	title: string;
	body: string[];
}

export interface Strings {
	meta: { title: string };
	appName: string;
	nav: { home: string; support: string; privacy: string };
	download: { soon: string; available: string };
	hero: { eyebrow: string; title: string; subtitle: string; note: string };
	mock: {
		pageTitle: string;
		callout: string;
		heading: string;
		todoDone: string;
		todoOpen: string;
		toggle: string;
		quote: string;
		slash: string;
		menu: string[];
	};
	features: { title: string; subtitle: string; items: Feature[] };
	privacyBand: { title: string; body: string; points: string[] };
	cta: { title: string; body: string };
	footer: { rights: string; contact: string };
	privacy: { title: string; updated: string; intro: string; sections: Section[] };
	support: { title: string; intro: string; faqTitle: string; faqs: Faq[]; contactTitle: string; contactBody: string };
}

export const strings: Record<Lang, Strings> = {
	zh: {
		meta: { title: "轻书笔记 — 安静、本地的块笔记" },
		appName: "轻书笔记",
		nav: { home: "首页", support: "支持", privacy: "隐私" },
		download: { soon: "即将登陆 App Store", available: "在 App Store 下载" },
		hero: {
			eyebrow: "iPhone 上的块笔记",
			title: "把想法，\n写成一页一页的书。",
			subtitle: "轻书笔记是一个安静的块编辑器：输入 / 插入任何内容，页面可以无限嵌套。所有笔记只存在你的手机里。",
			note: "无需账号 · 不联网 · US$1.99",
		},
		mock: {
			pageTitle: "欢迎使用轻书笔记",
			callout: "随便改、随便删，它只存在你的手机里。",
			heading: "从这里开始",
			todoDone: "长按拖拽点重新排序",
			todoOpen: "点按拖拽点转换或复制块",
			toggle: "这是一个折叠块",
			quote: "选中文字即可设置粗体、斜体和链接。",
			slash: "/",
			menu: ["标题", "待办", "引用", "代码"],
		},
		features: {
			title: "一切都是块",
			subtitle: "段落、标题、列表、待办、折叠、引用、提示框、代码、图片、分割线、子页面——像搭积木一样写。",
			items: [
				{ icon: "/", title: "输入 / 打开块菜单", body: "在任意空行输入 /，选择标题、列表、待办、图片等十几种块。" },
				{ icon: "#", title: "Markdown 快捷输入", body: "行首输入 #、-、[]、>、``` 或 ---，即刻变成对应的块，手不离键盘。" },
				{ icon: "↳", title: "无限嵌套页面", body: "页面里放子页面，层级随你。侧栏一览整个工作区的结构。" },
				{ icon: "⋮⋮", title: "拖拽重新排序", body: "长按块左侧的拖拽点移动位置，点按即可转换、复制或删除。" },
				{ icon: "⌕", title: "全文搜索", body: "标题和正文都能搜，几千个块也能瞬间找到。" },
				{ icon: "↑", title: "导出 Markdown", body: "单页或整个工作区一键导出为 Markdown，你的笔记永远不被锁住。" },
				{ icon: "↺", title: "回收站", body: "删掉的页面先进回收站，30 天内随时恢复。" },
				{ icon: "◐", title: "浅色与深色", body: "纸张质感的界面，自动跟随系统外观，夜里写字也不刺眼。" },
			],
		},
		privacyBand: {
			title: "你的笔记，只属于你。",
			body: "轻书笔记没有服务器，也没有账号系统。我们看不到、也收集不到你写的任何东西。",
			points: ["数据只保存在本机", "不需要注册登录", "没有统计与广告追踪", "随时导出为 Markdown"],
		},
		cta: { title: "开始写第一页", body: "打开即用，不用注册，也不用联网。" },
		footer: { rights: "保留所有权利。", contact: "联系我们" },
		privacy: {
			title: "隐私政策",
			updated: "生效日期：2026 年 10 月 20 日",
			intro: "轻书笔记（以下简称「本应用」）的设计原则是：你的笔记只属于你。本政策说明本应用如何处理你的信息——简单来说，我们不收集任何信息。",
			sections: [
				{
					title: "我们不收集的信息",
					body: [
						"本应用不要求注册或登录，没有账号系统。",
						"本应用不收集姓名、邮箱、电话、位置、设备标识符或任何其他个人信息。",
						"本应用不包含任何第三方统计、广告或追踪 SDK，不会发起任何网络请求。",
					],
				},
				{
					title: "你的笔记存放在哪里",
					body: [
						"你创建的页面、文字和图片全部保存在你设备上本应用的私有存储空间中，不会上传到我们或任何第三方的服务器。",
						"如果你开启了 iPhone 的 iCloud 备份或通过电脑备份设备，本应用的数据可能会作为设备备份的一部分，由 Apple 依据其隐私政策保管。",
					],
				},
				{
					title: "照片访问",
					body: ["当你在笔记中插入图片时，系统会让你从相册中选择照片。只有你选中的图片会被复制到本应用的本地存储中，本应用不会读取相册中的其他内容。"],
				},
				{
					title: "导出与分享",
					body: ["当你主动使用「导出 Markdown」功能时，导出内容会通过系统分享面板交给你选择的应用或位置，之后的处理遵循该应用的隐私政策。"],
				},
				{
					title: "删除数据",
					body: ["你可以在应用内删除任何页面（回收站中的页面 30 天后自动清除，也可以手动永久删除）。卸载本应用会删除其在本机保存的全部数据。"],
				},
				{
					title: "儿童隐私",
					body: ["本应用不收集任何人的个人信息，包括 13 岁以下的儿童。"],
				},
				{
					title: "政策更新",
					body: ["如本政策有变更，我们会在本页面发布新版本并更新生效日期。"],
				},
			],
		},
		support: {
			title: "技术支持",
			intro: "使用中遇到问题？先看看下面的常见问题，找不到答案就给我们写信。",
			faqTitle: "常见问题",
			faqs: [
				{ q: "怎么插入标题、待办、图片等内容？", a: "在任意空行输入 / 打开块菜单，选择你需要的块类型。也可以在行首输入 Markdown 快捷符号：# 标题、- 列表、1. 有序列表、[] 待办、> 引用、``` 代码块、--- 分割线。" },
				{ q: "怎么新建子页面？", a: "在块菜单中选择「页面」，或者在侧栏里点某个页面右边的 ＋。页面可以无限嵌套。" },
				{ q: "怎么调整块的顺序、或者把段落变成列表？", a: "长按块左侧的拖拽点可以拖动排序；点按拖拽点可以把块转换成其他类型、复制或删除。" },
				{ q: "我的笔记存在哪里？会上传吗？", a: "所有内容都保存在你的 iPhone 本地，本应用不联网、没有服务器，不会上传任何数据。" },
				{ q: "误删了页面，还能找回吗？", a: "可以。删除的页面会先进入回收站，30 天内可以在侧栏的「回收站」里恢复。超过 30 天会自动清除。" },
				{ q: "换新手机后笔记还在吗？", a: "使用 iCloud 备份或电脑备份恢复新手机时，本应用的数据会随设备备份一起迁移。也可以先在「设置 → 导出全部」把笔记导出为 Markdown 自行保存。" },
				{ q: "支持多设备同步吗？", a: "目前不支持。轻书笔记专注于本地、离线的写作体验，所有数据只在当前设备上。" },
				{ q: "可以导出笔记吗？", a: "可以。在页面右上角菜单选择「导出 Markdown」导出单页，或在「设置 → 导出全部」导出整个工作区。" },
			],
			contactTitle: "联系我们",
			contactBody: "反馈问题或建议，请发邮件到下面的地址，附上你的 iOS 版本和应用版本（设置页底部可以看到），我们会尽快回复。",
		},
	},
	en: {
		meta: { title: "Qingshu Notes — Quiet, local block notes" },
		appName: "Qingshu Notes",
		nav: { home: "Home", support: "Support", privacy: "Privacy" },
		download: { soon: "Coming soon to the App Store", available: "Download on the App Store" },
		hero: {
			eyebrow: "Block notes for iPhone",
			title: "Write your ideas,\none page at a time.",
			subtitle: "Qingshu Notes is a quiet block editor: type / to insert anything, and nest pages as deep as you like. Every note stays on your phone.",
			note: "No account · No network · US$1.99",
		},
		mock: {
			pageTitle: "Welcome to Qingshu Notes",
			callout: "Edit or delete freely — it lives only on your device.",
			heading: "Getting started",
			todoDone: "Long-press the handle to reorder",
			todoOpen: "Tap the handle to turn into or duplicate",
			toggle: "This is a toggle",
			quote: "Select text for bold, italic and links.",
			slash: "/",
			menu: ["Heading", "To-do", "Quote", "Code"],
		},
		features: {
			title: "Everything is a block",
			subtitle: "Paragraphs, headings, lists, to-dos, toggles, quotes, callouts, code, images, dividers and sub-pages — build your notes like bricks.",
			items: [
				{ icon: "/", title: "Type / for the block menu", body: "On any empty line, type / to choose from headings, lists, to-dos, images and more." },
				{ icon: "#", title: "Markdown shortcuts", body: "Start a line with #, -, [], >, ``` or --- and it becomes the matching block instantly." },
				{ icon: "↳", title: "Endlessly nested pages", body: "Put pages inside pages, as deep as you need. The sidebar shows your whole workspace." },
				{ icon: "⋮⋮", title: "Drag to reorder", body: "Long-press a block's handle to move it; tap to turn into, duplicate or delete." },
				{ icon: "⌕", title: "Full-text search", body: "Search titles and content alike — thousands of blocks, found instantly." },
				{ icon: "↑", title: "Export to Markdown", body: "Export one page or your whole workspace as Markdown. Your notes are never locked in." },
				{ icon: "↺", title: "Trash", body: "Deleted pages go to the trash first and can be restored within 30 days." },
				{ icon: "◐", title: "Light and dark", body: "A paper-like interface that follows your system appearance, easy on the eyes at night." },
			],
		},
		privacyBand: {
			title: "Your notes belong to you.",
			body: "Qingshu Notes has no servers and no accounts. We can't see — and don't collect — anything you write.",
			points: ["Stored only on your device", "No sign-up or login", "No analytics or ad tracking", "Export to Markdown anytime"],
		},
		cta: { title: "Start your first page", body: "Open and write. No sign-up, no connection required." },
		footer: { rights: "All rights reserved.", contact: "Contact" },
		privacy: {
			title: "Privacy Policy",
			updated: "Effective date: October 20, 2026",
			intro: "Qingshu Notes (\"the App\") is built on one principle: your notes belong to you. This policy explains how the App handles your information — in short, we don't collect any.",
			sections: [
				{
					title: "Information we don't collect",
					body: [
						"The App has no account system and never asks you to sign up or log in.",
						"The App does not collect your name, email, phone number, location, device identifiers or any other personal information.",
						"The App contains no third-party analytics, advertising or tracking SDKs, and makes no network requests.",
					],
				},
				{
					title: "Where your notes are stored",
					body: [
						"Pages, text and images you create are stored in the App's private storage on your device. They are never uploaded to our servers or any third party.",
						"If you use iCloud Backup or back up your device to a computer, the App's data may be included in that device backup, which Apple keeps under its own privacy policy.",
					],
				},
				{
					title: "Photo access",
					body: ["When you insert an image, the system photo picker lets you choose photos. Only the photos you pick are copied into the App's local storage; the App cannot read anything else in your library."],
				},
				{
					title: "Export and sharing",
					body: ["When you choose \"Export Markdown\", the content is handed to the app or location you select in the system share sheet, and is then subject to that app's privacy policy."],
				},
				{
					title: "Deleting your data",
					body: ["You can delete any page in the App (pages in the trash are removed automatically after 30 days, or you can delete them permanently). Uninstalling the App deletes all of its data on your device."],
				},
				{
					title: "Children's privacy",
					body: ["The App collects no personal information from anyone, including children under 13."],
				},
				{
					title: "Changes to this policy",
					body: ["If this policy changes, we will post the new version on this page and update the effective date."],
				},
			],
		},
		support: {
			title: "Support",
			intro: "Running into something? Check the questions below, and if you can't find an answer, write to us.",
			faqTitle: "Frequently asked questions",
			faqs: [
				{ q: "How do I add headings, to-dos, images and more?", a: "Type / on any empty line to open the block menu and pick a block type. You can also start a line with a Markdown shortcut: # heading, - list, 1. numbered list, [] to-do, > quote, ``` code, --- divider." },
				{ q: "How do I create a sub-page?", a: "Choose \"Page\" from the block menu, or tap ＋ next to a page in the sidebar. Pages nest as deep as you like." },
				{ q: "How do I reorder blocks or turn a paragraph into a list?", a: "Long-press the handle on the left of a block to drag it. Tap the handle to turn the block into another type, duplicate or delete it." },
				{ q: "Where are my notes stored? Are they uploaded?", a: "Everything is stored locally on your iPhone. The App has no servers and never goes online, so nothing is uploaded." },
				{ q: "I deleted a page by mistake. Can I get it back?", a: "Yes. Deleted pages go to the trash, where you can restore them from the sidebar within 30 days. After that they are removed automatically." },
				{ q: "Will my notes move to a new iPhone?", a: "If you set up your new phone from an iCloud or computer backup, the App's data comes along with it. You can also use Settings → Export All to save your notes as Markdown." },
				{ q: "Does it sync across devices?", a: "Not at the moment. Qingshu Notes focuses on a local, offline writing experience; your data stays on the current device." },
				{ q: "Can I export my notes?", a: "Yes. Use \"Export Markdown\" in a page's top-right menu for a single page, or Settings → Export All for your whole workspace." },
			],
			contactTitle: "Contact us",
			contactBody: "For bugs or suggestions, email us at the address below. Including your iOS version and the App version (shown at the bottom of Settings) helps us reply faster.",
		},
	},
};
