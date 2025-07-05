// D&D 5e Languages
export interface Language {
  id: string;
  name: string;
  script: string;
  category: 'Standard' | 'Exotic' | 'Secret';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get all languages from API
export async function getLanguages(): Promise<Language[]> {
  const maxRetries = 3;
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/languages');
      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Language fetch attempt ${attempt} failed:`, error);
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  throw lastError || new Error('Failed to fetch languages after multiple attempts');
}

// Get languages by category
export async function getLanguagesByCategory(category: Language['category']): Promise<Language[]> {
  const languages = await getLanguages();
  return languages.filter(lang => lang.category === category);
}

// Get racial starting languages
export function getRacialLanguages(race: string): string[] {
  const racialLanguages: Record<string, string[]> = {
    'Human': ['Common'],
    'Dwarf': ['Common', 'Dwarvish'],
    'Elf': ['Common', 'Elvish'],
    'Halfling': ['Common', 'Halfling'],
    'Dragonborn': ['Common', 'Draconic'],
    'Gnome': ['Common', 'Gnomish'],
    'Half-Elf': ['Common', 'Elvish'],
    'Half-Orc': ['Common', 'Orc'],
    'Tiefling': ['Common', 'Infernal'],
  };

  return racialLanguages[race] || ['Common'];
}

// Get class-granted languages
export function getClassLanguages(characterClass: string): string[] {
  const classLanguages: Record<string, string[]> = {
    'Rogue': ['Thieves\' Cant'],
    'Druid': ['Druidic'],
  };

  return classLanguages[characterClass] || [];
}

// Get all automatic languages (racial + class)
export function getAutomaticLanguages(race: string, characterClass: string): string[] {
  const racialLanguages = getRacialLanguages(race);
  const classLanguages = getClassLanguages(characterClass);
  return [...racialLanguages, ...classLanguages];
}

// Get language styling classes based on category and source
export function getLanguageStyling(languageName: string, isRacial: boolean = false, isClassGranted: boolean = false, languages: Language[] = []) {
  const language = languages.find(lang => lang.name === languageName);
  
  if (!language) {
    return {
      bg: isRacial ? "bg-[var(--color-language-racial-bg)]" : isClassGranted ? "bg-[var(--color-language-class-bg)]" : "bg-[var(--color-language-standard-bg)]",
      text: isRacial ? "text-[var(--color-language-racial-text)]" : isClassGranted ? "text-[var(--color-language-class-text)]" : "text-[var(--color-language-standard-text)]",
      border: isRacial ? "border-[var(--color-language-racial-border)]" : isClassGranted ? "border-[var(--color-language-class-border)]" : "border-[var(--color-language-standard-border)]",
      hover: isRacial ? "hover:text-[var(--color-language-racial-hover)]" : isClassGranted ? "hover:text-[var(--color-language-class-hover)]" : "hover:text-[var(--color-language-standard-hover)]"
    };
  }

  // Special styling for secret languages (like Thieves' Cant)
  if (language.category === 'Secret') {
    return {
      bg: "bg-[var(--color-language-secret-bg)]",
      text: "text-[var(--color-language-secret-text)]",
      border: "border-[var(--color-language-secret-border)]",
      hover: "hover:text-[var(--color-language-secret-hover)]"
    };
  }

  // Standard styling based on category
  switch (language.category) {
    case 'Standard':
      return {
        bg: "bg-[var(--color-language-standard-bg)]",
        text: "text-[var(--color-language-standard-text)]",
        border: "border-[var(--color-language-standard-border)]",
        hover: "hover:text-[var(--color-language-standard-hover)]"
      };
    case 'Exotic':
      return {
        bg: "bg-[var(--color-language-exotic-bg)]",
        text: "text-[var(--color-language-exotic-text)]",
        border: "border-[var(--color-language-exotic-border)]",
        hover: "hover:text-[var(--color-language-exotic-hover)]"
      };
    default:
      return {
        bg: "bg-[var(--color-language-default-bg)]",
        text: "text-[var(--color-language-default-text)]",
        border: "border-[var(--color-language-default-border)]",
        hover: "hover:text-[var(--color-language-default-hover)]"
      };
  }
}

 