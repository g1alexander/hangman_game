import { openai } from "@/helpers/openai";
import { NextResponse } from "next/server";
// import axios from "axios";

interface Body {
  prompt?: string;
  captchaCode?: string;
}

const responseJson = (error: string, status: number) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

export async function POST(request: Request) {
  const body: Body = await request.json();

  if (!body.prompt) return responseJson("prompt is required", 400);
  if (!body.captchaCode) return responseJson("captchaCode is required", 400);

  try {
    // const responseCaptcha = await axios.post<{
    //   success: boolean;
    //   challenge_ts: string;
    //   hostname: string;
    // }>(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.captchaCode}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    //     },
    //   }
    // );
    // // const captchaValidation = await responseCaptcha.json();

    // if (!responseCaptcha.data.success)
    //   return responseJson("Captcha validation failed", 400);

    const completation = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: body.prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const content = completation.choices[0].message.content || "";

    const response = content.toLowerCase();
    const responseFormatter = response.replace(/[\.\-\''\""]/g, "").trim();

    return NextResponse.json({
      message: responseFormatter,
      ho: body.captchaCode,
    });
  } catch (error) {
    const err = error as { error: { message: string } };
    return responseJson(err.error.message, 400);
  }
}
