import { useRef } from 'react'

export default function FileExplorer({ onImageUpload }: { onImageUpload: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }

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
