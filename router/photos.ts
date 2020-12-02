import express, {Router} from "express";
import UnsplashApiClient from "../src/UnsplashApi/UnsplashApiClient";
import ResponseInterface from "../src/UnsplashApi/Interface/ResponseInterface";
import PhotoInterface from "../src/UnsplashApi/Interface/PhotoInterface";
import Similarity from "../src/Similarity/Similarity";
import fs from "fs";
import Path from "path";

let router: Router = express.Router();
let apiClient: UnsplashApiClient = new UnsplashApiClient();

/** GET photos */
router.post('/search', (req, res, next) => {

    // var startTime = new Date();

    apiClient.searchPhotos(req.body['query'], req.body['amount']).then(
        (result: ResponseInterface) => {
            // let apiEndTime = new Date();
            // fs.appendFileSync(Path.resolve(__dirname, '..', 'results', 'measurement.txt'), 'Query: ' + req.body['query'] + '\n');
            // fs.appendFileSync(Path.resolve(__dirname, '..', 'results', 'measurement.txt'), 'Amount: ' + req.body['amount'] + '\n');
            // fs.appendFileSync(Path.resolve(__dirname, '..', 'data', 'measurement.txt'), 'UnsplashAPI: ' + (apiEndTime.getTime() - startTime.getTime()).toString() + '\n');
            let similarity: Similarity = new Similarity(result.results.length);
            /** If there is location in query, get photos details from Unsplash API */
            let photos: Array<PhotoInterface> = result.results;
            if (typeof req.body['position'] === 'object') {
                apiClient.getPhotos(photos).then((response) => {
                    // let apiEndTime = new Date();
                    // fs.appendFileSync(Path.resolve(__dirname, '..', 'results', 'measurement.txt'), 'UnsplashAPI: ' + (apiEndTime.getTime() - startTime.getTime()).toString() + '\n');
                    let photosReRanked: Array<PhotoInterface> = similarity.reRank(response, req.body);
                    // let totalEndTime = new Date();
                    // fs.appendFileSync(Path.resolve(__dirname, '..', 'results', 'measurement.txt'), 'Total: ' + (totalEndTime.getTime() - startTime.getTime()).toString() + '\n');
                    res.send({
                        "res": {
                            "original": response,
                            "reRanked": photosReRanked
                        }
                    });
                });
            } else {
                let photosReRanked: Array<PhotoInterface> = similarity.reRank(photos, req.body);
                // let totalEndTime = new Date();
                // fs.appendFileSync(Path.resolve(__dirname, '..', 'results', 'measurement.txt'), 'Total: ' + (totalEndTime.getTime() - startTime.getTime()).toString() + '\n');
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