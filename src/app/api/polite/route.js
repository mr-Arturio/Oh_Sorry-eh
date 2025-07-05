import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that transforms direct or rude statements into extremely polite, Canadian-style speech. 
          
          Rules:
          - Always start with "Oh sorry" or "Hey sorry"
          - Use "could you kindly" or "would you mind"
          - Add "when you have a moment" or "if it's not too much trouble"
          - End with "Thanks so much!" or "Thank you kindly!"
          - Use Canadian expressions like "eh" occasionally
          - Be overly polite and apologetic
          - Keep the core meaning but make it sound very Canadian and polite
          
          Examples:
          "Move your car" → "Hey sorry, could you kindly move your car when you have a moment? Thanks so much!"
          "Shut up" → "Oh sorry, would you mind keeping it down a bit? Thanks kindly, eh!"
          "Hurry up" → "Hey sorry, could you maybe pick up the pace when you have a chance? Thanks so much!"`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const politeText = completion.choices[0].message.content;

    return NextResponse.json({
      politeText,
      success: true,
    });
  } catch (error) {
    console.error("Polite transformation error:", error);
    return NextResponse.json(
      {
        error: "Failed to transform text",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
