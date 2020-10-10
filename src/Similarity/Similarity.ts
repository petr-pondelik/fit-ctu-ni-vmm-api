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

    constructor() {
        this.editDistance = new EditDistance();
        this.distanceMatrix = new DistanceMatrix();
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
        return photos;
    }

    /**
     * @param query
     * @param author
     */
    evaluateAuthorDistance(query: SimilarityQueryInterface, author: UserInterface): void {
        if (typeof query.author === 'string') {
            this.distanceMatrix.editDistances.push(this.editDistance.evaluate(query.author, author.name));
        }
    }

}