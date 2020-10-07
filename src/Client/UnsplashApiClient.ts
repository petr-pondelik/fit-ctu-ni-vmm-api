import UnsplashApiClientConfig from "../Config/UnsplashApiClientConfig";
import Path from "path";
import fetch, {Headers, RequestInfo} from "node-fetch";

// Load configuration
require('dotenv').config({
    path: Path.resolve(process.cwd(), 'config', '.env')
});

export default class UnsplashApiClient {

    config: UnsplashApiClientConfig;

    searchPhotosPath: string = '/search/photos';

    constructor() {
        this.config = new UnsplashApiClientConfig(
            process.env.UNSPLASH_API_URL,
            process.env.UNSPLASH_API_KEYS_POOL,
            process.env.PHOTOS_SEARCH_PAGES,
            process.env.PHOTOS_PER_PAGE
        );
    }

    /**
     * @param termsQuery
     */
    searchPhotos(termsQuery: string): Promise<any> {
        let requestHeaders = new Headers();
        requestHeaders.append('Authorization', `Client-ID ${this.config.unsplashApiKeysPool[0]}`);
        let requestInit = {
          headers: requestHeaders
        };
        return new Promise((resolve, reject) => {
            fetch(`${this.config.unsplashApiUrl}${this.searchPhotosPath}?query=${termsQuery}`, requestInit)
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