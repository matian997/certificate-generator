import { useRef, useState } from "react";

import { Image, Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import Variable from "./placeholder";
import { IVariable } from "../models/variable.interface";
import Konva from "konva";

type CanvasContainerProps = {
  image: HTMLImageElement;
  variables: IVariable[];
  width: number;
  height: number;
  onUpdateVariables: (variables: IVariable[]) => void;
};

const findIndex = (variables: IVariable[], x: number, y: number): number => {
  return variables.findIndex(
    (variable) =>
      x >= variable.x! &&
      x <= variable.width! + variable.x! &&
      y >= variable.y! &&
      y <= variable.height! + variable.y!
  );
};

const defaultShape = (
  x: number,
  y: number,

  index: number
): IVariable => ({
  x,
  y,
  width: 150,
  height: 24,
  text: `variable${index + 1}`,
});

const CanvasContainer: React.FunctionComponent<CanvasContainerProps> = ({
  image,
  variables,
  width,
  height,
  onUpdateVariables,
}) => {
  const ref = useRef<Konva.Stage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const onClickHandler = (e: KonvaEventObject<MouseEvent>) => {
    const index = findIndex(variables, e.evt.x, e.evt.y);

    if (index > -1) {
      setSelectedIndex(index);
      return;
    }

    if (selectedIndex > -1) {
      setSelectedIndex(-1);
      return;
    }

    const pos = e.target.getStage()?.getPointerPosition();
    const newVariables = [...variables];

    newVariables.push(defaultShape(pos?.x!, pos?.y!, variables.length));

    onUpdateVariables(newVariables);
    setSelectedIndex(newVariables.length - 1);
  };

  const onUpdateHandler = (index: number, newState: IVariable) => {
    const newVariables = [...variables];

    newVariables[index] = { ...newVariables[index], ...newState };

    onUpdateVariables(newVariables);
  };

  return (
    <div className="flex items-center justify-around rounded-lg border-2 border-primary p-5">
      <Stage
        ref={ref}
        onClick={onClickHandler}
        width={width}
        height={height}
        style={{
          border: "1px solid black",
          marginTop: "20px",
        }}
      >
        <Layer>
          <Image
            alt="certificate"
            image={image}
            width={width}
            height={height}
          />

          {variables.map(({ x, y, width, height, text, isDragging }, index) => (
            <Variable
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              text={text}
              isDragging={isDragging}
              isSelected={index === selectedIndex}
              onUpdate={(state) => onUpdateHandler(index, state)}
              onTextClick={() => {
                setSelectedIndex(index);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasContainer;
