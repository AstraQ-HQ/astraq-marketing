import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "../copy-button";

export function Shell({
  code,
  meta,
}: {
  code: string;
  meta: Record<string, string | undefined>;
}) {
  const tabs = meta.tabs?.split(",");
  const separator = meta.separator ?? "---";

  if (tabs) {
    const codes = code.split(separator).map((code) => code.trim());

    return (
      <Tabs className="relative mt-6 gap-0" defaultValue={tabs[0]}>
        <TabsList className="justify-start rounded-none border border-b-0 bg-transparent p-0 rounded-t-lg">
          {tabs.map((tab) => (
            <TabsTrigger
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-t-lg"
              key={tab}
              value={tab}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {codes.map((code, index) => (
          <TabsContent
            className="relative"
            key={tabs[index]}
            value={tabs[index] ?? ""}
          >
            <pre className="default-callout border relative mb-4 max-h-[650px] overflow-x-auto rounded-b-lg px-2 py-3">
              <CopyButton className="top-1.5 right-1 absolute" code={code} />
              <code className="text-foreground">
                <span className="text-primary">$&gt;</span> {code}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  return (
    <pre className="default-callout border relative my-4 max-h-[650px] overflow-x-auto rounded-lg px-2 py-3">
      <CopyButton className="top-1.5 right-1 absolute" code={code} />
      <code className="text-foreground">
        <span className="text-primary">$&gt;</span> {code}
      </code>
    </pre>
  );
}
