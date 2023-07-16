export type CollectionItem = {
  _uid: string,
  image: string,
  category: string[],
  component: string,
  prodPrice: string,
  prodTitle: string,
  prodWeight: string,
  prodDimensions: string,
  prodDescription: string,
  additionalImages: { name: string, filename: string }[]
}