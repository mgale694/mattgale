import { Link } from "@tanstack/react-router";

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
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
