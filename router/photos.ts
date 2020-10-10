import express, {response, Router} from "express";
import UnsplashApiClient from "../src/UnsplashApi/UnsplashApiClient";
import ResponseInterface from "../src/UnsplashApi/Interface/ResponseInterface";
import PhotoInterface from "../src/UnsplashApi/Interface/PhotoInterface";
import Similarity from "../src/Similarity/Similarity";

let router: Router = express.Router();
let apiClient: UnsplashApiClient = new UnsplashApiClient();
let similarity: Similarity = new Similarity();

/** GET photos */
router.post('/search', (req, res, next) => {

    apiClient.searchPhotos(req.body['query']).then(
        (result: ResponseInterface) => {
            /** If there is location in query, get photos details from Unsplash API */
            let photos: Array<PhotoInterface> = result.results;
            if (typeof req.body['position'] === 'object') {
                apiClient.getPhotos(photos).then((response) => {
                    console.log('AFTER getPhotos');
                    let photosReRanked: Array<PhotoInterface> = similarity.reRank(response, req.body);
                    res.send({
                        "res": photosReRanked
                    });
                });
            } else {
                let photosReRanked: Array<PhotoInterface> = similarity.reRank(photos, req.body);
                res.send({
                    "res": photosReRanked
                });
            }
        }
    );

});

export default router;