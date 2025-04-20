import React from "react";
import { ScreenplayElementProps, ScreenplayElement } from "@/src/types/editorTypes";
import { elementConfig } from "@/src/config/screenplayElementConfig";

const Element = ({ attributes, children, element }: ScreenplayElementProps) => {
  const { type } = element as ScreenplayElement;
  const config = elementConfig[type as keyof typeof elementConfig];
  const { tag: Tag, className } = config;

  return (
    <Tag {...attributes} className={`${className}`}>
      {children}
    </Tag>
  );
};

export default Element;
