// วงแหวน
export const calculateAnnulusArea = (outerRadius: number, innerRadius: number): number => {
  return Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
};

export const annulusShape = {
  id: 'annulus',
  name: 'วงแหวน',
  inputs: ['รัศมีวงนอก', 'รัศมีวงใน'],
  calculateArea: (inputs: Record<string, number>): number => {
    return calculateAnnulusArea(inputs['รัศมีวงนอก'], inputs['รัศมีวงใน']);
  },
  getDimensions: (inputs: Record<string, number>) => {
    const outerRadius = inputs['รัศมีวงนอก'] || 0;
    const outerDiameter = 2 * outerRadius;
    return {
      width: outerDiameter,
      height: outerDiameter
    };
  }
};