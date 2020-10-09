export default class DateTimeDistance {

    dateTime1?: Date;
    dateTime2?: Date;

    /**
     * @param dateTime1Str
     * @param dateTime2Str
     */
    evaluate(dateTime1Str: string, dateTime2Str: string): number {
        this.dateTime1 = new Date(dateTime1Str);
        this.dateTime2 = new Date(dateTime2Str);
        return Math.abs(this.dateTime1.getTime() - this.dateTime2.getTime());
    }

}