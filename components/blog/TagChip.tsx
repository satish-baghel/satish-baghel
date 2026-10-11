import { FaTag } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

export function TagChip({ tag }: { tag: string }) {
  return (
    <Badge variant="outline">
      <FaTag className="text-primary" size={10} aria-hidden="true" />
      {tag}
    </Badge>
  );
}
