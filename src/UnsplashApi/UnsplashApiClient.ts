import UnsplashApiConfig from "./UnsplashApiConfig";
import fetch, {Headers} from "node-fetch";
import UnsplashApiPool from "./UnsplashApiPool";

export default class UnsplashApiClient {

    config: UnsplashApiConfig;
    pool: UnsplashApiPool;

    searchPhotosPath: string = '/search/photos';

    constructor() {
        this.config = new UnsplashApiConfig();
        this.pool = new UnsplashApiPool();
    }

    /**
     * @param termsQuery
     */
    searchPhotos(termsQuery: string): Promise<any> {
        let requestHeaders = new Headers();
        let apiKey = this.pool.getFreeApiKey();
        console.log(apiKey);
        this.pool.updateLog(apiKey, Date.now());
        requestHeaders.append('Authorization', `Client-ID ${apiKey}`);
        let requestInit = {
          headers: requestHeaders
        };
        return new Promise((resolve, reject) => {
            fetch(`${this.config.apiUrl}${this.searchPhotosPath}?query=${termsQuery}`, requestInit)
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    resolve(json);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }

}