export async function POST(req: Request) {
  try {
    const { text, length } = await req.json();
    if (
      typeof text !== "string" ||
      !["short", "medium", "long"].includes(length)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "o3-mini",
        input: [
          {
            role: "system",
            content:
              "Summarize the given text. Respond using the provided JSON schema.",
          },
          {
            role: "user",
            content: `Length: ${length}\n\n${text}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "summary_response",
            schema: {
              type: "object",
              properties: {
                full_summary: { type: "string" },
                key_points: {
                  type: "array",
                  items: { type: "string" },
                },
                length: {
                  type: "string",
                  enum: ["short", "medium", "long"],
                },
              },
              required: ["full_summary", "key_points", "length"],
              additionalProperties: false,
            },
          },
        },
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("OpenAI request failed:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to generate summary" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const aiData = await openaiRes.json();
    const raw =
      aiData.output?.[0]?.content?.[0]?.text ||
      aiData.choices?.[0]?.message?.content ||
      "{}";
    const summary = JSON.parse(raw);

    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
