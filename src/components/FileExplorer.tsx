import { useRef } from 'react'

export default function FileExplorer({ onImageUpload }: { onImageUpload: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    // 👇️ open file input box on click of another element
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }

    // Reset file input
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    // Pass the file to the parent component for further processing
    onImageUpload(fileObj)
  }

  return (
    <div>
      <input style={{ display: 'none' }} ref={inputRef} type='file' onChange={handleFileChange} accept='image/*' />

      <button style={{ cursor: 'pointer' }} onClick={handleClick}>
        Open File
      </button>
    </div>
  )
}
