import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  // Dynamic import of streaming utilities
  const { OpenAIStream, StreamingTextResponse } = await import('ai');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const {
    messages,
    model,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = await req.json();

  const response = await openai.chat.completions.create({
    model: model || 'gpt-3.5-turbo',
    temperature: temperature || 0.7,
    max_tokens: max_tokens || 1000,
    top_p: top_p || 1,
    frequency_penalty: frequency_penalty || 0,
    presence_penalty: presence_penalty || 0,
    messages: messages,
    stream: true,
  });

  // Create stream and return response
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
