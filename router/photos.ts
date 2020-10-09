import express, {Router} from "express";
import UnsplashApiClient from "../src/UnsplashApi/UnsplashApiClient";

let router: Router = express.Router();
let apiClient: UnsplashApiClient = new UnsplashApiClient();

/** GET photos */
router.post('/search', (req, res, next) => {
    apiClient.searchPhotos(req.body['query']).then((result) => {
        res.send({"res": result});
    });
});

export default router;