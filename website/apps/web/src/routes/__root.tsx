import Header from "@/components/header";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Matthew Gale - Quantitative Developer/Software Developer",
      },
      {
        name: "description",
        content: "Personal website and blog of Matthew Gale - Quantitative Developer/Software Developer and technology enthusiast. Explore my projects and thoughts on software development.",
      },
      {
        name: "keywords",
        content: "Matthew Gale, Quantitative Developer/Software Developer, web development, blog, portfolio, React, TypeScript",
      },
      {
        name: "author",
        content: "Matthew Gale",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://matthewgale.co.uk/",
      },
      {
        property: "og:title",
        content: "Matthew Gale - Quantitative Developer/Software Developer",
      },
      {
        property: "og:description",
        content: "Personal website and blog of Matthew Gale - Quantitative Developer/Software Developer and technology enthusiast. Explore my projects and thoughts on software development.",
      },
      {
        property: "og:image",
        content: "https://matthewgale.co.uk/og-image.jpg",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:title",
        content: "Matthew Gale - Quantitative Developer/Software Developer",
      },
      {
        property: "twitter:description",
        content: "Personal website and blog of Matthew Gale - Quantitative Developer/Software Developer and technology enthusiast. Explore my projects and thoughts on software development.",
      },
      {
        property: "twitter:image",
        content: "https://matthewgale.co.uk/og-image.jpg",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "canonical",
        href: "https://matthewgale.co.uk/",
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange={false}
        storageKey="vite-ui-theme"
      >
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex-1 relative">
            {isFetching && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <Loader />
              </div>
            )}
            <div className={`transition-opacity duration-200 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
