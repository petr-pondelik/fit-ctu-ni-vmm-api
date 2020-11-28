export default interface SimilarityQueryInterface {
    query: string,
    author?: string,
    position?: {
        latitude: number,
        longitude: number
    },
    dimensions?: {
        width?: number,
        height?: number
    },
    created?: string
}