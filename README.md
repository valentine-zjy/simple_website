# Jiayang Zhang Resume Site

这是张嘉洋的个人在线简历网站，基于 Next.js App Router 构建，面向 AI 大模型算法工程师 / 算法岗求职展示。网站内容主要由 YAML 和 MDX 驱动，便于后续维护与部署。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint
- `js-yaml`
- `next-mdx-remote`

## 内容维护

- 修改个人信息：`content/profile.yaml`
- 修改主题：`content/theme.yaml`
- 修改中文 / 英文正文：`content/sections/*.mdx`
- 替换头像：`public/images/avatar.jpg`
- 替换背景图：`public/images/background.jpg`
- 替换简历 PDF：`public/张嘉洋-算法岗简历.pdf`

说明：

- 结构化信息放在 YAML
- 长文本介绍放在 MDX
- 静态资源放在 `public/`
- 上线前请把真实简历文件放到 `public/张嘉洋-算法岗简历.pdf`

## 本地运行

```bash
npm install
npm run dev
npm run build
npm run lint
```

默认访问 `http://localhost:3000`。

- 中文：`http://localhost:3000/?lang=zh`
- 英文：`http://localhost:3000/?lang=en`

## 目录结构

```text
content/
  profile.yaml
  theme.yaml
  sections/
public/
  images/
    avatar.jpg
    background.jpg
    projects/
  张嘉洋-算法岗简历.pdf
src/
  app/
  components/
  lib/
```

## GitHub 推送

```bash
git add .
git commit -m "fix: restore default next output directory"
git push origin main
```

## Vercel 部署配置

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: 留空，使用 Vercel 默认值
- Install Command: `npm install`
- Production Branch: `main`

不要手动填写 Output Directory，也不要配置 `outputDirectory`。Next.js 默认会输出到 `.next`，Vercel 会自动读取该目录。

## 检查项

- 页面正常显示
- 空链接不会显示
- `npm run lint` 通过
- `npm run build` 通过
- 构建产物输出到默认 `.next` 目录
