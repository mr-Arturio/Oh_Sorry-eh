import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { audioData } = await request.json();

    if (!audioData) {
      return NextResponse.json(
        { error: "No audio data provided" },
        { status: 400 }
      );
    }

    // Convert base64 audio to buffer
    const audioBuffer = Buffer.from(audioData.split(",")[1], "base64");

    // Create a proper file object for OpenAI API
    const file = new File([audioBuffer], "audio.wav", { type: "audio/wav" });

    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
    });

    return NextResponse.json({
      text: transcription.text,
      success: true,
    });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      {
        error: "Failed to transcribe audio",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
