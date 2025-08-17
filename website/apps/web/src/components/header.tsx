import { Link } from "@tanstack/react-router";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/showcase", label: "Showcase" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <nav className="flex gap-6 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link
                key={to}
                to={to}
                className="hover:text-primary transition-colors font-medium"
                activeProps={{
                  className: "text-primary",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-primary"
          >
            <a
              href="https://github.com/mgale694"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-primary"
          >
            <a
              href="https://linkedin.com/in/mattgale"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
