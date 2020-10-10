import PhotoInterface from "../UnsplashApi/Interface/PhotoInterface";
import SimilarityQueryInterface from "./SimilarityQueryInterface";
import EditDistance from "../Distance/EditDistance";

export default class Similarity {
    // TODO: Handle photos similarity score to search query
    // Based on normalized distances

    editDistance: EditDistance;

    /**
     */
    constructor() {
        this.editDistance = new EditDistance();
    }

    /**
     * @param photos
     * @param query
     */
    reRank(photos: Array<PhotoInterface>, query: SimilarityQueryInterface): Array<PhotoInterface> {
        // TODO: Re-rank by metadata
        photos.forEach((photo) => {
            if (typeof query.author === 'string') {
                console.log(this.editDistance.evaluate(query.author, photo.user.name));
            }
        });
        return photos;
    }

}