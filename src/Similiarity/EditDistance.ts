export default class EditDistance {

    firstStr: string = '';
    secondStr: string = '';

    /**
     * @param firstStr
     * @param secondStr
     */
    evaluate(firstStr: string, secondStr: string): number {
        // TODO: Implement Edit Distance of two strings
        this.firstStr = firstStr;
        this.secondStr = secondStr;
        let res: number = this.editDistance(0, 0);
        console.log(res);
        return res;
        // return this.editDistance(1,1);
    }

    editDistance(i: number, j: number): number {
        if (i > this.firstStr.length) {
            return this.secondStr.length - j + 1;
        }

        if (j > this.secondStr.length) {
            return this.firstStr.length - i + 1;
        }

        let swapDist: number = this.editDistance(i + 1, j + 1);

        if (this.firstStr[i] !== this.secondStr[j]) {
            swapDist++;
        }

        let deleteDist: number = 1 + this.editDistance(i + 1, j);
        let addDist: number = 1 + this.editDistance(i, j + 1);

        return Math.min(swapDist, deleteDist, addDist);
    }

}