import { CopyButton } from "@/components/CopyButton";

/**
 * Static "command card" for the home hero — the classic developer flex.
 * Server component; only the copy button is interactive (client).
 */
export function Terminal({
  command = "npm i satish-baghel",
}: {
  command?: string;
}) {
  return (
    <div className="terminal" role="img" aria-label={`Terminal running ${command}`}>
      <div className="terminal-head">
        <span className="code-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>zsh — satish-baghel</span>
        <span style={{ marginLeft: "auto" }}>
          <CopyButton code={command} />
        </span>
      </div>
      <div className="terminal-body">
        <div>
          <span className="prompt">$</span> {command}
        </div>
        <div className="ok">＋ satish-baghel@5.0.0</div>
        <div className="comment"># added 1 senior full-stack developer in 0.2s</div>
        <div>
          <span className="prompt">$</span> ready to build
          <span className="caret" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
