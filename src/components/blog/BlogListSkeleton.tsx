/**
 * 博客列表页骨架屏
 */
export function BlogListSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 标题骨架 */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      {/* 文章卡片骨架 - 显示 5 个 */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
        >
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
      ))}
    </div>
  );
}
