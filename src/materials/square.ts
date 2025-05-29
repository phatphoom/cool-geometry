export const calculateSquareArea = (side: number): number => {
  return side * side;
};

export const squareShape = {
  id: 'square',
  name: 'สี่เหลี่ยมจัตุรัส',
  inputs: ['ด้าน'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateSquareArea(inputs['ด้าน']);
  }
};