import { create } from "zustand";
import { Path } from "slate";

interface ScreenplayState {
  value: { type: string; children: { text: string }[] }[];  
  setValue: (newValue: { type: string; children: { text: string }[] }[]) => void;

  currentSelectedLine: { type: string; text: string } | null; 
  setCurrentSelectedLine: (line: { type: string; text: string } | null) => void;

  suggestion: { path: Path; suggestion: string; replacementText: string } | null;  
  setSuggestion: (suggestion: { path: Path; suggestion: string; replacementText: string } | null) => void; 
}

export const useScreenplayStore = create<ScreenplayState>((set) => ({
  value: [
    {
      type: "scene_heading",
      children: [{ text: "Scene Heading" }],
    },
  ],
  setValue: (newValue) => {
    set(() => ({ value: newValue }));
  },

  currentSelectedLine: null,
  setCurrentSelectedLine: (line) => {
    set(() => ({ currentSelectedLine: line }));
  },

  suggestion: null, 
  setSuggestion: (suggestion) => {
    set(() => ({ suggestion }));
  },
}));
