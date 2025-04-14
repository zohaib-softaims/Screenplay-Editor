import { Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";

export default function BlockButton({ type, children }: { type: string; children: string }) {
  const editor = useSlate();

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        Transforms.setNodes(
          editor,
          { type } as Partial<SlateElement>,
          {
            match: (n) => SlateElement.isElement(n),
            mode: 'lowest',
          }
        );
      }}
      className="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-sm"
    >
      {children}
    </button>
  );
}
