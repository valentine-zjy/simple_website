import { compileMDX } from "next-mdx-remote/rsc";

import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  source: string;
  compact?: boolean;
};

export async function MarkdownContent({
  source,
  compact = false,
}: MarkdownContentProps) {
  let contentNode;

  try {
    const compiled = await compileMDX({
      source,
      options: {
        parseFrontmatter: false,
      },
    });
    contentNode = compiled.content;
  } catch (error) {
    console.error("Failed to render MDX content.", error);
    contentNode = <p>Content failed to render. Please check the MDX syntax.</p>;
  }

  return <div className={cn("prose-block", compact && "compact")}>{contentNode}</div>;
}
