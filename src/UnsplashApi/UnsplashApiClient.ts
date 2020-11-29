import UnsplashApiConfig from "./UnsplashApiConfig";
import fetch, {Headers} from "node-fetch";
import UnsplashApiPool from "./UnsplashApiPool";
import PhotoInterface from "./Interface/PhotoInterface";
import ResponseInterface from "./Interface/ResponseInterface";

export default class UnsplashApiClient {

    config: UnsplashApiConfig;
    pool: UnsplashApiPool;

    searchPhotosPath: string = '/search/photos';
    getPhotoPath: string = '/photos'

    constructor() {
        this.config = new UnsplashApiConfig();
        this.pool = new UnsplashApiPool();
    }

    getHeaders(): Headers {
        let requestHeaders = new Headers();
        let apiKey = this.pool.getFreeApiKey();
        // console.log(apiKey);
        this.pool.updateLog(apiKey, Date.now());
        requestHeaders.append('Authorization', `Client-ID ${apiKey}`);
        return requestHeaders;
    }

    initRequest(): object {
        return {
            headers: this.getHeaders()
        }
    }

    /**
     * @param termsQuery
     * @param amount
     */
    searchPhotos(termsQuery: string, amount?: number): Promise<ResponseInterface> {
        let requestInit = this.initRequest();
        let photosPerPage: number = (typeof amount === "number") ? amount : this.config.photosPerPage;
        let url: string = `${this.config.apiUrl}${this.searchPhotosPath}?page=${this.config.photosSearchPages}&per_page=${photosPerPage}&query=${termsQuery}`;
        return new Promise((resolve, reject) => {
            fetch(url, requestInit)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @param id
     */
    getPhoto(id: string): Promise<PhotoInterface> {
        let requestInit = this.initRequest();
        let url: string = `${this.config.apiUrl}${this.getPhotoPath}/${id}`;
        return new Promise((resolve, reject) => {
            fetch(url, requestInit)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * @param photos
     */
    async getPhotos(photos: Array<PhotoInterface>): Promise<Array<PhotoInterface>> {
        // TODO: Get photos details from Unsplash API
        console.log('getPhotos');
        let res: Array<PhotoInterface> = [];
        for (const id in photos) {
            let photoRes: PhotoInterface = await this.getPhoto(photos[id].id);
            res.push(photoRes);
        }
        return Promise.resolve(res);
    }

}