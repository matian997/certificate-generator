import { IVariable } from "../models/variable.interface";
import EditableTextInput from "./editable-text-input";
import ResizableText from "./resizable-text";

type EditableTextProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  isDragging?: boolean;
  isEditing?: boolean;
  isTransforming: boolean;
  onToggleEdit: () => void;
  onToggleTransform: () => void;
  onUpdate: (data: IVariable) => void;
};

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

const EditableText: React.FunctionComponent<EditableTextProps> = ({
  x,
  y,
  width,
  height,
  text,
  isEditing,
  isDragging,
  isTransforming,
  onToggleEdit,
  onToggleTransform,
  onUpdate,
}) => {
  const handleEscapeKeys = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ text: e.currentTarget.value });
  };

  const onDragHandler = (e: IVariable) => {
    onUpdate({ isDragging: e.isDragging, x: e.x, y: e.y });
  };

  const onResizeHandler = (width: number, height: number) => {
    onUpdate({ width, height });
  };

  if (isEditing) {
    return (
      <EditableTextInput
        x={x}
        y={y}
        width={width}
        height={height}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
      />
    );
  }

  return (
    <ResizableText
      x={x}
      y={y}
      isDragging={isDragging}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      onDrag={onDragHandler}
      onResize={onResizeHandler}
      text={text}
      width={width}
    />
  );
};

export default EditableText;
