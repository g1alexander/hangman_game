import { movies, openai } from "@/helpers/openai";
import { NextResponse } from "next/server";

interface Body {
  category?: string;
  array_values?: string[];
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

  if (!body.category) return response("category is required", 400);
  if (!body.array_values) return response("array_values is required", 400);

  const category = body.category.toLowerCase();
  const arrayValues = body.array_values;

  try {
    const completation = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `I want you to tell me one word from this category: "${category}". Omit these words in your answer ${arrayValues}.`,
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
