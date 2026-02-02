type GenerateProfileTextPayload = {
  name?: string;
  title?: string;
  yearsOfExperience?: number;
  skills?: string[];
  projects?: string[];
  role?: string;
  userText?: string;
};
export async function generateSummary(
  payload: GenerateProfileTextPayload,
): Promise<string> {
  console.log(payload);
  
   const prompt = `
You are improving a portfolio SUMMARY.

Rules:
- Maximum 160 characters
- One sentence
- Professional
- Clear value
- Keep user's intent and wording when possible
- Do NOT invent experience

User typed summary:
"${payload.userText || "N/A"}"

User profile:
Role: ${payload.title || payload.role || "Frontend Developer"}
Experience: ${payload.yearsOfExperience || 1}+ years
Skills: ${payload.skills?.slice(0, 4).join(", ") || "React, JavaScript"}

Task:
Rewrite or enhance the summary. If user text is weak or empty, write a strong one.
`;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: prompt,
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  return data.output_text.trim().slice(0, 160);
}

export async function generateAbout(
  payload: GenerateProfileTextPayload,
): Promise<string> {
 const prompt = `
You are improving an ABOUT section for a portfolio.

Requirements:
- Maximum 600 characters
- 3–5 sentences
- Professional tone
- Preserve user's meaning and voice
- Do NOT exaggerate or add fake experience

User typed about section:
"${payload.userText || "N/A"}"

User profile:
Role: ${payload.title || payload.role || "Frontend Developer"}
Experience: ${payload.yearsOfExperience || 1}+ years
Skills: ${payload.skills?.join(", ") || "React, JavaScript"}
Projects: ${payload.projects?.join(", ") || "Web apps, dashboards"}

Task:
Rewrite, clean up, and enhance the text.
If user text is empty or very short, generate a solid About section.
`;


const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4.1-mini",
    input: prompt,
    temperature: 0.6,
  }),
});

const data = await response.json();
return data.output_text.trim().slice(0, 600);
}
