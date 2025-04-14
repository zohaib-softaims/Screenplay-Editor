"use client"
import { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor, Transforms, Editor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

import BlockButton from "./BlockButton";
import Element from "./Element";
import SuggestionPopup from "./SuggestionPopup";

const defaultValue = [
  {
    type: "scene_heading",
    children: [{ text: "INT. ROOM – NIGHT" }],
  },
  {
    type: "action",
    children: [{ text: "John enters the dark room cautiously." }],
  },
  {
    type: "character",
    children: [{ text: "JOHN" }],
  },
  {
    type: "dialogue",
    children: [{ text: "Is anyone here?" }],
  },
];

export default function ScreenplayEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<any>(defaultValue);
  const [suggestion, setSuggestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("screenplay");
    if (saved) {
      setValue(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("screenplay", JSON.stringify(value));
  }, [value]);

  const handleChange = (newValue: any) => {
    setValue(newValue);
console.log("new value",newValue)
    const [nodeEntry] = Editor.nodes(editor, {
      match: (n: any) => n.type === "scene_heading",
      reverse: true,
    });

    if (nodeEntry) {
      const [node, path] = nodeEntry;
      const textContent = Node.string(node);
      if (textContent === "INT. ROOM – NIGHT") {
        setSuggestion({ path, suggestion: "INT. DARK BASEMENT – NIGHT" });
      } else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }
  };

  const acceptSuggestion = () => {
    if (suggestion) {
      Transforms.delete(editor, { at: suggestion.path.concat(0) });
      Transforms.insertText(editor, suggestion.suggestion, {
        at: suggestion.path.concat(0),
      });
      setSuggestion(null);
    }
  };

  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  return (
    <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto relative">
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <div className="flex gap-2 mb-4">
          <BlockButton type="scene_heading">Scene</BlockButton>
          <BlockButton type="action">Action</BlockButton>
          <BlockButton type="character">Character</BlockButton>
          <BlockButton type="dialogue">Dialogue</BlockButton>
        </div>

        <Editable
          renderElement={renderElement}
          placeholder="Start writing your screenplay..."
          spellCheck
          autoFocus
          className="min-h-[200px] p-2 border rounded"
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
