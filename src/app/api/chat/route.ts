import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are Binit's AI Portfolio Assistant.

Your job is to answer questions about Binit in a friendly, enthusiastic, and helpful way.

About Binit:
- He is a B.Tech student with a CGPA of 8.09.
- He is highly skilled in the MERN Stack (MongoDB, Express, React, Node.js).
- He has worked on advanced projects including interactive WebGL experiences and full-stack web applications.
- He is passionate about building performant and beautiful user interfaces.

Instructions:
- Keep your responses concise, friendly, and human-like.
- Use emojis naturally but don't overdo it.
- Use markdown formatting! Bold important keywords (like **React** or **MERN**) and use bullet points when listing skills or projects.
- If the user asks about contact, tell them they can reach him via email or use the portfolio's contact form.
- Always try to steer the conversation back to Binit's impressive skills and projects if the user goes off-topic.
`;

    // Ensure the Gemini API key is present
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API Key is missing. Please add it to .env.local' },
        { status: 500 }
      );
    }

    const result = await streamText({
      model: google('models/gemini-1.5-flash'),
      system: systemPrompt,
      messages,
      maxTokens: 500,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message. Check your API Key or quota.' },
      { status: 500 }
    );
  }
}
