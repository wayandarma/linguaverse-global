"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LanguageSelector } from "@/components/language-selector";
import { ExplanationCard } from "@/components/explanation-card";
import { type SimulatedExplanation } from "@/lib/types";
import { Search, Sparkles, Languages } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle"; // Assuming you have this from shadcn/ui setup

const formSchema = z.object({
  userInput: z
    .string()
    .min(1, "Please enter a word or phrase")
    .refine(
      (value) => value.trim().length > 0,
      "Please enter a word or phrase"
    ),
});

type FormData = z.infer<typeof formSchema>;

const availableLanguages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Español (Spanish)" },
  { value: "French", label: "Français (French)" },
  { value: "German", label: "Deutsch (German)" },
  { value: "Japanese", label: "日本語 (Japanese)" },
  { value: "Indonesian", label: "Bahasa Indonesia (Indonesian)" },
  { value: "Chinese", label: "中文 (Mandarin)" },
];

export default function HomePage() {
  const [targetLang, setTargetLang] = useState<string>("French");
  const [nativeLang, setNativeLang] = useState<string>("English");
  const [explanation, setExplanation] = useState<SimulatedExplanation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: FormData) => {
    const userInput = data.userInput.trim();

    setIsLoading(true);
    setExplanation(null);
    try {
      // Call the new Gemini API route
      const response = await fetch("/api/generate-explanation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: userInput,
          targetLang,
          nativeLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch explanation");
      }

      const result: SimulatedExplanation = await response.json();
      setExplanation(result);
    } catch (error) {
      console.error("Error fetching explanation:", error);
      // Handle error state in UI if needed
      setExplanation({
        // Basic error display
        word: userInput,
        targetLang,
        nativeLang,
        definition: {
          target: "Could not fetch explanation.",
          native: "Error occurred.",
        },
        examples: [],
        pronunciation: { phonetic: "", tip: "" },
        culturalNote: "",
        learnerTip: "",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 bg-gradient-to-br from-lightBase via-electricCyan/10 to-neonPink/10 dark:from-darkBase dark:via-electricCyan/20 dark:to-neonPink/20 transition-colors duration-300">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Sparkles className="w-10 h-10 text-neonPink mr-2" />
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neonPink via-electricCyan to-limePunch">
            LinguaVerse Global
          </h1>
        </div>
        <ModeToggle />
      </header>

      <main className="w-full max-w-2xl">
        <LanguageSelector
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          nativeLang={nativeLang}
          setNativeLang={setNativeLang}
          availableLanguages={availableLanguages}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex items-center gap-3 mb-6 p-4 bg-white dark:bg-darkBase/30 rounded-lg shadow-md border border-vividSkyBlue/50"
          >
            <FormField
              control={form.control}
              name="userInput"
              render={({ field }) => (
                <FormItem className="relative flex-grow">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vividSkyBlue" />
                      <Input
                        type="text"
                        placeholder="Enter a word or phrase (e.g., Hello, Ambiguous)"
                        className="w-full pl-10 pr-4 py-3 text-lg border-2 border-vividSkyBlue focus:ring-2 focus:ring-electricCyan focus:border-electricCyan rounded-md bg-lightBase/50 dark:bg-darkBase/50 text-textLight dark:text-textDark placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="absolute top-full left-0 mt-1" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-electricCyan to-vividSkyBlue hover:from-vividSkyBlue hover:to-electricCyan text-white dark:text-darkBase rounded-md shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Languages size={20} />
              {isLoading ? "Explaining..." : "Explain"}
            </Button>
          </form>
        </Form>

        <ExplanationCard explanation={explanation} isLoading={isLoading} />

        {!explanation && !isLoading && (
          <div className="mt-10 text-center p-6 bg-white dark:bg-darkBase/30 rounded-lg shadow-md border border-dashed border-solarFlareOrange/50">
            <Sparkles className="w-12 h-12 text-solarFlareOrange mx-auto mb-3" />
            <p className="text-xl text-solarFlareOrange font-semibold">
              Ready to explore language?
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a word above and select your languages to get started!
            </p>
          </div>
        )}
      </main>
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} LinguaVerse Global. Powered by AI &
          Imagination.
        </p>
      </footer>
    </div>
  );
}
