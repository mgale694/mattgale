import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import React from "react";

export const Route = createFileRoute("/showcase")({
  component: ShowcaseComponent,
});

// Mock project data - you can replace this with your actual projects
const projects = [
  {
    id: 1,
    title: "Personal Website",
    description: "A modern, minimalist personal website built with React, TypeScript, and TanStack Router. Features a blog system powered by markdown files.",
    technologies: ["React", "TypeScript", "TanStack Router", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/mgale694/matthewgale.co.uk",
    liveUrl: "https://matthewgale.co.uk",
    featured: true,
    image: "/showcase/personal-site-preview-light.webp",
    imageDark: "/showcase/personal-site-preview-dark.webp",
    preview: null,
  },
  {
    id: 2,
    title: "Photography Portfolio",
    description: "A clean, elegant photography portfolio showcasing my film photography work. Built with modern web technologies and optimized for visual storytelling.",
    technologies: ["React", "TypeScript", "TanStack Router", "Tailwind CSS", "Vite", "Responsive Design"],
    githubUrl: "https://github.com/mgale694",
    liveUrl: "https://mattgale-photography.pages.dev/",
    featured: true,
    image: "/showcase/photography-preview-light.webp",
    imageDark: "/showcase/photography-preview-dark.webp",
    preview: null,
  },
  {
    id: 3,
    title: "Project Management Tool",
    description: "A full-stack project management application with real-time collaboration features, task tracking, and team communication.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "tRPC", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
    image: null,
    preview: null,
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description: "A scalable e-commerce solution with inventory management, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
    image: null,
    preview: null,
  },
  {
    id: 5,
    title: "API Analytics Dashboard",
    description: "Real-time analytics dashboard for API monitoring with custom metrics, alerts, and performance insights.",
    technologies: ["Vue.js", "Python", "FastAPI", "Redis", "Chart.js"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
    image: null,
    preview: null,
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card className="h-full overflow-hidden">
      {(project.image || project.preview === "iframe") && (
        <div className="aspect-video overflow-hidden bg-muted">
          {project.preview === "iframe" ? (
            <iframe
              src={project.liveUrl}
              title={`${project.title} preview`}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
              sandbox="allow-same-origin"
            />
          ) : project.image ? (
            <>
              {/* Show imageDark in dark mode, image in light mode */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 dark:hidden"
              />
              {project.imageDark && (
                <img
                  src={project.imageDark}
                  alt={`${project.title} preview (dark mode)`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 hidden dark:block"
                />
              )}
            </>
          ) : null}
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            {project.featured && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mt-2">
                Featured
              </span>
            )}
          </div>
        </div>
        <CardDescription className="text-base">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-muted rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ShowcaseComponent() {
  // Get all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.technologies)));
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [inputFocused, setInputFocused] = React.useState(false);

  // Filter projects by all selected tags
  const filterProjects = (list: typeof projects) =>
    selectedTags.length === 0
      ? list
      : list.filter(p => selectedTags.every(tag => p.technologies.includes(tag)));

  const filteredProjects = filterProjects(projects);
  const filteredFeatured = filteredProjects.filter(p => p.featured);
  const filteredOther = filteredProjects.filter(p => !p.featured);

  // Only suggest tags that are present in the remaining filtered projects and not already selected
  const remainingTags = Array.from(new Set(filteredProjects.flatMap(p => p.technologies))).filter(tag => !selectedTags.includes(tag));
  const tagSuggestions = remainingTags.filter(
    tag => tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Project Showcase</h1>
        <p className="text-xl text-muted-foreground max-w-6xl">
          A collection of projects I've built, ranging from personal experiments to production applications. 
          Each project represents a unique challenge and learning opportunity.
        </p>
      </div>

      {/* Multi-tag Autocomplete Filter UI */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <span className="font-medium mr-2">Filter by tags:</span>
          {selectedTags.map(tag => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              {tag}
              <button
                className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
            <div className="relative w-full max-w-6xl">
              <div className="grid grid-cols-3 gap-4 w-full">
              <div>
                <Input
                type="text"
                placeholder="Type to filter tags..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setTimeout(() => setInputFocused(false), 100)}
                className="pr-10 w-full"
                autoComplete="off"
                />
              </div>
              <div className="col-span-2">
                {/* Quick clickable tag suggestions (subset) to the right, wrapping within column */}
                {tagSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagSuggestions.slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md border bg-muted text-foreground hover:bg-primary hover:text-white transition-colors"
                    onClick={() => {
                    setSelectedTags([...selectedTags, tag]);
                    setInputValue("");
                    }}
                  >
                    {tag}
                  </button>
                  ))}
                </div>
                )}
              </div>
              </div>
          {/* Dropdown for autocomplete if typing */}
          {(inputFocused || inputValue) && tagSuggestions.length > 0 && (
            <div className="absolute left-0 top-full z-10 bg-popover border rounded shadow mt-1 min-w-[220px] max-w-[320px] w-auto">
              {tagSuggestions.map(tag => (
                <button
                  key={tag}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-muted"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    setSelectedTags([...selectedTags, tag]);
                    setInputValue("");
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
        {selectedTags.length > 0 && (
          <button
            className="ml-4 text-xs text-primary underline"
            onClick={() => setSelectedTags([])}
          >
            Clear all
          </button>
        )}
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredFeatured.length === 0 ? (
            <div className="col-span-2 text-center text-muted-foreground py-8">No projects found for these tags.</div>
          ) : (
            filteredFeatured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Other Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOther.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground py-8">No projects found for these tags.</div>
          ) : (
            filteredOther.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </section>

      <section className="mt-12 text-center">
        <div className="rounded-lg border p-8 bg-muted/50">
          <h3 className="text-xl font-semibold mb-4">Interested in Working Together?</h3>
          <p className="text-muted-foreground mb-6">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <Button asChild>
            <a href="mailto:hello@matthewgale.co.uk">Get In Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
