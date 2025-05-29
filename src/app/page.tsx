"use client";
import React from "react";
import {
  AreaInput,
  ShapeSelector,
  ShapeInput,
  ResultDisplay, 
} from "@/components";

export default function Page() {
  const [totalArea, setTotalArea] = React.useState<number>(0);
  const [shape, setShape] = React.useState("");
  const [shapeParams, setShapeParams] = React.useState<Record<string, number>>(
    {}
  );

  // เมื่อเปลี่ยนรูปทรง ให้รีเซ็ตค่าพารามิเตอร์
  React.useEffect(() => {
    setShapeParams({});
  }, [shape]);

  return (
    <div className="container">
      <div className="calculator-card">
        <AreaInput value={totalArea} onChange={setTotalArea} />
        <ShapeSelector value={shape} onChange={setShape} />
        <ShapeInput
          shape={shape}
          value={shapeParams}
          onChange={setShapeParams}
        />
        <ResultDisplay
          totalArea={totalArea}
          shape={shape}
          shapeParams={shapeParams}
        />
      </div>
    </div>
  );
}
