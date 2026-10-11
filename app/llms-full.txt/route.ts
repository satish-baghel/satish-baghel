import { llmsFullTxt, textResponse } from "@/lib/llms";

// The whole profile as one plain-text file for AI assistants. See lib/llms.ts.
export const dynamic = "force-static";

export function GET(): Response {
  return textResponse(llmsFullTxt());
}
