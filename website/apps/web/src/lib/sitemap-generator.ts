// Build-time sitemap generator
import { getAllBlogPosts } from './blog.js';
import { getAllPhotos } from './photography.js';
import fs from 'fs';
import path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

async function generateSitemap() {
  const baseUrl = 'https://mattgale.com';
  const urls: SitemapUrl[] = [];

  // Static pages
  urls.push({
    loc: baseUrl,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  });

  urls.push({
    loc: `${baseUrl}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  });

  urls.push({
    loc: `${baseUrl}/photography`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  });

  try {
    // Add blog posts
    const blogPosts = await getAllBlogPosts();
    for (const post of blogPosts) {
      urls.push({
        loc: `${baseUrl}/blog/${post.id}`,
        lastmod: post.date,
        changefreq: 'never',
        priority: '0.6'
      });
    }

    console.log(`Added ${blogPosts.length} blog posts to sitemap`);
  } catch (error) {
    console.warn('Could not load blog posts for sitemap:', error);
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public directory
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Sitemap generated with ${urls.length} URLs at ${sitemapPath}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap().catch(console.error);
}

export { generateSitemap };
