import { Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import { useScreenplayStore } from "../../store/useScreenplayStore";
import { BlockButtonProps } from "../../types/blockButtonTypes";

const BlockButton = ({ type, children, icon }: BlockButtonProps) => {
  const editor = useSlate();
  const { currentSelectedLine } = useScreenplayStore();
  const isSelected = type == currentSelectedLine?.type || false;
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        Transforms.setNodes(editor, { type } as Partial<SlateElement>, {
          match: (n) => SlateElement.isElement(n),
          mode: "lowest",
        });
      }}
      className={`w-20 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md text-[12px] font-medium transition-all duration-150
    ${isSelected ? "bg-white text-slate-900 ring-2 ring-slate-300" : "bg-slate-700 text-slate-200 hover:bg-slate-600"}
    focus:outline-none focus:ring-2 focus:ring-slate-300`}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default BlockButton;
