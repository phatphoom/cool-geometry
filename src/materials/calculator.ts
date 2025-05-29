// export const calculatePieces = (totalArea: number, shapeArea: number): number => {
//   if (shapeArea <= 0) return 0;
//   return Math.floor(totalArea / shapeArea);
// };
type Shape = {
  id: string
  name: string
  inputs: string[]
  calculateArea: (inputs: Record<string, number>) => number
}

export function calculatePieces(
  totalArea: number,
  shape: Shape,
  inputs: Record<string, number>
): number {
  const area = shape.calculateArea(inputs)
  return area > 0 ? Math.floor(totalArea / area) : 0
}
