import BaseConfig from "./BaseConfig";

 const gameConfig = class GameConfig extends BaseConfig {

    constructor() {
        super();

        this.gameName = "Insects Attack 3";
        this.version = "1.0.0";
        this.containerName = "root";
        this.dimentions = {
            width: 360,
            height: 520
        };
        bulkSkip: true;
    }
}

export default new gameConfig();