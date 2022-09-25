import BaseGameFactory from "./BaseGameFactory";

class InstanceFactory {

    private gameFactory: BaseGameFactory;

    public getClass(name: string, params?: []) {
        const methodName = "get" + name;
        if(typeof this.gameFactory[methodName] === "function") {
            return this.gameFactory[methodName](params);
        } else {
            throw new Error("Class name not found: " + name);
        }
    }

    public init(gameFactory: BaseGameFactory) {
        this.gameFactory = gameFactory;
    }
}

export default new InstanceFactory();