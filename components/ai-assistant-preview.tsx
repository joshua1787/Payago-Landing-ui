"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Sparkles, User } from "lucide-react"

const samplePrompts = [
  "Plan a romantic getaway to Italy",
  "Find hidden gems in Tokyo",
  "Budget-friendly European adventure",
  "Best beaches for solo travelers",
]

const sampleConversation = [
  {
    role: "user",
    content: "I want to plan a 7-day trip to Japan in April",
  },
  {
    role: "assistant",
    content:
      "Wonderful choice! April is perfect for cherry blossoms. I'll create an itinerary covering Tokyo, Kyoto, and Osaka with the best hanami spots, cultural experiences, and local cuisine recommendations.",
  },
  {
    role: "user",
    content: "Can you add some off-the-beaten-path locations?",
  },
  {
    role: "assistant",
    content:
      "I'll include the serene Philosopher's Path in Kyoto, the artistic island of Naoshima, and the historic town of Kanazawa. These gems offer authentic experiences away from tourist crowds.",
  },
]

export function AiAssistantPreview() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">AI Assistant</h2>
            <h3 className="text-3xl lg:text-5xl font-serif font-medium text-foreground leading-tight mb-6 text-balance">
              Your personal travel companion
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Chat naturally with our AI to discover destinations, get personalized recommendations, and plan every
              detail of your journey. It learns your preferences and adapts to your style.
            </p>

            {/* Sample Prompts */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPrompt(prompt)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all ${
                      selectedPrompt === prompt
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-secondary/50 border-border/50 text-muted-foreground hover:border-accent/30"
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Chat Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-secondary/30">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Payogo Assistant</p>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                {sampleConversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-foreground rounded-bl-md"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border/50 bg-background">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything about your trip..."
                    className="flex-1 bg-secondary/50 border border-border/50 rounded-full px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <Button
                    size="icon"
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
