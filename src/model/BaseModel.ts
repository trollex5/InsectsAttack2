import { IBaseDataParser } from "../inerfaces/IBaseDataParser";
import Utils from "../utils/Utils";

export abstract class BaseModel<T> {
    protected parsers: IBaseDataParser<T>[];
    protected processedData: T[];


    public registerParser(parser: IBaseDataParser<T>) {
        if(!this.parsers) {
            this.parsers = [];
        }
        this.parsers.push(parser);
    }

    public update(data?: T[]) {
        const processedData = this.processData(data);
        if(processedData.length || data) {
            this.processedData = processedData;
        }
        while(this.processedData && this.processedData.length > 0) {
            this.assign(this.processedData.shift());
        }
    }

    protected assign(processedData: T) {
        Utils.serialize(processedData, this);
    }

    protected processData(data): T[] {
        const results: T[] = [];
        if(this.parsers) {
            for(let parser = 0; parser < this.parsers.length; parser++) {
                if(this.parsers[parser].check(data)) {
                    const result = this.parsers[parser].parse(data);
                    if(Array.isArray(result)) {
                        results.push(...result);
                    } else {
                        results.push(result);
                    }
                }
            }
            return results;
        } else {
            throw new Error("No Parser found for supplied data");
        }
    }
}