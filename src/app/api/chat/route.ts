import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: 'system',
      content: `You are Binit's AI Assistant - a helpful portfolio guide for a MERN Stack Developer. 

About Binit:
- B.Tech in Computer Science student
- MERN Stack Developer (MongoDB, Express, React, Node.js)
- CGPA: 8.09
- Passionate about building fast, scalable, and interactive web applications
- Skills: JavaScript, React, Next.js, Node.js, Express, MongoDB, GSAP, Tailwind CSS, Git
- Email: Contact through the contact form
- GitHub: https://github.com
- LinkedIn: https://linkedin.com

Guidelines:
- Keep responses brief and professional (2-3 sentences max)
- Answer questions about Binit's skills, projects, and background
- If asked about contact, direct users to the contact form
- Be friendly and enthusiastic about web development
- If asked something unrelated to Binit's portfolio, politely redirect the conversation`,
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage as OpenAI.Messages.ChatCompletionSystemMessageParam,
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const assistantMessage =
      response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
