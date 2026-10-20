"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";
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
    <Card className="gap-0 overflow-hidden py-0 shadow-[var(--shadow-card)]">
      {/* Conversation area */}
      <div
        ref={scrollRef}
        className="flex h-[26rem] flex-col gap-5 overflow-y-auto p-5 sm:p-6"
      >
        {messages.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex items-start gap-3">
              <BotAvatar />
              <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start justify-end gap-3">
              <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-brand-gradient px-4 py-3 text-sm leading-relaxed text-white shadow-md shadow-primary/20">
                {m.content}
              </div>
            </div>
          ),
        )}

        {loading && (
          <div className="flex items-start gap-3">
            <BotAvatar />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-4">
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
                className="h-auto whitespace-normal rounded-full py-1.5 text-left text-xs font-normal text-muted-foreground hover:border-primary/50 hover:text-primary"
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
        className="flex items-center gap-2 border-t bg-card p-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my resume…"
          aria-label="Ask about my resume"
          className="h-11 flex-1 rounded-xl"
        />
        <Button
          type="submit"
          size="icon-lg"
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="size-11 rounded-xl bg-brand-gradient text-white"
        >
          <Send />
        </Button>
      </form>
    </Card>
  );
}

function BotAvatar() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Bot className="size-[18px]" aria-hidden="true" />
    </div>
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
