class ImageLayer {
  id: number
  image: File

  constructor(id: number, image: File) {
    this.id = id
    this.image = image
  }
}

export default class CanvasImage {
  baseImage: File
  layers: ImageLayer[]
  name: string

  constructor(baseImage: File, name: string) {
    this.baseImage = baseImage
    this.layers = [new ImageLayer(0, baseImage)]
    this.name = name
  }

  addLayer(image: File): void {
    const newLayer = new ImageLayer(this.layers.length, image)
    this.layers.push(newLayer)
  }

  clearLayers(): void {
    this.layers = [this.layers[0]]
  }

  getTopLayer(): File {
    return this.layers[this.layers.length - 1].image
  }

  getBaseLayer(): File {
    return this.baseImage
  }

  getNthLayer(N: number): File {
    return this.layers[N].image
  }

  getAllLayers(): ImageLayer[] {
    return this.layers
  }

  async getTopLayerDimensions(): Promise<{ width: number; height: number }> {
    return await getImageDimensions(this.layers[this.layers.length - 1].image)
  }

  async getBaseLayerDimensions(): Promise<{ width: number; height: number }> {
    return await getImageDimensions(this.baseImage)
  }

  async getNthLayerDimensions(N: number): Promise<{ width: number; height: number }> {
    return await getImageDimensions(this.layers[N].image)
  }

  async getAllLayersDimensions(): Promise<Array<{ width: number; height: number }>> {
    const dimensionsPromises = this.layers.map((layer) => getImageDimensions(layer.image))
    return await Promise.all(dimensionsPromises)
  }
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve({ width: image.width, height: image.height })
    }
    image.onerror = reject
    image.src = URL.createObjectURL(file) as string
  })
}
