import React from "react";

interface AreaInputProps {
  value: { x: number; y: number; total: number };
  onChange: (value: { x: number; y: number; total: number }) => void;
}

export default function AreaInput({ value, onChange }: AreaInputProps) {
  const handleChange = (field: 'x' | 'y') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...value, [field]: Number(e.target.value) };
    newValue.total = newValue.x * newValue.y;
    onChange(newValue);
  };

  return (
    <div className="area-input">
      <h2>คำนวณจำนวนชิ้นจากพื้นที่กล่อง</h2>
      <div className="input-group">
        <label>ความยาวของกล่อง: </label>
        <input type="number" value={value.x || ""} onChange={handleChange('x')} placeholder="กรุณาใส่ความยาว" className="number-input" />
        <span className="unit">หน่วย</span>
      </div>
      <div className="input-group">
        <label>ความกว้างของกล่อง: </label>
        <input type="number" value={value.y || ""} onChange={handleChange('y')} placeholder="กรุณาใส่ความกว้าง" className="number-input" />
        <span className="unit">หน่วย</span>
      </div>
      <div className="result-area">
        <p>พื้นที่รวม: {value.total || 0} ตารางหน่วย</p>
      </div>
    </div>
  );
}
