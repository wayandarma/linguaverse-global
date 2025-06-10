# LinguaVerse Global

LinguaVerse Global is a web application designed to help users understand words and phrases in different languages. It provides AI-powered explanations, including definitions, example sentences, pronunciation tips, cultural notes, and learning advice.

## Features

- **Word/Phrase Explanation:** Enter a word or phrase to get a detailed explanation.
- **Multi-Language Support:**
  - Select a target language (the language you want to learn).
  - Select a native language (the language explanations will be provided in, alongside the target language).
  - Currently supports: English, Spanish, French, German, Japanese, Indonesian, Chinese (Mandarin).
- **Comprehensive Explanations:** Each explanation includes:
  - Definition in both target and native languages.
  - Example sentences in both target and native languages.
  - Pronunciation guide (phonetic and tips).
  - Cultural insights related to the word/phrase.
  - Specific tips for learners.
- **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
- **Responsive Design:** Adapts to different screen sizes.

## Technology Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (v15+) - React framework for server-side rendering and static site generation.
  - [React](https://reactjs.org/) (v19+) - JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript for static typing.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
  - [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components built with Radix UI and Tailwind CSS.
  - [Lucide React](https://lucide.dev/) - Icon library.
  - [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) - For form handling and validation.
- **Backend (API Routes):**
  - Next.js API Routes
  - [Google Gemini API](https://ai.google.dev/models/gemini) (via `@google/generative-ai`) - For generating language explanations.
- **Planned Database/Logging:**
- **Package Manager:**
  - [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm (or npm/yarn if you prefer, but `pnpm-lock.yaml` is provided)
- A Google Cloud Project with the Gemini API enabled.
- (Optional, for planned logging) A Supabase project.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd linguaverse-global
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of the project and add the following variables:

    ```env
    # For Google Gemini API
    GOOGLE_GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"

    # For Supabase (if implementing logging)
    # NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    # NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"
    # SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    ```

    - Replace `"YOUR_GOOGLE_GEMINI_API_KEY"` with your actual API key for the Gemini model.
    - If you are setting up Supabase, uncomment and fill in your Supabase project details.

### Running the Application

1.  **Start the development server:**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`.

2.  **Build for production:**

    ```bash
    pnpm build
    ```

3.  **Start the production server:**
    ```bash
    pnpm start
    ```

## Project Structure (Simplified)

```
linguaverse-global/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes (e.g., for Gemini, Supabase)
│   │   └── generate-explanation/
│   │       └── route.ts
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main homepage component
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── explanation-card.tsx
│   └── language-selector.tsx
├── lib/                      # Utility functions, type definitions, clients
│   ├── types.ts              # TypeScript type definitions (e.g., SimulatedExplanation)
│   ├── supabaseClient.ts     # (If Supabase is implemented)
│   └── utils.ts              # General utility functions
├── public/                   # Static assets
├── .env.local                # Environment variables (gitignored)
├── next.config.mjs           # Next.js configuration
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

## API Endpoints

- `POST /api/generate-explanation`:

  - Accepts: `{ word: string, targetLang: string, nativeLang: string }`
  - Returns: A `SimulatedExplanation` object or an error. This endpoint calls the Google Gemini API.

- `POST /api/log-to-supabase` (Planned):
  - Accepts: `{ word: string, targetLanguage: string, nativeLanguage: string, userId?: string }`
  - Logs the learned word to a Supabase table.

## Future Enhancements

- **User Authentication:** Allow users to sign up and log in.
- **Personalized Learning History:** Log learned words to Supabase, associated with user accounts.
- **Spaced Repetition System (SRS):** Implement SRS for vocabulary review.
- **More Languages:** Expand the list of available languages.
- **Audio Pronunciation:** Integrate real audio playback instead of just phonetic guides.
- **Interactive Exercises:** Add quizzes or exercises based on learned vocabulary.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

---

This README provides a good starting point. You can expand it further as the project evolves.
