import { Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TagChip({ tag }: { tag: string }) {
  return (
    <Badge variant="secondary" className="font-normal text-muted-foreground">
      <Hash className="text-primary" aria-hidden="true" />
      {tag}
    </Badge>
  );
}
