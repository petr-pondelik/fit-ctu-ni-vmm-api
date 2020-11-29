import express, {response, Router} from "express";
import UnsplashApiClient from "../src/UnsplashApi/UnsplashApiClient";
import ResponseInterface from "../src/UnsplashApi/Interface/ResponseInterface";
import PhotoInterface from "../src/UnsplashApi/Interface/PhotoInterface";
import Similarity from "../src/Similarity/Similarity";

let router: Router = express.Router();
let apiClient: UnsplashApiClient = new UnsplashApiClient();

/** GET photos */
router.post('/search', (req, res, next) => {

    var startTime = new Date();

    apiClient.searchPhotos(req.body['query'], req.body['amount']).then(
        (result: ResponseInterface) => {
            let apiEndTime = new Date();
            console.log(apiEndTime.getTime() - startTime.getTime());
            let similarity: Similarity = new Similarity(result.results.length);
            /** If there is location in query, get photos details from Unsplash API */
            let photos: Array<PhotoInterface> = result.results;
            if (typeof req.body['position'] === 'object') {
                apiClient.getPhotos(photos).then((response) => {
                    let photosReRanked: Array<PhotoInterface> = similarity.reRank(response, req.body);
                    res.send({
                        "res": {
                            "original": response,
                            "reRanked": photosReRanked
                        }
                    });
                });
            } else {
                let photosReRanked: Array<PhotoInterface> = similarity.reRank(photos, req.body);
                let totalEndTime = new Date();
                console.log(totalEndTime.getTime() - startTime.getTime());
                res.send({
                    "res": {
                        "original": result.results,
                        "reRanked": photosReRanked
                    }
                });
            }
        }
    );

});

export default router;