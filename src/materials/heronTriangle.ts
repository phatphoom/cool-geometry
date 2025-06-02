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
  },
  getDimensions: (inputs: Record<string, number>) => {
    const a = inputs['ด้าน a'] || 0;
    const b = inputs['ด้าน b'] || 0;
    const c = inputs['ด้าน c'] || 0;
    
    // Use the longest side as the base
    const base = Math.max(a, b, c);
    
    // Calculate area using Heron's formula
    const s = (a + b + c) / 2; // Semi-perimeter
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    
    // Height = 2 * Area / Base
    const height = base > 0 ? (2 * area) / base : 0;
    
    return {
      width: base,
      height: height
    };
  }
};