import PhotoInterface from "./PhotoInterface";

export default interface ResponseInterface {
    total: number,
    total_pages: number,
    results: Array<PhotoInterface>
}