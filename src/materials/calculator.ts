type Shape = {
  id: string
  name: string
  inputs: string[]
  calculateArea: (inputs: Record<string, number>) => number
  getDimensions?: (inputs: Record<string, number>) => { width: number, height: number }
}

export function calculatePieces(
  totalArea: number,
  shape: Shape,
  inputs: Record<string, number>
): number {
  const sheetWidth = inputs['sheetWidth'] || 0;
  const sheetHeight = inputs['sheetHeight'] || 0;
  
  if (shape.getDimensions) {
    const { width, height } = shape.getDimensions(inputs);
    
    if (width <= 0 || height <= 0 || sheetWidth <= 0 || sheetHeight <= 0) {
      return 0;
    }
    
    const piecesInWidth = Math.floor(sheetWidth / width);
    const piecesInHeight = Math.floor(sheetHeight / height);
    
    return piecesInWidth * piecesInHeight;
  } else {
    const area = shape.calculateArea(inputs);
    return area > 0 ? Math.floor(totalArea / area) : 0;
  }
}