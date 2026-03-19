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
import Mermaid from '@/components/mdx/Mermaid';
import CodeBlock from '@/components/mdx/CodeBlock';
import Callout from '@/components/mdx/Callout';
import Stepper from '@/components/mdx/Stepper';

// 扩展 JSX.IntrinsicElements 以支持 HTML ruby 注音元素
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      rb: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      rt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      rp: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      ruby: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      callout: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { emoji?: string; title?: string; color?: 'default' | 'blue' | 'green' | 'red' | 'purple' };
      stepper: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { steps?: string };
      alert: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { type?: 'note' | 'tip' | 'warning' | 'caution' | 'important' };
    }
  }
}

interface MDXContentProps {
  content: string;
}

// 平滑滚动到锚点
const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  }
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
            <h1 {...props} className="text-4xl font-bold mt-0 mb-8 text-gray-900 dark:text-gray-100 no-underline [&>a]:no-underline [&>a]:hover:no-underline" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-3xl font-bold mt-16 mb-8 text-gray-900 dark:text-gray-100 scroll-mt-24 no-underline [&>a]:no-underline [&>a]:hover:no-underline" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-2xl font-semibold mt-12 mb-6 text-gray-900 dark:text-gray-100 scroll-mt-24 no-underline [&>a]:no-underline [&>a]:hover:no-underline" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100 no-underline [&>a]:no-underline [&>a]:hover:no-underline" />
          ),
          h5: ({ node, ...props }) => (
            <h5 {...props} className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100 no-underline [&>a]:no-underline [&>a]:hover:no-underline" />
          ),
          h6: ({ node, ...props }) => (
            <h6 {...props} className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100 no-underline [&>a]:no-underline [&>a]:hover:no-underline" />
          ),
          p: ({ node, children, ...props }) => (
            <p {...props} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              {children}
            </p>
          ),
          pre: ({ node, children, ...props }) => {
            const preProps = props as { className?: string };
            const originalClassName = preProps?.className;
            return (
              <pre {...props} className={`${originalClassName || ''} !bg-transparent`.trim()}>
                {children}
              </pre>
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
            if (match && match[1] === 'mermaid') {
              return <Mermaid code={String(children)} />;
            }
            if (!match) {
              return (
                <code
                  {...props}
                  className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200 break-words"
                >
                  {children}
                </code>
              );
            }
            return (
              <CodeBlock className={className || ''}>
                <code
                  {...props}
                  className={className || ''}
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {children}
                </code>
              </CodeBlock>
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
          ruby: ({ node, children, ...props }) => {
            let rtText = '';
            const processedChildren = React.Children.map(children, (child) => {
              if (typeof child === 'string') {
                return <rb>{child}</rb>;
              }
              if (typeof child === 'object' && child !== null) {
                const childType = (child as any).type;
                const childProps = (child as any).props;
                if (childType === 'rt' || childType === 'rp' || childType === 'rb') {
                  if (childType === 'rt') {
                    rtText = String(childProps?.children || rtText);
                  }
                  return child;
                }
                if (childProps?.node?.tagName === 'rt' || childProps?.node?.tagName === 'rp' || childProps?.node?.tagName === 'rb') {
                  if (childProps?.node?.tagName === 'rt') {
                    rtText = String(childProps?.children || rtText);
                  }
                  return child;
                }
                return <rb>{child}</rb>;
              }
              return child;
            });
            return (
              <ruby {...props}>
                <span className="invisible whitespace-nowrap block h-0" aria-hidden="true">{rtText}</span>
                {processedChildren}
              </ruby>
            );
          },
          rb: ({ node, ...props }) => (
            <rb {...props} className="whitespace-nowrap" />
          ),
          rt: ({ node, children, ...props }) => {
            return (
              <rt {...props} className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {children}
              </rt>
            );
          },
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
            if (className?.includes('markdown-alert')) {
              const alertType = className.split(' ').find(c => c.startsWith('markdown-alert-'))?.replace('markdown-alert-', '') as 'note' | 'tip' | 'warning' | 'caution' | 'important' || 'note';
              const contentArray = React.Children.toArray(children);
              const content = contentArray.filter((child, index) => {
                if (index === 0) return false;
                if (typeof child === 'object' && child !== null && 'type' in child && child.type === 'p') {
                  const pChildren = Array.isArray((child as any).props?.children)
                    ? (child as any).props.children
                    : [(child as any).props?.children];
                  if (pChildren.length === 1 && typeof pChildren[0] === 'object' && pChildren[0]?.type === 'svg') {
                    return false;
                  }
                }
                return true;
              });
              return <Alert type={alertType}>{content}</Alert>;
            }
            return (
              <div {...props} className={className}>
                {children}
              </div>
            );
          },
          // 自定义组件：Callout - 通过 HTML 属性解析
          callout: ({ children, ...props }) => {
            const emoji = props.emoji || '';
            const title = props.title || '';
            const color = (props.color as 'default' | 'blue' | 'green' | 'red' | 'purple') || 'default';
            return (
              <Callout emoji={emoji} title={title} color={color}>
                {children}
              </Callout>
            );
          },
          // 自定义组件：Stepper - 需要特殊处理 steps 属性（JSON 字符串）
          stepper: ({ children, ...props }) => {
            // Stepper 组件需要 steps 属性，这是一个 JSON 字符串
            // 在 Markdown 中无法直接使用，需要特殊处理
            // 暂时返回一个提示
            return (
              <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  ⚠️ Stepper 组件需要在 MDX 文件中使用，Markdown 格式不支持。请参考示例文章了解如何使用。
                </p>
              </div>
            );
          },
          // 自定义组件：Alert - 通过 HTML 属性解析
          alert: ({ children, ...props }) => {
            const type = (props.type as 'note' | 'tip' | 'warning' | 'caution' | 'important') || 'note';
            return (
              <Alert type={type}>
                {children}
              </Alert>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
