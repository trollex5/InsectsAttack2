import IBaseConfig from "../inerfaces/IBaseConfig";

export default abstract class BaseConfig implements IBaseConfig {

    public gameName: string;
    public version: string;
    public containerName: string;
    public dimentions: { width: number, height: number };
    public bulkSkip: boolean;

    // constructor(parameters) {
        
    // }
}