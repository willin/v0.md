# GitHub Actions 部署配置指南

## 1. 获取 Cloudflare API Token

### 步骤
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右上角头像 → **My Profile** → **API Tokens**
3. 点击 **Create Token**
4. 选择 **Edit Cloudflare Workers** 模板
5. 配置权限:
   - **Account Resources**: `Edit`
   - **Zone Resources**: `Edit` (如果需要配置自定义域名)
6. 点击 **Continue to summary**
7. 点击 **Create Token**
8. **立即复制 Token**（只显示一次！）

### 所需权限
- `Cloudflare Workers:Edit` - 部署 Worker
- `Cloudflare Workers Secrets:Edit` - 管理 Secrets
- `Zone:Edit` - 配置自定义域名（可选）

## 2. 获取 Account ID

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在右侧边栏找到你的账户名称
3. 点击账户名称进入 **Account Home**
4. 在 URL 中可以看到 Account ID: `https://dash.cloudflare.com/<ACCOUNT_ID>`
5. 或者在 API Token 页面也会显示 Account ID

## 3. 配置 GitHub Secrets

1. 打开你的 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下 Secrets:

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | 第 1 步创建的 API Token |
| `CLOUDFLARE_ACCOUNT_ID` | 第 2 步获取的 Account ID |

## 4. 自定义域名配置

### 在 wrangler.jsonc 中配置 routes
```jsonc
{
  "name": "v0",
  "routes": [
    {
      "pattern": "v0.md/*",
      "zone_name": "v0.md"
    },
    {
      "pattern": "www.v0.md/*",
      "zone_name": "v0.md"
    }
  ]
}
```

### 在 Cloudflare Dashboard 中绑定域名
1. 访问 [Workers & Pages Dashboard](https://dash.cloudflare.com/?to=/:account/workers)
2. 选择你的 Worker (`v0`)
3. 点击 **Triggers** 标签
4. 点击 **Add Custom Domain**
5. 输入你的域名 (例如 `v0.md`)
6. 点击 **Add Domain**

## 5. 测试部署

1. 推送代码到 `main` 分支
2. 访问 GitHub Actions 页面查看部署进度
3. 部署完成后访问你的域名验证

## 6. 手动触发部署

可以在 GitHub Actions 页面手动触发部署：
1. 访问 **Actions** → **Deploy to Cloudflare Workers**
2. 点击 **Run workflow**
3. 选择分支（默认 `main`）
4. 点击 **Run workflow**
