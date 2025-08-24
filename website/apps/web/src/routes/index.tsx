import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/animated-background";
import { ArrowRight, Code2, FileText, User } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="relative">
      {/* Animated Background spanning full screen width */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Hero Section */}
        <section className="relative text-center py-12 mb-16 z-10">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">
              Hi, I'm <span className="text-primary">Matthew Gale</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A passionate quantitative developer who loves building elegant solutions to complex problems. 
              I specialize in modern web technologies and enjoy sharing my knowledge through writing and open source.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/showcase">
                  <Code2 className="w-5 h-5 mr-2" />
                  View My Work
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">
                  <User className="w-5 h-5 mr-2" />
                  About Me
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-16 relative z-10">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Explore my coding projects</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Discover the applications and tools I've built, from personal experiments to production systems.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/showcase">
                  View Showcase
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Blog</CardTitle>
                  <CardDescription>Read my latest thoughts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Tutorials, insights, and thoughts about software development and technology trends.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/blog">
                  Read Posts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>About</CardTitle>
                  <CardDescription>Get to know me better</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about my background, experience, and the technologies I love working with.
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="text-center py-12 bg-muted/50 rounded-lg relative z-10">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and interesting projects. 
            Feel free to reach out if you'd like to collaborate or just chat about tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="mailto:hello@matthewgale.co.uk">Get In Touch</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/mgale694" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
