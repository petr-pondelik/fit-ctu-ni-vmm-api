export default class DistanceMatrix {

    editDistances: Array<number> = [];

    normalize(): void {
        Object.keys(this).forEach((vectorName) => {
            let vectorKey = vectorName as keyof this;
            let vector: any = this[vectorKey] as any;
            let maximum = vector.reduce((a: number, b: number) => {
                return Math.max(a, b);
            });
            for (let i = 0; i < vector.length; i++) {
                vector[i] = vector[i]/maximum;
            }
            this[vectorKey] = vector;
        });
    }

}