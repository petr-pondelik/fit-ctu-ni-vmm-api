import PhotoInterface from "../UnsplashApi/Interface/PhotoInterface";
import SimilarityQueryInterface from "./SimilarityQueryInterface";

export default class Similarity {
    // TODO: Handle photos similarity score to search query
    // Based on normalized distances

    /**
     * @param photos
     * @param query
     */
    reRank(photos: Array<PhotoInterface>, query: SimilarityQueryInterface): Array<PhotoInterface> {
        // TODO: Re-rank by metadata
        return photos;
    }

}