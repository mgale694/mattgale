import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Matt Gale</h3>
            <p className="text-sm text-muted-foreground">
              Software developer passionate about building elegant solutions to complex problems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="/showcase" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Showcase
              </a>
              <a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </a>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mgale694"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mattgale"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@mattgale.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Feel free to reach out for collaborations or just to say hello!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Matt Gale. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
