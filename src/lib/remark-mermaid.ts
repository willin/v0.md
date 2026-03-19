import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform mermaid code blocks into custom Mermaid components
 *
 * Transforms:
 * ```mermaid
 * graph TD
 *   A --> B
 * ```
 *
 * Into:
 * <Mermaid code="graph TD\n  A --> B" />
 */
export const remarkMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid') {
        // Replace code block with Mermaid component
        const mermaidNode = {
          type: 'html',
          value: `<Mermaid code={\`${node.value.replace(/`/g, '\\`')}\`} />`,
        };

        if (parent && index !== undefined) {
          parent.children[index] = mermaidNode as any;
        }
      }
    });
  };
};
