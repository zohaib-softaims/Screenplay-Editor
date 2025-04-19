import { Suggestion } from "./screenPlayStoreTypes";
export interface SuggestionPopupProps {
    suggestion: Suggestion;
    onAccept: () => void;
    onDismiss: () => void;
  }