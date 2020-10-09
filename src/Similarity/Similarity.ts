import PhotoInterface from "../UnsplashApi/Interface/PhotoInterface";

export default class Similarity {
    // TODO: Handle photos similarity score to search query
    // Based on normalized distances

    /**
     * @param photos
     */
    reRank(photos: Array<PhotoInterface>): Array<PhotoInterface> {
        // TODO: Re-rank by metadata
        return photos;
    }

}