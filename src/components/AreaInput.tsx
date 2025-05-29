import React from "react";

interface AreaInputProps {
  value: string | number;
  onChange: (value: number) => void;
}

export default function AreaInput({ value, onChange }: AreaInputProps) {
  return (
    <div className="area-input">
      <h2>คำนวณจำนวนชิ้นจากพื้นที่</h2>
      <div className="input-group">
        <label>พื้นที่รวมทั้งหมด: </label>
        <input
          type="number"
          value={value === 0 ? "" : value}
          onChange={e => onChange(Number(e.target.value))}
          placeholder="กรุณาใส่พื้นที่"
          className="number-input"
        />
        <span className="unit">ตารางหน่วย</span>
      </div>
    </div>
  );
}