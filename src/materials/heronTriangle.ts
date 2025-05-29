// สามเหลี่ยมด้านไม่เท่า (สูตรเฮรอน)
export const calculateTriangleHeronArea = (a: number, b: number, c: number): number => {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
};

export const heronTriangleShape = {
  id: 'heronTriangle',
  name: 'สามเหลี่ยมด้านไม่เท่า',
  inputs: ['ด้าน a', 'ด้าน b', 'ด้าน c'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateTriangleHeronArea(inputs['ด้าน a'], inputs['ด้าน b'], inputs['ด้าน c']);
  }
};