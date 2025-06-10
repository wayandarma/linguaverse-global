import { SimulatedExplanation } from "./types";

export type { SimulatedExplanation };

const explanationsDb: Record<
  string,
  Record<
    string,
    Omit<SimulatedExplanation, "word" | "targetLang" | "nativeLang">
  >
> = {
  hello: {
    French: {
      definition: { target: "Bonjour / Salut", native: "Good day / Hi" },
      examples: [
        { target: "Bonjour, comment ça va ?", native: "Hello, how are you?" },
        { target: "Salut Marie !", native: "Hi Marie!" },
      ],
      pronunciation: {
        phonetic: "/bɔ̃.ʒuʁ/ /sa.ly/",
        tip: "'Bonjour' is more formal than 'Salut'. Pay attention to the nasal sounds.",
      },
      culturalNote:
        "French people often greet with a 'la bise' (cheek kisses) among friends and family.",
      learnerTip:
        "Use 'Bonjour' in most situations, and 'Salut' with people you know well.",
    },
    Spanish: {
      definition: { target: "Hola", native: "Hello" },
      examples: [
        { target: "Hola, ¿cómo estás?", native: "Hello, how are you?" },
        { target: "¡Hola a todos!", native: "Hello everyone!" },
      ],
      pronunciation: {
        phonetic: "/ˈo.la/",
        tip: "The 'h' is silent in Spanish. The 'o' is a pure vowel sound.",
      },
      culturalNote:
        "Greetings in Spanish can be very warm and expressive, often accompanied by physical touch like a hug or pat on the back.",
      learnerTip:
        "'Hola' is a versatile greeting suitable for almost any situation.",
    },
    German: {
      definition: { target: "Hallo / Guten Tag", native: "Hello / Good day" },
      examples: [
        {
          target: "Hallo, wie geht es Ihnen?",
          native: "Hello, how are you? (formal)",
        },
        {
          target: "Guten Tag, Herr Schmidt.",
          native: "Good day, Mr. Schmidt.",
        },
      ],
      pronunciation: {
        phonetic: "/haˈloː/ /ˈɡuːtn̩ taːk/",
        tip: "The 'a' in 'Hallo' is short. 'Guten Tag' is more formal.",
      },
      culturalNote:
        "Germans tend to be more formal in initial greetings, especially in business contexts. A firm handshake is common.",
      learnerTip:
        "Use 'Guten Tag' for formal situations or when addressing strangers, and 'Hallo' for more informal settings.",
    },
  },
  ambiguous: {
    French: {
      definition: { target: "Ambigu / Ambigüe", native: "Ambiguous" },
      examples: [
        {
          target: "Sa réponse était très ambiguë.",
          native: "His/Her answer was very ambiguous.",
        },
        {
          target: "C'est une situation ambiguë.",
          native: "It's an ambiguous situation.",
        },
      ],
      pronunciation: {
        phonetic: "/ɑ̃.bi.ɡy/",
        tip: "The 'u' sound at the end is like the 'u' in 'tu'.",
      },
      culturalNote:
        "French culture often appreciates subtlety and nuance in language, which can sometimes lead to perceived ambiguity.",
      learnerTip:
        "Remember the gender agreement: 'ambigu' for masculine nouns, 'ambiguë' for feminine nouns.",
    },
    Spanish: {
      definition: { target: "Ambiguo / Ambigua", native: "Ambiguous" },
      examples: [
        {
          target: "El mensaje es ambiguo.",
          native: "The message is ambiguous.",
        },
        {
          target: "Sus intenciones son ambiguas.",
          native: "His/Her intentions are ambiguous.",
        },
      ],
      pronunciation: {
        phonetic: "/amˈbi.ɣwo/",
        tip: "The 'g' before 'u' is a soft sound, almost like a 'w'.",
      },
      culturalNote:
        "Clarity is often valued in Spanish communication, but poetic or literary language can embrace ambiguity.",
      learnerTip:
        "Like in French, pay attention to gender agreement: 'ambiguo' (m.) and 'ambigua' (f.).",
    },
    German: {
      definition: {
        target: "Mehrdeutig / Zweideutig",
        native: "Ambiguous / Equivocal",
      },
      examples: [
        {
          target: "Seine Aussage war mehrdeutig.",
          native: "His statement was ambiguous.",
        },
        {
          target: "Das ist eine zweideutige Bemerkung.",
          native: "That is an equivocal remark.",
        },
      ],
      pronunciation: {
        phonetic: "/ˈmeːɐ̯ˌdɔʏtɪç/ /ˈtsvaɪˌdɔʏtɪç/",
        tip: "'Mehrdeutig' implies multiple meanings, 'zweideutig' often implies a double entendre or something potentially suggestive.",
      },
      culturalNote:
        "German language often strives for precision, so ambiguity might be viewed negatively in technical or business contexts, but appreciated in creative writing.",
      learnerTip:
        "Understand the slight difference: 'mehrdeutig' is generally 'having multiple meanings', while 'zweideutig' can carry a connotation of being intentionally obscure or suggestive.",
    },
  },
};

export async function getSimulatedExplanation(
  word: string,
  targetLang: string,
  nativeLang: string
): Promise<SimulatedExplanation | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const wordLower = word.toLowerCase();
  const langData = explanationsDb[wordLower]?.[targetLang];

  if (langData) {
    return {
      word: word, // Keep original casing for display
      targetLang: targetLang,
      nativeLang: nativeLang,
      ...langData,
    };
  }

  // Fallback for words not in DB
  return {
    word: word,
    targetLang: targetLang,
    nativeLang: nativeLang,
    definition: {
      target: `(Simulated) Definition of '${word}' in ${targetLang}.`,
      native: `(Simulated) Meaning of '${word}' in ${nativeLang}.`,
    },
    examples: [
      {
        target: `Example sentence for '${word}' in ${targetLang}.`,
        native: `Example translation in ${nativeLang}.`,
      },
      {
        target: `Another example for '${word}' in ${targetLang}.`,
        native: `Another translation in ${nativeLang}.`,
      },
    ],
    pronunciation: {
      phonetic: `/${word}-fone-etik/`,
      tip: `Tip for pronouncing '${word}' in ${targetLang}.`,
    },
    culturalNote: `A cultural note related to '${word}' or its usage in ${targetLang}.`,
    learnerTip: `A helpful tip for learners about '${word}' in ${targetLang}.`,
  };
}
