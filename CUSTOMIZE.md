# Roy's Blog 使用与配置教程

本项目使用 [Miracle](https://github.com/Miralous/Miracle) VitePress 主题。安装依赖后运行 `pnpm dev`，浏览器打开 `http://localhost:4321` 即可预览。

## 1. 修改个人信息

所有常用个人信息都在根目录的 `config.ts`：

```ts
informations: {
  title: "Roy's Blog",
  description: "你的博客简介",
  author: "RoyOfficial",
  favicon: "https://cdn.royofficial.cn/royofficial.png",
  avatar: "https://cdn.royofficial.cn/royofficial.png",
  url: "https://royofficial.cn",
}
```

- `title`：浏览器标题、页脚和主题中的博客名称。
- `description`：首页 Banner 的副标题和站点描述。
- `author`：个人名字，会显示在首页和页脚。
- `favicon`：浏览器标签页图标。
- `avatar`：主题头像。
- `url`：部署后的完整域名，不要在结尾添加 `/`。

如果头像图片无法显示，请确认图片地址支持 HTTPS 和跨域访问，并在浏览器中直接打开该 URL 测试。

## 2. 添加、修改和删除文章

文章放在 `src/posts/` 目录，每篇文章都是一个 `.md` 文件。可以复制已有文章作为模板：

```md
---
title: 我的第一篇文章
description: 这段文字会显示在文章列表和 RSS 摘要中。
date: 2026-08-27
tags: [Go, Vue]
category: 技术
published: true
---

# 我的第一篇文章

正文从这里开始。这里支持标准 Markdown、代码高亮、数学公式、脚注、任务列表、Mermaid 等主题已启用的扩展。
```

操作规则：

1. 新建 `src/posts/my-post.md`，文件名建议只使用英文、数字和短横线。
2. 修改 Frontmatter 中的 `title`、`description`、`date`、`tags` 和 `category`。
3. 将正文写在第二个 `---` 后面。
4. 删除文章时删除对应的 `.md` 文件。
5. 将 `published` 设置为 `false` 可暂时隐藏文章；如果主题版本不读取该字段，则直接移出 `src/posts/`。

常用 Markdown 示例：

```md
## 二级标题

**粗体**、*斜体*、~~删除线~~、`行内代码`

[外部链接](https://example.com)

- 无序列表
- [ ] 待办事项
- [x] 已完成事项

| 名称 | 说明 |
| --- | --- |
| Go | 后端语言 |

```go
package main

func main() {
    println("Hello, Roy's Blog")
}
```
```

文章列表页面是 `src/archives.md`，主题会自动扫描 `src/posts/` 并按日期整理，不需要手动维护文章索引。

## 3. 修改技术栈

在 `config.ts` 的 `homePage.stacks` 中添加或删除项目：

```ts
stacks: [
  { name: "Go", icon: "go" },
  { name: "Vue.js", icon: "vuejs" },
]
```

`name` 是页面显示名称，`icon` 是 Devicon 图标目录名。当前配置已经包含：

`Go`、`Vue.js`、`PNPM`、`NPM`、`Node.js`、`Git`、`JavaScript`、`HTML`、`CSS`、`Windows`、`macOS`、`Linux`。

主题会从 Devicon CDN 加载图标。查找其他图标时，参考 [Devicon 图标列表](https://devicon.dev/)，使用对应的名称，例如 `docker`、`typescript`、`react`。

## 4. 控制首页模块

`config.ts` 的 `homePage.modules` 控制首页模块：

```ts
modules: {
  pictures: false,
  lastMoment: true,
  recentPosts: false,
  projects: false,
  musics: false,
  techStack: true,
  friends: false,
}
```

当前需求对应的状态：

- `projects: false`：删除 PROJECT 模块。
- `friends: false`：删除 FRIENDS 模块。
- `recentPosts: false`：删除 Recent Posts 模块。
- `musics: false`：删除 Music 模块。
- `techStack: true`：保留并显示技术栈。
- `pictures: false`：当前也未显示照片模块。
- `lastMoment: true`：保留最新动态模块；不需要时改成 `false`。

关闭模块后不需要删除组件文件，主题不会加载对应首页内容，升级模板时也更容易同步更新。

## 5. 手动配置 Projects 项目

Projects 不再自动扫描整个 GitHub 用户的仓库，而是读取 `config.ts` 中的 `homePage.projects`。每个项目只需要填写一个完整的 GitHub 仓库地址：

```ts
homePage: {
  modules: {
    projects: true,
  },
  projects: [
    {
      repo: "https://github.com/RoyOfficial233/blog",
      description: "RoyOfficial 的个人博客",
      image: "https://example.com/project-cover.png",
    },
    { repo: "https://github.com/vuejs/core" },
  ],
}
```

组件会自动完成以下工作：

- 根据仓库地址读取仓库名称、主要语言和更新时间。
- `description` 可选，填写后优先使用手动简介。
- 请求仓库的 README 文件。
- 项目图标默认使用项目所有者的 GitHub 头像。
- `image` 可选，填写后使用自定义项目图片替代所有者头像。
- `noImage` 可选，设置为 `true` 后不显示任何项目图片。
- 未填写 `description` 时，依次使用 README 摘要、GitHub 仓库简介。
- 按 `projects` 数组中的顺序显示项目。

支持的仓库地址格式：

```text
https://github.com/用户名/仓库名
https://github.com/用户名/仓库名.git
```

注意事项：

- 仓库必须是公开仓库，GitHub API 才能在浏览器端读取。
- 项目卡片最多显示当前屏幕一行，桌面端最多 3 个，移动端显示 1 个。这是 Miracle 原主题的设计。
- 组件使用浏览器 `localStorage` 缓存项目数据 1 小时，缓存会自动绑定当前仓库地址列表。修改项目地址后会自动重新请求；如果仍显示旧内容，可以打开浏览器控制台执行：

```js
localStorage.removeItem("manual_github_projects_cache")
localStorage.removeItem("manual_github_projects_cache_time")
```

- GitHub API 有未登录请求限制。项目数量较多或访问频繁时可能遇到限流；减少项目数量、等待一段时间后再访问即可。
- README 中的相对图片路径会自动按仓库默认分支转换为 `raw.githubusercontent.com` 地址。如果图片使用特殊路径或需要权限，建议在 README 中使用完整 HTTPS 图片地址。
- 如果想使用项目封面图片，需要将图片地址填写到项目的 `image` 字段；不填写时项目卡片默认显示项目所有者头像。

如果项目不需要图片，配置 `noImage: true`：

```ts
{
  repo: "https://github.com/RoyOfficial233/consilium",
  description: "一个计划管理工具。",
  noImage: true,
}
```

`noImage` 的优先级最高。即使同时填写了 `image`，只要 `noImage` 是 `true`，项目卡片也不会显示图片区域。

如果只想显示项目而不显示首页模块以外的内容，确保：

```ts
homePage: {
  modules: {
    projects: true,
    recentPosts: false,
    musics: false,
    friends: false,
  },
}
```

## 6. 修改顶部导航

导航配置同样位于 `config.ts` 的 `nav`：

```ts
nav: [
  { text: languageFile.dashboard, link: "/" },
  { text: "博客", link: "/archives" },
  { text: languageFile.about, link: "/about" },
]
```

添加导航项时，`link` 对应 `src/` 中的页面路径。例如 `src/moments.md` 对应 `/moments`。删除某个导航项只需要从数组中删除对应对象，不会删除页面文件。

## 7. 修改关于页面和联系方式

关于页的介绍、标签、待办事项和联系方式位于 `config.ts` 的 `about`：

```ts
about: {
  desc: "你的个人介绍",
  contacts: [
    {
      icon: "ph:envelope-duotone",
      platform: "Email",
      account: "you@example.com",
      link: "mailto:you@example.com",
    },
  ],
}
```

联系方式只保留你需要的对象即可。`icon` 使用 Iconify 名称，`link` 是点击后打开的地址。

## 8. 本地运行和发布

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产文件
pnpm build

# 本地预览构建结果
pnpm preview
```

生产文件会生成在 `.vitepress/dist/`。可以部署到 Vercel、Netlify、GitHub Pages 或自己的 Nginx 服务器。

每次修改文章或配置后，先执行 `pnpm build`，确认构建成功后再部署。若页面仍显示旧内容，清理浏览器缓存或重启开发服务器。

## 9. 常见问题

### 修改配置后没有生效

停止开发服务器后重新执行 `pnpm dev`。如果仍然没有生效，删除 `.vitepress/cache` 后再次启动。

### 技术栈图标不显示

检查 `icon` 是否是 Devicon 中存在的目录名。名称不是显示名称，例如 `Vue.js` 的图标值应为 `vuejs`，`JavaScript` 的图标值应为 `javascript`。

### 文章没有出现在归档页

确认文件位于 `src/posts/`，后缀是 `.md`，Frontmatter 使用 `---` 包裹，并且至少填写了 `title` 和 `date`。

## 10. ICP 备案号和页脚

页脚配置位于根目录的 `config.ts`，与站点名称配置处于同一个文件：

```ts
footer: {
  enabled: true,
  copyright: "RoyOfficial 保留所有权利",
  icp: "粤ICP备XXXXXXXX号",
  icpLink: "https://beian.miit.gov.cn/",
  police: "",
  policeLink: "",
},
```

配置说明：

- `enabled`：是否显示整个页脚。设置为 `false` 后页脚不会渲染。
- `copyright`：版权文字，不需要手动填写年份，年份会自动使用当前年份。
- `icp`：工信部 ICP 备案号。将示例的 `粤ICP备XXXXXXXX号` 替换成你真实的备案号。
- `icpLink`：ICP 备案查询地址，通常保持为 `https://beian.miit.gov.cn/`。
- `police`：可选的公安备案号。没有公安备案时保持空字符串。
- `policeLink`：公安备案号对应的查询地址。`police` 为空时不会显示该链接。

示例：

```ts
footer: {
  enabled: true,
  copyright: "RoyOfficial 保留所有权利",
  icp: "粤ICP备12345678号",
  icpLink: "https://beian.miit.gov.cn/",
  police: "粤公网安备44030002000001号",
  policeLink: "https://www.beian.gov.cn/",
},
```

修改后执行 `pnpm build`，然后查看任意内容页底部。首页的 `footer: false` Frontmatter 可能会隐藏默认页脚；如果首页需要显示页脚，请检查对应 Markdown 文件并移除这一行。备案号必须使用真实、已审核通过的备案信息，不能长期保留示例编号。

## 11. Friends 友链页

## 9. Friends 友链页

友链页面地址是 `/friends`，页面文件是 `src/friends.md`。友链数据放在 `public/data/friends/`，每个友链使用一个 JSON 文件。

新建 `public/data/friends/example.json`：

```json
{
  "title": "示例博客",
  "link": "https://example.com",
  "desc": "这是博客简介",
  "img": "https://example.com/avatar.png",
  "folder": "Blogs"
}
```

- `title`：友链名称。
- `link`：友链网址。
- `desc`：友链描述。
- `img`：友链头像。
- `folder`：分组名称，相同分组会显示在一起。

删除 JSON 文件即可删除友链。`config.ts` 中的 `features.allowWorkflowAddFriendLink` 只用于 Miracle 的 GitHub 自动添加友链工作流，不需要自动审核时可以改为 `false`。

## 12. Moments 动态页

动态页面地址是 `/moments`，数据目录是 `public/data/moments/`。一条动态对应一个 Markdown 文件，例如 `public/data/moments/2026-08-28_1200.md`：

```md
---
date: 2026-08-28
time: 12:00
image: https://example.com/photo.jpg
---

今天完成了博客配置。
```

- `date`：动态日期，格式为 `YYYY-MM-DD`。
- `time`：动态时间，格式为 `HH:mm`。
- `image`：可选图片地址。
- `negative`：可选，设置为 `true` 后会作为隐藏/负面动态处理。

动态会按照日期和时间倒序显示。首页的 `lastMoment: true` 会展示最新一条动态；只想保留独立动态页时可将其改为 `false`。

## 13. Timeline 时间线页

时间线页面地址是 `/timeline`。它直接读取 `public/data/moments/` 中的所有动态，因此添加时间线内容的方法与 Moments 完全相同，不需要再维护第二份数据。

建议给每条动态填写准确的 `date` 和 `time`。如果时间缺失，排序可能不符合预期。修改动态文件后重启开发服务器，即可同时在 `/moments` 和 `/timeline` 查看结果。

## 14. About 关于页

关于页面地址是 `/about`，页面文件是 `src/about.md`，具体资料配置在根目录 `config.ts` 的 `about`：

```ts
about: {
  desc: "RoyOfficial 的个人介绍",
  tags: [
    {
      icon: "ph:map-pin-duotone",
      title: "所在地",
      content: "China",
    },
  ],
  todo: [
    { complete: true, text: "完成博客搭建" },
    { complete: false, text: "持续写作" },
  ],
  schedule: {
    enabled: false,
  },
}
```

- `desc`：关于页简介。
- `tags`：个人信息卡片，可添加多个标签。
- `todo`：计划清单，`complete` 控制是否显示完成状态。
- `schedule.enabled`：是否显示课程/日程表；个人博客通常建议关闭。
- `contacts`：联系方式，配置方式见前文第 6 节。

## 15. Musics 音乐页

音乐页面地址是 `/musics`。音乐数据来自网易云歌单，配置位于 `config.ts` 的 `netease`：

```ts
netease: {
  musicList: "你的网易云歌单 ID",
  metingApi: "https://api.qijieya.cn/meting",
  autoplay: false,
  showButtons: true,
  showTranslation: true,
  showRoman: false,
  musicSlice: 0,
}
```

获取歌单 ID 的方法：打开网易云音乐歌单页面，浏览器地址中 `playlist?id=` 后面的数字就是歌单 ID。将 `autoplay` 设置为 `false` 更符合浏览器默认策略，也不会在用户打开页面时自动播放声音。

当前首页音乐模块已关闭，但 `/musics` 页面仍可通过导航或直接地址访问。若不需要音乐功能，可以从 `nav` 删除 `/musics` 入口，并保留页面文件以便以后恢复。

## 16. Photos 图库页

图库页面地址是 `/photos`。图片放在 `public/data/photos/` 下，推荐按相册分类创建子目录：

```text
public/data/photos/
├── daily/
│   ├── park.jpg
│   └── sunset.png
└── travel/
    └── city.jpg
```

主题会自动扫描图片并以目录名作为分类。支持 `.jpg`、`.jpeg`、`.png`、`.tiff`、`.tif` 和 `.gif`。`config.ts` 中的 `photo` 配置可以控制 EXIF 信息：

```ts
photo: {
  exifGps: false,
  abbreviatedMetadata: ["Model", "ISO", "ExposureTime", "ApertureValue"],
  detailMetadata: ["Model", "ISO", "ExposureTime", "ApertureValue", "GPS"],
}
```

如果照片包含 GPS 信息，建议将 `exifGps` 设置为 `false`，避免公开位置信息。添加或删除照片后重新构建即可更新图库。

## 17. Whiteboard 留言板

留言板页面地址是 `/whiteboard`，页面文件是 `src/whiteboard.md`。它使用评论系统，配置位于 `config.ts` 的 `comments`：

```ts
comments: {
  enabled: true,
  type: "giscus",
  giscus: {
    repo: "用户名/仓库名",
    repoId: "从 giscus.app 获取",
    category: "Announcements",
    categoryId: "从 giscus.app 获取",
    themes: {
      light: "https://giscus.catppuccin.com/themes/latte.css",
      dark: "https://giscus.catppuccin.com/themes/mocha.css",
    },
  },
}
```

配置 Giscus 的步骤：

1. 将博客仓库设置为公开，并在仓库中启用 Discussions。
2. 打开 [giscus.app](https://giscus.app)，安装或授权 Giscus GitHub App。
3. 输入仓库名称，选择 Discussions 分类和映射方式。
4. 复制页面生成的 `repoId`、`categoryId` 等配置到 `config.ts`。
5. 执行 `pnpm build`，打开 `/whiteboard` 测试留言框。

如果不需要留言板，将 `enabled` 改为 `false`，并从 `nav` 删除 `/whiteboard`。

### 已发布留言不显示

Giscus 的留言不是存储在 VitePress 项目里，而是存储在 GitHub Discussions。要显示已有留言，以下配置必须来自同一个 Giscus 仓库和同一个 Discussion 分类：

```ts
giscus: {
  repo: "RoyOfficial233/blog",
  repoId: "正确的 repoId",
  category: "Announcements",
  categoryId: "正确的 categoryId",
}
```

`category` 是分类名称，`categoryId` 是该分类的 ID，两者必须匹配。不要只复制 `categoryId` 而保留旧的分类名称。建议重新打开 [giscus.app](https://giscus.app)，输入当前仓库后复制完整配置。

还需要检查：

- GitHub 仓库是公开仓库。
- 仓库已经启用 Discussions。
- Giscus GitHub App 已安装到该仓库。
- `/whiteboard` 页面能正常加载 `https://giscus.app/client.js`。
- 旧留言是通过同一个 `mapping` 规则创建的。本主题使用 `pathname`，所以 `/whiteboard`、`/` 和 `/about` 会对应不同的讨论。

如果留言原来是在首页发布的，而现在想在 `/whiteboard` 显示，它们不会因为页面移动自动合并。可以在 giscus 的配置中选择原来的映射规则，或在同一个 Discussion 下继续查看旧留言。修改配置后请执行 `pnpm build` 并强制刷新浏览器。

## 18. Archives 文章归档页

文章归档页面地址是 `/archives`，页面文件是 `src/archives.md`，文章目录是 `src/posts/`。归档组件会自动读取文章 Frontmatter，并按年份、分类和标签整理。

文章示例：

```md
---
title: 使用 VitePress 搭建博客
description: 记录从安装到部署的完整过程。
published: 2026-08-28
updated: 2026-08-29
category: 前端
tags: [VitePress, Vue]
---

# 使用 VitePress 搭建博客
```

- `published`：发布时间，会显示在文章头部。
- `updated`：最后更新时间，可选。
- `category`：分类，可点击筛选。
- `tags`：标签，可用于标签页筛选。
- `image`：可选文章头图。
- `origin`：可选原文链接。

归档页不需要手动添加文章链接。新建、修改或删除 `src/posts/*.md` 后，主题会自动重新生成归档内容。

## 19. 修改页面显示名称

页面标题的默认翻译在 `.vitepress/theme/lang/index.ts`。如果希望统一修改导航文字，可以直接修改 `config.ts` 的 `nav`，例如：

```ts
nav: [
  { text: "主页", link: "/" },
  { text: "博客归档", link: "/archives" },
  { text: "动态", link: "/moments" },
  { text: "时间线", link: "/timeline" },
  { text: "关于我", link: "/about" },
  { text: "图库", link: "/photos" },
  { text: "留言板", link: "/whiteboard" },
]
```

页面文件名和 URL 不建议随意修改。如果确实需要修改，必须同时更新 `nav` 中的 `link` 和所有指向旧 URL 的文章链接。

## 20. 修改品牌后仍显示旧内容怎么办

品牌相关配置有三处：`config.ts` 的 `informations`、`.vitepress/config.ts` 的 VitePress 配置，以及主题组件读取的 `globalConfig`。本项目已经统一由 `globalConfig.informations` 提供标题、作者、头像和 favicon。

修改后按以下顺序排查：

1. 停止开发服务。
2. 删除 `.vitepress/cache` 和 `.vitepress/dist`。
3. 重新执行 `pnpm dev` 或 `pnpm build`。
4. 浏览器执行强制刷新，Windows 使用 `Ctrl + F5`，macOS 使用 `Command + Shift + R`。
5. 如果只有浏览器标签页图标没有更新，打开无痕窗口测试；favicon 可能被浏览器单独缓存。
