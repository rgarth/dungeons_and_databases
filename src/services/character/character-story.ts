export interface CharacterLimits {
  appearance: number;
  personality: number;
  backstory: number;
  notes: number;
  guidedAnswer: number;
}

export interface BackstoryPrompt {
  question: string;
  placeholder: string;
}

export interface CharacterCountInfo {
  count: number;
  limit: number;
  isNearLimit: boolean;
  displayClass: string;
}

export class CharacterStoryService {
  // Character limits for different fields
  private readonly characterLimits: CharacterLimits = {
    appearance: 1000,
    personality: 1500,
    backstory: 5000,
    notes: 3000,
    guidedAnswer: 500
  };

  // D&D Character Backstory Prompts
  private readonly backstoryPrompts: BackstoryPrompt[] = [
    {
      question: "Where did you come from?",
      placeholder: "Describe your homeland, city, or region..."
    },
    {
      question: "What is your family like?",
      placeholder: "Parents, siblings, family status, relationships..."
    },
    {
      question: "Who was your childhood friend, mentor, or inspiration?",
      placeholder: "Someone important in your early life..."
    },
    {
      question: "What drove you to become an adventurer?",
      placeholder: "The event, need, or calling that started your journey..."
    },
    {
      question: "What is your greatest achievement before adventuring?",
      placeholder: "Something you accomplished that you're proud of..."
    },
    {
      question: "What is your most treasured possession and why?",
      placeholder: "An item with special meaning to your character..."
    },
    {
      question: "What is your greatest fear or weakness?",
      placeholder: "Something that troubles or challenges you..."
    },
    {
      question: "Who do you care about most in the world?",
      placeholder: "Family, friends, loved ones still in your life..."
    },
    {
      question: "What are your long-term goals or ambitions?",
      placeholder: "What do you hope to achieve through adventuring..."
    },
    {
      question: "What secret do you keep hidden from others?",
      placeholder: "Something from your past you don't share..."
    },
    {
      question: "How do others typically perceive you?",
      placeholder: "First impressions, reputation, how you come across..."
    },
    {
      question: "What would make you risk everything?",
      placeholder: "Causes, people, or ideals worth great sacrifice..."
    },
    {
      question: "What is your relationship with the gods or divine forces?",
      placeholder: "Your deity, religious beliefs, spiritual practices, or lack thereof..."
    }
  ];

  /**
   * Get character limits for all fields
   */
  getCharacterLimits(): CharacterLimits {
    return { ...this.characterLimits };
  }

  /**
   * Get the character limit for a specific field
   */
  getFieldLimit(field: keyof CharacterLimits): number {
    return this.characterLimits[field];
  }

  /**
   * Get all backstory prompts
   */
  getBackstoryPrompts(): BackstoryPrompt[] {
    return [...this.backstoryPrompts];
  }

  /**
   * Validate if text is within character limit for a field
   */
  isWithinLimit(text: string, field: keyof CharacterLimits): boolean {
    return text.length <= this.characterLimits[field];
  }

  /**
   * Get character count information for a field
   */
  getCharacterCountInfo(text: string, field: keyof CharacterLimits): CharacterCountInfo {
    const count = text.length;
    const limit = this.characterLimits[field];
    const isNearLimit = count > limit * 0.8;
    
    return {
      count,
      limit,
      isNearLimit,
      displayClass: isNearLimit ? 'text-yellow-400' : 'text-slate-400'
    };
  }

  /**
   * Format character count display text
   */
  formatCharacterCount(text: string, field: keyof CharacterLimits): string {
    const info = this.getCharacterCountInfo(text, field);
    return `${info.count}/${info.limit}`;
  }

  /**
   * Truncate text to fit within field limits
   */
  truncateToLimit(text: string, field: keyof CharacterLimits): string {
    const limit = this.characterLimits[field];
    return text.length <= limit ? text : text.substring(0, limit);
  }

  /**
   * Compile guided answers into a formatted backstory
   */
  compileGuidedAnswers(guidedAnswers: Record<number, string>): string {
    const answers: string[] = [];
    
    this.backstoryPrompts.forEach((prompt, index) => {
      const answer = guidedAnswers[index];
      if (answer && answer.trim()) {
        answers.push(`${prompt.question}\n${answer.trim()}`);
      }
    });
    
    return answers.join('\n\n');
  }

  /**
   * Validate guided answer length
   */
  validateGuidedAnswer(text: string): boolean {
    return this.isWithinLimit(text, 'guidedAnswer');
  }

  /**
   * Get guided answer character count info
   */
  getGuidedAnswerCountInfo(text: string): CharacterCountInfo {
    return this.getCharacterCountInfo(text, 'guidedAnswer');
  }
}

// Export singleton instance
export const createCharacterStoryService = () => new CharacterStoryService(); 