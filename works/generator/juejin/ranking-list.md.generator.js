import { getArticlesAndColumnsMap } from "../../store/index.js"
import { mkdirp } from "mkdirp"
import { RANKING_FILE_PATH } from "../../../build/config.base.js"
import { writeFileSync } from "fs"
import { insertString } from "../../utils/common.js"

const sortArray = (arr, key) => {
  const copyArr = arr.slice()
  return copyArr.sort((a, b) => b.formatInfo[key] - a.formatInfo[key]).slice(0, 10)
}
const markerMap = {
  0: "<font size=10>🥇</font>&ensp; ",
  1: "<font size=10>🥈</font>&ensp; ",
  2: "<font size=10>🥉</font>&ensp; ",
  x: (idx) => `<font size=6>${idx + 1}.</font>&ensp; `,
}
const processTopArticles = (articles) => {
  return articles
    .map((i, idx) => {
      return insertString(i.formatInfo.mdString, 7, markerMap[idx] || markerMap.x(idx))
    })
    .join("\n\n")
}

const template = (a, b, c, d) => `---
aside: false
---
<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>

# 数据排行榜

<div class="tabs-header">
  <div :class="['tab-item', active === 0 ? 'tab-item-active' : '']" @click="active = 0">👀 阅读榜</div>
  <div :class="['tab-item', active === 1 ? 'tab-item-active' : '']" @click="active = 1">👍 点赞榜</div>
  <div :class="['tab-item', active === 2 ? 'tab-item-active' : '']" @click="active = 2">💬 评论榜</div>
  <div :class="['tab-item', active === 3 ? 'tab-item-active' : '']" @click="active = 3">🗃 收藏榜</div>
</div>

<div class="ranking-list" v-show="active === 0">
${processTopArticles(a)}
</div>

<div class="ranking-list" v-show="active === 1">
${processTopArticles(b)}
</div>

<div class="ranking-list" v-show="active === 2">
${processTopArticles(c)}
</div>

<div class="ranking-list" v-show="active === 3">
${processTopArticles(d)}
</div>
`

export const processRankingList = async () => {
  await mkdirp(RANKING_FILE_PATH)

  const { articles } = await getArticlesAndColumnsMap()

  const diggRanking = sortArray(articles, "digg_count")
  const viewRanking = sortArray(articles, "view_count")
  const commentRanking = sortArray(articles, "comment_count")
  const collectRanking = sortArray(articles, "collect_count")

  const md = template(viewRanking, diggRanking, commentRanking, collectRanking)

  await writeFileSync(`${RANKING_FILE_PATH}/index.md`, md)

  console.log("Ranking list 写入成功~")
}
