'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  code: string;
}

// Initialize mermaid once
let mermaidInitialized = false;

export default function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDark, setIsDark] = useState(false);
  const [renderKey, setRenderKey] = useState<number>(0);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize mermaid if not already done
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
        },
        sequence: {
          useMaxWidth: true,
        },
        gantt: {
          useMaxWidth: true,
        },
      });
      mermaidInitialized = true;
    } else {
      // Re-initialize with new theme when theme changes
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis',
        },
        sequence: {
          useMaxWidth: true,
        },
        gantt: {
          useMaxWidth: true,
        },
      });
    }

    // Render the diagram
    const renderDiagram = async () => {
      try {
        setError('');
        // Validate and render
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${Date.now()}-${renderKey}`,
          code
        );
        setSvg(renderedSvg);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [code, isDark, renderKey]);

  // Increment render key when theme changes to force re-render
  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, [isDark]);

  if (error) {
    return (
      <div className="my-6 p-4 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-800 dark:text-red-300 font-semibold mb-1">
          Mermaid Diagram Error
        </p>
        <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
