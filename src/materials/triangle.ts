export const calculateTriangleArea = (base: number, height: number): number => {
  return 0.5 * base * height;
};

export const triangleShape = {
  id: 'triangle',
  name: 'สามเหลี่ยม',
  inputs: ['ฐาน', 'สูง'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateTriangleArea(inputs['ฐาน'], inputs['สูง']);
  }
};