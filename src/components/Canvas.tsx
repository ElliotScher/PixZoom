import { useEffect, useRef, useState } from 'react'
import '@/css/Canvas.css'
import CanvasImage from '@/classes/Image'
import ImageProcessingTab from './ImageProcessingTab'

export default function Canvas({ primaryImage }: { primaryImage: CanvasImage | null }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [primaryImage])

  const containerStyle = {
    width: `${windowWidth}px`
  }

  function handleProcessingFunction(func: string | null) {
    if (func === 'crop') {
      console.log('put cropping logic here')
    }
    if (func === 'rotate') {
      console.log('put rotating logic here')
    }
    if (func === 'resize') {
      console.log('put resizing logic here')
    }
    if (func === 'brightness') {
      console.log('put brightness logic here')
    }
    if (func === 'saturation') {
      console.log('put saturation logic here')
    }
    if (func === 'contrast') {
      console.log('put contrast logic here')
    }
    if (func === 'greyscale') {
      console.log('put greyscale logic here')
    }
  }

  return (
    <>
      <div ref={containerRef} className={'canvas-container'} style={containerStyle}>
        <ImageProcessingTab onSelectFunction={handleProcessingFunction} />
        {primaryImage && (
          <img src={URL.createObjectURL(primaryImage.getTopLayer())} alt={`Edited: ${primaryImage.name}`} className='canvas-image' />
        )}
      </div>
    </>
  )
}
