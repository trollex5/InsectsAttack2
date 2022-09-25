import { IStateConfig } from "../inerfaces/IStateList";

class StateConfig {

    public appStatesList: IStateConfig;

    constructor() {

        this.appStatesList = {
            "entryPoint": "init",
            "states": [
                {
                    "name": "init",
                    "links": [
                        {
                            "condition": "hasError",
                            "nextState": "error"
                        },
                        {
                            "condition": "default",
                            "nextState": "preload"
                        }
                    ]
                },
                {
                    "name": "preload",
                    "links": [
                        {
                            "condition": "hasError",
                            "nextState": "error"
                        },
                        {
                            "condition": "default",
                            "nextState": "idle"
                        }
                    ]
                }
            ]
        }
    }
}

export default new StateConfig();
