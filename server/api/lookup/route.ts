import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { WordInfo } from "@/hooks/reader-context";

const OPENAI_URL = "https://api.openai.com/v1/responses";

export async function POST(req: NextRequest) {
  try {
    const { word, context, heritage_mode } = await req.json();

    if (!word) {
      return NextResponse.json({ error: "Missing word" }, { status: 400 });
    }

      const schema = {
        type: "object",
        properties: {
          word: { type: "string" },
          definition: { type: "string" },
          translation: { type: "string" },
          pronunciation: { type: "string" },
          partOfSpeech: { type: "string" },
          example: { type: "string" },
          exampleTranslation: { type: "string" },
          synonyms: { type: "array", items: { type: "string" } },
          antonyms: { type: "array", items: { type: "string" } }
        },
        required: [
          "word",
          "definition",
          "translation",
          "pronunciation",
          "partOfSpeech",
          "example",
          "exampleTranslation",
          "synonyms",
          "antonyms"
        ],
        additionalProperties: false
      };

      const prompt = `Provide detailed information for the Persian word "${word}" in the context "${context}". Heritage mode is ${heritage_mode ? "enabled" : "disabled"}.`;

    const body = {
      model: "o4-mini",
      input: prompt,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "WordInfo",
          schema
        }
      }
    };

    const aiRes = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`
      },
      body: JSON.stringify(body)
    });

    if (!aiRes.ok) {
      const error = await aiRes.text();
      console.error("OpenAI error", error);
      return NextResponse.json({ error: "Failed to generate word info" }, { status: 500 });
    }

    const aiJson = await aiRes.json();
    const text = aiJson?.output?.[0]?.content?.[0]?.text ?? "{}";
    const data: WordInfo = JSON.parse(text);

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
