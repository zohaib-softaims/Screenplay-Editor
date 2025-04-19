import { Path, Descendant } from "slate";

export interface CurrentSelectedLine {
  type: string;
  text: string;
}

export interface Suggestion {
  path: Path;
  suggestion: string;
  replacementText: string;
}

export interface ScreenplayState {
  value: Descendant[];
  setValue: (value: Descendant[]) => void;

  currentSelectedLine: CurrentSelectedLine | null;
  setCurrentSelectedLine: (line: CurrentSelectedLine | null) => void;

  suggestion: Suggestion | null;
  setSuggestion: (suggestion: Suggestion | null) => void;

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}
