export interface SuggestionDropdownProps {
  position: {
    top: number;
    left: number;
  };
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
}
