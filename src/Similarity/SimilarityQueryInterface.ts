export default interface SimilarityQueryInterface {
    query: string,
    author?: string,
    position?: {
        "latitude": string,
        "longitude": string
    },
    dimensions?: {
        "width": number,
        "height": number
    },
    created?: string
}