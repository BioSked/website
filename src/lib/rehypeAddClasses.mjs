function classes(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  return value.split(/\s+/).filter(Boolean);
}

/**
 * Minimal rehype plugin for adding classes to element names.
 * This replaces an unmaintained selector dependency; the site only uses
 * tag-name selectors here, so a general CSS selector engine is unnecessary.
 */
export default function rehypeAddClasses(classNamesByTag = {}) {
  return function transform(tree) {
    const visit = (node) => {
      if (node?.type === 'element') {
        const additions = classes(classNamesByTag[node.tagName]);
        if (additions.length) {
          node.properties ??= {};
          node.properties.className = [
            ...classes(node.properties.className),
            ...additions,
          ];
        }
      }

      if (Array.isArray(node?.children)) {
        for (const child of node.children) visit(child);
      }
    };

    visit(tree);
  };
}
