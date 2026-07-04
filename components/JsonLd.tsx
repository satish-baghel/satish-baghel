/**
 * Renders a <script type="application/ld+json"> block.
 * Server component; JSON.stringify output is safe (no user HTML injected).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
