import React from "react";
import { shapes } from "@/materials";

interface ShapeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ShapeSelector({ value, onChange }: ShapeSelectorProps) {
  return (
    <div className="shape-selector">
      <label>เลือกรูปทรงเลขาคณิต: </label>
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="select-input"
      >
        <option value="">-- เลือกรูปทรงที่ต้องการ --</option>
        {shapes.map(shape => (
          <option key={shape.id} value={shape.id}>{shape.name}</option>
        ))}
      </select>
    </div>
  );
}