export default class DistanceMatrix {

    amount: number;

    matrix: Array<Array<number>> = [
        [], [], [], [], []
    ];

    /**
     * @param amount
     */
    constructor(amount: number) {
        this.amount = amount;
    }

    normalize(): void {
        console.log('normalize');
        this.matrix.forEach((vector, i) => {
            if (vector.length > 0) {
                let maximum = vector.reduce((a: number, b: number) => {
                    return Math.max(a, b);
                });
                for (let i = 0; i < vector.length; i++) {
                    vector[i] = vector[i] !== -1 ? vector[i]/maximum : 1;
                }
                this.matrix[i] = vector;
            }
        });
        console.log(this.matrix);
    }

    getGlobalDistances(): Array<[number, number]> {
        let res: Array<[number, number]> = []
        for (let j: number = 0; j < this.amount; j++) {
            let photoGlobalDistance: number = 0.0;
            for (let i: number = 0; i < this.matrix.length; i++) {
                if (this.matrix[i].length === this.amount) {
                    photoGlobalDistance += this.matrix[i][j];
                }
            }
            res.push([j, photoGlobalDistance]);
        }
        return res.sort((a: [number, number], b: [number, number]) => {
            return a[1] - b[1];
        });
    }

    /**
     * @param val
     */
    pushEditDistance(val: number): void {
        this.matrix[0].push(val);
    }

    /**
     * @param val
     */
    pushGreatCircleDistance(val: number): void {
        this.matrix[1].push(val);
    }

    /**
     * @param val
     */
    pushDateTimeDistance(val: number): void {
        this.matrix[2].push(val);
    }

    /**
     * @param val
     */
    pushWidthIntDistance(val: number): void {
        this.matrix[3].push(val);
    }

    pushHeightIntDistance(val: number): void {
        this.matrix[4].push(val);
    }

}