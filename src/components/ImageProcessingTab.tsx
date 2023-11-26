import { useState } from 'react'
import '@/css/ImageProcessingTab.css'

export default function ImageProcessingTab({ onSelectFunction }: { onSelectFunction: (functionName: string) => void }) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)
  const buttonWidth = 50
  const buttonHeight = 50
  const imageSize = 40

  function handleFunctionClick(functionName: string) {
    setSelectedFunction((prevFunction) => (prevFunction === functionName ? null : functionName))
    onSelectFunction(functionName)
  }

  return (
    <div className='image-processing-tab'>
      <button
        className={selectedFunction === 'crop' ? 'selected' : ''}
        onClick={() => handleFunctionClick('crop')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\crop.png' width={imageSize} height={imageSize} />
      </button>
      <button
        className={selectedFunction === 'rotate' ? 'selected' : ''}
        onClick={() => handleFunctionClick('rotate')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\rotate.png' width={imageSize} height={imageSize} />
      </button>
      <button
        className={selectedFunction === 'resize' ? 'selected' : ''}
        onClick={() => handleFunctionClick('resize')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\resize.png' width={imageSize} height={imageSize} />
      </button>
      <button
        className={selectedFunction === 'brightness' ? 'selected' : ''}
        onClick={() => handleFunctionClick('brightness')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\brightness.png' width={imageSize} height={imageSize} />
      </button>
      <button
        className={selectedFunction === 'saturation' ? 'selected' : ''}
        onClick={() => handleFunctionClick('saturation')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\saturation.png' width={imageSize} height={imageSize} />
      </button>
      <button
        className={selectedFunction === 'contrast' ? 'selected' : ''}
        onClick={() => handleFunctionClick('contrast')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\contrast.png' width={imageSize} height={imageSize} />
      </button>
      <button
        className={selectedFunction === 'greyscale' ? 'selected' : ''}
        onClick={() => handleFunctionClick('greyscale')}
        style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      >
        <img src='src\assets\greyscale.png' width={imageSize} height={imageSize} />
      </button>
    </div>
  )
}
