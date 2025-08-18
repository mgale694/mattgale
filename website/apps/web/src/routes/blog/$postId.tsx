import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/table-of-contents";
import { ArrowLeft, CalendarDays, Clock, Copy, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getBlogPost, type BlogPost } from "@/lib/blog";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState, useEffect } from 'react';
import '../../code-highlight.css';

export const Route = createFileRoute("/blog/$postId")({
  loader: async ({ params }) => {
    const post = await getBlogPost(params.postId);
    if (!post) {
      throw new Error('Post not found');
    }
    return { post };
  },
  head: (ctx) => {
    const post = ctx.loaderData?.post;
    if (!post) return {};
    
    const excerpt = post.content
      .slice(0, 160)
      .replace(/[#*`\n]/g, ' ')
      .trim();
    
    return {
      meta: [
        {
          title: `${post.title} | Matt Gale`,
        },
        {
          name: "description",
          content: post.excerpt || excerpt,
        },
        {
          name: "keywords",
          content: `${post.tags?.join(', ')}, Matt Gale, blog, software development`,
        },
        {
          name: "author",
          content: "Matt Gale",
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          property: "og:title",
          content: post.title,
        },
        {
          property: "og:description",
          content: post.excerpt || excerpt,
        },
        {
          property: "og:url",
          content: `https://mattgale.com/blog/${post.id}`,
        },
        {
          property: "og:image",
          content: "https://mattgale.com/og-image.jpg",
        },
        {
          property: "article:published_time",
          content: post.date,
        },
        {
          property: "article:author",
          content: "Matt Gale",
        },
        {
          property: "article:tag",
          content: post.tags?.join(', ') || '',
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:title",
          content: post.title,
        },
        {
          property: "twitter:description",
          content: post.excerpt || excerpt,
        },
        {
          property: "twitter:image",
          content: "https://mattgale.com/og-image.jpg",
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://mattgale.com/blog/${post.id}`,
        },
      ],
    };
  },
  component: BlogPostComponent,
});

// Custom CodeBlock component with copy functionality
function CodeBlock({ children, className, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const isCodeBlock = className?.includes('language-');
  
  if (!isCodeBlock) {
    return (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  }

  const codeText = children?.toString() || '';
  const language = className?.replace('language-', '') || '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-block-language">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="code-block-copy-button"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <pre className="code-block-pre" {...props}>
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
}

function BlogPostComponent() {
  const { post } = Route.useLoaderData();

  if (!post) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Main Content */}
        <article className="min-w-0">
          <header className="mb-8">
            <Button variant="outline" size="sm" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // Customize headings
              h1: ({ children, ...props }) => {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                return (
                  <h1 id={id} className="text-4xl font-bold mt-8 mb-4 text-foreground scroll-mt-4" {...props}>
                    {children}
                  </h1>
                );
              },
              h2: ({ children, ...props }) => {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                return (
                  <h2 id={id} className="text-3xl font-semibold mt-8 mb-4 text-foreground scroll-mt-4" {...props}>
                    {children}
                  </h2>
                );
              },
              h3: ({ children, ...props }) => {
                const id = String(children)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                return (
                  <h3 id={id} className="text-2xl font-semibold mt-6 mb-3 text-foreground scroll-mt-4" {...props}>
                    {children}
                  </h3>
                );
              },
              // Customize paragraphs
              p: ({ children, ...props }) => (
                <p className="mb-4 leading-7 text-foreground" {...props}>
                  {children}
                </p>
              ),
              // Customize code blocks styling
              pre: ({ children, ...props }) => {
                // Extract the code element from children
                const codeElement = children as any;
                if (codeElement?.props?.className?.includes('language-')) {
                  return (
                    <CodeBlock className={codeElement.props.className} {...props}>
                      {codeElement.props.children}
                    </CodeBlock>
                  );
                }
                return (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto border my-6" {...props}>
                    {children}
                  </pre>
                );
              },
              // Customize inline code styling
              code: ({ children, className, ...props }) => {
                const isBlock = className?.includes('language-');
                return isBlock ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <CodeBlock className={className} {...props}>
                    {children}
                  </CodeBlock>
                );
              },
              // Customize lists
              ul: ({ children, ...props }) => (
                <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="text-foreground" {...props}>
                  {children}
                </li>
              ),
              // Customize links
              a: ({ children, href, ...props }) => (
                <a 
                  href={href} 
                  className="text-primary hover:underline font-medium" 
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  {...props}
                >
                  {children}
                </a>
              ),
              // Customize blockquotes
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props}>
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Table of Contents - Desktop sidebar */}
      <aside className="hidden lg:block">
        <TableOfContents content={post.content} />
      </aside>
    </div>
    </div>
  );
}
