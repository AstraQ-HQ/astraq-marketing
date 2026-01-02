import Image from "next/image";
import type { Blog } from "@/lib/content";

interface AuthorSectionProps {
  author: Blog["author"];
}

export function AuthorSection({ author }: AuthorSectionProps) {
  return (
    <div className="rounded-lg border bg-card border-border p-4">
      <p className="text-xl font-bold mb-2">About the author</p>
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-start gap-4">
          <div className="size-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image
              src={author.avatar ?? "/images/astraq-avatar.png"}
              alt={author.name}
              className="size-full object-cover"
              height={40}
              width={40}
            />
          </div>
          <h3 className="font-mono text-xl">{author.name}</h3>
        </div>
        {author.bio && (
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">{author.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
