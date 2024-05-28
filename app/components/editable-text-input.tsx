import React from "react";
import { Html } from "react-konva-utils";

type EditableTextInput = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

const getStyle = (width?: number, height?: number) => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    // resize: "none",
    color: "black",
    fontSize: "24px",
    fontFamily: "sans-serif",
  };

  if (isFirefox) {
    return baseStyle;
  }

  return {
    ...baseStyle,
    "margin-top": "-4px",
  };
};

const EditableTextInput: React.FunctionComponent<EditableTextInput> = ({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
}) => {
  const style = getStyle(width, height);

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={value}
        style={style}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Html>
  );
};

export default EditableTextInput;
