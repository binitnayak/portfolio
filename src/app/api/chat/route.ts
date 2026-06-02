import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-if-not-configured',
});

async function getGeminiResponse(messages: any[], systemPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  // Format messages for Gemini
  const formattedContents = messages
    .filter((msg: any) => msg.role === 'user' || msg.role === 'assistant')
    .map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

  const response = await fetch(geminiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const assistantText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!assistantText) {
    throw new Error('Empty response from Gemini');
  }

  return assistantText;
}

function getLocalResponse(messages: any[]): string {
  const lastUserMessage = messages
    .filter((m: any) => m.role === 'user')
    .pop()?.content || '';
  
  const query = lastUserMessage.toLowerCase().trim();

  // Helper lists of variations to prevent repeating the same sentence every time
  const greetings = [
    "Hey! 👋 How can I help you today? Feel free to ask about Binit's skills, projects, or background!",
    "Hi there! 😊 I'm Binit's AI Assistant. What would you like to know about him?",
    "Hello! 👋 Ask me anything about Binit's portfolio - like his skills, education, or projects!"
  ];

  const skillResponses = [
    "Binit is skilled in the MERN stack, which includes MongoDB, Express, React, and Node.js.",
    "He specializes in full-stack MERN development (MongoDB, Express, React, Node.js) to build dynamic web applications.",
    "Binit's core technical arsenal is the MERN stack, meaning he works with MongoDB, Express, React, and Node.js."
  ];

  const projectResponses = [
    "Binit has worked on projects like WebGL experiences and web development apps.",
    "He has built interactive WebGL experiences as well as various web development applications.",
    "You can check out his work on WebGL animations and full-stack web development applications."
  ];

  const educationResponses = [
    "Binit is currently pursuing his B.Tech and has maintained a CGPA of 8.09.",
    "He is a B.Tech student with a solid CGPA of 8.09.",
    "Binit is studying for his B.Tech degree, where he holds a CGPA of 8.09."
  ];

  const contactResponses = [
    "You can reach him via email or the portfolio contact form.",
    "Feel free to get in touch with Binit via email or through the contact form on this portfolio.",
    "Binit can be contacted directly through email or the portfolio's contact form."
  ];

  const clarifies = [
    "I'm not sure I quite got that. Could you please clarify your question? 😊",
    "Could you rephrase that or ask about Binit's skills, projects, or education? I'd love to help!",
    "Sorry, I didn't catch that. Could you please clarify what you'd like to know about Binit?"
  ];

  // Helper function to pick a random element
  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // 1. Check for greetings
  if (/\b(hi|hello|hey|greetings|yo|hiya|morning|afternoon|evening)\b/.test(query)) {
    return pickRandom(greetings);
  }

  // 2. Check for skills (with spelling tolerance, e.g. "skils", "tech", "mern", "frontend", "backend")
  if (/\b(skil|skils|skills|tech|stack|mern|languages|frameworks|database|mongodb|express|react|node)\b/.test(query)) {
    return pickRandom(skillResponses) + " " + pickRandom(["Want to know about his projects?", "Would you like to know about his education?", "Let me know if you want to know about his projects!"]);
  }

  // 3. Check for projects (with spelling tolerance, e.g. "project", "projct", "work", "webgl", "app")
  if (/\b(project|projects|projct|projcts|work|webgl|app|apps|built|portfolio)\b/.test(query)) {
    return pickRandom(projectResponses) + " " + pickRandom(["Would you like to know how to contact him?", "Want to know about his technical skills?", "Let me know if you'd like to contact him!"]);
  }

  // 5. Check for contact (with spelling tolerance, e.g. "contact", "contect", "email", "reach", "hire", "phone", "mail")
  if (/\b(contact|contect|email|reach|hire|phone|mail|social|linkedin|github)\b/.test(query)) {
    return pickRandom(contactResponses);
  }

  // 4. Check for education (with spelling tolerance, e.g. "education", "edcuation", "study|college|university|btech|degree|cgpa|gpa|marks")
  if (/\b(education|edcuation|study|studying|college|university|btech|degree|cgpa|gpa|marks|grades)\b/.test(query)) {
    return pickRandom(educationResponses) + " " + pickRandom(["Interested in his technical skills?", "Want to hear about his WebGL projects?", "Let me know if you'd like to check out his projects!"]);
  }

  // 6. Check for resume
  if (/\b(resume|cv|download)\b/.test(query)) {
    return "You can download Binit's resume using the 'Download CV' button in the About section of this page!";
  }

  // 7. If question is unclear, ask to clarify
  return pickRandom(clarifies);
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are Binit's AI Portfolio Assistant.

Your job is to answer questions about Binit in a friendly and helpful way.

About Binit:
- He is a B.Tech student.
- His CGPA is 8.09.
- He is skilled in MERN Stack (MongoDB, Express, React, Node.js).
- He has worked on projects like WebGL experiences and web development apps.

Instructions:
- Always respond based on the user's question.
- Do NOT repeat the same sentence every time.
- Understand even if the user makes spelling mistakes (like "contect" instead of "contact").
- If the user asks about:
  - skills → talk about MERN stack
  - projects → mention WebGL and web projects
  - education → mention B.Tech and CGPA
  - contact → say "You can reach him via email or portfolio contact form."
- If the question is unclear, politely ask the user to clarify.
- Keep responses short, friendly, and human-like.
- Avoid repeating the same intro again and again.

Example tone:
"Hey! 👋 Binit is skilled in the MERN stack, which includes MongoDB, Express, React, and Node.js."
"Want to know about his projects or how to contact him?"`;

    // 1. Try Gemini API if key is available
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (geminiApiKey) {
      try {
        const reply = await getGeminiResponse(messages, systemPrompt);
        return NextResponse.json({ message: reply });
      } catch (geminiError) {
        console.error('Gemini API call failed:', geminiError);
      }
    }

    // 2. Try OpenAI API if key is configured
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy-key-if-not-configured') {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt } as any,
            ...messages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        });

        const reply = response.choices[0]?.message?.content;
        if (reply) {
          return NextResponse.json({ message: reply });
        }
      } catch (openaiError) {
        console.error('OpenAI API call failed:', openaiError);
      }
    }

    // 3. Fallback: Smart local response generator
    const reply = getLocalResponse(messages);
    return NextResponse.json({ message: reply });

  } catch (error) {
    console.error('Chat API unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

