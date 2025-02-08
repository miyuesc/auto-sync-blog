import { useData, inBrowser } from "vitepress"
import { h } from "vue"
import DefaultTheme from "vitepress/theme-without-fonts"
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client"

import "./main.css"
import "@nolebase/vitepress-plugin-enhanced-readabilities/dist/client/style.css"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      "nav-screen-content-after": () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    })
  },
  setup() {
    // setup language
    const { lang } = useData()
    if (inBrowser) {
      // @ts-ignore
      document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2024 00:00:00 UTC; path=/`
    }
  },
}
