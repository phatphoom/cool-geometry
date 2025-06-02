import React from "react";
import { shapes, calculatePieces } from "@/materials";

interface ResultDisplayProps {
  totalArea: string | number;
  shape: string;
  shapeParams: Record<string, number>;
}

export default function ResultDisplay({
  totalArea,
  shape,
  shapeParams,
}: ResultDisplayProps) {
  const selectedShape = shapes.find((s) => s.id === shape);
  const numericTotalArea = Number(totalArea) || 0;

  if (!selectedShape) {
    return (
      <div className="result-display">
        <h3>ผลลัพธ์การคำนวณ</h3>
        <p className="shape-warning">กรุณาเลือกรูปทรงก่อนทำการคำนวณ</p>
      </div>
    );
  }

  // Get the area per piece for display purposes
  const areaPerPiece = Number(selectedShape.calculateArea(shapeParams));
  const safeAreaPerPiece =
    isNaN(areaPerPiece) || areaPerPiece <= 0 ? 0 : areaPerPiece;

  // Sheet dimensions are now included in shapeParams from the parent component
  // Calculate pieces using grid-based placement
  const pieces =
    safeAreaPerPiece > 0
      ? calculatePieces(numericTotalArea, selectedShape, shapeParams)
      : 0;

  const usedArea = pieces * safeAreaPerPiece;
  const remainingArea = numericTotalArea - usedArea;
  const percentUsed =
    numericTotalArea > 0 ? (usedArea / numericTotalArea) * 100 : 0;
  const percentRemaining = 100 - percentUsed;

  return (
    <div className="result-display">
      <h3>ผลลัพธ์การคำนวณ</h3>
      <div className="result-info">
        <p>
          รูปทรงที่เลือก: <span>{selectedShape.name}</span>
        </p>
        <p>
          พื้นที่รวม : <span>{numericTotalArea.toFixed(2)}</span> ตารางหน่วย
        </p>
        <p>
          พื้นที่ต่อชิ้น: <span>{safeAreaPerPiece.toFixed(2)}</span> ตารางหน่วย
        </p>
        <p>
          พื้นที่ที่ใช้ไป :{" "}
          <span className="area-use">{percentUsed.toFixed(2)}%</span> (
          {usedArea.toFixed(2)} ตารางหน่วย)
        </p>
        <p>
          พื้นที่ที่เหลือ :{" "}
          <span className="area-remain">{percentRemaining.toFixed(2)}%</span> (
          {remainingArea.toFixed(2)} ตารางหน่วย)
        </p>

        {selectedShape.getDimensions && (
          <div className="grid-layout-info">
            <p>การจัดวางแบบตาราง:</p>
            {shapeParams.sheetWidth > 0 &&
              shapeParams.sheetHeight > 0 &&
              selectedShape.getDimensions && (
                <>
                  <p>
                    แนวนอน:{" "}
                    <span>
                      {Math.floor(
                        shapeParams.sheetWidth /
                          (selectedShape.getDimensions(shapeParams).width || 1)
                      )}
                    </span>{" "}
                    ชิ้น
                  </p>
                  <p>
                    แนวตั้ง:{" "}
                    <span>
                      {Math.floor(
                        shapeParams.sheetHeight /
                          (selectedShape.getDimensions(shapeParams).height || 1)
                      )}
                    </span>{" "}
                    ชิ้น
                  </p>
                </>
              )}
          </div>
        )}

      <p className="pieces-result">
          จำนวนชิ้นที่สร้างได้ : <span>{pieces}</span> ชิ้น
      </p>
      </div>
    </div>
  );
}
