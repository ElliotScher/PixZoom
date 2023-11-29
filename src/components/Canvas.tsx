import { useEffect, useRef, useState } from 'react'
import '@/css/Canvas.css'
import CanvasImage from '@/classes/Image'
import ImageProcessingTab from './ImageProcessingTab'
import CropOverlay from './CropOverlay'

export default function Canvas({ primaryImage }: { primaryImage: CanvasImage | null }) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
  const [render, rerender] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const [imageStart, setImageStart] = useState<{ top: number; left: number } | null>(null)
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect())
      }
    }

    function getPosition() {
      const imageElement = imageRef.current
      if (imageElement && containerRect) {
        const top = imageStart ? imageElement.getBoundingClientRect().top - containerRect.top : 0
        const left = imageStart ? imageElement.getBoundingClientRect().left - containerRect.left : 0
        setImageStart({ top, left })
      }
    }
    handleResize()
    getPosition()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [primaryImage, containerRect])

  const containerStyle = {
    width: `${windowWidth}px`
  }

  async function handleCrop(cropDimensions: { x: number; y: number; width: number; height: number }) {
    if (primaryImage) {
      const croppedFile = await cropImage(primaryImage.getTopLayer(), cropDimensions)
      primaryImage.addLayer(croppedFile)
      rerender(!render)
    }
  }

  function handleProcessingFunction(func: string | null) {
    if (primaryImage) {
      if (func === 'crop') {
        setIsCropping(true)
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
  }

  return (
    <>
      <div ref={containerRef} className={'canvas-container'} style={containerStyle}>
        <ImageProcessingTab onSelectFunction={handleProcessingFunction} />
        {primaryImage && (
          <img
            ref={imageRef}
            src={URL.createObjectURL(primaryImage.getTopLayer())}
            alt={`Edited: ${primaryImage.name}`}
            className='canvas-image'
          />
        )}
        {isCropping && primaryImage && <CropOverlay start={imageStart} onCrop={handleCrop} onRemove={() => setIsCropping(false)} />}
        {/* {imageStart && containerRect && <div
        style={{
          position: 'absolute',
          top: imageStart.top,
          left: imageStart.left,
          width: '10px',
          height: '10px',
          background: 'red',
          borderRadius: '50%',
        }}
      />} */}
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
