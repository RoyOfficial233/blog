import { data as momentList } from "#theme/data/moments.data";
import { data as friendList } from "#theme/data/friends.data";
import { data as iconList } from "#theme/data/iconList";
import { data as photoList } from "#theme/data/photos.data";
import type { GlobalConfig } from "#config.types";

// ----------------------------------------------------------------------------
// Internationalization (i18n)
// ----------------------------------------------------------------------------
import { zh, en } from "#theme/lang/index";

const languageMap: Record<string, any> = { zh, en };

// ----------------------------------------------------------------------------
// Language configuration
// ----------------------------------------------------------------------------
// Default site language. Change to "zh" to use Chinese.
// Supported values: "zh" | "en"
const defaultLanguage = "zh";

// Automatically selects the language file based on `defaultLanguage`.
// Do not edit this line.
const languageFile = languageMap[defaultLanguage] || en;

// ============================================================================
// Global site configuration
// ============================================================================
export const globalConfig: GlobalConfig = {
  // --------------------------------------------------------------------------
  // Basic site information
  // --------------------------------------------------------------------------
  informations: {
    title: "Roy's Blog", // Site title shown in the browser tab and header.
    description: "A simple blog.", // Short site description / tagline.
    author: "RoyOfficial", // Site author name.
    favicon: "https://cdn.royofficial.cn/royofficial.png", // Site favicon URL.
    avatar: "https://cdn.royofficial.cn/royofficial.png", // Site avatar URL.
    url: "https://www.royofficial.cn", // Main site URL without trailing slash.
    dateCreated: "2026-08-27", // Site creation date (YYYY-MM-DD).
    github: {
      name: "RoyOfficial233", // GitHub username.
      repo: "blog", // GitHub repository name.
    },
  },

  // --------------------------------------------------------------------------
  // Footer and ICP filing
  // --------------------------------------------------------------------------
  footer: {
    enabled: true,
    copyright: " RoyOfficial. All rights reserved.", // Footer copyright text.
    // Replace these placeholders with the filing numbers issued for your site.
    icp: "沪ICP备2025140514号-2",
    icpLink: "https://beian.miit.gov.cn/",
    // Optional public security filing. Leave both fields empty if not applicable.
    police: "",
    policeLink: "",
  },

  // --------------------------------------------------------------------------
  // Feature toggles
  // --------------------------------------------------------------------------
  features: {
    deepHideNegative: true, // Press and hold "s" for 1 second to reveal the negative button.
    multiSelect: false, // Allow selecting multiple tags/categories/artists to combine their content.
    // If true, friend links can be added automatically from GitHub issues.
    // ! Requires a GitHub environment named "friend-link-review" with yourself as reviewer.
    allowWorkflowAddFriendLink: true,
  },

  // --------------------------------------------------------------------------
  // Theme styles
  // --------------------------------------------------------------------------
  styles: {
    color: {
      hue: 280, // Brand hue (0-360) used to generate the color palette.
      monochrome: false, // If true, the site uses a monochrome color scheme.
      globalHue: false, // If true, the hue applies to all colors. If false, only the brand hue changes.
      rainbow: {
        enabled: false, // If true, the hue cycles automatically.
        speed: 10, // Hue change speed: hue = (currentHue + speed) % 360.
      },
    },
    visual: {
      transition: 10, // Transition duration in hundredths of a second (10 = 0.1s).
      gap: 12, // Gap between cards/elements in pixels.
      radius: 26, // Border radius for cards and elements in pixels.
      enableCardTitle: true, // Show titles on custom cards (warning, danger, etc.).
      transparent: false, // Use transparent backgrounds for year/artist sections.
      uppercase: false, // Display category names in uppercase.
      mono: false, // Use a monospace font for titles.
      pageAnimation: {
        enabled: true, // Enable page transition animations.
        time: 1.2, // Animation duration in seconds.
        translateY: 20, //  Vertical translation distance in pixels.
        blur: 3, // Blur intensity in pixels.
      },
      card: {
        type: "column", // Layout direction for music and friend cards: "column" | "row".
        hover: {
          enabled: true, // Enable hover effects on cards.
          scale: 1.02, // Card scale on hover.
          maxMove: 4, // Maximum card movement (translate) on hover in pixels.
          maxRotate: 1, // Maximum 3D rotation angle on hover (set 0 to disable 3D).
          easing: 0.2, // Easing factor for smooth hover movement.
        },
      },
    },
  },

  // --------------------------------------------------------------------------
  // Friend sorting weights
  // Default weight is 0. Higher weight = displayed lower.
  // --------------------------------------------------------------------------
  friendWeights: {
    // Example: -99, // This friend would appear at the top.
    RoyOfficial: -99,
    friends: -1,
    unable: 0, // This friend will appear at the bottom.
  },

  // --------------------------------------------------------------------------
  // NetEase music settings
  // --------------------------------------------------------------------------
  netease: {
    musicList: "", // NetEase playlist ID.
    metingApi: "", // Meting API endpoint.
    showButtons: true, // If false, music player control buttons are hidden.
    showTranslation: true, // Show translated lyrics.
    showRoman: false, // Show romanized lyrics.
    autoplay: true, // Auto-play music when the page loads.
    visualizer: false, // Show audio visualizer at the bottom of the player.
    musicSlice: 0, // Max number of singers to display in the music list (0 = all).
    QQMusicLyricsSource: true, // Use QQ Music API as an extra lyrics source. Increases word-by-word lyric coverage but may occasionally match the wrong song.
  },

  // --------------------------------------------------------------------------
  // Photo settings
  // --------------------------------------------------------------------------
  photo: {
    exifGps: true, // Show GPS data in photo EXIF metadata if available.
    abbreviatedMetadata: ["Model", "ISO", "ExposureTime", "ApertureValue"], // Metadata shown in abbreviated view.
    detailMetadata: [
      "Model",
      "ISO",
      "ExposureTime",
      "ApertureValue",
      "FocalLengthIn35mmFormat",
      "GPS",
    ], // Metadata shown in detail view.
    convertPhotos: false, // Convert photos to WebP/AVIF on upload/processing.
    convertPhotosFormat: "webp", // Target conversion format: "webp" | "avif".
    convertPhotosQuality: 80, // Conversion quality (0-100).
  },

  // --------------------------------------------------------------------------
  // Homepage settings
  // --------------------------------------------------------------------------
  homePage: {
    banner: {
      type: "text", // Banner type: "text" | "image".
      image: {
        url: "https://i.mji.rip/2026/05/26/b15f373cb4e715b252bb9aa3f5687904.jpeg", // Banner image URL. Only used when type is "image".
        height: "70vh", // Banner height. Only used when type is "image", e.g. "65vh".
      },
    },
    modules: {
      pictures: false, // Show pictures module.
      lastMoment: true, // Show latest moment module.
      recentPosts: true, // Show recent posts module.
      projects: true, // Show projects module (may be slow to load).
      musics: false, // Show music list module.
      techStack: true, // Show tech stack module.
      friends: true, // Show friends module.
    },

    // Tech stack icons. Icon names come from devicons:
    // https://cdn.jsdelivr.us/gh/devicons/devicon/icons/${stack.icon}/${stack.icon}-original.svg
    // Projects are loaded only from these repositories, in this order.
    projects: [
      { repo: "https://github.com/SakuraOpenSource/levis", description: "一个轻量、简洁的业务管理系统。", noImage: true},
      { repo: "https://github.com/SakuraOpenSource/virtualis", description: "一个虚拟化管理系统。", noImage: true},
      { repo: "https://github.com/RoyOfficial233/consilium", description: "一个计划管理工具。", noImage: true}
    ],
    stacks: [
      { name: "Go", icon: "go" },
      { name: "Vue.js", icon: "vuejs" },
      { name: "PNPM", icon: "pnpm" },
      { name: "NPM", icon: "npm" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Git", icon: "git" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "Windows", icon: "windows11" },
      { name: "macOS", icon: "apple" },
      { name: "Linux", icon: "linux" },
    ],
  },

  // --------------------------------------------------------------------------
  // Navigation menu
  // --------------------------------------------------------------------------
  nav: [
    { text: languageFile.dashboard, link: "/" },
    { text: "文章", link: "/archives" },
    { text: languageFile.moments, link: "/moments" },
    { text: languageFile.about, link: "/about" },
    { text: languageFile.whiteboard, link: "/whiteboard" }

  ],

  // --------------------------------------------------------------------------
  // About page
  // --------------------------------------------------------------------------
  about: {
    desc: "我喜欢你", // Short personal description.
    tags: [
      {
        icon: "ph:city-duotone",
        title: "位置",
        content: "上海 · 闵行",
      },
      {
        icon: "ph:ruler-duotone",
        title: "身高",
        content: "162 CM (存疑)",
      },
    ],
    todo: [
      { complete: true, text: "第 N 次搭建博客" },
      { complete: true, text: "买一台新电脑（不是自己买的也算吧）" },
      { complete: false, text: "完成 Levis 与 Virtualis 的开发" },
    ],
    // Contact methods. `icon` uses iconify icon names.
    // Fill in the platforms and accounts you want to show.
    contacts: [
      {
        icon: "mingcute:qq-fill", // Platform icon (image).
        platform: "QQ", // Platform name.
        account: "3398508689", // Your account on that platform.
      },
      {
        icon: "ri:qq-line", // Platform icon (image).
        platform: "Falling Sakura #01", // Platform name.
        account: "428547306", // Your account on that platform.
      },

      {
        icon: "ph:github-logo-duotone", // Platform icon (image).
        platform: "GitHub", // Platform name.
        account: "RoyOfficial233", // Your account on that platform.
        link: "https://github.com/RoyOfficial233", // Optional: link to the profile.
      },
      {
        icon: "ph:television-duotone",
        platform: "BiliBili",
         account: "RoyOfficial",
        link: "https://space.bilibili.com/1653312994", // Optional: link to the profile.
      },
      // More examples (delete or edit as you like):
      {
        icon: "ph:envelope-duotone",
        platform: "Email",
        account: "royofficial@royofficial.com",
        link: "mailto:royofficial@royofficial.com", // Optional: link to the profile.
      },
      // {
      //   icon: "ph:telegram-logo-duotone",
      //   platform: "Telegram",
      //   account: "@yourname",
      // },
    ],
    schedule: {
      enabled: false,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  },

  // --------------------------------------------------------------------------
  // Comments
  // --------------------------------------------------------------------------
  comments: {
    enabled: true,
    type: "giscus", // Comment system: "giscus" | "twikoo".
    giscus: {
      repo: "RoyOfficial233/blog",
      repoId: "R_kgDOUGzE3g",
      // Category and categoryId must come from the SAME giscus.app selection.
      // These comments live in "General" (DIC_kwDOUGzE3s4DEXNC).
      // "Announcements" would be DIC_kwDOUGzE3s4DEXNB — only switch both together.
      category: "General",
      categoryId: "DIC_kwDOUGzE3s4DEXNC",
      themes: {
        light: "https://giscus.catppuccin.com/themes/latte.css",
        dark: "https://giscus.catppuccin.com/themes/mocha.css",
      },
    },
    twikoo: {
      env: "https://twikoo.qwq.blue", // Twikoo server URL.
    },
  },

  // --------------------------------------------------------------------------
  // Waterfall layout
  // --------------------------------------------------------------------------
  waterfall: {
    oneColumnMax: 700, // Max viewport width (px) for one-column layout.
    twoColumnMax: 1050, // Max viewport width (px) for two-column layout.
  },

  // --------------------------------------------------------------------------
  // Auto-imported data — DO NOT EDIT
  // --------------------------------------------------------------------------
  friends: friendList,
  moments: momentList,
  photos: photoList,
  lang: languageFile,
  icon: iconList,
};
