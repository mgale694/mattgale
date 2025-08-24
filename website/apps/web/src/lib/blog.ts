// Blog utilities for reading markdown files
// This implementation dynamically reads from markdown files in the content directory

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  fileName: string;
  bannerUrl?: string;
  bannerUrlDark?: string;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: any; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];
  
  // Simple YAML parsing for frontmatter
  const frontmatter: any = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((item: string) => 
          item.trim().replace(/^["']|["']$/g, '')
        );
      }
      
      // Handle booleans
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      frontmatter[key] = value;
    }
  });

  return { frontmatter, body };
}

// Extract date from filename format: YYYY-MM-DD_blog-title.md
export function extractDateFromFilename(filename: string): string {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})_/);
  return dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
}

// Extract blog title from filename, removing date prefix
export function extractTitleFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md$/, '');
}

// Group blog posts by year and month
export function groupPostsByDate(posts: BlogPost[]): Record<string, Record<string, BlogPost[]>> {
  const grouped = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    
    acc[year][month].push(post);
    return acc;
  }, {} as Record<string, Record<string, BlogPost[]>>);

  // Sort years and months
  Object.keys(grouped).forEach(year => {
    Object.keys(grouped[year]).forEach(month => {
      grouped[year][month].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  });

  return grouped;
}

// Read all markdown files using Vite's glob import
const modules = {
  // ...import.meta.glob('/src/content/blog/*.md', {
  //   query: '?raw',
  //   import: 'default',
  // }),
  ...import.meta.glob('/src/content/blog/*/*.md', {
    query: '?raw',
    import: 'default',
  }),
} as Record<string, () => Promise<string>>;

let blogPosts: BlogPost[] = [];
let blogPostsLoaded = false;

async function loadBlogPosts(): Promise<BlogPost[]> {
  // In development, always reload to catch changes
  if (import.meta.env.DEV || !blogPostsLoaded || blogPosts.length === 0) {
    try {
      const loadedModules = await Promise.all(
        Object.entries(modules).map(async ([path, loader]) => {
          const content = await loader();
          const fileName = path.split('/').pop() || '';
          const { frontmatter, body } = parseFrontmatter(content);
          // Extract ID from filename
          const id = fileName.replace(/\.md$/, '');
          // Use frontmatter data or extract from filename
          const title = frontmatter.title || extractTitleFromFilename(fileName);
          const date = frontmatter.date || extractDateFromFilename(fileName);

          // Use bannerUrl from frontmatter if present, otherwise fallback to folder-based banner path
          let bannerUrl: string | undefined = frontmatter.bannerUrl;
          let bannerUrlDark: string | undefined = frontmatter.bannerUrlDark;
          if (!bannerUrl) {
            const folderPathMatch = path.match(/\/blog\/(\d{4}-\d{2}-\d{2})\/(.+)\.md$/);
            if (folderPathMatch) {
              const folder = folderPathMatch[1];
              bannerUrl = `/src/content/blog/${folder}/banner.png`;
              bannerUrlDark = `/src/content/blog/${folder}/banner-dark.png`;
            }
          }

          return {
            id,
            title,
            excerpt: frontmatter.excerpt || body.substring(0, 200) + '...',
            content: body,
            date,
            readTime: frontmatter.readTime || '5 min read',
            tags: frontmatter.tags || [],
            featured: frontmatter.featured || false,
            fileName,
            bannerUrl,
            bannerUrlDark,
          };
        })
      );

      blogPosts = loadedModules.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      blogPostsLoaded = true;
      return blogPosts;
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }

  return blogPosts;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await loadBlogPosts();
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return posts.filter(post => post.featured);
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  const posts = await loadBlogPosts();
  return posts.find(post => post.id === id);
}
