import React from "react";
import { shapes, calculatePieces } from "@/materials";

interface ResultDisplayProps {
  totalArea: string | number;
  shape: string;
  shapeParams: Record<string, number>;
}

export default function ResultDisplay({ totalArea, shape, shapeParams }: ResultDisplayProps) {
  const selectedShape = shapes.find(s => s.id === shape);
  const numericTotalArea = Number(totalArea) || 0;
  const areaPerPiece = selectedShape ? Number(selectedShape.calculateArea(shapeParams)) : 0; // เพิ่มมาเพื่อแสดงผลพื้นที่ต่อชิ้น
  const safeAreaPerPiece = isNaN(areaPerPiece) || areaPerPiece <= 0 ? 0 : areaPerPiece; // ป้องกันค่าผิด (NaN, ลบ, หรือ 0)
  const pieces = safeAreaPerPiece > 0 && selectedShape ? calculatePieces(numericTotalArea, selectedShape, shapeParams) : 0;

  return (
    <div className="result-display">
      <h3>ผลลัพธ์การคำนวณ</h3>
      <div className="result-info">
        <p>พื้นที่รวม : <span>{numericTotalArea}</span> ตารางหน่วย</p>
        {selectedShape && (
          <p>พื้นที่ต่อชิ้น: <span>{safeAreaPerPiece.toFixed(2)}</span> ตารางหน่วย</p>
        )}
        <p className="pieces-result">จำนวนชิ้นที่สร้างได้ : <span>{pieces}</span> ชิ้น</p>
      </div>
    </div>
  );
}

// ปัญหา NaN คือ ผลลัพธ์ที่เกิดจากการแปลงค่าหรือคำนวณที่ไม่สามารถให้ผลลัพธ์เป็นตัวเลขได้ 
// แก้คือ เพิ่มตัวแปร safeAreaPerPiece เพื่อเช็คและป้องกัน NaN ก่อนแสดงผล จะช่วยให้ไม่ขึ้น NaN 
// ถ้า areaPerPiece ไม่ใช่ตัวเลข (NaN) หรือ ≤ 0 → ใช้ 0 แทน
