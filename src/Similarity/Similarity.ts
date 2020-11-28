import PhotoInterface from "../UnsplashApi/Interface/PhotoInterface";
import SimilarityQueryInterface from "./SimilarityQueryInterface";
import EditDistance from "../Distance/EditDistance";
import DistanceMatrix from "./DistanceMatrix";
import UserInterface from "../UnsplashApi/Interface/UserInterface";
import LocationInterface from "../UnsplashApi/Interface/LocationInterface";
import GreatCircleDistance from "../Distance/GreatCircleDistance";
import DateTimeDistance from "../Distance/DateTimeDistance";
import IntegerDistance from "../Distance/IntegerDistance";

export default class Similarity {

    editDistance: EditDistance;
    greatCircleDistance: GreatCircleDistance;
    dateTimeDistance: DateTimeDistance;
    integerDistance: IntegerDistance
    distanceMatrix: DistanceMatrix;

    /**
     * @param amount
     */
    constructor(amount: number) {
        this.editDistance = new EditDistance();
        this.greatCircleDistance = new GreatCircleDistance();
        this.dateTimeDistance = new DateTimeDistance();
        this.integerDistance = new IntegerDistance();
        this.distanceMatrix = new DistanceMatrix(amount);
    }

    /**
     * @param photos
     * @param query
     */
    reRank(photos: Array<PhotoInterface>, query: SimilarityQueryInterface): Array<PhotoInterface> {
        // TODO: Re-rank by metadata
        console.log('reRank');
        photos.forEach((photo) => {
            this.evaluateAuthorDistance(query, photo.user);
            this.evaluateGPSDistance(query, photo.location);
            this.evaluateCreatedDistance(query, photo.created_at);
            this.evaluateWidthDistance(query, photo.width);
            this.evaluateHeightDistance(query, photo.height)
        });
        this.distanceMatrix.normalize();
        let globalDistances: Array<[number, number]> = this.distanceMatrix.getGlobalDistances();
        console.log(globalDistances);
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
        if (typeof query.author === "string") {
            this.distanceMatrix.pushEditDistance(this.editDistance.evaluate(query.author, author.name));
        }
    }

    /**
     * @param query
     * @param location
     */
    evaluateGPSDistance(query: SimilarityQueryInterface, location: LocationInterface): void {
        console.log('evaluateGPSDistance');
        if (typeof query.position === "object") {
            let greatCircleDistance: number = -1;
            if (typeof location.position.latitude === "number" && typeof location.position.longitude === "number") {
                greatCircleDistance = this.greatCircleDistance.evaluate(
                    query.position.latitude, query.position.longitude,
                    location.position.latitude, location.position.longitude
                );
            }
            console.log(greatCircleDistance);
            this.distanceMatrix.pushGreatCircleDistance(greatCircleDistance);
        }
    }

    /**
     * @param query
     * @param dateTime
     */
    evaluateCreatedDistance(query: SimilarityQueryInterface, dateTime: string): void {
        if (typeof query.created === "string") {
            this.distanceMatrix.pushDateTimeDistance(this.dateTimeDistance.evaluate(query.created, dateTime));
        }
    }

    /**
     * @param query
     * @param width
     * @param height
     */
    evaluateWidthDistance(query: SimilarityQueryInterface, width: number): void {
        if (typeof query.dimensions === "object" && typeof query.dimensions.width === "number") {
            this.distanceMatrix.pushWidthIntDistance(
                this.integerDistance.evaluate(query.dimensions.width, width)
            )
        }
    }

    /**
     * @param query
     * @param height
     */
    evaluateHeightDistance(query: SimilarityQueryInterface, height: number): void {
        if (typeof query.dimensions === "object" && typeof query.dimensions.height === "number") {
            this.distanceMatrix.pushHeightIntDistance(
                this.integerDistance.evaluate(query.dimensions.height, height)
            )
        }
    }

}