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
      bg: isRacial ? "bg-blue-900/30" : isClassGranted ? "bg-red-900/30" : "bg-green-900/30",
      text: isRacial ? "text-blue-300" : isClassGranted ? "text-red-300" : "text-green-300",
      border: isRacial ? "border-blue-600/30" : isClassGranted ? "border-red-600/30" : "border-green-600/30",
      hover: isRacial ? "hover:text-blue-200" : isClassGranted ? "hover:text-red-200" : "hover:text-green-200"
    };
  }

  // Special styling for secret languages (like Thieves' Cant)
  if (language.category === 'Secret') {
    return {
      bg: "bg-purple-900/30",
      text: "text-purple-300",
      border: "border-purple-600/30",
      hover: "hover:text-purple-200"
    };
  }

  // Standard styling based on category
  switch (language.category) {
    case 'Standard':
      return {
        bg: "bg-green-900/30",
        text: "text-green-300",
        border: "border-green-600/30",
        hover: "hover:text-green-200"
      };
    case 'Exotic':
      return {
        bg: "bg-orange-900/30",
        text: "text-orange-300",
        border: "border-orange-600/30",
        hover: "hover:text-orange-200"
      };
    default:
      return {
        bg: "bg-gray-900/30",
        text: "text-gray-300",
        border: "border-gray-600/30",
        hover: "hover:text-gray-200"
      };
  }
}

 