import { useRef, useState } from 'react'
import '@/css/CropOverlay.css'

export default function CropOverlay({
  rectangle,
  onCrop,
  onRemove
}: {
  rectangle: { top: number; left: number; width: number; height: number } | null
  onCrop: (cropDimensions: { x: number; y: number; width: number; height: number }) => void
  onRemove: () => void
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null)
  const [currentPosition, setCurrentPosition] = useState<{ x: number; y: number } | null>(null)

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const rect = overlayRef.current?.getBoundingClientRect()
    if (rect) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (rectangle) {
        if (x >= rectangle.left && x <= rectangle.left + rectangle.width && y >= rectangle.top && y <= rectangle.top + rectangle.height) {
          setStartPosition({ x, y })
          setCurrentPosition({ x, y })
        }
      }
    }
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (startPosition) {
      const rect = overlayRef.current?.getBoundingClientRect()
      if (rect) {
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if (rectangle && x >= rectangle.left && x <= rectangle.left + rectangle.width && y >= rectangle.top && y <= rectangle.top + rectangle.height) {
          setCurrentPosition({ x, y })
        }
      }
    }
  }

  function handleMouseUp() {
    if (startPosition && currentPosition) {
      const width = currentPosition.x - startPosition.x
      const height = currentPosition.y - startPosition.y

      onCrop({ x: startPosition.x, y: startPosition.y, width, height })

      setStartPosition(null)
      setCurrentPosition(null)
    }
  }

  function handleClick() {
    console.log('clicked')
    onRemove()
  }

  return (
    <div
      className='crop-overlay-container'
      ref={overlayRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {startPosition && currentPosition && (
        <div
          className='crop-region'
          style={{
            left: startPosition.x,
            top: startPosition.y,
            width: currentPosition.x - startPosition.x,
            height: currentPosition.y - startPosition.y
          }}
        />
      )}
      <button onClick={handleClick}>
        <img src='src\assets\check-solid.svg' alt='Checkmark'></img>
      </button>
    </div>
  )
}
