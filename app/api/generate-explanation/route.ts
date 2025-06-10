import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { SimulatedExplanation } from "@/lib/types";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Google Gemini API key is not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { word, targetLang, nativeLang } = body;

    // Validate required fields
    if (!word || !targetLang || !nativeLang) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: word, targetLang, and nativeLang are required",
        },
        { status: 400 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-04-17",
    });

    // Construct the prompt for Gemini
    const prompt = `You are an expert language learning assistant.
For the word "${word}", provide a comprehensive explanation for a learner whose native language is "${nativeLang}" and is learning "${targetLang}".

Your response MUST be a single, valid JSON object that conforms EXACTLY to the following TypeScript interface:
interface Explanation {
  word: string;
  targetLang: string;
  nativeLang: string;
  definition: { target: string; native: string; };
  examples: { target: string; native: string; }[] (provide 2-3 examples);
  pronunciation: { phonetic: string; tip: string; };
  culturalNote: string;
  learnerTip: string;
}

Ensure all fields are populated with relevant and accurate information.
The 'word' field in the JSON should be the original word: "${word}".
The 'targetLang' field should be: "${targetLang}".
The 'nativeLang' field should be: "${nativeLang}".

Provide the explanation now for:
Word: ${word}
Target Language: ${targetLang}
Native Language: ${nativeLang}

Respond ONLY with the JSON object, no additional text or formatting.`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response (strip markdown code blocks if present)
    let explanation: SimulatedExplanation;
    try {
      // Remove markdown code blocks if present
      let cleanText = text.trim();
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      explanation = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      console.error("Raw response:", text);
      return NextResponse.json(
        { error: "Invalid JSON response from AI model" },
        { status: 500 }
      );
    }

    // Validate the parsed object has required fields
    const requiredFields = [
      "word",
      "targetLang",
      "nativeLang",
      "definition",
      "examples",
      "pronunciation",
      "culturalNote",
      "learnerTip",
    ];
    const missingFields = requiredFields.filter(
      (field) => !(field in explanation)
    );

    if (missingFields.length > 0) {
      console.error("Missing required fields in response:", missingFields);
      return NextResponse.json(
        {
          error: `Invalid response structure: missing fields ${missingFields.join(
            ", "
          )}`,
        },
        { status: 500 }
      );
    }

    // Validate nested objects
    if (
      !explanation.definition ||
      typeof explanation.definition.target !== "string" ||
      typeof explanation.definition.native !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid definition structure in response" },
        { status: 500 }
      );
    }

    if (
      !Array.isArray(explanation.examples) ||
      explanation.examples.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid examples structure in response" },
        { status: 500 }
      );
    }

    if (
      !explanation.pronunciation ||
      typeof explanation.pronunciation.phonetic !== "string" ||
      typeof explanation.pronunciation.tip !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid pronunciation structure in response" },
        { status: 500 }
      );
    }

    // Return the validated explanation
    return NextResponse.json(explanation);
  } catch (error) {
    console.error("Error in generate-explanation API:", error);
    return NextResponse.json(
      { error: "Internal server error while generating explanation" },
      { status: 500 }
    );
  }
}
