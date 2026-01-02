"use client";

import type { Blog } from "@/lib/content";
import { AuthorSection } from "./author-section";
import { DesktopTableOfContents } from "./toc";

interface BlogSidebarProps {
  headings: Blog["headings"];
  author: Blog["author"];
}

export function BlogSidebar({ headings, author }: BlogSidebarProps) {
  return (
    <div className="hidden md:block sticky top-24 h-fit space-y-4">
      <DesktopTableOfContents headings={headings} />
      <AuthorSection author={author} />
    </div>
  );
}
