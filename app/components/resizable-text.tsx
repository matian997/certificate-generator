import { KonvaEventObject } from "konva/lib/Node";

import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";

type TextProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  isDragging?: boolean;
};

type ResizableTextProps = {
  isSelected: boolean;
  onResize: (width: number, height: number) => void;
  onClick: (e: KonvaEventObject<Event>) => void;
  onDoubleClick: (e: KonvaEventObject<MouseEvent>) => void;
  onDrag: (e: any) => void;
} & TextProps;

const ResizableText: React.FunctionComponent<ResizableTextProps> = ({
  x,
  y,
  text,
  isDragging,
  isSelected,
  width,
  onResize,
  onClick,
  onDoubleClick,
  onDrag,
}) => {
  const textRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleResize = () => {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();

      textNode.setAttrs({
        width: newWidth,
        scaleX: 1,
      });

      onResize(newWidth, newHeight);
    }
  };

  const onDragHandler = () => {
    onDrag({
      isDragging: true,
    });
  };

  const onDragEndHandler = (e: KonvaEventObject<DragEvent>) => {
    onDrag({
      isDragging: false,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const transformer = isSelected ? (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      flipEnabled={false}
      enabledAnchors={["middle-left", "middle-right"]}
      boundBoxFunc={(_, newBox) => {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }}
    />
  ) : null;

  return (
    <>
      <Text
        x={x}
        y={y}
        text={text}
        ref={textRef}
        fill={isDragging ? "green" : "black"}
        fontFamily="sans-serif"
        fontSize={24}
        onTransform={handleResize}
        onClick={onClick}
        onTap={onClick}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        onDragStart={onDragHandler}
        onDragEnd={onDragEndHandler}
        width={width}
        draggable={isSelected}
      />
      {transformer}
    </>
  );
};

export default ResizableText;
