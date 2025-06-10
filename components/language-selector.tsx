"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSelectorProps {
  targetLang: string
  setTargetLang: (lang: string) => void
  nativeLang: string
  setNativeLang: (lang: string) => void
  availableLanguages: { value: string; label: string }[]
}

export function LanguageSelector({
  targetLang,
  setTargetLang,
  nativeLang,
  setNativeLang,
  availableLanguages,
}: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-4 border border-neonPink/50 rounded-lg bg-white dark:bg-darkBase/30 shadow-md">
      <div>
        <Label htmlFor="target-lang" className="text-neonPink font-semibold">
          Target Language (Learn)
        </Label>
        <Select value={targetLang} onValueChange={setTargetLang}>
          <SelectTrigger
            id="target-lang"
            className="w-full mt-1 bg-limePunch/20 border-limePunch text-textLight dark:text-textDark focus:ring-limePunch"
          >
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            {availableLanguages.map((lang) => (
              <SelectItem key={`target-${lang.value}`} value={lang.value} className="hover:bg-limePunch/30">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="native-lang" className="text-neonPink font-semibold">
          Native Language (Explain In)
        </Label>
        <Select value={nativeLang} onValueChange={setNativeLang}>
          <SelectTrigger
            id="native-lang"
            className="w-full mt-1 bg-solarFlareOrange/20 border-solarFlareOrange text-textLight dark:text-textDark focus:ring-solarFlareOrange"
          >
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            {availableLanguages.map((lang) => (
              <SelectItem key={`native-${lang.value}`} value={lang.value} className="hover:bg-solarFlareOrange/30">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
