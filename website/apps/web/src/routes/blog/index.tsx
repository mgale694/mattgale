import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import { getAllBlogPosts, getFeaturedBlogPosts, groupPostsByDate, type BlogPost } from "@/lib/blog";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      {
        title: "Blog | Matt Gale - Software Developer & Photographer",
      },
      {
        name: "description",
        content: "Read Matt Gale's blog about software development, web technologies, photography, and tech insights. Discover tutorials, thoughts, and experiences from a passionate developer.",
      },
      {
        name: "keywords",
        content: "Matt Gale blog, software development, web development, programming, React, TypeScript, photography, tech blog",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Blog | Matt Gale - Software Developer & Photographer",
      },
      {
        property: "og:description",
        content: "Read Matt Gale's blog about software development, web technologies, photography, and tech insights. Discover tutorials, thoughts, and experiences from a passionate developer.",
      },
      {
        property: "og:url",
        content: "https://mattgale.com/blog",
      },
      {
        property: "twitter:card",
        content: "summary",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://mattgale.com/blog",
      },
    ],
  }),
  component: BlogComponent,
});

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl leading-tight">
              <a 
                href={`/blog/${post.id}`}
                className="hover:text-primary transition-colors"
              >
                {post.title}
              </a>
            </CardTitle>
            {post.featured && (
              <Badge className="mt-2">Featured</Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-base line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogComponent() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [groupedPosts, setGroupedPosts] = useState<Record<string, Record<string, BlogPost[]>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        const featured = await getFeaturedBlogPosts();
        const nonFeatured = posts.filter(p => !p.featured);
        const grouped = groupPostsByDate(nonFeatured);
        
        setAllPosts(posts);
        setFeaturedPosts(featured);
        setGroupedPosts(grouped);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Loading blog posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Thoughts, tutorials, and insights about software development, technology trends, 
          and the journey of building great products.
        </p>
      </div>

      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-8">Posts by Year</h2>
        <div className="space-y-12">
          {Object.entries(groupedPosts)
            .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
            .map(([year, months]) => (
            <div key={year} className="space-y-8">
              <h3 className="text-3xl font-bold text-primary border-b pb-2">{year}</h3>
              
              <div className="space-y-8">
                {Object.entries(months)
                  .sort(([monthA], [monthB]) => {
                    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                                      'July', 'August', 'September', 'October', 'November', 'December'];
                    return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
                  })
                  .map(([month, posts]) => (
                  <div key={month}>
                    <h4 className="text-xl font-semibold mb-4 text-muted-foreground">{month}</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {posts.map((post: BlogPost) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 text-center">
        <div className="rounded-lg border p-8 bg-muted/50">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Get notified when I publish new posts about web development and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
