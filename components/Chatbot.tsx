"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "bot"
  content: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      const botMessage: Message = { role: "bot", content: data.reply }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full z-10 p-4 shadow-lg bg-red-600 hover:bg-red-700 text-white">
          Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <div className="flex flex-col gap-2">
          <div className="max-h-80 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-md text-black ${
                  msg.role === "user" ? "bg-red-100 text-right" : "bg-gray-100 text-left"
                }`}
              >
                <p><strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}</p>
              </div>
            ))}
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
