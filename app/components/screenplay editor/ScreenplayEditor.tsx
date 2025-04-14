"use client";
import { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor, Transforms, Editor, Node } from "slate";
import { Slate, Editable, withReact,RenderElementProps } from "slate-react";
import { withHistory } from "slate-history";
import BlockButton from "./BlockButton";
import Element from "./Element";
import SuggestionPopup from "./SuggestionPopup";
import { predefinedSuggestions } from "@/app/data/predefinedSuggestions";
import Loader from "../global/loader";
import { useScreenplayStore } from "@/app/store/useScreenplayStore";
import { Film, User, MessageSquare, BookOpen } from 'lucide-react'
const defaultValue = [
  {
    type: "scene_heading",
    children: [{ text: "Scene Heading" }],
  },
];

export default function ScreenplayEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { value, setValue,setCurrentSelectedLine,suggestion,setSuggestion,currentSelectedLine } = useScreenplayStore(); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const savedValue = localStorage.getItem("screenplay");
    if (savedValue) {
      setValue(JSON.parse(savedValue));
    }else{
      setValue(defaultValue)
    }
    setLoading(false); 
  }, []); 

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("screenplay", JSON.stringify(value));
    }
  }, [value, loading]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    let foundSuggestion = false;
  
    const processNode = (node: any, path: any) => {
      const textContent = Node.string(node);
      const trimmedText = textContent.trim();

      if (node.type === "scene_heading") {
        const randomIndex = Math.floor(Math.random() * predefinedSuggestions.length);
        const sceneSuggestion = predefinedSuggestions[randomIndex];
        if (sceneSuggestion) {
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
          suggestion: "Fixed Formatting issue",
          replacementText: trimmedText,
        });
        foundSuggestion = true;
      }
        setCurrentSelectedLine({type:node.type,text:textContent});
    };
    Editor.nodes(editor, {
      match: (n: any) =>
        n.type === "scene_heading" ||
        n.type === "action" ||
        n.type === "character" ||
        n.type === "dialogue",
    }).forEach(([node, path]) => {
      processNode(node, path);
    });
    if (!foundSuggestion) {
      setSuggestion(null);
    }
  };
  
const acceptSuggestion = () => {
  if (suggestion) {
    Transforms.insertText(editor, suggestion.replacementText, {
      at: suggestion.path,
    });
    setSuggestion(null);
  }
};


  const renderElement = useCallback((props: any) => <Element {...props} />, []);


  return (
    <div className="bg-slate-600 p-6 sm:p-8 rounded-3xl shadow-xl max-w-4xl mx-auto relative border border-gray-300">
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
    <div className="flex  justify-center items-center gap-3 px-4 py-3 bg-slate-800">
  <BlockButton type="scene_heading" icon={<Film size={18} />} >Scene</BlockButton>
  <BlockButton type="action" icon={<BookOpen size={18} />} >Action</BlockButton>
  <BlockButton type="character" icon={<User size={18} />} >Character</BlockButton>
  <BlockButton type="dialogue" icon={<MessageSquare size={18} />} >Dialogue</BlockButton>
</div>
  
<Editable
  renderElement={renderElement}
  placeholder="Start writing your screenplay..."
  spellCheck
  autoFocus
  className="min-h-[300px] p-5 text-[15px] font-mono focus:outline-none focus:ring-2 focus:ring-slate-9000
    bg-slate-900 text-slate-200 placeholder-slate-400 rounded-b-2xl"
/>
  
      {suggestion && (
        <SuggestionPopup
          suggestion={suggestion}
          onAccept={acceptSuggestion}
          onDismiss={() => setSuggestion(null)}
        />
      )}
    </Slate>
  </div>
  
  );
  
  
}
