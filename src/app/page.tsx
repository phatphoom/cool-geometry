"use client";
import React from "react";
import {
  AreaInput,
  ShapeSelector,
  ShapeInput,
  ResultDisplay,
} from "@/components";

export default function Page() {
  const [shape, setShape] = React.useState("");
  const [shapeParams, setShapeParams] = React.useState<Record<string, number>>(
    {}
  );
  const [boxDimensions, setBoxDimensions] = React.useState({
    x: 0,
    y: 0,
    total: 0,
  });

  React.useEffect(() => {
    setShapeParams({});
  }, [shape]);

  return (
    <div className="container">
      <div className="calculator-card">
        <div className="calculator-content">
          <div className="form-section">
            <AreaInput value={boxDimensions} onChange={setBoxDimensions} />
            <ShapeSelector value={shape} onChange={setShape} />
            <ShapeInput
              shape={shape}
              value={shapeParams}
              onChange={setShapeParams}
            />
          </div>

          <div className="result-section">
            <ResultDisplay
              totalArea={boxDimensions.total}
              shape={shape}
              shapeParams={{
                ...shapeParams,
                sheetWidth: boxDimensions.x,
                sheetHeight: boxDimensions.y,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
