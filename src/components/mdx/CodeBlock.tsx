'use client';

import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 监听主题变化
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    // 获取代码文本内容
    const codeText = extractCodeText(children);

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // 从 React 元素中提取纯文本
  const extractCodeText = (element: React.ReactNode): string => {
    if (typeof element === 'string') {
      return element;
    }
    if (Array.isArray(element)) {
      return element.map(extractCodeText).join('');
    }
    if (React.isValidElement(element)) {
      const props = element.props as { children?: React.ReactNode; className?: string };

      // 如果是 code 标签，直接从其 children 获取
      if (props?.children) {
        return extractCodeText(props.children);
      }
    }
    return '';
  };

  // 获取语言名称 - 从 className 中提取
  const getLanguage = (): string => {
    if (!className) return 'text';

    // 支持两种格式：language-typescript 或 typescript
    const match = className.match(/language-(\w+)/) || className.match(/^(\w+)$/);
    return match ? match[1] : 'text';
  };

  const language = getLanguage();

  return (
    <div className="relative group my-6">
      {/* 代码块容器 - 根据主题切换背景，使用与页面背景有明显对比的颜色 */}
      <div className={`relative rounded-lg overflow-hidden border ${
        isDark
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        {/* 复制按钮 - 根据主题调整样式 */}
        <button
          onClick={handleCopy}
          className={`absolute top-2 right-2 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 ${
            isDark
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          aria-label="Copy code"
          type="button"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        {/* 语言标签 - 根据主题调整样式 */}
        <span className={`absolute top-2 left-3 text-xs font-mono z-10 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {language}
        </span>

        {/* 代码内容 - pt-8 为按钮和标签留出空间 */}
        <div className="pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
