export default class GreatCircleDistance {

    earthRadius: number = 6371; // in meters
    latitude1: number = 0; // GPS latitude coordinate
    longitude1: number = 0; // GPS longitude coordinate
    latitude2: number = 0; // GPS latitude coordinate
    longitude2: number = 0; // GPS longitude coordinate

    /**
     * @param latitude1
     * @param longitude1
     * @param latitude2
     * @param longitude2
     */
    evaluate(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
        this.latitude1 = this.degreeToRadian(latitude1);
        this.longitude1 = this.degreeToRadian(longitude1);
        this.latitude2 = this.degreeToRadian(latitude2);
        this.longitude2 = this.degreeToRadian(longitude2);
        return this.earthRadius * this.getCentralAngle();
    }

    getCentralAngle(): number {
        let longitudeDiff: number = Math.abs(this.longitude1 - this.longitude2);
        console.log(longitudeDiff);

        let factor: number = Math.sqrt(
            Math.pow(Math.cos(this.latitude2) * Math.sin(longitudeDiff), 2) +
            Math.pow(Math.cos(this.latitude1) * Math.sin(this.latitude2) - Math.sin(this.latitude1) * Math.cos(this.latitude2) * Math.cos(longitudeDiff), 2)
        );

        let denominator: number = Math.sin(this.latitude1) * Math.sin(this.latitude2) + Math.cos(this.latitude1) * Math.cos(this.latitude2) * Math.cos(longitudeDiff);

        console.log(Math.atan(factor/denominator));

        return Math.atan(factor/denominator);
    }

    // getCentralAngle(): number {
    //     let longitudeDiff: number = Math.abs(this.longitude1 - this.longitude2);
    //     let latitudeDiff: number = Math.abs(this.latitude1 - this.latitude2);
    //
    //     let sqrtPart: number = Math.sqrt(
    //         Math.pow(Math.sin(latitudeDiff/2), 2) + Math.cos(this.latitude1) * Math.cos(this.latitude2) * Math.pow(Math.sin(longitudeDiff/2), 2)
    //     );
    //
    //     return 2 * Math.asin(sqrtPart);
    // }

    // getCentralAngle(): number {
    //     let longitudeDiff: number = Math.abs(this.longitude1 - this.longitude2);
    //     let acosArg: number = Math.sin(this.latitude1) * Math.sin(this.latitude2) + Math.cos(this.latitude1) * Math.cos(this.latitude2) * Math.cos(longitudeDiff);
    //     return Math.acos(acosArg);
    // }

    /**
     * @param degree
     */
    degreeToRadian(degree: number): number {
        return (degree * Math.PI) / 180;
    }

}
