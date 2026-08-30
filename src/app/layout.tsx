import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Pinned Hero Scroll",
  description:
    "A simple scroll animation with pinned hero section and smooth scrolling using Lenis and GSAP.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
