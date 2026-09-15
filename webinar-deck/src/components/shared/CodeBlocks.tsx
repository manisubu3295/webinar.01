'use client';

/** Folder trees and starter-code snippets are authored, static content
 * (never user input) that sometimes carries inline markup — a
 * highlighted `// TODO` placeholder span, or literal `&lt;div&gt;` runs
 * meant to display as angle brackets. Rendered the same way the original
 * deck did, via innerHTML. */
export function FolderTree({ children }: { children: string }) {
  return <div className="folder-tree" dangerouslySetInnerHTML={{ __html: children }} />;
}

export function CodeBlock({ children }: { children: string }) {
  return <div className="code-block" dangerouslySetInnerHTML={{ __html: children }} />;
}
