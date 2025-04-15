// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!
console.log("api key : ", GEMINI_API_KEY)
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }],
    }),
  })

  const data = await response.json()
  console.log("Gemini API response:", data);
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."

  return NextResponse.json({ reply })
}
