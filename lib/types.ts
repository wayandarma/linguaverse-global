export interface SimulatedExplanation {
  word: string
  targetLang: string
  nativeLang: string
  definition: {
    target: string
    native: string
  }
  examples: {
    target: string
    native: string
  }[]
  pronunciation: {
    phonetic: string
    tip: string
  }
  culturalNote: string
  learnerTip: string
}