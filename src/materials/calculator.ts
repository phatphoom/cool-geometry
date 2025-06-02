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
  // Extract sheet dimensions from totalArea
  // We assume totalArea is width * height from AreaInput component
  const sheetWidth = inputs['sheetWidth'] || 0
  const sheetHeight = inputs['sheetHeight'] || 0
  
  // If shape has a getDimensions method, use grid-based calculation
  if (shape.getDimensions) {
    const { width, height } = shape.getDimensions(inputs)
    
    // Calculate how many shapes can fit in each dimension using floor division
    if (width <= 0 || height <= 0 || sheetWidth <= 0 || sheetHeight <= 0) {
      return 0
    }
    
    const piecesInWidth = Math.floor(sheetWidth / width)
    const piecesInHeight = Math.floor(sheetHeight / height)
    
    // Total pieces is the product of pieces in each dimension
    return piecesInWidth * piecesInHeight
  } else {
    // Fallback to area-based calculation if getDimensions is not available
    const area = shape.calculateArea(inputs)
    return area > 0 ? Math.floor(totalArea / area) : 0
  }
}
