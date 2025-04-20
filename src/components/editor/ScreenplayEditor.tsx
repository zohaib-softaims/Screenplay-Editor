"use client";
import { useCallback, useMemo } from "react";
import { createEditor, Transforms, Editor, Node, Path, Descendant } from "slate";
import { Slate, Editable, withReact, RenderElementProps } from "slate-react";
import { withHistory } from "slate-history";
import { Film, User, MessageSquare, BookOpen } from "lucide-react";
import BlockButton from "./BlockButton";
import Element from "./Element";
import SuggestionPopup from "./SuggestionPopup";
import { predefinedSuggestions } from "@/src/data/predefinedSuggestions";
import { useScreenplayStore } from "@/src/store/useScreenplayStore";
import { CustomEditor, ScreenplayElement } from "@/src/types/editorTypes";
import Loader from "../global/Loader";
import { formatSceneHeading } from "@/src/utils/formatSceneHeading";

const ScreenplayEditor = () => {
  const { value, setValue, setCurrentSelectedLine, suggestion, setSuggestion, hasHydrated } = useScreenplayStore();
  const editor = useMemo(() => withHistory(withReact(createEditor() as CustomEditor)), []);

  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    let foundSuggestion = false;

    const processNode = (node: ScreenplayElement, path: Path) => {
      const textContent = Node.string(node);
      const trimmedText = textContent.trim();

      if (node.type === "scene_heading") {
        const formattedSceneHeading = formatSceneHeading(textContent);
        if (formattedSceneHeading !== textContent) {
          setSuggestion({
            path,
            suggestion: "Fix Scene Heading Format Issue",
            replacementText: formattedSceneHeading,
          });
          foundSuggestion = true;
        } else {
          const randomIndex = Math.floor(Math.random() * predefinedSuggestions.length);
          const sceneSuggestion = predefinedSuggestions[randomIndex];
          setSuggestion({
            path,
            suggestion: sceneSuggestion,
            replacementText: sceneSuggestion,
          });
          foundSuggestion = true;
        }
      }
      if (textContent !== trimmedText) {
        setSuggestion({
          path,
          suggestion: "Fixed Indentation issue",
          replacementText: trimmedText,
        });
        foundSuggestion = true;
      }
      setCurrentSelectedLine({ type: node.type, text: textContent });
    };
    Editor.nodes(editor, {
      match: (n) =>
        (n as ScreenplayElement).type === "scene_heading" ||
        (n as ScreenplayElement).type === "action" ||
        (n as ScreenplayElement).type === "character" ||
        (n as ScreenplayElement).type === "dialogue",
    }).forEach(([node, path]) => {
      processNode(node as ScreenplayElement, path);
    });
    if (!foundSuggestion) {
      setSuggestion(null);
    }
  };

  const acceptSuggestion = () => {
    if (suggestion) {
      Transforms.insertText(editor, suggestion.replacementText, { at: [...suggestion.path, 0] });
      setSuggestion(null);
    }
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const element = props.element as ScreenplayElement;
    return <Element {...props} element={element} />;
  }, []);

  return (
    <>
      {hasHydrated ? (
        <div className="bg-transparent flex flex-col justify-center items-center">
          <Slate editor={editor} initialValue={value} onChange={handleChange}>
            <div className="w-[8.5in] mb-4 bg-slate-900 flex justify-center items-center gap-3 px-4 py-3">
              <BlockButton type="scene_heading" icon={<Film size={18} />}>
                Scene
              </BlockButton>
              <BlockButton type="action" icon={<BookOpen size={18} />}>
                Action
              </BlockButton>
              <BlockButton type="character" icon={<User size={18} />}>
                Character
              </BlockButton>
              <BlockButton type="dialogue" icon={<MessageSquare size={18} />}>
                Dialogue
              </BlockButton>
            </div>

            <Editable
              renderElement={renderElement}
              spellCheck
              autoFocus
              className="
             w-[8.5in] h-[11in] p-[1in] font-[Courier] text-[12pt] leading-[1.5] whitespace-pre-wrap overflow-hidden
             focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-900 text-slate-200 placeholder-slate-400"
            />

            {suggestion && <SuggestionPopup suggestion={suggestion} onAccept={acceptSuggestion} onDismiss={() => setSuggestion(null)} />}
          </Slate>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ScreenplayEditor;
