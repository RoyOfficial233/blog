<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { globalConfig } from "#config";
import PostCard from "../common/postCard.vue";

interface ProjectConfig {
  repo: string;
  description?: string;
  image?: string;
  noImage?: boolean;
}

interface Project {
  link: string;
  title: string;
  description: string;
  image: string;
  language: string;
  updated: string;
}

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref("");
const columnCount = ref(1);
const MIN_COL_WIDTH = 320;
const MAX_COLS = 3;
const CACHE_KEY = "manual_github_projects_cache";
const CACHE_TTL = 60 * 60 * 1000;

const configuredProjects = computed(() =>
  globalConfig.homePage.projects.filter((project) => project.repo.trim()),
);

const cacheKey = computed(
  () => `${CACHE_KEY}:${JSON.stringify(configuredProjects.value)}`,
);

function parseRepositoryUrl(value: string): { owner: string; repo: string; url: string } | null {
  try {
    const url = new URL(value);
    if (url.hostname !== "github.com") return null;
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;
    return {
      owner,
      repo: repo.replace(/\.git$/, ""),
      url: `https://github.com/${owner}/${repo.replace(/\.git$/, "")}`,
    };
  } catch {
    return null;
  }
}

function readmeExcerpt(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/`{3}[\s\S]*?`{3}/g, "")
    .replace(/[#>*_`~\-[\]]/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

async function fetchProject(repoConfig: ProjectConfig): Promise<Project | null> {
  const parsed = parseRepositoryUrl(repoConfig.repo);
  if (!parsed) return null;

  const apiBase = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
  const repoResponse = await fetch(apiBase);
  if (!repoResponse.ok) throw new Error(`无法读取仓库：${parsed.url}`);
  const repo = await repoResponse.json();
  let readme = "";

  try {
    const readmeResponse = await fetch(`${apiBase}/readme`);
    if (readmeResponse.ok) {
      const readmeData = await readmeResponse.json();
      if (readmeData.download_url) {
        const rawResponse = await fetch(readmeData.download_url);
        if (rawResponse.ok) readme = await rawResponse.text();
      }
    }
  } catch {
    // README is optional; repository information can still render.
  }

  return {
    link: parsed.url,
    title: repo.name.replace(/[-_]/g, " "),
    description: repoConfig.description?.trim() || readmeExcerpt(readme) || repo.description || "暂无项目简介",
    image: repoConfig.noImage
      ? ""
      : repoConfig.image?.trim() || repo.owner?.avatar_url || `https://github.com/${parsed.owner}.png?size=256`,
    language: repo.language || "GitHub",
    updated: repo.updated_at || "",
  };
}

async function loadProjects() {
  loading.value = true;
  error.value = "";
  const currentCacheKey = cacheKey.value;
  const cached = localStorage.getItem(currentCacheKey);
  const cachedAt = localStorage.getItem(`${currentCacheKey}_time`);

  if (cached && cachedAt && Date.now() - Number(cachedAt) < CACHE_TTL) {
    projects.value = JSON.parse(cached);
    loading.value = false;
    return;
  }

  try {
    const loaded = await Promise.all(
      configuredProjects.value.map((project) => fetchProject(project)),
    );
    projects.value = loaded.filter((project): project is Project => project !== null);
    if (projects.value.length) {
      localStorage.setItem(currentCacheKey, JSON.stringify(projects.value));
      localStorage.setItem(`${currentCacheKey}_time`, Date.now().toString());
    }
  } catch (loadError: any) {
    if (cached) {
      projects.value = JSON.parse(cached);
    } else {
      error.value = loadError?.message || "项目加载失败，请检查仓库地址。";
    }
  } finally {
    loading.value = false;
  }
}

function computeColumns() {
  const maxByWidth = Math.max(1, Math.floor(window.innerWidth / MIN_COL_WIDTH));
  columnCount.value = Math.min(MAX_COLS, maxByWidth);
}

const visibleProjects = computed(() => projects.value.slice(0, columnCount.value));
const gridStyle = computed(() => ({ gridTemplateColumns: `repeat(${columnCount.value}, 1fr)` }));

onMounted(() => {
  loadProjects();
  computeColumns();
  window.addEventListener("resize", computeColumns);
});

onBeforeUnmount(() => window.removeEventListener("resize", computeColumns));
</script>

<template>
  <div v-if="loading"></div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="!projects.length">请先在 config.ts 的 homePage.projects 中添加仓库地址。</div>
  <div v-else class="posts-grid" :style="gridStyle">
    <div v-for="project in visibleProjects" :key="project.link" class="post-card">
      <PostCard
        :url="project.link"
        :title="project.title"
        :description="project.description"
        :category="project.language"
        :origin-date="project.updated"
        :image="project.image"
        type="project"
      />
    </div>
  </div>
</template>

<style scoped>
.posts-grid {
  display: grid;
  gap: var(--vp-gap);
}
</style>
