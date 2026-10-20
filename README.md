# 轻书笔记官网

iOS App「轻书笔记 / Qingshu Notes」的官网，React + Vite，部署在 Cloudflare Workers。

页面：

- `/` 首页
- `/support` 技术支持 / FAQ（App Store Support URL）
- `/privacy` 隐私政策（App Store Privacy Policy URL）

文案（中英双语）在 `src/react-app/i18n.ts`；App Store 链接和联系邮箱在 `src/react-app/config.ts`，上架后把 `APP_STORE_URL` 填上即可。

## 开发

```bash
npm install
npm run dev
```

## 部署

```bash
npm run build && npm run deploy
```
