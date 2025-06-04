import React from "react";
import { shapes, calculatePieces } from "@/materials";
import { Stage, Layer, Rect, Circle, Line, Group } from "react-konva";

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

  // คำนวณพื้นที่ต่อชิ้น
  const areaPerPiece = Number(selectedShape.calculateArea(shapeParams));
  const safeAreaPerPiece = isNaN(areaPerPiece) || areaPerPiece <= 0 ? 0 : areaPerPiece;

  // คำนวณจำนวนชิ้น
  const pieces = safeAreaPerPiece > 0
    ? calculatePieces(numericTotalArea, selectedShape, shapeParams)
    : 0;

  const usedArea = pieces * safeAreaPerPiece;
  const remainingArea = numericTotalArea - usedArea;
  const percentUsed = numericTotalArea > 0 ? (usedArea / numericTotalArea) * 100 : 0;
  const percentRemaining = 100 - percentUsed;

  // คำนวณขนาด Stage และ scaling factor
  const maxStageWidth = 500;
  const maxStageHeight = 400;
  const sheetWidth = shapeParams.sheetWidth || 1;
  const sheetHeight = shapeParams.sheetHeight || 1;
  const sheetRatio = sheetWidth / sheetHeight;
  const stageWidth = Math.min(maxStageWidth, maxStageHeight * sheetRatio);
  const stageHeight = Math.min(maxStageHeight, maxStageWidth / sheetRatio);
  const scaleX = stageWidth / sheetWidth;
  const scaleY = stageHeight / sheetHeight;
  const scale = Math.min(scaleX, scaleY);

  // คำนวณจำนวนแถวและคอลัมน์
  const shapeDims = selectedShape.getDimensions?.(shapeParams) || { width: 0, height: 0 };
  const rows = shapeDims.height > 0 ? Math.floor(sheetHeight / shapeDims.height) : 0;
  const cols = shapeDims.width > 0 ? Math.floor(sheetWidth / shapeDims.width) : 0;

  return (
    <div className="result-container">
      <div className="result-display">
        <div className="result-info">
          <h3>ผลลัพธ์การคำนวณ</h3>
          <p>รูปทรงที่เลือก: <span>{selectedShape.name}</span></p>
          <p>พื้นที่รวม : <span>{numericTotalArea.toFixed(2)}</span> ตารางหน่วย</p>
          <p>พื้นที่ต่อชิ้น: <span>{safeAreaPerPiece.toFixed(2)}</span> ตารางหน่วย</p>
          <p>พื้นที่ที่ใช้ไป : <span className="area-use">{percentUsed.toFixed(2)}%</span> ({usedArea.toFixed(2)} ตารางหน่วย)</p>
          <p>พื้นที่ที่เหลือ : <span className="area-remain">{percentRemaining.toFixed(2)}%</span> ({remainingArea.toFixed(2)} ตารางหน่วย)</p>
          <p className="pieces-result">จำนวนชิ้นที่สร้างได้ : <span>{pieces}</span> ชิ้น</p>
        </div>
      </div>

      {selectedShape && pieces > 0 && (
      <div className="konva-display" >
          <div className="visual-result">
            <h4 style={{ 
              backgroundColor: "#f5f5f5",
              marginTop: "20px" , 
              textAlign: "center", 
              color: "#607dff", 
              fontSize: "1.6rem",
              fontWeight: "bold"
            }}>
              การจัดวางรูปทรง
            </h4>

            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              marginBottom: "10px" 
            }}>
              <div>
                <strong>ขนาดแผ่น : </strong> 
                <span style={{ 
                  color: "#607dff", 
                  fontWeight: "bold", 
                  fontSize: "1.2rem"
                }}>
                  {sheetWidth} x {sheetHeight} หน่วย
                </span>
              </div>
              <div>
                <strong>จำนวนแถว x คอลัมน์ : </strong> 
                <span style={{ 
                  color: "#607dff", 
                  fontWeight: "bold", 
                  fontSize: "1.2rem"
                }}>
                  {rows} x {cols}
                </span>
              </div>
            </div>

            <Stage width={stageWidth} height={stageHeight}>
            <Layer>
              <Rect 
                x={0} 
                y={0} 
                width={sheetWidth * scale} 
                height={sheetHeight * scale} 
                fill="#607dff" 
                cornerRadius={13}
              />

                {/* วาดรูปทรงแต่ละช่อง */}
                {Array.from({ length: rows }, (_, rowIndex) => {
                    const y = rowIndex * shapeDims.height * scale;
                    return Array.from({ length: cols }, (_, colIndex) => {
                    const x = colIndex * shapeDims.width * scale;
                    const shapeWidth = shapeDims.width * scale;
                    const shapeHeight = shapeDims.height * scale;

                    if (["triangle", "equilateralTriangle", "heronTriangle"].includes(selectedShape.id)) {
                      return (
                        <Group key={`shape-${rowIndex}-${colIndex}`}>
                          <Line 
                            points={[
                              x + shapeWidth/2, y + 5, 
                              x, y + shapeHeight, 
                              x + shapeWidth, y + shapeHeight
                            ]} 
                            closed 
                            fill="#BB6BD9" 
                            shadowColor="rgba(0,0,0,0.3)" 
                            shadowBlur={2} 
                            shadowOffset={{ x: 1, y: 1 }} 
                          />
                        </Group>
                      );
                    } else if (selectedShape.id === "square") {
                      return (
                        <Group key={`shape-${rowIndex}-${colIndex}`}>
                          <Rect 
                            x={x} 
                            y={y} 
                            width={shapeWidth} 
                            height={shapeHeight} 
                            fill="#6FCF97" 
                            shadowColor="rgba(0,0,0,0.3)" 
                            shadowBlur={2} 
                            shadowOffset={{ x: 1, y: 1 }} 
                          />
                        </Group>
                      );
                    } else if (selectedShape.id === "rectangle") {
                      return (
                        <Group key={`shape-${rowIndex}-${colIndex}`}>
                          <Rect 
                            x={x} 
                            y={y} 
                            width={shapeWidth} 
                            height={shapeHeight} 
                            fill="#FFB84C" 
                            shadowColor="rgba(0,0,0,0.3)" 
                            shadowBlur={5} 
                            shadowOffset={{ x: 1, y: 1 }} 
                          />
                        </Group>
                      );
                    } else if (selectedShape.id === "circle") {
                      return (
                        <Group key={`shape-${rowIndex}-${colIndex}`}>
                          <Circle 
                            x={x + shapeWidth/2} 
                            y={y + shapeHeight/2} 
                            radius={shapeWidth/2} 
                            fill="#00f7ff" 
                            shadowColor="rgba(0, 0, 0, 0.3)" 
                            shadowBlur={5} 
                            shadowOffset={{ x: 1, y: 1 }} 
                          />
                        </Group>
                      );
                    } else if (selectedShape.id === "annulus") {
                      return (
                        <Group key={`shape-${rowIndex}-${colIndex}`}>
                          <Circle 
                            x={x + shapeWidth/2} 
                            y={y + shapeHeight/2} 
                            radius={shapeWidth/2} 
                            fill="#ed8936" 
                            stroke="#c05621" 
                            strokeWidth={1} 
                          />
                          <Circle 
                            x={x + shapeWidth/2} 
                            y={y + shapeHeight/2} 
                            radius={shapeWidth/4} 
                            fill="#2c5282" 
                            stroke="#c05621" 
                            strokeWidth={1} 
                          />
                        </Group>
                      );
                    } else {
                      return (
                        <Group key={`shape-${rowIndex}-${colIndex}`}>
                          <Rect 
                            x={x} 
                            y={y} 
                            width={shapeWidth} 
                            height={shapeHeight} 
                            fill="#ed8936" 
                            stroke="#c05621" 
                            strokeWidth={1} 
                            cornerRadius={2} 
                            shadowColor="rgba(0,0,0,0.3)" 
                            shadowBlur={2} 
                            shadowOffset={{ x: 1, y: 1 }} 
                          />
                        </Group>
                      );
                    }
                  });
                })}
              </Layer>
            </Stage>
          </div>
        </div>
      )}
    </div>
  );
}
