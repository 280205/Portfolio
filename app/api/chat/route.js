import Groq from "groq-sdk";
import { profile, techStack, projects, experience } from "@/lib/data";

// Give Vercel 30s instead of the default 10s timeout
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the AI assistant on ${profile.name}'s portfolio website.
Answer ONLY questions about Nitin Pandey — his background, skills, projects, experience, education and contact.
Be friendly, concise (2-4 sentences max), and accurate. Never make up facts.
Reply in the same language the user writes in.
If asked about unrelated topics, politely decline and redirect back to Nitin.

ABOUT NITIN:
Name: ${profile.name}
Role: ${profile.role}
Email: ${profile.email} | Phone: ${profile.phone}
Location: ${profile.location}
Bio: ${profile.bio}

Education: B.Tech CS & Business Systems, VIT-AP University, CGPA 8.70, Graduating 2026

Experience:
${experience.map((e) => `- ${e.role} at ${e.org} (${e.period}): ${e.detail}`).join("\n")}

Top Skills: ${techStack.slice(0, 14).map((t) => t.name).join(", ")}

Key Projects:
${projects.slice(0, 5).map((p) => `- ${p.name} (${p.category}): ${p.description}`).join("\n")}
`.trim();

export async function POST(req) {
  const key = process.env.GROQ_API_KEY;

  if (!key || key.startsWith("paste_") || key.startsWith("placeholder")) {
    return Response.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  const { messages } = await req.json();

  const groq = new Groq({ apiKey: key });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-6).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content).slice(0, 1000),
      })),
    ],
    temperature: 0.6,
    max_tokens: 400,
  });

  const reply = completion.choices[0]?.message?.content ?? "";
  return Response.json({ reply });
}
