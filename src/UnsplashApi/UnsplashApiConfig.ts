// Load configuration
import Path from "path";

require('dotenv').config({
    path: Path.resolve(process.cwd(), 'config', '.env.unsplash')
});

export default class UnsplashApiConfig {

    apiUrl: string;
    apiKeysPool: Array<string>;
    logPath: string

    photosSearchPages: number;
    photosPerPage: number;

    constructor() {
        this.apiUrl = process.env.API_URL ?? '';
        this.apiKeysPool = JSON.parse(process.env.API_KEYS_POOL ?? '[]');
        this.logPath = process.env.LOG_PATH ?? '';
        this.photosSearchPages = process.env.PHOTOS_SEARCH_PAGES ? parseInt(process.env.PHOTOS_SEARCH_PAGES) : 1;
        this.photosPerPage = process.env.PHOTOS_PER_PAGE ? parseInt(process.env.PHOTOS_PER_PAGE) : 10;
    }
}