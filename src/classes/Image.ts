class ImageLayer {
  id: number
  image: HTMLImageElement

  constructor(id: number, image: HTMLImageElement) {
    this.id = id
    this.image = image
  }
}

export default class CanvasImage {
  baseImage: HTMLImageElement
  layers: ImageLayer[]

  constructor(baseImage: HTMLImageElement) {
    this.baseImage = baseImage
    this.layers = [new ImageLayer(0, baseImage)]
  }

  addLayer(image: HTMLImageElement): void {
    const newLayer = new ImageLayer(this.layers.length, image)
    this.layers.push(newLayer)
  }

  clearLayers(): void {
    this.layers = [this.layers[0]]
  }

  getTopLayer(): ImageLayer | null {
    if (this.layers.length > 0) {
      return this.layers[this.layers.length - 1]
    }
    return null
  }
}
