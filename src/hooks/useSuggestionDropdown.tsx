import { useState } from "react";
import { ReactEditor } from "slate-react";
import { Transforms, BaseRange } from "slate";
import { CustomEditor } from "../types/editorTypes";
export const useSuggestionDropdown = (editor: CustomEditor) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [onSelect, setOnSelect] = useState<(option: string) => void>(() => () => {});
  const [lastSelection, setLastSelection] = useState<BaseRange | null>(null);

  const showDropdown = (suggestions: string[], callback: (option: string) => void) => {
    if (!editor.selection) return;
    const domRange = ReactEditor.toDOMRange(editor, editor.selection);
    const rect = domRange.getBoundingClientRect();
    setPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setOptions(suggestions);
    setOnSelect(() => callback);
    setLastSelection(editor.selection);
    setVisible(true);
  };

  const hideDropdown = () => {
    setVisible(false);
  };

  const handleSelect = (option: string) => {
    if (lastSelection) {
      Transforms.select(editor, lastSelection);
      ReactEditor.focus(editor);
    }
    onSelect(option);
    hideDropdown();
  };

  return { visible, position, options, showDropdown, hideDropdown, handleSelect };
};
