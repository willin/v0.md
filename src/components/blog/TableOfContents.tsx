'use client';

import { useEffect, useState, useRef } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number; // 2 = H2, 3 = H3, 4 = H4
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [expandedHeadings, setExpandedHeadings] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 等待内容渲染
    const content = document.getElementById('post-content') as HTMLElement;
    if (!content) return;

    contentRef.current = content;

    // 提取所有标题 (只取 H2, H3, H4)
    const headingElements = content.querySelectorAll('h2, h3, h4');
    const headingList: Heading[] = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setHeadings(headingList);

    // 默认展开第一个标题及其子标题
    if (headingList.length > 0) {
      const firstH2 = headingList.find(h => h.level === 2);
      if (firstH2) {
        setExpandedHeadings(new Set([firstH2.id]));
      }
    }

    // 监听滚动高亮当前标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  // 更新展开状态：当活跃标题变化时，展开其父级 H2（手风琴模式：只展开一个章节）
  useEffect(() => {
    if (!activeId) return;

    const activeHeading = headings.find(h => h.id === activeId);
    if (!activeHeading) return;

    // 如果是 H2，直接设置为唯一展开的项
    if (activeHeading.level === 2) {
      setExpandedHeadings(new Set([activeId]));
    } else {
      // 如果是 H3 或 H4，找到其前面的最近一个 H2 并展开（同时折叠其他）
      const currentIndex = headings.findIndex(h => h.id === activeId);
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (headings[i].level === 2) {
          setExpandedHeadings(new Set([headings[i].id]));
          break;
        }
      }
    }
  }, [activeId, headings]);

  const handleClick = (e: React.MouseEvent, heading: Heading) => {
    e.preventDefault();

    // 如果是 H2，切换展开/收起状态（手风琴模式：展开当前，收起其他）
    if (heading.level === 2) {
      setExpandedHeadings(prev => {
        if (prev.has(heading.id)) {
          // 如果已展开，收起所有
          return new Set();
        } else {
          // 展开当前，收起其他（手风琴效果）
          return new Set([heading.id]);
        }
      });
    }

    // 平滑滚动到目标
    const element = document.getElementById(heading.id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (headings.length === 0) {
    return null;
  }

  // 渲染目录项（递归处理子标题）
  const renderHeading = (heading: Heading, index: number) => {
    const isActive = activeId === heading.id;
    const isExpanded = expandedHeadings.has(heading.id);

    // 计算缩进：H2=0, H3=4, H4=8
    const indent = (heading.level - 2) * 1; // rem

    // 检查是否有子标题
    const hasChildren = heading.level === 2 && headings.some(h => {
      const idx = headings.findIndex(item => item.id === heading.id);
      return idx > 0 && headings[idx + 1]?.level > 2 && headings[idx + 1]?.level === 3;
    });

    // 检查是否有 H4 子标题
    const hasSubChildren = heading.level === 3 && headings.some((h, i) => {
      const idx = headings.findIndex(item => item.id === heading.id);
      return idx >= 0 && headings[idx + 1]?.level === 4;
    });

    return (
      <div key={heading.id}>
        <a
          href={`#${heading.id}`}
          onClick={(e) => handleClick(e, heading)}
          className={`block text-sm transition-all duration-200 py-1.5 border-l-2 ${
            heading.level === 2
              ? 'font-medium text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600'
              : heading.level === 3
              ? 'text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              : 'text-gray-600 dark:text-gray-400 border-transparent'
          } ${
            isActive
              ? 'text-blue-600 dark:text-blue-400 border-blue-500 font-semibold'
              : 'hover:text-gray-900 dark:hover:text-gray-100'
          }`}
          style={{ paddingLeft: `${indent + 0.75}rem` }}
        >
          {heading.level === 2 && (hasChildren || hasSubChildren) && (
            <span className="inline-block w-4 text-center mr-1">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          {heading.text}
        </a>
      </div>
    );
  };

  // 过滤并排序目录项
  const renderTableOfContents = () => {
    const items: React.ReactNode[] = [];

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];

      // 只渲染 H2 和已展开的 H2 下的 H3、H4
      if (heading.level === 2) {
        items.push(renderHeading(heading, i));

        // 如果展开，渲染子标题
        if (expandedHeadings.has(heading.id)) {
          let j = i + 1;
          while (j < headings.length && headings[j].level > 2) {
            items.push(renderHeading(headings[j], j));
            j++;
          }
        }
      }
    }

    return items;
  };

  return (
    <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        📑 目录
      </h3>
      <nav className="space-y-1 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {renderTableOfContents()}
      </nav>
    </div>
  );
}
