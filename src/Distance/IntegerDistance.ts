export default class IntegerDistance {

    /**
     * @param int1
     * @param int2
     */
    evaluate(int1: number, int2: number): number {
        return Math.abs(Math.round(int1) - Math.round(int2));
    }

}