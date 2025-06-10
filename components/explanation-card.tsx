"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, BookOpenText, MessageSquareText, Globe2, Lightbulb } from "lucide-react"
import type { SimulatedExplanation } from "@/lib/ai-simulation" // Ensure this type is defined

interface ExplanationCardProps {
  explanation: SimulatedExplanation | null
  isLoading: boolean
}

export function ExplanationCard({ explanation, isLoading }: ExplanationCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-6 bg-white dark:bg-darkBase/50 border-electricCyan shadow-xl">
        <CardHeader>
          <CardTitle className="text-electricCyan animate-pulse">Loading Explanation...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!explanation) {
    return null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 bg-gradient-to-br from-white via-electricCyan/5 to-neonPink/5 dark:from-darkBase dark:via-electricCyan/10 dark:to-neonPink/10 border-2 border-electricCyan shadow-2xl rounded-xl overflow-hidden">
      <CardHeader className="bg-electricCyan/80 dark:bg-electricCyan/90 p-6">
        <CardTitle className="text-3xl font-bold text-white dark:text-darkBase flex items-center">
          <BookOpenText size={32} className="mr-3 text-limePunch" />
          {explanation.word}
        </CardTitle>
        <CardDescription className="text-white/90 dark:text-darkBase/80 text-sm">
          Explanation in {explanation.targetLang} (with {explanation.nativeLang} help)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="definition" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 bg-vividSkyBlue/10 dark:bg-vividSkyBlue/20 p-1 h-auto rounded-none">
            <TabsTrigger
              value="definition"
              className="text-vividSkyBlue data-[state=active]:bg-vividSkyBlue data-[state=active]:text-white dark:data-[state=active]:text-darkBase flex items-center gap-1 py-2"
            >
              <MessageSquareText size={16} /> Definition
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="text-vividSkyBlue data-[state=active]:bg-vividSkyBlue data-[state=active]:text-white dark:data-[state=active]:text-darkBase flex items-center gap-1 py-2"
            >
              <BookOpenText size={16} /> Examples
            </TabsTrigger>
            <TabsTrigger
              value="pronunciation"
              className="text-vividSkyBlue data-[state=active]:bg-vividSkyBlue data-[state=active]:text-white dark:data-[state=active]:text-darkBase flex items-center gap-1 py-2"
            >
              <Volume2 size={16} /> Say It
            </TabsTrigger>
            <TabsTrigger
              value="culture"
              className="text-vividSkyBlue data-[state=active]:bg-vividSkyBlue data-[state=active]:text-white dark:data-[state=active]:text-darkBase flex items-center gap-1 py-2"
            >
              <Globe2 size={16} /> Culture
            </TabsTrigger>
            <TabsTrigger
              value="tip"
              className="text-vividSkyBlue data-[state=active]:bg-vividSkyBlue data-[state=active]:text-white dark:data-[state=active]:text-darkBase flex items-center gap-1 py-2"
            >
              <Lightbulb size={16} /> Tip
            </TabsTrigger>
          </TabsList>

          <div className="p-6 space-y-4 text-textLight dark:text-textDark">
            <TabsContent value="definition">
              <h3 className="text-xl font-semibold text-neonPink mb-2">In {explanation.targetLang}:</h3>
              <p className="text-lg">{explanation.definition.target}</p>
              <h3 className="text-lg font-semibold text-limePunch mt-4 mb-2">
                ({explanation.nativeLang} Translation):
              </h3>
              <p className="italic">{explanation.definition.native}</p>
            </TabsContent>
            <TabsContent value="examples">
              <h3 className="text-xl font-semibold text-neonPink mb-2">
                Usage Examples (in {explanation.targetLang}):
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {explanation.examples.map((ex, index) => (
                  <li key={index}>
                    <p>{ex.target}</p>
                    <p className="text-sm italic text-gray-600 dark:text-gray-400">({ex.native})</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="pronunciation">
              <h3 className="text-xl font-semibold text-neonPink mb-2">Pronunciation:</h3>
              <p className="text-2xl font-mono text-solarFlareOrange">{explanation.pronunciation.phonetic}</p>
              <p className="mt-2">{explanation.pronunciation.tip}</p>
              <button className="mt-3 bg-limePunch text-darkBase px-4 py-2 rounded-md hover:bg-limePunch/80 flex items-center gap-2">
                <Volume2 size={18} /> Hear it (Simulated)
              </button>
            </TabsContent>
            <TabsContent value="culture">
              <h3 className="text-xl font-semibold text-neonPink mb-2">Cultural Insight:</h3>
              <p>{explanation.culturalNote}</p>
            </TabsContent>
            <TabsContent value="tip">
              <h3 className="text-xl font-semibold text-neonPink mb-2">Learner's Tip:</h3>
              <p>{explanation.learnerTip}</p>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
