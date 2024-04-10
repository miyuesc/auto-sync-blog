import configurations from "../../../configurations.js"
import { vitePressConfigJs } from "../../template/index.js"
import { JUEJIN_USER_URL } from "../../website/juejin.js"
import { replaceKeywords } from "../../utils/template-process.js"
import { writeFileSync } from "fs"
import { CONFIG_FILE_PATH } from "../../../build/config.base.js"
import { mkDir } from "../../utils/file-process.js"

const NAV_LINKS = {
  overview: {
    text: "总览",
    link: "/overview/index",
  },
  annual: {
    text: "年度",
    items: [],
  },
  column: {
    text: "专栏",
    link: "/columns/index",
  },
  follow: {
    text: "关注",
    link: "",
  },
}

const processNavBar = (usedNav = [], userId, annualList) => {
  const nav = []
  for (const usedNavElement of usedNav) {
    const navLink = NAV_LINKS[usedNavElement]
    if (usedNavElement === "annual") {
      navLink.items = annualList
    } else if (usedNavElement === "follow") {
      navLink.link = `${JUEJIN_USER_URL}${userId}`
    }
    nav.push(navLink)
  }
  return nav
}

const processSocialLinks = (press) => {
  const socialLinks = press.socialLinks
  const usedSocial = Object.keys(socialLinks)
  return usedSocial.map((key) => ({
    icon: key,
    link: socialLinks[key],
  }))
}

const processPressHead = (blog) => {
  const STATIC_HEAD = [
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["link", { rel: "icon", href: blog.logo }],
    ["meta", { name: "description", content: blog.description }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: blog.title }],
    ["meta", { property: "og:author", content: blog.author }],
    ["meta", { property: "og:site_name", content: blog.siteName }],
  ]

  const head = [...STATIC_HEAD]

  if (blog.head && blog.head.length) {
    head.push(...blog.head)
  }
  if (blog.keywords && blog.keywords.length) {
    head.push(["meta", { property: "keywords", content: blog.keywords.join(",") }])
  }

  return head
}

export const processVitePressConfig = async (annualList) => {
  const { press, blog, juejin } = configurations

  const replacer = (key) => {
    if (key === "nav") {
      return JSON.stringify(processNavBar(press.nav, juejin.userId, annualList))
    } else if (key === "socialLinks") {
      return JSON.stringify(processSocialLinks(press))
    } else if (key === "head") {
      return JSON.stringify(processPressHead(blog))
    } else {
      return blog[key] || press[key] || key
    }
  }

  const config = replaceKeywords(vitePressConfigJs, replacer)

  await mkDir(CONFIG_FILE_PATH)

  // 重写该文档（appendFile 是追加并不存在就直接创建）
  writeFileSync(`${CONFIG_FILE_PATH}/index.js`, config, (err) => {
    if (err) throw err
    console.log("vitepress config 写入成功~")
  })
}
