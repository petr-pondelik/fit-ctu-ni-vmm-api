export default interface LocationInterface {
    title: string,
    name: string,
    city: string,
    country: string,
    position: {
        latitude?: number,
        longitude?: number
    }
}