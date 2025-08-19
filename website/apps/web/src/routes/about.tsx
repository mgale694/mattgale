import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  Code, 
  Briefcase,
  Mail,
  Phone,
  User,
  Building,
  ExternalLink
} from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";
import { ArrowRight, Code2, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About | Matt Gale - Software Developer & Photographer",
      },
      {
        name: "description",
        content: "Learn about Matt Gale's background, experience in software development, certifications, and passion for technology and photography.",
      },
      {
        property: "og:title",
        content: "About | Matt Gale - Software Developer & Photographer",
      },
      {
        property: "og:description",
        content: "Learn about Matt Gale's background, experience in software development, certifications, and passion for technology and photography.",
      },
    ],
  }),
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Animated Background spanning full screen width */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Software Developer with a passion for building scalable web applications, 
          exploring new technologies, and capturing the world through photography.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <section className="lg:col-span-2 space-y-8 relative z-10">
          {/* Introduction */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Who I Am
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                I'm Matt Gale, a passionate Software Developer with expertise in full-stack development, 
                cloud technologies, and modern web frameworks. I thrive on solving complex problems and 
                building scalable, user-focused applications.
              </p>
              <p>
                My journey in technology has taken me through various roles and industries, from developing 
                e-commerce platforms to building internal tools and APIs. I believe in continuous learning 
                and staying current with emerging technologies to deliver the best solutions.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the world with my camera, capturing moments 
                and landscapes that tell stories. Photography has taught me to see details and compositions 
                that translate well into my approach to user interface design.
              </p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-2 border-primary pl-4 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">Software Developer</h3>
                    <Badge variant="secondary">Full-time</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      Various Companies
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2020 - Present
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Developed and maintained full-stack web applications using modern frameworks</li>
                    <li>• Collaborated with cross-functional teams to deliver high-quality software solutions</li>
                    <li>• Implemented responsive designs and optimized application performance</li>
                    <li>• Worked with databases, APIs, and cloud services to build scalable systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-l-2 border-primary pl-4">
                <div>
                  <h3 className="text-lg font-semibold">Computer Science & Software Engineering</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      University Education
                    </span>
                  </div>
                  <p className="text-sm">
                    Strong foundation in computer science fundamentals, algorithms, data structures, 
                    and software engineering principles.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Frontend Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite',
                      'Tailwind CSS', 'HTML5', 'CSS3', 'TanStack Router'
                    ].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Backend Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Node.js', 'Python', 'REST APIs', 'GraphQL',
                      'PostgreSQL', 'MongoDB', 'Redis'
                    ].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Cloud & DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Microsoft Azure', 'AWS', 'Docker', 'Git',
                      'CI/CD', 'Linux', 'Vercel', 'Netlify'
                    ].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tools & Methodologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'VS Code', 'Agile', 'Scrum', 'Testing',
                      'Code Review', 'Performance Optimization'
                    ].map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm">Available for opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">United Kingdom</span>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">4+ years experience</span>
                </li>
                <li className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Full-stack Developer</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">Microsoft Azure Fundamentals</h3>
                    <Badge variant="default" className="text-xs">AZ-900</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Microsoft</p>
                  <p className="text-xs text-muted-foreground">
                    Demonstrates foundational knowledge of cloud services and Microsoft Azure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Let's Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a 
                  href="mailto:contact@matthewgale.co.uk" 
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@matthewgale.co.uk</span>
                </a>
                <a 
                  href="https://github.com/mgale694" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                <a 
                  href="https://linkedin.com/in/mattgale694" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Beyond Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Photography</h4>
                  <p className="text-muted-foreground">Capturing landscapes and street scenes with film cameras</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Technology</h4>
                  <p className="text-muted-foreground">Exploring new frameworks, tools, and development methodologies</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Learning</h4>
                  <p className="text-muted-foreground">Continuous skill development and staying current with industry trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
