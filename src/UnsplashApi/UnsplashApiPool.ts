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

    freeKeySet(): boolean {
        return !!this.freeKey;
    }

    loadLog(): any {
        let rawData: Buffer = fs.readFileSync(Path.resolve(__dirname, '..', '..', this.config.logPath));
        this.requestsLog = JSON.parse(rawData.toString());
    }

    cleanExpiredLogs(): void {
        let res: any = {};
        for (const apiKey in this.requestsLog) {
            res[apiKey] = [];
            // console.log(apiKey);
            for (const logId in this.requestsLog[apiKey]) {
                // console.log(this.requestsLog[apiKey][logId]);
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
        // this.requestsLog[this.freeKey].push(new Date())
        console.log(this.requestsLog);
        this.saveLog();
    }

    /**
     * @param apiKey
     * @param timestamp
     */
    updateLog(apiKey: string, timestamp: number): void {
        this.loadLog();
        this.requestsLog[apiKey].push(timestamp);
        this.saveLog();
    }

    saveLog(): void {
        fs.writeFileSync(Path.resolve(__dirname, '..', '..', this.config.logPath), JSON.stringify(this.requestsLog));
    }

    getFreeApiKey(): string {
        // TODO: Retrieve first free connection key from pool
        this.loadLog();
        this.cleanExpiredLogs();
        // TODO: Handle state where there are no free keys
        return this.freeKey ?? '';
    }

}