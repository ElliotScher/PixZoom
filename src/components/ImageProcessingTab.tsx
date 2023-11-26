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
        <img src='src\assets\crop.png' width={50} height={50} />
      </button>
      <button className={selectedFunction === 'rotate' ? 'selected' : ''} onClick={() => handleFunctionClick('rotate')}>
        <img src='src\assets\rotate.png' width={50} height={50} />
      </button>
      <button className={selectedFunction === 'resize' ? 'selected' : ''} onClick={() => handleFunctionClick('resize')}>
        <img src='src\assets\resize.png' width={50} height={50} />
      </button>
      <button className={selectedFunction === 'brightness' ? 'selected' : ''} onClick={() => handleFunctionClick('brightness')}>
        <img src='src\assets\brightness.png' width={50} height={50} />
      </button>
      <button className={selectedFunction === 'saturation' ? 'selected' : ''} onClick={() => handleFunctionClick('saturation')}>
        <img src='src\assets\saturation.png' width={50} height={50} />
      </button>
      <button className={selectedFunction === 'contrast' ? 'selected' : ''} onClick={() => handleFunctionClick('contrast')}>
        <img src='src\assets\contrast.png' width={50} height={50} />
      </button>
      <button className={selectedFunction === 'greyscale' ? 'selected' : ''} onClick={() => handleFunctionClick('greyscale')}>
        <img src='src\assets\greyscale.png' width={50} height={50} />
      </button>
    </div>
  )
}
