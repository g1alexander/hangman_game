import { openai } from "@/helpers/openai";
import { NextResponse } from "next/server";

interface Body {
  prompt?: string;
}

const response = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

export async function POST(request: Request) {
  const body: Body = await request.json();

  if (!body.prompt) return response("prompt is required", 400);

  try {
    const completation = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: body.prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({
      message: completation.choices[0].message.content?.toLowerCase(),
    });
  } catch (error) {
    const err = error as { error: { message: string } };
    return response(err.error.message, 400);
  }
}
