import Image from "next/image";
import { siteConfig } from "@/lib/constants";

export function BackedBySection() {
  const { backers } = siteConfig.pages.home.backedBy;

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-center justify-start">
          <h2 className="font-mono text-2xl sm:text-3xl text-foreground mb-4">
            {siteConfig.pages.home.backedBy.title}
          </h2>
          <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
            {backers.map((backer) => (
              <div
                key={backer.name}
                className="h-12 rounded-sm p-1 bg-white flex items-center"
              >
                <Image
                  src={backer.logo}
                  alt={backer.name}
                  width={200}
                  height={40}
                  className="object-contain h-10"
                  style={{ width: "auto" }}
                />
                <span className="sr-only">{backer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
