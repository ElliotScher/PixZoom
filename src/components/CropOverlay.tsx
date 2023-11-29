import { useRef } from 'react'
import '@/css/CropOverlay.css'

export default function CropOverlay({ onRemove }: {onRemove: () => void}) {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  function handleClick() {
    console.log('clicked')
    onRemove()
  }

  return (
    <div className='crop-overlay-container' ref={overlayRef}>
      <button onClick={handleClick}>
        <img src='src\assets\check-solid.svg'></img>
      </button>
    </div>
  )
}
