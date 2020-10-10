import PhotoInterface from "../UnsplashApi/Interface/PhotoInterface";
import SimilarityQueryInterface from "./SimilarityQueryInterface";
import EditDistance from "../Distance/EditDistance";
import DistanceMatrix from "./DistanceMatrix";
import UserInterface from "../UnsplashApi/Interface/UserInterface";

export default class Similarity {
    // TODO: Handle photos similarity score to search query
    // Based on normalized distances

    editDistance: EditDistance;
    distanceMatrix: DistanceMatrix;

    /**
     * @param amount
     */
    constructor(amount: number) {
        this.editDistance = new EditDistance();
        this.distanceMatrix = new DistanceMatrix(amount);
    }

    /**
     * @param photos
     * @param query
     */
    reRank(photos: Array<PhotoInterface>, query: SimilarityQueryInterface): Array<PhotoInterface> {
        // TODO: Re-rank by metadata
        photos.forEach((photo) => {
            this.evaluateAuthorDistance(query, photo.user);
        });
        this.distanceMatrix.normalize();
        let globalDistances: Array<[number, number]> = this.distanceMatrix.getGlobalDistances();
        let res: Array<PhotoInterface> = [];
        globalDistances.forEach((item) => {
            res.push(photos[item[0]]);
        });
        return res;
    }

    /**
     * @param query
     * @param author
     */
    evaluateAuthorDistance(query: SimilarityQueryInterface, author: UserInterface): void {
        if (typeof query.author === 'string') {
            this.distanceMatrix.pushEditDistance(this.editDistance.evaluate(query.author, author.name));
        }
    }

}