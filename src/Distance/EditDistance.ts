export default class EditDistance {

    firstStr: string = '';
    secondStr: string = '';

    memoizationTable: Array<Array<number>> = [];

    initMemoization(): void {
        for (let i = 0; i <= this.firstStr.length; i++) {
                this.memoizationTable[i] = [];
            for (let j = 0; j <= this.secondStr.length; j++) {
                this.memoizationTable[i][j] = -1;
            }
        }
    }

    /**
     * @param firstStr
     * @param secondStr
     */
    evaluate(firstStr: string, secondStr: string): number {
        this.firstStr = firstStr;
        this.secondStr = secondStr;
        this.initMemoization();
        console.log(this.firstStr);
        console.log(this.secondStr);
        this.editDistance(0, 0);
        console.log(this.memoizationTable);
        return this.memoizationTable[0][0];
    }

    editDistance(i: number, j: number): number {
        // If the recursive call has been called previously, return stored previously calculated value
        if (this.memoizationTable[i][j] !== -1) {
            return this.memoizationTable[i][j];
        }

        if (i > this.firstStr.length - 1) {
            this.memoizationTable[i][j] = this.secondStr.length - j;
            return this.memoizationTable[i][j];
        }

        if (j > this.secondStr.length - 1) {
            this.memoizationTable[i][j] = this.firstStr.length - i;
            return this.memoizationTable[i][j];
        }

        let swapDist: number = this.editDistance(i + 1, j + 1);
        if (this.firstStr[i] !== this.secondStr[j]) {
            swapDist++;
        }

        let deleteDist: number = 1 + this.editDistance(i + 1, j);
        let addDist: number = 1 + this.editDistance(i, j + 1);

        this.memoizationTable[i][j] = Math.min(swapDist, deleteDist, addDist);
        return this.memoizationTable[i][j];
    }

}