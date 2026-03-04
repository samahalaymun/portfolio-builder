import { Injectable, OnModuleInit } from '@nestjs/common';
import { GenerateSummaryDto } from './dto/generate-summary.dto';
import Groq from 'groq-sdk';

@Injectable()
export class AiService implements OnModuleInit {
  private groq!: Groq;

  onModuleInit() {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error(
        'GROQ_API_KEY is not defined. ' +
          'Get your FREE key from: https://console.groq.com/keys',
      );
    }

    this.groq = new Groq({ apiKey });

    console.log('✅ Groq AI Service initialized successfully');
  }

  private async callGroq(
    prompt: string,
    systemPrompt?: string,
  ): Promise<string> {
    try {
      const messages: any[] = [];

      // Add system prompt if provided
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt,
        });
      }

      messages.push({
        role: 'user',
        content: prompt,
      });

      const completion = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile', // High quality model
        messages,
        temperature: 0.8, // ✅ Increased for more creative output
        max_tokens: 800, // ✅ Increased for longer responses
        top_p: 0.95, // ✅ Better diversity
      });

      return completion.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error('AI generation failed: ' + error.message);
    }
  }

  async generateSummary(dto: GenerateSummaryDto) {
    const systemPrompt = `You are an expert portfolio writer who creates compelling, professional summaries. 
Your summaries are specific, impactful, and highlight real value. 
You write in a clear, confident tone that showcases expertise without being generic.`;

    const prompt = `Create a powerful professional summary for a portfolio.

CONTEXT:
Role: ${dto.role || 'Frontend Developer'}
Skills: ${dto.skills?.slice(0, 4).join(', ') || 'React, JavaScript'}
${dto.userText ? `Current summary: "${dto.userText}"` : 'No existing summary - create from scratch'}

REQUIREMENTS:
- Maximum 160 characters (strict limit)
- One well-crafted sentence
- Be SPECIFIC about what they do and their focus
- Include their role, key technologies, and their approach/value
- Use active, confident language
- NO generic phrases like "crafting solutions" or "passionate developer"
- Make it memorable and differentiated

EXAMPLES OF GOOD SUMMARIES:
- "Full Stack Developer building scalable web applications with React and Node.js, focused on clean architecture and user value."
- "Frontend Engineer specializing in React and TypeScript, creating performant interfaces that solve real user problems."
- "Software Developer designing robust backend systems with Node.js and PostgreSQL, emphasizing reliability and maintainability."

Now write the summary. Return ONLY the summary text (no quotes, no explanation, no preamble):`;

    const text = await this.callGroq(prompt, systemPrompt);
    const cleaned = text.replace(/^["']|["']$/g, '').trim();

    return { text: cleaned.slice(0, 160) };
  }

  async generateAbout(dto: GenerateSummaryDto) {
    const systemPrompt = `You are an expert portfolio writer who creates authentic, engaging "About" sections.
Your writing is conversational yet professional, specific rather than generic, and tells a compelling story.
You focus on real experiences, genuine passion, and concrete skills rather than buzzwords.
You MUST stay within the 800 character limit - this is critical.`;

    const prompt = `Write a compelling "About" section for a portfolio.

CONTEXT:
Role: ${dto.role || 'Frontend Developer'}
Skills: ${dto.skills?.join(', ') || 'Web Development'}
${dto.userText ? `Current about text: "${dto.userText}"` : 'No existing text - create from scratch'}

STRICT REQUIREMENTS:
- MAXIMUM 800 characters total (strict limit - count every character including spaces)
- Write 2-3 concise paragraphs
- First person perspective ("I", "my", "me")
- Start with what drives you or how you got into this field
- Be SPECIFIC about your skills and what you've built
- Include your approach to work (e.g., focus on user needs, clean code, collaboration)
- End with what you're looking for or excited about
- Use natural, conversational language
- Avoid clichés like "passionate coder" or "problem solver"
- Make it authentic and relatable

CHARACTER COUNT: Aim for 600-800 characters to maximize impact while staying under limit

STRUCTURE:
Paragraph 1: Your background and what drives you (2-3 sentences, ~200-250 chars)
Paragraph 2: Your skills, experience, and approach (3-4 sentences, ~250-350 chars)  
Paragraph 3: What you're focused on now and future goals (2-3 sentences, ~150-200 chars)

TONE: Professional but warm, confident but humble, specific but accessible

CRITICAL: Stay under 800 characters. If you approach the limit, prioritize quality over quantity.

Write the about section. Return ONLY the about text (no explanation, no quotes):`;

    const text = await this.callGroq(prompt, systemPrompt);
    const cleaned = text.trim();

    // ✅ Enforce 800 character limit on backend
    if (cleaned.length > 800) {
      // Truncate at last complete sentence before 800 chars
      const truncated = cleaned.slice(0, 800);
      const lastPeriod = truncated.lastIndexOf('.');
      const lastExclamation = truncated.lastIndexOf('!');
      const lastQuestion = truncated.lastIndexOf('?');

      const lastSentenceEnd = Math.max(
        lastPeriod,
        lastExclamation,
        lastQuestion,
      );

      if (lastSentenceEnd > 600) {
        // Only truncate if we have at least 600 chars
        return { text: truncated.slice(0, lastSentenceEnd + 1).trim() };
      }

      // Fallback: hard truncate at 800 with ellipsis
      return { text: truncated.slice(0, 797) + '...' };
    }

    return { text: cleaned };
  }

  async generateProjectDescription(dto: {
    title: string;
    technologies?: string[];
    userText?: string;
  }) {
    const systemPrompt = `You are an expert at writing compelling project descriptions that showcase technical skills and real-world impact.
Your descriptions are specific, results-oriented, and highlight both the technical implementation and user value.`;

    const prompt = `Write a compelling project description.

PROJECT INFO:
Title: ${dto.title}
Technologies: ${dto.technologies?.join(', ') || 'N/A'}
${dto.userText ? `Current description: "${dto.userText}"` : 'No existing description'}

REQUIREMENTS:
- 2-4 sentences (50-100 words)
- Explain WHAT the project does (clear, specific)
- Highlight the technical implementation (technologies, architecture, challenges solved)
- Mention the impact or value (users helped, problem solved, metrics if relevant)
- Use active language and specific details
- Avoid generic phrases like "cutting-edge" or "innovative"

STRUCTURE:
Sentence 1: What the project is and what it does
Sentence 2: Key technical details and how it was built
Sentence 3-4: Impact, results, or unique features

EXAMPLES:
- "A real-time chat application built with React, Node.js, and WebSockets, enabling instant messaging for up to 1000 concurrent users. Implemented efficient state management with Redux and optimized database queries to reduce message latency by 40%."
- "An e-commerce platform using Next.js and Stripe, featuring dynamic product filtering and secure checkout. Integrated Stripe webhooks for payment processing and implemented server-side rendering for improved SEO and page load speed."

Write the project description. Return ONLY the description (no explanation):`;

    const text = await this.callGroq(prompt, systemPrompt);
    return { text: text.trim() };
  }

  async generateExperienceDescription(dto: {
    role: string;
    company: string;
    userText?: string;
  }) {
    const systemPrompt = `You are an expert at writing impactful experience descriptions that highlight achievements and technical contributions.
Your descriptions use action verbs, quantify results when possible, and focus on value delivered rather than just responsibilities.`;

    const prompt = `Write a professional experience description.

EXPERIENCE INFO:
Role: ${dto.role}
Company: ${dto.company}
${dto.userText ? `Current description: "${dto.userText}"` : 'No existing description'}

REQUIREMENTS:
- 2-4 bullet points or 2-3 sentences (60-120 words)
- Start with strong action verbs (Built, Developed, Led, Implemented, Designed, Architected, Optimized)
- Be SPECIFIC about what you built and the technologies used
- Include measurable impact when possible (metrics, scale, efficiency gains)
- Focus on achievements, not just responsibilities
- Mention collaboration or leadership if relevant

STRUCTURE:
Point 1: Main technical contribution and technologies
Point 2: Key achievement or impact with metrics
Point 3: Additional responsibility or collaboration aspect

EXAMPLES:
- "Developed a microservices architecture using Node.js and Docker, reducing deployment time by 60% and improving system reliability. Led a team of 3 developers in migrating legacy monolith to containerized services. Implemented CI/CD pipeline with GitHub Actions and automated testing, increasing deployment frequency from weekly to daily."
- "Built responsive web applications using React and TypeScript, serving 50,000+ daily active users. Optimized component rendering and state management, improving page load time by 45%. Collaborated with designers to implement pixel-perfect UI components and ensure WCAG 2.1 AA accessibility compliance."

Write the experience description. Return ONLY the description (no bullet markers, just the text):`;

    const text = await this.callGroq(prompt, systemPrompt);
    return { text: text.trim() };
  }
  async generateEducationDescription(dto: {
    institution: string;
    degree: string;
    field: string;
    userText?: string;
  }) {
    const systemPrompt = `You are an expert at writing concise, impactful education descriptions that highlight relevant coursework, achievements, and skills gained.
Your descriptions focus on practical skills and academic accomplishments that are relevant to professional roles.`;

    const prompt = `Write a compelling education description.

EDUCATION INFO:
Institution: ${dto.institution}
Degree: ${dto.degree}
Field of Study: ${dto.field}
${dto.userText ? `Current description: "${dto.userText}"` : 'No existing description'}

REQUIREMENTS:
- 1-3 sentences (40-80 words)
- Mention relevant coursework, projects, or specializations
- Highlight academic achievements (GPA, honors, awards) if typical for the field
- Include specific skills or technologies learned
- Focus on what's relevant to professional work
- Use professional, concise language
- Avoid generic phrases like "gained valuable knowledge"

STRUCTURE:
Sentence 1: Degree focus and relevant coursework/specialization
Sentence 2: Key academic achievements, projects, or skills developed
Sentence 3: (Optional) Additional honors, activities, or certifications

EXAMPLES:
- "Focused on full-stack web development and database systems. Built 5 major projects including a social media platform using React and Node.js. Graduated with honors (3.8 GPA) and served as president of the Computer Science Club."
- "Specialized in machine learning and data science. Completed coursework in neural networks, statistical analysis, and big data processing. Senior capstone project used TensorFlow to build a predictive model with 92% accuracy."
- "Concentrated on software engineering principles and algorithms. Developed proficiency in Java, Python, and C++ through coursework and personal projects. Received Dean's List recognition for 4 consecutive semesters."
- "Studied human-computer interaction and UI/UX design. Created a mobile app prototype for my thesis that improved user task completion by 35%. Awarded Best Design Project in graduating class."

Write the education description. Return ONLY the description (no explanation):`;

    const text = await this.callGroq(prompt, systemPrompt);
    return { text: text.trim() };
  }
}
