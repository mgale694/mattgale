import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Observe heading elements for active state
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -80% 0%',
      }
    );

    // Observe all heading elements
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto bg-transparent border-muted/30 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {tocItems.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`
              block w-full text-left text-sm py-1 px-2 rounded transition-colors
              hover:bg-muted/50 hover:text-foreground
              ${activeId === id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'}
              ${level === 1 ? 'pl-2' : level === 2 ? 'pl-4' : level === 3 ? 'pl-6' : level === 4 ? 'pl-8' : level === 5 ? 'pl-10' : 'pl-12'}
            `}
          >
            {text}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
