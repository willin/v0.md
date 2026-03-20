/**
 * 文章详情页骨架屏
 * 匹配实际文章详情页结构：HeaderNav + PostHero + 主内容区 + 侧边栏
 */
export function ArticleDetailSkeleton() {
  return (
    <>
      {/* HeaderNav 骨架 */}
      <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* PostHero 骨架 */}
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse">
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 pb-8">
            <div className="h-4 w-32 bg-gray-400/50 dark:bg-gray-600/50 rounded mb-2"></div>
            <div className="h-10 w-3/4 bg-gray-400/50 dark:bg-gray-600/50 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-400/50 dark:bg-gray-600/50 rounded"></div>
          </div>
        </div>
      </div>

      {/* 主内容区 + 侧边栏 */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 py-8">
        {/* 主内容区 */}
        <article className="flex-1 min-w-0">
          {/* 面包屑导航骨架 */}
          <div className="flex gap-2 mb-6">
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* 文章元信息骨架 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* AI 摘要骨架 */}
          <div className="my-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded"></div>
              <div className="flex-1">
                <div className="h-4 w-20 bg-blue-200 dark:bg-blue-800 rounded mb-2"></div>
                <div className="h-3 w-full bg-blue-100 dark:bg-blue-900/30 rounded mb-1"></div>
                <div className="h-3 w-3/4 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
              </div>
            </div>
          </div>

          {/* 文章内容骨架 */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* 标签区域骨架 */}
          <div className="flex gap-2 mb-8">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* 上一篇/下一篇骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </article>

        {/* 侧边栏骨架 */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
          {/* 作者信息卡片 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* 统计信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>

          {/* 分类列表 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>

          {/* 标签云 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
