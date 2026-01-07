import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type SeriesListProps = {
  seriesName: string;
  parts: {
    slug: string;
    title: string;
    part: number;
  }[];
  currentPart: number;
};

export function SeriesList({ seriesName, parts, currentPart }: SeriesListProps) {
  return (
    <div className="my-4 p-4 border border-border rounded-lg bg-muted/30">
      <div className="mb-2">
        <h3 className="font-mono text-base font-semibold mb-1">Series: {seriesName}</h3>
      </div>
      <ol className="space-y-1 max-h-80 overflow-y-auto">
        {parts.map((part) => {
          const isCurrent = part.part === currentPart;
          return (
            <li key={part.slug}>
              {isCurrent ? (
                <div className="flex items-start gap-2 p-2 rounded-md bg-accent/10 border-l-2 border-accent">
                  <Badge variant="default" className="mt-0.5 shrink-0 text-xs">
                    Part {part.part}
                  </Badge>
                  <span className="font-medium text-accent-foreground text-sm">
                    {part.title}
                  </span>
                </div>
              ) : (
                <Link
                  href={`/blog/${part.slug}`}
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors group"
                >
                  <Badge variant="outline" className="mt-0.5 shrink-0 text-xs">
                    Part {part.part}
                  </Badge>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm">
                    {part.title}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
