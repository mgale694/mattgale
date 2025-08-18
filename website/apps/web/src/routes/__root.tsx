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
        title: "Matt Gale - Software Developer & Photographer",
      },
      {
        name: "description",
        content: "Personal website and blog of Matt Gale - Software Developer, photographer, and technology enthusiast. Explore my projects, photography, and thoughts on software development.",
      },
      {
        name: "keywords",
        content: "Matt Gale, software developer, photographer, web development, blog, portfolio, React, TypeScript, photography",
      },
      {
        name: "author",
        content: "Matt Gale",
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
        content: "https://mattgale.com/",
      },
      {
        property: "og:title",
        content: "Matt Gale - Software Developer & Photographer",
      },
      {
        property: "og:description",
        content: "Personal website and blog of Matt Gale - Software Developer, photographer, and technology enthusiast. Explore my projects, photography, and thoughts on software development.",
      },
      {
        property: "og:image",
        content: "https://mattgale.com/og-image.jpg",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:title",
        content: "Matt Gale - Software Developer & Photographer",
      },
      {
        property: "twitter:description",
        content: "Personal website and blog of Matt Gale - Software Developer, photographer, and technology enthusiast. Explore my projects, photography, and thoughts on software development.",
      },
      {
        property: "twitter:image",
        content: "https://mattgale.com/og-image.jpg",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "canonical",
        href: "https://mattgale.com/",
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
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
          <Header />
          <main className="flex-1">
            {isFetching ? <Loader /> : <Outlet />}
          </main>
          <Footer />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
