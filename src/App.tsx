import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  changeBackground,
  clear,
  drawElement,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleRedo,
  handleUndo,
} from "./utils";
import { brushElement } from "./types";

const backgrounds = ["book", "gift-sweater", "house-cookie", "snowman", "tree"];

function App() {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState<Array<brushElement>>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [undoedDrawing, setUndoedDrawing] = useState<Array<brushElement>>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("book");
  const [color, setColor] = useState<string>("#242424");
  const [brushSize, setBrushSize] = useState<number>(5);

  useEffect(() => {
    const canvas = canvaRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawing.forEach((element) => {
      drawElement(element, context);
    });
  });

  return (
    <>
      <canvas
        width={800}
        height={600}
        ref={canvaRef}
        onMouseDown={(e) =>
          handleMouseDown({
            event: e,
            setIsDrawing,
            drawing,
            color,
            brushSize,
            setDrawing,
          })
        }
        onMouseMove={(e) =>
          handleMouseMove({
            event: e,
            setIsDrawing,
            drawing,
            color,
            brushSize,
            isDrawing,
            setDrawing,
          })
        }
        onMouseUp={() => handleMouseUp({ setIsDrawing })}
        style={{
          background: `url(/background/${backgroundImage}.png)`,
          borderRadius: "12px",
        }}
      />
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <input
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          id='myRange'
          type='range'
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          min={1}
          max={20}
        />
        <button
          onClick={() =>
            handleUndo({ undoedDrawing, drawing, setDrawing, setUndoedDrawing })
          }
        >
          Undo
        </button>
        <button
          onClick={() =>
            handleRedo({ undoedDrawing, drawing, setDrawing, setUndoedDrawing })
          }
        >
          Redo
        </button>
        <button
          onClick={() =>
            changeBackground({
              backgrounds,
              backgroundImage,
              setBackgroundImage,
            })
          }
        >
          Change background
        </button>
        <button onClick={() => clear({ setDrawing })}>Clear</button>
      </div>
    </>
  );
}

export default App;
