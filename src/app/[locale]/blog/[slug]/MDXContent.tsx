'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkAlerts from 'remark-alerts';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/atom-one-dark.css';
import Alert from '@/components/mdx/Alert';
import Ruby from '@/components/mdx/Ruby';
import Mermaid from '@/components/mdx/Mermaid';

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
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">
        {/* Description will be added separately in the parent */}
      </p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkAlerts]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          rehypeHighlight,
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
          p: ({ node, children, ...props }) => {
            // 如果 <p> 标签内只包含 <pre>，则不渲染 <p> 标签，直接返回内容
            // 这是为了避免 <pre> 不能是 <p> 的后代的 HTML 规范问题
            if (children && typeof children === 'object' && children !== null) {
              const childrenArray = Array.isArray(children) ? children : [children];
              const hasPre = childrenArray.some(child =>
                typeof child === 'object' && child !== null &&
                'type' in child && child.type === 'pre'
              );
              if (hasPre) {
                return <>{children}</>;
              }
            }
            return (
              <p {...props} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {children}
              </p>
            );
          },
          pre: ({ node, children, ...props }) => {
            // Shiki 会渲染自己的 pre 标签，保留其样式
            return (
              <div className="my-6">
                {children}
              </div>
            );
          },
          ul: ({ node, children, ...props }) => (
            <ul {...props} className="mb-6 pl-6 list-disc">
              {children}
            </ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol {...props} className="mb-6 pl-6 list-decimal">
              {children}
            </ol>
          ),
          li: ({ node, children, ...props }) => (
            <li {...props} className="mb-2 text-gray-700 dark:text-gray-300">
              {children}
            </li>
          ),
          blockquote: ({ node, children, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
            >
              {children}
            </blockquote>
          ),
          code: ({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode }) => {
            const match = /language-(\w+)/.exec(className || '');
            // Handle Mermaid diagrams
            if (match && match[1] === 'mermaid') {
              return <Mermaid code={String(children)} />;
            }
            return inline ? (
              <code
                {...props}
                className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
              >
                {children}
              </code>
            ) : (
              // Shiki 会渲染 code 标签，保留其样式
              <code {...props} className="block">
                {children}
              </code>
            );
          },
          sup: ({ node, ...props }) => (
            <sup {...props} className="text-xs align-super font-normal" />
          ),
          sub: ({ node, ...props }) => (
            <sub {...props} className="text-xs align-sub font-normal" />
          ),
          mark: ({ node, ...props }) => (
            <mark {...props} className="bg-yellow-200 dark:bg-yellow-800/50 px-1 py-0.5 rounded text-gray-900 dark:text-gray-100" />
          ),
          ruby: ({ node, children, ...props }) => (
            <ruby {...props} className="inline-flex flex-col items-center">
              {children}
            </ruby>
          ),
          rt: ({ node, ...props }) => (
            <rt {...props} className="text-xs text-gray-500 dark:text-gray-400 text-center leading-none" />
          ),
          rp: ({ node, ...props }) => (
            <rp {...props} className="hidden" />
          ),
          s: ({ node, ...props }) => (
            <s {...props} className="line-through text-gray-500 dark:text-gray-400" />
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
          div: ({ node, className, children, ...props }: { node?: any; className?: string; children?: React.ReactNode }) => {
            // Handle GitHub-style alerts from remark-alerts
            if (className?.includes('markdown-alert')) {
              const alertType = className.split(' ').find(c => c.startsWith('markdown-alert-'))?.replace('markdown-alert-', '') as 'note' | 'tip' | 'warning' | 'caution' | 'important' || 'note';
              // Extract content from children, skipping the title paragraph from remark-alerts
              const contentArray = React.Children.toArray(children);
              // Find and skip the first child (title paragraph from remark-alerts which contains "[!NOTE]" etc.)
              const content = contentArray.slice(1);
              return <Alert type={alertType}>{content}</Alert>;
            }
            return (
              <div {...props} className={className}>
                {children}
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
