# [mattgale.com](https://mattgale.com)

A modern, minimalist personal website built with React, TypeScript, and TanStack Router. Features a blog system powered by markdown files and showcases projects and professional experience.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS 4.0
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Monorepo**: Turbo
- **UI Components**: Radix UI + shadcn/ui
- **Content**: Markdown files for blog posts

## 📁 Project Structure

```
website/
├── apps/
│   └── web/                    # Main web application
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   │   ├── ui/        # Base UI components (shadcn/ui)
│       │   │   ├── header.tsx # Site navigation
│       │   │   └── ...
│       │   ├── routes/        # File-based routing (TanStack Router)
│       │   │   ├── __root.tsx # Root layout
│       │   │   ├── index.tsx  # Homepage
│       │   │   ├── about.tsx  # About page
│       │   │   ├── showcase.tsx # Projects showcase
│       │   │   └── blog/      # Blog routes
│       │   │       ├── index.tsx    # Blog listing
│       │   │       └── $postId.tsx  # Individual blog posts
│       │   ├── content/       # Content management
│       │   │   └── blog/      # Markdown blog posts
│       │   ├── lib/           # Utility functions
│       │   │   ├── utils.ts   # General utilities
│       │   │   └── blog.ts    # Blog management utilities
│       │   └── ...
│       ├── package.json
│       └── vite.config.ts
└── ...
```

## 🎯 Website Sections

### Homepage (`/`)

- Hero section with personal introduction
- Quick navigation cards to main sections
- Contact call-to-action

### About Page (`/about`)

- Personal background and experience
- Technologies and skills
- Quick facts and availability status

### Showcase (`/showcase`)

- Featured and other projects
- Project details with technology stack
- Links to live demos and source code

### Blog (`/blog`)

- Blog post listings with featured posts
- Individual blog post pages (`/blog/{id}`)
- Tag-based categorization
- Reading time estimates

## 🔧 Development

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for compatibility)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mgale694/mattgale.com.git
   cd mattgale.com
   ```

2. **Install dependencies**

   ```bash
   cd website
   bun install
   ```

3. **Start development server**

   ```bash
   bun run dev:web
   ```

   The site will be available at `http://localhost:3001`

### Available Scripts

```bash
# Development
bun run dev          # Start all apps in development mode
bun run dev:web      # Start only the web app

# Building
bun run build        # Build all apps for production
bun run check-types  # Type check all apps

# Individual app commands
cd apps/web
bun run dev          # Start web app development server
bun run build        # Build web app for production
bun run serve        # Preview production build locally
```

## 📝 Adding Blog Posts

Blog posts are stored as Markdown files in `src/content/blog/`. Each post requires frontmatter:

```markdown
---
title: "Your Blog Post Title"
date: "2024-03-15"
excerpt: "A brief description of your post"
tags: ["React", "TypeScript", "Web Development"]
featured: true
readTime: "5 min read"
---

# Your Blog Post Title

Your blog content here...
```

### Blog Post Guidelines

1. **File naming**: Use kebab-case (e.g., `my-blog-post.md`)
2. **Images**: Store in `public/images/blog/` and reference relatively
3. **Code blocks**: Use proper syntax highlighting with language tags
4. **Featured posts**: Set `featured: true` to display in the featured section

## 🎨 Customization

### Design System

The website uses a custom design system built on Tailwind CSS:

- **Colors**: Defined in `tailwind.config.js`
- **Typography**: Custom font scales and weights
- **Components**: Built with Radix UI primitives
- **Dark mode**: Automatic theme switching

### Adding New Pages

1. Create a new file in `src/routes/` (e.g., `contact.tsx`)
2. Use the TanStack Router file-based convention
3. Add navigation links in `src/components/header.tsx`

Example page structure:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactComponent,
});

function ContactComponent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      {/* Your page content */}
    </div>
  );
}
```

## 🚀 Deployment

The website is configured for deployment on modern hosting platforms:

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
cd website && bun run build

# Publish directory
website/apps/web/dist
```

### Traditional Hosting

```bash
cd website
bun run build
# Upload the contents of apps/web/dist/ to your web server
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal website, but if you notice any issues or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Website**: [mattgale.com](https://mattgale.com)
- **Email**: hello@mattgale.com
- **GitHub**: [@mgale694](https://github.com/mgale694)

---

Built with ❤️ using modern web technologies.
