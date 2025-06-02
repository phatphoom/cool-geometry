// components/ShapeSelector.tsx
import React from "react";

interface Shape {
  id: string;
  name: string;
}

const shapes: Shape[] = [
  { id: "square", name: "สี่เหลี่ยมจัตุรัส" },
  { id: "rectangle", name: "สี่เหลี่ยมผืนผ้า" },
  { id: "circle", name: "วงกลม" },
  { id: "triangle", name: "สามเหลี่ยม" } ,
  // { id: "annulus ", name: "วงแหวน" } ,
  { id: "equilateralTriangle", name: "สามเหลี่ยมด้านเท่า" } ,
  { id : "heronTriangle" , name: "สามเหลี่ยมด้านไม่เท่า" },
];

interface ShapeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ShapeSelector({ value, onChange }: ShapeSelectorProps) {
  return (
    <div className="shape-selector">
      <h2>เลือกรูปทรงเลขาคณิต</h2>
      <div className="shape-options">
        {shapes.map(shape => (
          <div 
            key={shape.id} 
            className={`shape-option ${value === shape.id ? "selected" : ""}`}
            onClick={() => onChange(shape.id)}
          >
            {shape.name}
          </div>
        ))}
      </div>
    </div>
  );
}