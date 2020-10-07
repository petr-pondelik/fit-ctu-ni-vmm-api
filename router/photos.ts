import express, {Router} from "express";
import UnsplashApiClient from "../src/UnsplashApi/UnsplashApiClient";

let router: Router = express.Router();
let apiClient: UnsplashApiClient = new UnsplashApiClient();

/** GET photos */
router.get('/search', (req, res, next) => {
    let queryTerms: string = (req.query['query'] ?? '') as string;
    apiClient.searchPhotos(queryTerms).then((result) => {
        res.send({"res": result});
    });
});

export default router;