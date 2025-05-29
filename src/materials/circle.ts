export const calculateCircleArea = (radius: number): number => {
  return Math.PI * radius * radius;
};

export const circleShape = {
  id: 'circle',
  name: 'วงกลม',
  inputs: ['รัศมี'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateCircleArea(inputs['รัศมี']);
  }
};