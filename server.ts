import { serve } from "bun";

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

interface QuestionsResponse {
  questions: Question[];
}

function validateQuestions(data: any): QuestionsResponse {
  if (!data || typeof data !== "object" || !Array.isArray(data.questions)) {
    throw new Error("Invalid questions payload");
  }
  data.questions.forEach((q: any) => {
    if (
      typeof q.question !== "string" ||
      !Array.isArray(q.options) ||
      typeof q.correct_answer !== "string" ||
      typeof q.explanation !== "string"
    ) {
      throw new Error("Invalid question object");
    }
  });
  return data as QuestionsResponse;
}

const schema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          correct_answer: { type: "string" },
          explanation: { type: "string" }
        },
        required: ["question", "options", "correct_answer", "explanation"],
        additionalProperties: false
      }
    }
  },
  required: ["questions"],
  additionalProperties: false
};

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method !== "POST" || url.pathname !== "/questions") {
      return new Response("Not Found", { status: 404 });
    }
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { text } = body;
    if (typeof text !== "string") {
      return new Response(JSON.stringify({ error: "'text' must be a string" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const prompt = `Create multiple-choice questions from the following text. Return exactly in the provided JSON schema.`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "o3",
        input: `${prompt}\n\n${text}`,
        response_format: {
          type: "json_schema",
          json_schema: { name: "questions", schema }
        }
      })
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "OpenAI request failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    try {
      const validated = validateQuestions(data.output);
      return new Response(JSON.stringify(validated.questions), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid response format" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
});
