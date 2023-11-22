import { useEffect, useRef, useState } from 'react'
import Image from './Image'
import '../css/ImageMenu.css'

export default function GalleryThumbnail({
  file,
  onDelete,
  onTransfer
}: {
  file: { index: number; name: string; file: File }
  onDelete: (index: number) => void
  onTransfer: () => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  function toggleMenu() {
    setShowMenu(!showMenu)
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false)
    }
  }

  function handleMenuClick(event: React.MouseEvent) {
    event.stopPropagation()
  }

  function handleDelete() {
    onDelete(file.index)
    setShowMenu(false)
  }

  function handleCanvasTransfer() {
    onTransfer()
    setShowMenu(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='gallery-thumbnail-wrapper' ref={menuRef}>
      <Image name={file.name} file={file.file} />

      {showMenu && (
        <div className='gallery-thumbnail-menu' onClick={handleMenuClick}>
          <button onClick={handleCanvasTransfer}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <button className='gallery-thumbnail-button' onClick={toggleMenu}>
        <div className='gallery-thumbnail-dots'>
          <div className='gallery-thumbnail-dot' style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }} />
          <div className='gallery-thumbnail-dot' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          <div className='gallery-thumbnail-dot' style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      </button>
    </div>
  )
}
