// Blog utilities for reading markdown files
// This is a simple implementation that can be expanded to actually read from the filesystem

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

// Mock blog posts data - in a real implementation, this would read from markdown files
const blogPostsData: Record<string, BlogPost> = {
  "building-modern-web-apps": {
    id: "building-modern-web-apps",
    title: "Building Modern Web Applications with React and TypeScript",
    excerpt: "Exploring the best practices for creating scalable and maintainable web applications using modern tools and frameworks.",
    content: `
# Building Modern Web Applications with React and TypeScript

In today's rapidly evolving web development landscape, building robust and scalable applications requires careful consideration of the tools and technologies we choose. React and TypeScript have emerged as a powerful combination that addresses many of the challenges developers face when creating modern web applications.

## Why React and TypeScript?

React's component-based architecture provides a clear and maintainable way to structure user interfaces, while TypeScript adds static type checking that catches errors early in the development process. Together, they offer:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better Developer Experience**: Enhanced IDE support with autocomplete and refactoring
- **Improved Code Quality**: Self-documenting code through type annotations
- **Easier Refactoring**: Confident code changes with type checking

## Setting Up Your Development Environment

When starting a new React TypeScript project, I recommend using Vite for its fast development server and excellent TypeScript support out of the box:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Best Practices

### 1. Define Clear Interfaces

Always define interfaces for your component props and state:

\`\`\`typescript
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  onEdit: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  // Component implementation
};
\`\`\`

### 2. Use Strict TypeScript Configuration

Configure TypeScript with strict settings in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
\`\`\`

### 3. Leverage Custom Hooks

Create reusable logic with custom hooks:

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

## Performance Considerations

When building React applications with TypeScript, keep these performance tips in mind:

- Use React.memo for expensive components
- Implement proper key props for list items
- Leverage code splitting with React.lazy
- Optimize bundle size with tree shaking

## Conclusion

The combination of React and TypeScript provides a solid foundation for building maintainable and scalable web applications. By following best practices and leveraging TypeScript's type system, developers can create more reliable code with fewer bugs and better developer experience.

The investment in learning TypeScript pays dividends in the long run, especially for larger projects and team environments where code quality and maintainability are crucial.
    `,
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Development"],
    featured: true,
  },
  "the-power-of-tanstack-router": {
    id: "the-power-of-tanstack-router",
    title: "The Power of TanStack Router in Modern React Apps",
    excerpt: "Deep dive into TanStack Router and how it revolutionizes routing in React applications with type safety and performance.",
    content: `
# The Power of TanStack Router in Modern React Apps

TanStack Router represents a significant advancement in React routing solutions, bringing type safety, performance, and developer experience to the forefront. After working with various routing libraries over the years, I've found TanStack Router to be a game-changer for modern React applications.

## What Makes TanStack Router Special?

### Type-Safe Routing
One of the most compelling features of TanStack Router is its complete type safety. Routes, parameters, and search params are all typed, eliminating common routing bugs:

\`\`\`typescript
// Routes are fully typed
const Route = createFileRoute('/blog/$postId')({
  component: BlogPost,
  loader: ({ params }) => {
    // params.postId is automatically typed as string
    return fetchBlogPost(params.postId)
  }
})
\`\`\`

### Built-in Data Loading
TanStack Router includes powerful data loading capabilities that integrate seamlessly with the routing system:

\`\`\`typescript
const postsRoute = createFileRoute('/posts')({
  loader: () => fetchPosts(),
  component: Posts,
})
\`\`\`

## Setting Up TanStack Router

Getting started with TanStack Router is straightforward. Here's a basic setup:

1. Install the necessary packages:
\`\`\`bash
npm install @tanstack/react-router
npm install -D @tanstack/router-devtools @tanstack/router-plugin
\`\`\`

2. Configure your router in the root of your application:
\`\`\`typescript
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

function App() {
  return <RouterProvider router={router} />
}
\`\`\`

## Advanced Features

### Search Params Validation
TanStack Router provides excellent support for search parameter validation:

\`\`\`typescript
const searchSchema = z.object({
  page: z.number().optional(),
  filter: z.string().optional(),
})

const Route = createFileRoute('/products')({
  validateSearch: searchSchema,
  component: Products,
})
\`\`\`

### Code Splitting
Built-in support for code splitting makes it easy to optimize your bundle:

\`\`\`typescript
const Route = createFileRoute('/dashboard')({
  component: lazy(() => import('./Dashboard')),
})
\`\`\`

## Migration from React Router

If you're coming from React Router, the migration process is generally smooth:

1. Replace route definitions with file-based routing
2. Update navigation to use TanStack Router's Link component
3. Migrate loaders and actions to TanStack Router equivalents

## Best Practices

### 1. File-Based Routing Structure
Organize your routes following the file-based convention:
\`\`\`
src/routes/
  __root.tsx
  index.tsx
  blog/
    index.tsx
    $postId.tsx
\`\`\`

### 2. Leverage Route Groups
Use route groups for shared layouts:
\`\`\`
src/routes/
  _authenticated/
    dashboard.tsx
    profile.tsx
  _public/
    login.tsx
    signup.tsx
\`\`\`

### 3. Optimize Data Loading
Use route-level data loading for better performance:
- Preload data before component renders
- Implement proper error boundaries
- Use suspense for loading states

## Performance Benefits

TanStack Router offers several performance advantages:

- **Automatic code splitting** at the route level
- **Preloading** of route modules and data
- **Efficient re-rendering** with minimal component updates
- **Tree shaking** of unused routes in production

## Conclusion

TanStack Router represents the future of routing in React applications. Its combination of type safety, performance optimizations, and developer experience makes it an excellent choice for both new projects and migrations from existing routing solutions.

The learning curve is minimal for developers familiar with React Router, but the benefits in terms of type safety and performance are substantial. I highly recommend giving TanStack Router a try in your next React project.
    `,
    date: "2024-03-10",
    readTime: "6 min read",
    tags: ["React", "TanStack", "Routing"],
    featured: false,
  },
  "tailwind-css-best-practices": {
    id: "tailwind-css-best-practices",
    title: "Tailwind CSS Best Practices for Large Applications",
    excerpt: "Learn how to organize and maintain Tailwind CSS in large-scale applications while keeping your stylesheets clean and performant.",
    content: `
# Tailwind CSS Best Practices for Large Applications

Tailwind CSS has revolutionized how we approach styling in modern web applications. Its utility-first approach provides incredible flexibility and speed in development. However, as applications grow, maintaining clean and organized Tailwind code becomes crucial for long-term success.

## Organizing Your Tailwind Configuration

A well-structured \`tailwind.config.js\` is the foundation of maintainable Tailwind projects:

\`\`\`javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
\`\`\`

## Component-Based Organization

### 1. Create Reusable Component Classes

Instead of repeating utility combinations, create semantic component classes:

\`\`\`css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
  }
}
\`\`\`

### 2. Use CSS Variables for Dynamic Values

Combine Tailwind with CSS variables for theme switching:

\`\`\`css
:root {
  --color-primary: 59 130 246;
  --color-background: 255 255 255;
}

[data-theme="dark"] {
  --color-primary: 96 165 250;
  --color-background: 17 24 39;
}
\`\`\`

\`\`\`html
<div class="bg-[rgb(var(--color-background))] text-[rgb(var(--color-primary))]">
  Dynamic theming content
</div>
\`\`\`

## Performance Optimization

### 1. Purge Unused Styles

Ensure your content configuration is accurate to remove unused styles:

\`\`\`javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    // Include any dynamic class generation
    './src/utils/classNames.ts',
  ],
  // ... rest of config
}
\`\`\`

### 2. Use JIT Mode Features

Leverage Just-In-Time compilation for arbitrary values:

\`\`\`html
<!-- Custom spacing -->
<div class="mt-[17px] mb-[33px]">

<!-- Custom colors -->
<div class="bg-[#1da1f2] text-[color:var(--my-color)]">

<!-- Custom grid layouts -->
<div class="grid-cols-[200px_minmax(900px,_1fr)_100px]">
\`\`\`

## Maintainability Strategies

### 1. Consistent Naming Conventions

Establish clear patterns for custom utilities:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Use consistent naming
      colors: {
        primary: { /* ... */ },
        secondary: { /* ... */ },
        accent: { /* ... */ },
      },
      spacing: {
        // Follow logical progression
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      }
    }
  }
}
\`\`\`

### 2. Document Your Design System

Create a style guide that documents your Tailwind extensions:

\`\`\`typescript
// Design tokens
export const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  }
} as const;

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
} as const;
\`\`\`

## Team Collaboration

### 1. Linting and Formatting

Use tools to maintain consistency across your team:

\`\`\`json
// .eslintrc.js
{
  "extends": ["plugin:tailwindcss/recommended"],
  "rules": {
    "tailwindcss/classnames-order": "error",
    "tailwindcss/no-custom-classname": "error"
  }
}
\`\`\`

### 2. Class Ordering

Establish a consistent order for Tailwind classes:

\`\`\`html
<!-- Layout -> Box Model -> Typography -> Visual -> Misc -->
<div class="
  flex items-center justify-between
  w-full max-w-md p-4 mx-auto
  text-lg font-semibold text-gray-900
  bg-white border border-gray-200 rounded-lg shadow-sm
  hover:shadow-md focus:outline-none focus:ring-2
">
\`\`\`

## Advanced Patterns

### 1. Responsive Design

Use Tailwind's responsive prefixes systematically:

\`\`\`html
<div class="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">
\`\`\`

### 2. Dark Mode Support

Implement consistent dark mode patterns:

\`\`\`html
<div class="
  bg-white text-gray-900
  dark:bg-gray-900 dark:text-white
  border border-gray-200
  dark:border-gray-700
">
\`\`\`

## Conclusion

Tailwind CSS scales beautifully when approached with intention and structure. By following these best practices, you can maintain clean, performant, and maintainable stylesheets even in the largest applications.

The key is finding the right balance between Tailwind's utility-first philosophy and the organizational needs of your specific project and team.
    `,
    date: "2024-03-05",
    readTime: "5 min read",
    tags: ["CSS", "Tailwind", "Design Systems"],
    featured: false,
  },
  "mastering-git-workflow": {
    id: "mastering-git-workflow",
    title: "Mastering Git Workflow for Team Collaboration",
    excerpt: "Essential Git strategies and workflows that improve team collaboration and code quality in modern development environments.",
    content: `
# Mastering Git Workflow for Team Collaboration

Effective Git workflows are crucial for successful team collaboration in software development. The right workflow can make the difference between smooth, productive development and chaotic, merge-conflict-ridden projects.

## Understanding Git Flow Models

### Git Flow
The classic Git Flow model uses multiple branches for different purposes:

\`\`\`bash
# Feature development
git checkout -b feature/user-authentication develop
git add .
git commit -m "Add user login functionality"
git checkout develop
git merge --no-ff feature/user-authentication
\`\`\`

### GitHub Flow
A simpler model focusing on the main branch:

\`\`\`bash
# Create feature branch from main
git checkout -b feature/dashboard-improvements main
# Make changes and commit
git push -u origin feature/dashboard-improvements
# Create pull request to main
\`\`\`

### GitLab Flow
Combines the simplicity of GitHub Flow with release management:

\`\`\`bash
# Feature development
git checkout -b feature/api-optimization main
# Deploy to staging through merge requests
# Deploy to production when ready
\`\`\`

## Best Practices for Commits

### 1. Write Clear Commit Messages

Follow conventional commit format:

\`\`\`bash
# Good commit messages
git commit -m "feat: add user profile editing functionality"
git commit -m "fix: resolve authentication token expiration issue"
git commit -m "docs: update API documentation for user endpoints"
git commit -m "refactor: optimize database query performance"
\`\`\`

### 2. Make Atomic Commits

Each commit should represent a single logical change:

\`\`\`bash
# Bad: Multiple unrelated changes
git add .
git commit -m "Fix bug and add new feature"

# Good: Separate commits for separate changes
git add src/auth.js
git commit -m "fix: resolve authentication bug"
git add src/dashboard.js
git commit -m "feat: add dashboard analytics"
\`\`\`

### 3. Use Interactive Rebase

Clean up your commit history before merging:

\`\`\`bash
# Interactive rebase to clean up last 3 commits
git rebase -i HEAD~3

# Squash related commits, reword messages, reorder
# pick 1a2b3c4 feat: add user registration
# squash 5d6e7f8 fix typo in registration form
# reword 9g0h1i2 add validation to registration
\`\`\`

## Branch Management

### 1. Branch Naming Conventions

Use consistent, descriptive branch names:

\`\`\`bash
# Feature branches
feature/user-authentication
feature/payment-integration
feature/dashboard-redesign

# Bug fix branches
bugfix/login-validation-error
hotfix/security-vulnerability

# Release branches
release/v1.2.0
release/v1.2.1
\`\`\`

### 2. Branch Protection Rules

Set up branch protection in your repository:

\`\`\`yaml
# GitHub branch protection settings
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict pushes to matching branches
- Require signed commits
\`\`\`

## Code Review Process

### 1. Pull Request Guidelines

Create effective pull requests:

\`\`\`markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
\`\`\`

### 2. Review Best Practices

\`\`\`bash
# Checkout the PR branch locally for testing
git fetch origin pull/123/head:pr-123
git checkout pr-123

# Test the changes
npm test
npm run lint

# Provide constructive feedback
# Focus on code quality, security, and maintainability
\`\`\`

## Conflict Resolution

### 1. Preventing Conflicts

\`\`\`bash
# Keep your branch updated
git checkout main
git pull origin main
git checkout feature/my-feature
git rebase main

# Or use merge if you prefer
git merge main
\`\`\`

### 2. Resolving Conflicts

\`\`\`bash
# When conflicts occur during merge/rebase
git status  # See conflicted files

# Edit files to resolve conflicts
# Look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>> branch-name

# After resolving conflicts
git add resolved-file.js
git rebase --continue  # or git commit for merge
\`\`\`

## Advanced Git Techniques

### 1. Git Hooks

Automate quality checks:

\`\`\`bash
#!/bin/sh
# .git/hooks/pre-commit
# Run tests before allowing commit

npm test
if [ $? -ne 0 ]; then
  echo "Tests must pass before commit!"
  exit 1
fi

npm run lint
if [ $? -ne 0 ]; then
  echo "Linting must pass before commit!"
  exit 1
fi
\`\`\`

### 2. Git Aliases

Create shortcuts for common operations:

\`\`\`bash
# Add to .gitconfig
[alias]
  co = checkout
  br = branch
  ci = commit
  st = status
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = !gitk
  tree = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
\`\`\`

### 3. Semantic Versioning with Git Tags

\`\`\`bash
# Create version tags
git tag -a v1.0.0 -m "Release version 1.0.0"
git tag -a v1.1.0 -m "Minor feature release"
git tag -a v1.1.1 -m "Patch release with bug fixes"

# Push tags to remote
git push origin --tags

# List tags
git tag -l

# Checkout specific version
git checkout v1.0.0
\`\`\`

## Team Workflow Example

Here's a complete workflow example:

\`\`\`bash
# 1. Start new feature
git checkout main
git pull origin main
git checkout -b feature/user-dashboard

# 2. Develop and commit
git add src/dashboard.js
git commit -m "feat: add user dashboard component"

# 3. Keep branch updated
git fetch origin
git rebase origin/main

# 4. Push and create PR
git push -u origin feature/user-dashboard
# Create pull request in GitHub/GitLab

# 5. Address review feedback
git add .
git commit -m "fix: address code review feedback"
git push

# 6. After approval, merge via platform
# 7. Clean up
git checkout main
git pull origin main
git branch -d feature/user-dashboard
\`\`\`

## Conclusion

Mastering Git workflows takes practice, but the investment pays off in improved team productivity and code quality. The key is choosing workflows that fit your team size and project complexity, then consistently applying best practices.

Remember that the best workflow is the one your team actually follows. Start simple and evolve your processes as your team grows and learns.
    `,
    date: "2024-02-28",
    readTime: "7 min read",
    tags: ["Git", "Development", "Team Work"],
    featured: false,
  },
};

export function getAllBlogPosts(): BlogPost[] {
  return Object.values(blogPostsData).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(id: string): BlogPost | null {
  return blogPostsData[id] || null;
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// TODO: Implement actual markdown file reading
// This would involve:
// 1. Reading files from src/content/blog directory
// 2. Parsing frontmatter with gray-matter
// 3. Converting markdown to HTML with marked
// 4. Extracting metadata like reading time, word count, etc.
//
// Example implementation:
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { marked } from 'marked';
//
// export async function loadBlogPost(id: string): Promise<BlogPost | null> {
//   try {
//     const filePath = path.join(process.cwd(), 'src/content/blog', `${id}.md`);
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const { data, content } = matter(fileContents);
//     const htmlContent = marked(content);
//     
//     return {
//       id,
//       title: data.title,
//       excerpt: data.excerpt,
//       content: htmlContent,
//       date: data.date,
//       readTime: data.readTime,
//       tags: data.tags,
//       featured: data.featured || false,
//     };
//   } catch (error) {
//     console.error(`Error loading blog post ${id}:`, error);
//     return null;
//   }
// }
