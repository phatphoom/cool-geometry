export const calculateTriangleArea = (base: number, height: number): number => {
  return 0.5 * base * height;
};

export const triangleShape = {
  id: 'triangle',
  name: 'สามเหลี่ยม',
  inputs: ['ฐาน', 'สูง'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateTriangleArea(inputs['ฐาน'], inputs['สูง']);
  },
  getDimensions: (inputs: Record<string, number>) => {
    return {
      width: inputs['ฐาน'] || 0,
      height: inputs['สูง'] || 0
    };
  }
};