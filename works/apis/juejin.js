// 请求地址部分
const API = "https://api.juejin.cn/"

// 请求用户信息
export const USER_API = API + "user_api/v1/user/get"
// 请求获取文章列表
export const ARTICLE_API = API + "content_api/v1/article/query_list"
// 请求指定专栏里的文章列表
export const COLUMN_API = API + "content_api/v1/column/articles_cursor"
// 请求获取专栏列表
export const COLUMN_LIST_API = API + "content_api/v1/column/self_center_list"
// 单个专栏详情
export const COLUMN_INFO_API = API + "content_api/v1/column/detail"
// 近期热门
export const RECENT_ARTICLE_API = API + "recommend_api/v1/article/recommend_cate_feed"


// 前端大类型id
export const FRONTEND_CATEGORY_ID = "6809637767543259144"
// 后端大类型id
export const BACKEND_CATEGORY_ID = "6809637769959178254"
// Android 大类型id
export const MOBILE_CATEGORY_ID = "6809635626879549454"
// iOS 大类型id
export const DATABASE_CATEGORY_ID = "6809635626661445640"
// 人工智能 大类型id
export const AI_CATEGORY_ID = "6809637773935378440"
