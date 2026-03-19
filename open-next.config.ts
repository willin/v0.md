import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
	// 使用默认的 Cloudflare 配置
	// 博客 MDX 文件会自动被 Next.js 构建系统处理并打包进 Worker bundle
});
