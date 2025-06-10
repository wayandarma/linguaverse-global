# Task: Integrate Google Gemini 1.5 Flash for Language Explanations in a Next.js App

**Project Context:**
The project is a Next.js (v15+) application using React (v19+), TypeScript, and `shadcn/ui`. Currently, it uses a mock AI simulation located in `lib/ai-simulation.ts` to provide language explanations. The core data structure for these explanations is defined by the `SimulatedExplanation` interface.

**Objective:**
Replace the mock AI simulation with a real integration using Google's Gemini 1.5 Flash LLM. This involves creating a backend API route in Next.js to securely call the Gemini API and modifying the frontend to use this new API route.

**Key Interface (`SimulatedExplanation`):**
The Gemini API response must be parsable into this structure.

```typescript
export interface SimulatedExplanation {
  word: string;
  targetLang: string;
  nativeLang: string;
  definition: {
    target: string; // Definition in the target language
    native: string; // Definition in the native language
  };
  examples: {
    target: string; // Example sentence in the target language
    native: string; // Translation of the example in the native language
  }[];
  pronunciation: {
    phonetic: string; // Phonetic spelling
    tip: string; // Tip for pronunciation
  };
  culturalNote: string; // A relevant cultural note
  learnerTip: string; // A tip for the language learner
}
```

---

**Implementation Steps:**

**Phase 1: Backend - Gemini API Integration (Next.js API Route)**

1.  **Install SDK:**
    Ensure the Google AI SDK is installed:

    ```bash
    pnpm install @google/generative-ai
    ```

2.  **Environment Variable for API Key:**

    - Create a `.env.local` file in the project root (if it doesn't exist).
    - Add your Gemini API key: `GOOGLE_GEMINI_API_KEY="YOUR_ACTUAL_API_KEY"`
    - Ensure `.env.local` is in your `.gitignore` file.

3.  **Create API Route (`app/api/generate-explanation/route.ts`):**

    - Create a new file at this path.
    - This route will handle `POST` requests.

4.  **API Route Logic (`app/api/generate-explanation/route.ts`):**

    - Import `GoogleGenerativeAI` from `@google/generative-ai`.
    - In the `POST` handler:

      - Retrieve the API key using `process.env.GOOGLE_GEMINI_API_KEY`. Handle cases where the key might be missing.
      - Initialize `GoogleGenerativeAI` with the API key.
      - Get the model: `genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })`.
      - Extract `word`, `targetLang`, and `nativeLang` from the request body. Validate their presence.
      - **Prompt Engineering for Gemini:**

        - Construct a detailed prompt for the Gemini model.
        - The prompt must instruct Gemini to generate a response that is **a valid JSON string** strictly adhering to the `SimulatedExplanation` interface structure provided above.
        - Example prompt structure (replace placeholders with actual variables):

          ```text
          You are an expert language learning assistant.
          For the word "{word}", provide a comprehensive explanation for a learner whose native language is "{nativeLang}" and is learning "{targetLang}".

          Your response MUST be a single, valid JSON object that conforms EXACTLY to the following TypeScript interface:
          interface Explanation {{
            word: string;
            targetLang: string;
            nativeLang: string;
            definition: {{ target: string; native: string; }};
            examples: {{ target: string; native: string; }}[] (provide 2-3 examples);
            pronunciation: {{ phonetic: string; tip: string; }};
            culturalNote: string;
            learnerTip: string;
          }}

          Ensure all fields are populated with relevant and accurate information.
          The 'word' field in the JSON should be the original word: "{word}".
          The 'targetLang' field should be: "{targetLang}".
          The 'nativeLang' field should be: "{nativeLang}".

          Provide the explanation now for:
          Word: {word}
          Target Language: {targetLang}
          Native Language: {nativeLang}
          ```

      - Call `await model.generateContent(prompt)`.
      - Extract the text response from Gemini. This should be the JSON string.
      - **Parse and Validate:**
        - Attempt to `JSON.parse()` the text response.
        - (Optional but recommended) Validate the parsed object against the `SimulatedExplanation` structure (e.g., check for required fields).
      - **Error Handling:** Implement robust error handling for:
        - Missing API key.
        - Errors during the Gemini API call.
        - Response from Gemini not being valid JSON.
        - Parsed JSON not matching the expected structure.
          Return appropriate error responses (e.g., status 500, 400) with informative messages.
      - **Success Response:** If successful, return the parsed `SimulatedExplanation` object as JSON with a 200 status.

**Phase 2: Frontend - Calling the New API Route**

1.  **Modify `app/page.tsx` (or the component making the explanation request):**
    - Locate the function responsible for fetching the explanation (e.g., `handleSubmit` or the function used by `react-hook-form` if previously refactored).
    - Change this function to make an asynchronous `POST` request to your new `/api/generate-explanation` endpoint.
    - Use the `fetch` API.
    - The request body should be JSON containing `word` (from user input), `targetLang`, and `nativeLang`.
    - Set appropriate headers (e.g., `'Content-Type': 'application/json'`).
    - Handle the response:
      - If the response is successful (e.g., status 200), parse the JSON body to get the `SimulatedExplanation` object.
      - Update the frontend state (`explanation`, `isLoading`) accordingly.
      - If the response indicates an error, handle it appropriately (e.g., show an error message to the user, set an error state).
    - Ensure `isLoading` state is managed correctly around the API call.

**Phase 3: (Optional but Recommended) Shared Types**

- Consider moving the `SimulatedExplanation` interface to a shared location (e.g., `types/index.ts` or `lib/types.ts`) and import it in both `app/api/generate-explanation/route.ts` and `app/page.tsx` to ensure consistency.

---

**Deliverables:**

1.  The complete code for the new API route: `app/api/generate-explanation/route.ts`.
2.  The modified code for `app/page.tsx` showing how it calls the new API route and handles the response.
3.  If the `SimulatedExplanation` interface is moved, show its new location and how it's imported.

Ensure all code is well-commented, especially the prompt engineering part and error handling logic.
