export default {
  // blog 基础配置
  blog: {
    title: "MiyueFE's blog",
    description: "专注于 Web 前端的菜鸟开发",
    logo: "https://miyuefe.cn/assets/images/logo.svg",
    siteName: "miyuefe.cn",
    keywords: ["前端", "Vue", "JavaScript", "TypeScript", "HTML", "CSS", "MiyueFE", "bpmn", "bpmn-js"],
    author: "TeaTools,MiyueFE",
  },

  // vite press 构建配置
  press: {
    name: "MiyueFE",
    text: "专注于 Web 前端的菜鸟开发",
    tagline: "Welcome to my blog ~",
    image: "https://vitepress.dev/vitepress-logo-large.webp",
    actions: [
      { theme: "brand", text: "开始阅读", link: "/overview/index" },
      { theme: "alt", text: "个人主页", link: "https://miyuefe.cn" },
      { theme: "alt", text: "关注掘金", link: "https://juejin.cn/user/747323639208391" },
    ],
    features: [
      { icon: "🎈", title: "Vue", details: "" },
      { icon: "🎁", title: "Bpmn", details: "" },
      { icon: "🎨", title: "CSS", details: "" },
    ],

    nav: ["column", "category", "ranking", "annual", "follow"],

    socialLinks: {
      github: "https://github.com/miyuesc/auto-sync-blog",
    },

    showTeam: false,
  },

  // 掘金
  juejin: {
    userId: "747323639208391",
  },
}
