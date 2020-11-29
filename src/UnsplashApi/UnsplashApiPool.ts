import UnsplashApiConfig from "./UnsplashApiConfig";
import fs from "fs";
import Path from "path";

export default class UnsplashApiPool {

    config: UnsplashApiConfig;
    requestsLog: any;
    timeLimit: number = 3600000; // 1 hour in ms
    requestsPerLimit: number = 50;
    freeKey?: string;

    constructor() {
        this.config = new UnsplashApiConfig();
    }

    loadLog(): any {
        let rawData: Buffer = fs.readFileSync(Path.resolve(__dirname, '..', '..', this.config.logPath));
        this.requestsLog = JSON.parse(rawData.toString());
    }

    updateApiLog(): void {
        let res: any = {};
        for (const apiKey in this.requestsLog) {
            res[apiKey] = [];
            for (const logId in this.requestsLog[apiKey]) {
                let timestamp = this.requestsLog[apiKey][logId];
                if ((Date.now() - timestamp) <= this.timeLimit) {
                    res[apiKey].push(timestamp);
                }
            }
        }

        for (const apiKey in res) {
            if ((res[apiKey]).length < this.requestsPerLimit) {
                this.freeKey = apiKey;
                res[apiKey].push(Date.now())
                break;
            }
        }

        this.requestsLog = res;
    }

    saveLog(): void {
        fs.writeFileSync(Path.resolve(__dirname, '..', '..', this.config.logPath), JSON.stringify(this.requestsLog));
    }

    getFreeApiKey(): string {
        this.updateApiLog();
        // TODO: Handle state where there are no free keys
        return this.freeKey ?? '';
    }

}