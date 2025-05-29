import React from "react";
import { shapes } from "@/materials";

interface ShapeInputProps {
  shape: string;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
}

export default function ShapeInput({ shape, value, onChange }: ShapeInputProps) {
  const selectedShape = shapes.find(s => s.id === shape);
  
  if (!selectedShape) return null;
  
  return (
    <div className="shape-input">
      {selectedShape.inputs.map((inputName, index) => (
        <div key={index} className="input-group">
          <label>{inputName}: </label>
          <input 
            type="number" 
            value={value[inputName] || ""} 
            onChange={e => onChange({ ...value, [inputName]: Number(e.target.value) })} 
            min={0}
            className="number-input"
          />
        </div>
      ))}
    </div>
  );
}