import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi.js-legacy";
import * as game_config from "../src/configs/game-config.json";
import App from "../src/App";
import StateMachine from './states/StateMachine';
import GameConfig from "./configs/GameConfig";
import InstanceFactory from "./factories/InstanceFactory";
import InsAGameFactory from "./factories/InsAGameFactory";
import CommandManager from "./commands/CommandManager";
import { commands } from "./enums/Commands";
import * as GameCommands from "./commands/GameCommands";
import GameModel from "./model/GameModel";

import AuthorizationState from "./states/AuthorizationState";
import ErrorState from "./states/ErrorState";
import { IStatesConfigSchema } from "./states/State";
import StateConfig from "./configs/StateConfig";
import HasErrorCondition from "./states/conditions/HasErrorCondition";
import DefaultCondition from "./states/conditions/DefaultCondition";
import PreloadState from "./states/PreloadState";

//const urlParams: any = {};

/*location.search
    .substr(1)
    .split("&")
    .forEach((item) => {
        const tmp = item.split("=");
        if(tmp[0].length > 0) {
            urlParams[tmp[0]] = decodeURIComponent(tmp[1]);
        }
    });
console.log("url params : ", urlParams);*/

const startGame = (params:object) => {
    console.log("EEE0000 - game started ", params);

    InstanceFactory.init(new InsAGameFactory());
    initDefaultCommands();
    GameModel.update();

    const app = new App();
    App.dispatcher = new PIXI.utils.EventEmitter();
    window["App"] = App;
    
    registerStates();

    document
        .getElementById(GameConfig.containerName)
        .appendChild(app.view);


    function initDefaultCommands() {
        CommandManager.setCommand(commands.START_GAME, GameCommands.StartGame);
        CommandManager.setCommand(commands.PAUSE_GAME, GameCommands.PauseGame);
    }

    function registerStates() {
        // states
        StateMachine.registerState(
            "init",
            new AuthorizationState(StateMachine)
        );
        StateMachine.registerState(
            "error",
            new ErrorState(StateMachine)
        );
        StateMachine.registerState(
            "preload",
            new PreloadState(StateMachine)
        );

        // conditions
        StateMachine.registerCondition(
            "default",
            new DefaultCondition()
        );
        StateMachine.registerCondition(
            "hasError",
            new HasErrorCondition()
        );

        StateMachine.startStateMachine(
            StateConfig.appStatesList as IStatesConfigSchema
        );
    }

}



window.onload = () => {
    startGame({config: game_config});
}