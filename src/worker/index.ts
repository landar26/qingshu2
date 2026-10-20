import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

// 静态资源由 assets 直接托管。没命中的路径（爬虫等非浏览器导航请求访问 /support、/privacy）
// 不会触发 SPA fallback，这里统一回落到 index.html，交给前端路由。
app.get("*", (c) => c.env.ASSETS.fetch(new URL("/", c.req.url)));

export default app;
