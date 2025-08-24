import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  ExternalLink,
  Github,
  Linkedin
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
        title: "About | Matthew Gale - Quantitative Developer/Software Developer",
      },
      {
        name: "description",
        content: "Learn about Matthew Gale's background, experience in software development, certifications, and passion for technology.",
      },
      {
        property: "og:title",
        content: "About | Matthew Gale - Quantitative Developer/Software Developer",
      },
      {
        property: "og:description",
        content: "Learn about Matthew Gale's background, experience in software development, certifications, and passion for technology.",
      },
    ],
  }),
  component: AboutComponent,
});

const codingSkills = [
  "Python", "FastAPI", "Pydantic", "SQL", "Typescript", "React", "Git", "R", "PyTest", "Streamlit", "Java", "RESTful APIs", "OOP", "Asynchronous", "Execution"
];
const devOpsSkills = [
  "Azure", "Cloud Computing", "CI/CD", "Container Apps", "Durable Functions", "Pipeline Automation", "Infrastructure as Code", "Big Data ETL"
];
const otherSkills = [
  "Microservices", "Analytics", "Full-Stack", "Service Oriented Architecture", "Data Visualisation", "Credit Risk Models", "Sensitivity Analysis"
];

function SkillsCard() {
  const skillSections = [
    { title: "Coding", skills: codingSkills, slice: 4 },
    { title: "DevOps & Cloud", skills: devOpsSkills, slice: 3 },
    { title: "Other", skills: otherSkills, slice: 3 }
  ];

  // Track expanded state for each section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const getVisibleSkills = (skills: string[], expanded: boolean, slice: number) =>
    expanded ? skills : skills.slice(0, slice);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skillSections.map(({ title, skills, slice }) => {
            const expanded = expandedSections[title] ?? false;
            return (
              <div key={title}>
                <div className="font-semibold text-sm mb-2">{title}</div>
                <div className="flex flex-wrap gap-2">
                  {getVisibleSkills(skills, expanded, slice).map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
                {skills.length > slice && (
                  <div className="mt-2">
                    <button
                      className="text-xs text-primary underline cursor-pointer"
                      onClick={() => toggleSection(title)}
                    >
                      {expanded ? "Show less" : "Show more"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function AboutComponent() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground mb-8">
          Matthew Gale  •  Quantitative Developer
        </h1>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <section className="lg:col-span-2 space-y-8 relative z-10">
          {/* Introduction */}
          <div className="space-y-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Who I Am
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base">
                  I am an experienced quantitative developer with a strong background in building risk models, cloud-native applications, and data-driven solutions. My education includes an MSc in Computer Science (Distinction) and a BSc in Mathematics, equipping me with advanced analytical and programming skills. I specialise in Python, FastAPI, TypeScript, React, and modern DevOps practices, delivering scalable systems and automation across finance, analytics, and technology projects.
                </p>
              </CardContent>
            </Card>
          </div>

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
                    <h3 className="text-lg font-semibold">Quantitative Developer</h3>
                    <span>2021 - Present</span>
                  </div>
                  <ul className="space-y-2 text-sm list-disc ml-5">
                    <li>Built Python-based credit and risk models as APIs using FastAPI and Pydantic, enabling real-time validation, faster delivery cycles, and improved reporting performance.</li>
                    <li>Refactored legacy risk systems from R, Excel, and MATLAB into a modern Python/Azure stack with CI/CD, reducing costs and improving execution speed by over 90%.</li>
                    <li>Developed a reusable Python SDK with portfolio analysis, backtesting, and asynchronous execution, cutting regression testing and analysis time significantly.</li>
                    <li>Created full-stack web tools with React/TypeScript front-ends and Python serverless back-ends, delivering interactive dashboards for risk and financial analysis.</li>
                    <li>Implemented containerized applications and automated pipelines for large-scale model execution and reporting, integrating with cloud data platforms for ETL and analytics.</li>
                    <li>Designed an execution engine using serverless functions and distributed storage, supporting asynchronous large-scale simulations and sensitivity studies.</li>
                    <li>Collaborated across teams on data engineering, analytics, and front-end projects, ensuring delivery of robust and scalable solutions.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">Technology Graduate</h3>
                    <span>2020 - 2021</span>
                  </div>
                  <ul className="space-y-2 text-sm list-disc ml-5">
                    <li>Developed data pipelines and auditing processes to collate, validate, and distribute datasets, strengthening data architecture skills.</li>
                    <li>Maintained quantitative data infrastructure, supporting research and development of risk and analytics models.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">Data Science Secondment</h3>
                    <span>2020</span>
                  </div>
                  <ul className="space-y-2 text-sm list-disc ml-5">
                    <li>Implemented privacy-preserving techniques such as Differential Privacy and Homomorphic Encryption in Python using libraries like PyTorch and TensorFlow Privacy.</li>
                    <li>Researched open-source projects, documenting use cases and presenting findings to technical and non-technical stakeholders.</li>
                  </ul>
                </div>

                {/* <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">Summer Internship</h3>
                    <span>2019</span>
                  </div>
                  <ul className="space-y-2 text-sm list-disc ml-5">
                    <li>Worked with financial data, performing analysis of accounts and revenues for large organisations.</li>
                    <li>Developed professional skills in client communication, reporting, and project delivery.</li>
                  </ul>
                </div> */}
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
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">University of Birmingham</h3>
                    <span>2016 - 2020</span>
                  </div>
                  <ul className="space-y-2 text-sm list-disc ml-5">
                    <li>MSc Computer Science [Distinction] - Intelligent Data Analysis, Data Structures, AI</li>
                    <li>BSc Mathematics [2:1] - Applied Statistics, Statistical Methods in Economics, Mathematical Finance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects & Other */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Projects & Other</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="list-disc ml-5 space-y-1">
                <li>Post-Quantum Cryptographic Analysis: Built models to test computational performance and security of post-quantum protocols using regression and Monte Carlo simulation.</li>
                <li>Option Pricing with Monte Carlo: Developed stochastic pricing models in MATLAB, comparing Lognormal Random Walks and Black-Scholes approaches.</li>
                <li>Portfolio Optimisation: Created an investment portfolio optimiser using mean-variance theory, improving quantitative finance and teamwork skills.</li>
                <li>Extracurricular: Active in Mathematics Society and Gymnastics team; served as treasurer in final year.</li>
              </ul>
              <div className="mt-2 text-xs text-muted-foreground">JULY 30, 2025 · CURRICULUM VITAE 1</div>
            </CardContent>
          </Card> */}
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
                  <span className="text-sm">London, United Kingdom</span>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">4+ years experience</span>
                </li>
                <li className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Full-stack Developer</span>
                </li>
                <li className="flex items-center gap-3">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                    <Link 
                    to="/showcase" 
                    className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1"
                    >
                    <span className="font-bold">Project Showcase</span>
                    </Link>
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
                    <h3 className="font-semibold text-sm">Azure Fundamentals</h3>
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

          {/* Skills Card */}
          <SkillsCard />

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Let's Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a 
                  href="mailto:mgale694@gmail.com" 
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>mgale694@gmail.com</span>
                </a>
                <a 
                  href="https://github.com/mgale694" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                   <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com/in/M-Gale" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                   <ExternalLink className="w-4 h-4" />
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
                  <h4 className="font-semibold mb-1">Technology</h4>
                  <p className="text-muted-foreground">Exploring new frameworks, tools, and development methodologies</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Learning</h4>
                  <p className="text-muted-foreground">Continuous skill development and staying current with industry trends</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Open Source</h4>
                  <p className="text-muted-foreground">Contributing to projects and sharing knowledge with the developer community</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

