/**
 * 博客列表页骨架屏
 * 匹配实际 BlogList 组件结构：左侧文章列表 + 右侧边栏
 */
export function BlogListSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-4 py-8">
      {/* 主内容区 - 文章列表 */}
      <div className="flex-1 min-w-0">
        {/* 桌面端：双列布局 */}
        <div className="hidden md:flex gap-6">
          {/* 左列 */}
          <div className="flex-1 flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <BlogCardSkeleton key={`left-${i}`} />
            ))}
          </div>
          {/* 右列 */}
          <div className="flex-1 flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <BlogCardSkeleton key={`right-${i}`} />
            ))}
          </div>
        </div>

        {/* 移动端：单列布局 */}
        <div className="md:hidden flex flex-col gap-6">
          {[...Array(4)].map((_, i) => (
            <BlogCardSkeleton key={`mobile-${i}`} />
          ))}
        </div>
      </div>

      {/* 侧边栏骨架 */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
        {/* 作者信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
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
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* 统计信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* 分类列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            ))}
          </div>
        </div>

        {/* 标签云 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

/**
 * 单个博客卡片骨架
 */
function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="flex flex-col md:flex-row">
        {/* 封面图骨架 */}
        <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 dark:bg-gray-700"></div>

        {/* 内容区域骨架 */}
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>

          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>

          <div className="flex items-center gap-4">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
