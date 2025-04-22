import { Film, User, MessageSquare, BookOpen } from "lucide-react";
import BlockButton from "./BlockButton";
const EditorHeader = () => {
  return (
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
  );
};

export default EditorHeader;
