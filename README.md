# LinguaVerse Global

A Next.js application for language learning with AI-powered explanations using Google Gemini.

## Features

- Word explanation in multiple languages (French, Spanish, German)
- AI-powered explanations using Google Gemini 1.5 Flash model
- Modern UI with dark/light mode support
- Responsive design for all devices

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Google Gemini API
- Shadcn UI components

## Getting Started

### Prerequisites

- Node.js 18+ 
- Google Gemini API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/wayandarma/linguaverse-global.git
   cd linguaverse-global
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory and add your Google Gemini API key
   ```
   GOOGLE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `GOOGLE_GEMINI_API_KEY`: Your Google Gemini API key (required for AI explanations)

## License

This project is open source and available under the [MIT License](LICENSE).
