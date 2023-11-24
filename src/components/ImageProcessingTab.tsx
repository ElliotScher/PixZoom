export default function ImageProcessingTab() {
  function handleCrop() {}

  function handleRotate() {}

  function handleResize() {}

  function handleBrightness() {}

  function handleSaturation() {}

  function handleContrast() {}

  function handleGreyscale() {}

  return (
    <>
      <div>
        <button onClick={handleCrop}>Crop</button>
        <button onClick={handleRotate}>Rotate</button>
        <button onClick={handleResize}>Resize</button>
        <button onClick={handleBrightness}>Brightness</button>
        <button onClick={handleSaturation}>Saturation</button>
        <button onClick={handleContrast}>Contrast</button>
        <button onClick={handleGreyscale}>Greyscale</button>
      </div>
    </>
  )
}
