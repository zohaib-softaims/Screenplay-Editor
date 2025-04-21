"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { createEditor, Transforms, Editor, Node, Path, Descendant } from "slate";
import { Slate, Editable, withReact, RenderElementProps, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import { Film, User, MessageSquare, BookOpen } from "lucide-react";
import BlockButton from "./BlockButton";
import Element from "./Element";
import SuggestionPopup from "./SuggestionPopup";
import { predefinedSuggestions } from "../../constants/predefinedSuggestions";
import { useScreenplayStore } from "../../store/useScreenplayStore";
import { CustomEditor, ScreenplayElement } from "../../types/editorTypes";
import Loader from "../global/Loader";
import useScreenSize from "../../hooks/useScreenSize";
import { useSuggestionDropdown } from "../../hooks/useSuggestionDropdown";
import SuggestionDropdown from "./SuggestionDropdown";
import { maxCharacterLengths } from "../../constants/maxCharacterLengths";
const ScreenplayEditor = () => {
  const { value, setValue, currentSelectedLine, setCurrentSelectedLine, suggestion, setSuggestion, hasHydrated } = useScreenplayStore();
  const editor = useMemo(() => withHistory(withReact(createEditor() as CustomEditor)), []);
  const isSmallScreen = useScreenSize(1000);
  const { visible, position, options, showDropdown, handleSelect, hideDropdown } = useSuggestionDropdown(editor);
  const editableRef = useRef(null);

  useEffect(() => {
    if (currentSelectedLine?.type !== "scene_heading") {
      hideDropdown();
    }
  }, [currentSelectedLine, hideDropdown]);

  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    let foundSuggestion = false;

    const processNode = (node: ScreenplayElement, path: Path) => {
      const textContent = Node.string(node);
      const trimmedText = textContent.trim();
      if (node.type === "scene_heading") {
        const randomIndex = Math.floor(Math.random() * predefinedSuggestions.length);
        const sceneSuggestion = predefinedSuggestions[randomIndex];
        setSuggestion({
          path,
          suggestion: sceneSuggestion,
          replacementText: sceneSuggestion,
        });
        foundSuggestion = true;
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

  const handleSceneHeadingDropdown = (e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
    if (currentSelectedLine?.type === "scene_heading") {
      const text = currentSelectedLine.text;
      const { selection } = editor;
      const isAtEndOfText = selection && selection.focus.offset === text.length;
      if (text.trim() === "") {
        e.preventDefault();
        showDropdown(["INT.", "EXT.", "INT./EXT.", "EST."], (option) => {
          Transforms.insertText(editor, option + " ");
        });
      } else if (text.endsWith(" -") && isAtEndOfText) {
        e.preventDefault();
        showDropdown(["DAY", "NIGHT", "CONTINUOUS", "LATER"], (option) => {
          Transforms.insertText(editor, " " + option);
          ReactEditor.focus(editor);
        });
      }
    } else {
      hideDropdown();
    }
  };

  const acceptSuggestion = () => {
    if (suggestion) {
      Transforms.insertText(editor, suggestion.replacementText, { at: [...suggestion.path, 0] });
      setSuggestion(null);
    }
  };

  const preventNextLine = (e: React.KeyboardEvent<HTMLElement>) => {
    const editor = editableRef.current;
    if (e.key === "Backspace" || e.key === "Delete" || (e.ctrlKey && e.key === "a") || !editor) {
      return;
    }
    const { scrollHeight, clientHeight } = editor;
    if (e.key == "Enter" && !currentSelectedLine?.text) {
      e.preventDefault();
      return;
    }
    if (e.key == "Enter" && scrollHeight > clientHeight) {
      e.preventDefault();
    }
    if (currentSelectedLine && currentSelectedLine.type in maxCharacterLengths) {
      const maxLength = maxCharacterLengths[currentSelectedLine.type as keyof typeof maxCharacterLengths];
      if (currentSelectedLine.text.length % maxLength === 0 && scrollHeight > clientHeight) {
        console.log("no space");
        e.preventDefault();
        return;
      }
    }
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const element = props.element as ScreenplayElement;
    return <Element {...props} element={element} />;
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <div className="bg-slate-900 text-center text-white p-10 w-full ">
          <h2 className="text-xl font-bold">Your screen size is too small for editing</h2>
          <p>Please increase the window size for a better editing experience.</p>
        </div>
      ) : (
        <>
          {hasHydrated ? (
            <div className="bg-transparent flex flex-col justify-center items-center">
              <Slate editor={editor} initialValue={value} onChange={handleChange}>
                <div className="w-full sticky top-0 z-50 bg-opacity-90 backdrop-blur-lg border-b border-slate-700 mb-4 bg-slate-900 flex justify-between items-center px-4 py-8">
                  <h1 className="text-2xl font-bold text-slate-100 tracking-wide">🎬 Screenplay Editor</h1>
                  <div className="flex gap-3 absolute left-1/2 transform -translate-x-1/2">
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
                </div>

                <Editable
                  ref={editableRef}
                  onKeyDown={preventNextLine}
                  onKeyUp={handleSceneHeadingDropdown}
                  onClick={handleSceneHeadingDropdown}
                  renderElement={renderElement}
                  spellCheck
                  autoFocus
                  className="
                  w-[8.5in] h-[11in] pl-[1.5in] pr-[1in] py-[1in] font-[Courier] text-[12pt]
                  whitespace-pre-wrap overflow-hidden leading-[1.15] focus:outline-none bg-slate-900
                  text-slate-200 placeholder-slate-400 border border-slate-700 mb-8
                  "
                />

                {suggestion && <SuggestionPopup suggestion={suggestion} onAccept={acceptSuggestion} onDismiss={() => setSuggestion(null)} />}
                {visible && position && <SuggestionDropdown position={position} options={options} onSelect={handleSelect} onClose={hideDropdown} />}
              </Slate>
            </div>
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
};

export default ScreenplayEditor;
