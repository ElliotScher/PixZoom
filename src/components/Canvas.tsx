import { useEffect, useRef, useState } from 'react'
import '@/css/Canvas.css'
import CanvasImage from '@/classes/Image'
import ImageProcessingTab from './ImageProcessingTab'

export default function Canvas({ primaryImage }: { primaryImage: CanvasImage | null }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [render, rerender] = useState(false)
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

  async function handleCrop() {
    const cropDimensions = { x: 0, y: 0, width: 100, height: 100 }

    if (primaryImage) {
      const croppedFile = await cropImage(primaryImage.getTopLayer(), cropDimensions)
      primaryImage.addLayer(croppedFile)
      rerender(!render)
    }
  }

  function handleProcessingFunction(func: string | null) {
    if (func === 'crop') {
      handleCrop()
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

export async function cropImage(image: File, cropDimensions: { x: number; y: number; width: number; height: number }): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Canvas context not supported')
      }

      const { x, y, width, height } = cropDimensions
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height)

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped.png', { type: 'image/png' })
          resolve(croppedFile)
        }
      }, 'image/png')
    }
    img.src = URL.createObjectURL(image)
  })
}
