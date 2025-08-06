import type { NextRequest } from "next/server";

interface NarrativeAnalysis {
  narrative_structure: {
    beginning: string;
    middle: string;
    end: string;
  };
  themes: string[];
  tone: string;
  key_insights: string[];
  symbolism: string;
}

function isValidAnalysis(data: any): data is NarrativeAnalysis {
  return (
    data &&
    typeof data === "object" &&
    typeof data.narrative_structure === "object" &&
    typeof data.narrative_structure.beginning === "string" &&
    typeof data.narrative_structure.middle === "string" &&
    typeof data.narrative_structure.end === "string" &&
    Array.isArray(data.themes) && data.themes.every((t: any) => typeof t === "string") &&
    typeof data.tone === "string" &&
    Array.isArray(data.key_insights) && data.key_insights.every((t: any) => typeof t === "string") &&
    typeof data.symbolism === "string"
  );
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body || typeof body.text !== "string") {
    return new Response(JSON.stringify({ error: "Missing 'text'" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "o3",
      input: body.text,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "narrative_analysis",
          schema: {
            type: "object",
            additionalProperties: false,
            required: [
              "narrative_structure",
              "themes",
              "tone",
              "key_insights",
              "symbolism",
            ],
            properties: {
              narrative_structure: {
                type: "object",
                additionalProperties: false,
                required: ["beginning", "middle", "end"],
                properties: {
                  beginning: { type: "string" },
                  middle: { type: "string" },
                  end: { type: "string" },
                },
              },
              themes: { type: "array", items: { type: "string" } },
              tone: { type: "string" },
              key_insights: { type: "array", items: { type: "string" } },
              symbolism: { type: "string" },
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(err, { status: 500 });
  }

  const data = await res.json();
  const text = data.output_text || data.choices?.[0]?.message?.content;
  let parsed: any;
  try {
    parsed = JSON.parse(text);
  } catch {
    return new Response(JSON.stringify({ error: "Model response was not valid JSON" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isValidAnalysis(parsed)) {
    return new Response(JSON.stringify({ error: "Model response failed validation" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(parsed), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

