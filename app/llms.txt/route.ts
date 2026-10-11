import { llmsTxt, textResponse } from "@/lib/llms";

// Built at deploy time from lib/resume.ts and the posts folder, so it always
// matches the site. See lib/llms.ts for the content.
export const dynamic = "force-static";

export function GET(): Response {
  return textResponse(llmsTxt());
}
