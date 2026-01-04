"use client";

import type { Blog } from "@/lib/content";
import { DesktopTableOfContents } from "./toc";

interface BlogSidebarProps {
  headings: Blog["headings"];
}

export function BlogSidebar({ headings }: BlogSidebarProps) {
  return (
    <div className="hidden md:block sticky top-24 h-fit space-y-4">
      <DesktopTableOfContents headings={headings} />
    </div>
  );
}
