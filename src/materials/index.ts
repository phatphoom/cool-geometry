import { calculateTriangleArea, triangleShape } from './triangle';
import { calculateEquilateralTriangleArea, equilateralTriangleShape } from './equilateralTriangle';
import { calculateTriangleHeronArea, heronTriangleShape } from './heronTriangle';
import { calculateSquareArea, squareShape } from './square';
import { calculateRectangleArea, rectangleShape } from './rectangle';
import { calculateCircleArea, circleShape } from './circle';
import { calculateAnnulusArea, annulusShape } from './annulus';
import { calculatePieces } from './calculator';

// ส่งออกฟังก์ชันทั้งหมด
export {
  // สามเหลี่ยม
  calculateTriangleArea,
  calculateEquilateralTriangleArea,
  calculateTriangleHeronArea,
  
  // สี่เหลี่ยม
  calculateSquareArea,
  calculateRectangleArea,
  
  // วงกลม
  calculateCircleArea,
  calculateAnnulusArea,
  
  // คำนวณจำนวนชิ้น
  calculatePieces
};

// ส่งออกข้อมูลรูปทรง
export const shapes = [
  // สามเหลี่ยม
  triangleShape,
  equilateralTriangleShape,
  heronTriangleShape,
  
  // สี่เหลี่ยม
  squareShape,
  rectangleShape,
  
  // วงกลม
  circleShape,
  annulusShape
];