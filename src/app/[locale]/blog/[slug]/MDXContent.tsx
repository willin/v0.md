'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXContentProps {
  content: string;
}

// 平滑滚动到锚点
const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // 如果是站内锚点链接
  if (href.startsWith('#')) {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // 更新 URL 但不滚动
      window.history.pushState(null, '', href);
    }
  }
  // 外部链接不处理，使用默认行为
};

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        {/* Description will be added separately in the parent */}
      </p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-4xl font-bold mt-0 mb-8 text-gray-900 dark:text-gray-100" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-3xl font-bold mt-16 mb-8 text-gray-900 dark:text-gray-100 scroll-mt-24" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-2xl font-semibold mt-12 mb-6 text-gray-900 dark:text-gray-100 scroll-mt-24" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100" />
          ),
          h5: ({ node, ...props }) => (
            <h5 {...props} className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100" />
          ),
          h6: ({ node, ...props }) => (
            <h6 {...props} className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100" />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="mb-6 pl-6 list-disc" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="mb-6 pl-6 list-decimal" />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="mb-2 text-gray-700 dark:text-gray-300" />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
            />
          ),
          code: ({ node, inline, ...props }: { node?: any; inline?: boolean; className?: string }) =>
            inline ? (
              <code
                {...props}
                className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
              />
            ) : (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code {...props} className="bg-transparent p-0" />
              </pre>
            ),
          a: ({ node, href, ...props }) => (
            <a
              {...props}
              href={href}
              onClick={(e) => scrollToAnchor(e, href || '')}
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
            />
          ),
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="rounded-lg my-8 max-w-full h-auto"
              loading="lazy"
            />
          ),
          hr: ({ node, ...props }) => (
            <hr {...props} className="border-gray-300 dark:border-gray-700 my-12" />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table {...props} className="w-full border-collapse" />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold"
            />
          ),
          td: ({ node, ...props }) => (
            <td
              {...props}
              className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
