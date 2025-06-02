export const calculateRectangleArea = (width: number, height: number): number => {
  return width * height;
};

export const rectangleShape = {
  id: 'rectangle',
  name: 'สี่เหลี่ยมผืนผ้า',
  inputs: ['กว้าง', 'ยาว'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateRectangleArea(inputs['กว้าง'], inputs['ยาว']);
  },
  getDimensions: (inputs: Record<string, number>) => {
    return {
      width: inputs['กว้าง'] || 0,
      height: inputs['ยาว'] || 0
    };
  }
};