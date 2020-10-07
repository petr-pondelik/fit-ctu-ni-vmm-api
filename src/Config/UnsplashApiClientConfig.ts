export default class UnsplashApiClientConfig {

    unsplashApiUrl: string;
    unsplashApiKeysPool: Array<string>;
    photosSearchPages: number;
    photosPerPage: number;

    /**
     * @param unsplashApiUrl
     * @param unsplashApiKeysPool
     * @param photosSearchPages
     * @param photosPerPage
     */
    constructor(
        unsplashApiUrl?: string,
        unsplashApiKeysPool?: string,
        photosSearchPages?: string,
        photosPerPage?: string
    ) {
        this.unsplashApiUrl = unsplashApiUrl ?? '';
        this.unsplashApiKeysPool = JSON.parse(unsplashApiKeysPool ?? '[]');
        this.photosSearchPages = photosSearchPages ? parseInt(photosSearchPages) : 1;
        this.photosPerPage = photosPerPage ? parseInt(photosPerPage) : 10;
    }
}