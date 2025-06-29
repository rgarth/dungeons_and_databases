"use client";

import DiceRoller from "@/components/dice-roller";

export default function TestDicePage() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Dice Roller Test</h1>
        <div className="bg-slate-800 rounded-lg border border-slate-700 h-96">
          <DiceRoller />
        </div>
      </div>
    </div>
  );
} 