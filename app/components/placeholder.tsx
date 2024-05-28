import { useEffect, useState } from "react";

import { IVariable } from "../models/variable.interface";

import EditableText from "./editable-text";

type VariableProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  isDragging?: boolean;
  isSelected: boolean;
  onUpdate: (variable: IVariable) => void;
  onTextClick: (value: boolean) => void;
};

const Variable: React.FunctionComponent<VariableProps> = ({
  x,
  y,
  width,
  height,
  text,
  isDragging,
  isSelected,
  onUpdate,
  onTextClick,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    } else if (!isSelected && isTransforming) {
      setIsTransforming(false);
    }
  }, [isSelected, isEditing, isTransforming]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  };

  const toggleTransforming = () => {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  };

  return (
    <EditableText
      x={x}
      y={y}
      text={text}
      width={width}
      height={height}
      isDragging={isDragging}
      isEditing={isEditing}
      isTransforming={isTransforming || isSelected}
      onToggleEdit={toggleEdit}
      onToggleTransform={toggleTransforming}
      onUpdate={onUpdate}
    />
  );
};

export default Variable;
