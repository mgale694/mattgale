import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
              <p className="text-lg mb-4">
                I'm Matt Gale, a passionate software developer with a love for creating elegant solutions to complex problems. 
                My journey in technology spans across various domains, from web development to system architecture.
              </p>
              <p className="text-lg mb-4">
                I believe in writing clean, maintainable code and am always eager to learn new technologies and methodologies 
                that can improve the way we build software.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
              <p className="text-lg mb-4">
                I specialize in full-stack development with a particular focus on modern web technologies. 
                My expertise includes building scalable applications, designing efficient APIs, and creating 
                intuitive user experiences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technologies I Love</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <ul className="space-y-1 text-sm">
                    <li>React & TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Next.js</li>
                    <li>Vite</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>PostgreSQL</li>
                    <li>Redis</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="rounded-lg border p-6 bg-muted/50">
              <h3 className="font-semibold mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Currently available for projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Based in [Your Location]
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  X+ years of experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
