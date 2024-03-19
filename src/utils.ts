import { brushElement } from "./types";

export const handleUndo = ({
  undoedDrawing,
  drawing,
  setDrawing,
  setUndoedDrawing,
}: {
  undoedDrawing: Array<brushElement>;
  drawing: Array<brushElement>;
  setDrawing: React.Dispatch<React.SetStateAction<Array<brushElement>>>;
  setUndoedDrawing: React.Dispatch<React.SetStateAction<Array<brushElement>>>;
}) => {
  const newDrawings = [...drawing];
  const newUndoedDrawings = newDrawings.pop();
  if (!newUndoedDrawings) return;
  setUndoedDrawing([...undoedDrawing, newUndoedDrawings]);
  setDrawing(newDrawings);
};

export const handleRedo = ({
  undoedDrawing,
  drawing,
  setDrawing,
  setUndoedDrawing,
}: {
  undoedDrawing: Array<brushElement>;
  drawing: Array<brushElement>;
  setDrawing: React.Dispatch<React.SetStateAction<Array<brushElement>>>;
  setUndoedDrawing: React.Dispatch<React.SetStateAction<Array<brushElement>>>;
}) => {
  const newUndoedDrawings = [...undoedDrawing];
  const newDrawings = newUndoedDrawings.pop();
  if (!newDrawings) return;
  setDrawing([...drawing, newDrawings]);
  setUndoedDrawing(newUndoedDrawings);
};

export const drawElement = (
  element: brushElement,
  context: CanvasRenderingContext2D
) => {
  context.beginPath();
  context.arc(element.x, element.y, element.size / 2, 0, 2 * Math.PI);
  context.fillStyle = element.color;
  context.fill();
  context.closePath();
};

export const handleMouseDown = ({
  event,
  setIsDrawing,
  drawing,
  color,
  brushSize,
  setDrawing,
}: {
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: Array<brushElement>;
  color: string;
  brushSize: number;
  setDrawing: React.Dispatch<React.SetStateAction<Array<brushElement>>>;
}) => {
  const { offsetX, offsetY } = event.nativeEvent;
  setIsDrawing(true);

  const brush: brushElement = {
    x: offsetX,
    y: offsetY,
    color: color,
    size: brushSize,
  };

  setDrawing([...drawing, brush]);
};

export const handleMouseMove = ({
  event,
  setIsDrawing,
  drawing,
  color,
  brushSize,
  isDrawing,
  setDrawing,
}: {
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  drawing: Array<brushElement>;
  color: string;
  brushSize: number;
  isDrawing: boolean;
  setDrawing: React.Dispatch<React.SetStateAction<Array<brushElement>>>;
}) => {
  if (isDrawing) {
    const { offsetX, offsetY } = event.nativeEvent;
    setIsDrawing(true);

    const brush: brushElement = {
      x: offsetX,
      y: offsetY,
      color: color,
      size: brushSize,
    };

    setDrawing([...drawing, brush]);
  }
};

export const handleMouseUp = ({
  setIsDrawing,
}: {
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setIsDrawing(false);
};

export const changeBackground = ({
  backgrounds,
  backgroundImage,
  setBackgroundImage,
}: {
  backgrounds: Array<string>;
  backgroundImage: string;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const currentBgIndex = backgrounds.findIndex(
    (bg: string) => bg === backgroundImage
  );

  if (backgrounds[currentBgIndex + 1])
    setBackgroundImage(backgrounds[currentBgIndex + 1]);
  else {
    setBackgroundImage(backgrounds[0]);
  }
};
export const clear = ({
  setDrawing,
}: {
  setDrawing: React.Dispatch<React.SetStateAction<brushElement[]>>;
}) => {
  setDrawing([]);
};
