"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const SUGGESTIONS = [
  "What's Satish's most recent role?",
  "Which technologies does he work with?",
  "Tell me about his projects",
  "How can I get in touch?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm an AI assistant that can answer questions about Satish's resume. What would you like to know?",
};

export function ResumeChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Network error — please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <Card className="overflow-hidden">
      {/* Conversation area */}
      <div
        ref={scrollRef}
        className="flex h-[26rem] flex-col gap-5 overflow-y-auto p-5 sm:p-6"
      >
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex items-start gap-3">
              <BotAvatar />
              <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm border border-border bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start justify-end gap-3">
              <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-primary-solid px-4 py-3 text-sm leading-relaxed text-white">
                {m.content}
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex items-start gap-3">
            <BotAvatar />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-muted px-4 py-4">
              <Dot delay="0ms" />
              <Dot delay="150ms" />
              <Dot delay="300ms" />
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="ml-11 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Button
                key={s}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => send(s)}
                className="h-auto whitespace-normal rounded-full bg-muted px-3.5 py-2 text-left font-mono text-xs font-normal text-muted-foreground"
              >
                {s}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border bg-card p-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my resume…"
          aria-label="Ask about my resume"
          className="h-12 flex-1 bg-muted"
        />
        <Button
          type="submit"
          size="icon"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="size-12"
        >
          <SendIcon />
        </Button>
      </form>
    </Card>
  );
}

function BotAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M12 8V4M9 4h6" />
        <circle cx="9" cy="14" r="1" />
        <circle cx="15" cy="14" r="1" />
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  );
}
