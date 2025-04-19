import { BaseEditor, BaseElement, BaseText } from "slate";
import { ReactEditor,RenderElementProps } from "slate-react";

export type ScreenplayElementType = "scene_heading" | "action" | "character" | "dialogue";



export interface ScreenplayElement extends BaseElement {
  type: ScreenplayElementType;
  children: BaseText[];
}

export type CustomEditor = BaseEditor & ReactEditor;

export interface ScreenplayElementProps extends RenderElementProps {
    element: ScreenplayElement;
  }


