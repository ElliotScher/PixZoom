import { useState } from 'react'
import '@/css/ImageProcessingTab.css' // Import your CSS file for styling

export default function ImageProcessingTab({ onSelectFunction }: { onSelectFunction: (functionName: string) => void }) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)

  function handleFunctionClick(functionName: string) {
    setSelectedFunction((prevFunction) => (prevFunction === functionName ? null : functionName))
    onSelectFunction(functionName)
  }

  return (
    <div className='image-processing-tab'>
      <button className={selectedFunction === 'crop' ? 'selected' : ''} onClick={() => handleFunctionClick('crop')}>
        Crop
      </button>
      <button className={selectedFunction === 'rotate' ? 'selected' : ''} onClick={() => handleFunctionClick('rotate')}>
        Rotate
      </button>
      <button className={selectedFunction === 'resize' ? 'selected' : ''} onClick={() => handleFunctionClick('resize')}>
        Resize
      </button>
      <button className={selectedFunction === 'brightness' ? 'selected' : ''} onClick={() => handleFunctionClick('brightness')}>
        Brightness
      </button>
      <button className={selectedFunction === 'saturation' ? 'selected' : ''} onClick={() => handleFunctionClick('saturation')}>
        Saturation
      </button>
      <button className={selectedFunction === 'contrast' ? 'selected' : ''} onClick={() => handleFunctionClick('contrast')}>
        Contrast
      </button>
      <button className={selectedFunction === 'greyscale' ? 'selected' : ''} onClick={() => handleFunctionClick('greyscale')}>
        Greyscale
      </button>
    </div>
  )
}
