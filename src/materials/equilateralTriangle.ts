// สามเหลี่ยมด้านเท่า
export const calculateEquilateralTriangleArea = (side: number): number => {
  return (Math.sqrt(3) / 4) * Math.pow(side, 2);
};

export const equilateralTriangleShape = {
  id: 'equilateralTriangle',
  name: 'สามเหลี่ยมด้านเท่า',
  inputs: ['ด้าน'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateEquilateralTriangleArea(inputs['ด้าน']);
  },
  getDimensions: (inputs: Record<string, number>) => {
    const side = inputs['ด้าน'] || 0;
    // Height of equilateral triangle = (√3/2) * side
    const height = (Math.sqrt(3) / 2) * side;
    return {
      width: side,
      height: height
    };
  }
};