export default function Canvas({ primaryImage }: { primaryImage: File | null }) {
  return (
    <>
      <div className={'canvas-container'}>
        {primaryImage && <img src={URL.createObjectURL(primaryImage)} alt={`Edited: ${primaryImage.name}`} />}
      </div>
    </>
  )
}
