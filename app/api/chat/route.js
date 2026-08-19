import Groq from "groq-sdk";
import { profile, techStack, projects, experience, certifications } from "@/lib/data";

// Models actually available on this Groq account (verified via /v1/models)
const MODEL = "openai/gpt-oss-20b";          // fast 20B model
const MODEL_FALLBACK = "qwen/qwen3.6-27b";   // 27B, great multilingual support

const SYSTEM_PROMPT = `You are the AI assistant on ${profile.name}'s portfolio website.
Answer ONLY questions about Nitin Pandey — his background, skills, projects, experience, education, certifications, and contact.
Be friendly, concise (2-3 sentences), and accurate. Never make up facts.
Reply in the same language the user writes in.
If asked about unrelated topics, politely decline and redirect back to Nitin.
Do NOT output your reasoning or internal thoughts. Just output the final response.

ABOUT NITIN:
Name: ${profile.name} | Role: ${profile.role}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}
Bio: ${profile.bio}
Education: B.Tech CS & Business Systems, VIT-AP University, CGPA 8.70, Graduating 2026
Experience: ${experience.map((e) => `${e.role} at ${e.org} (${e.period})`).join("; ")}
Top Skills: ${techStack.slice(0, 12).map((t) => t.name).join(", ")}
Certifications: ${certifications.map((c) => `${c.title} by ${c.issuer}`).join("; ")}
Projects: ${projects.slice(0, 4).map((p) => `${p.name} — ${p.description}`).join("; ")}
`.trim();

export async function POST(req) {
  try {
    const key = process.env.GROQ_API_KEY;

    if (!key || key.startsWith("paste_") || key.startsWith("placeholder")) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const { messages } = await req.json();
    const groq = new Groq({ apiKey: key });

    let reply = "";
    for (const model of [MODEL, MODEL_FALLBACK]) {
      try {
        const completion = await groq.chat.completions.create({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-4).map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: String(m.content).slice(0, 800),
            })),
          ],
          temperature: 0.6,
          max_tokens: 200,
        });
        
        let rawReply = completion.choices[0]?.message?.content ?? "";
        // Strip out <think> tags that some models (like Qwen) leak
        reply = rawReply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
        
        if (reply) break;
      } catch (modelErr) {
        console.error(`model ${model} failed:`, modelErr?.message);
      }
    }

    return Response.json({ reply });
  } catch (err) {
    console.error("chat route error:", err?.message);
    return Response.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
