import PIXI, { Application, settings as PixiSettings, SCALE_MODES } from 'pixi.js';
//import * as game_config from "../src/configs/game-config.json";
import GameConfig from "./configs/GameConfig";
import BaseGameFactory from './factories/BaseGameFactory';
import InstanceFactory from './factories/InstanceFactory';

///settings.SCALE_MODE = SCALE_MODES.NEAREST;

export default class App extends Application {

    static instance: App;
    static width: number;
    static height: number;
    static gameFactory: BaseGameFactory;
    static registredOnLoop: {(time:number): void}[];
    static downTime: number;
    static dispatcher: PIXI.utils.EventEmitter;
    private app: PIXI.Application;

    constructor() {
        
        if(App.instance) {
            return App.instance;
        }
        
        App.downTime = 0;
        const START_WIDTH = GameConfig.dimentions.width;
        const START_HEIGHT = GameConfig.dimentions.height;

        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;
        let maxDPI = 2;
        if(vpWidth > START_WIDTH || vpHeight > START_HEIGHT) {
            maxDPI = 1;
        }
        const dpr = Math.min(window.devicePixelRatio || 1, maxDPI);
        
        super({width: 360, height: 520, backgroundColor: 0x000000, sharedLoader: true});
        
        this.bigBla(dpr);  // izmislica za da ne gurmi dpr never used...

        App.instance = this;
        PixiSettings.SCALE_MODE = SCALE_MODES.LINEAR;
        PixiSettings["FAIL_IF_MAJOR_PERFORMANCE_CAVEAT"] = false;
        PixiSettings.CAN_UPLOAD_SAME_BUFFER = false;

        App.gameFactory = InstanceFactory;

        App.instance.ticker.add((/*time*/) => {
            App.heartBeat(/*time*/);
        });

       /* this.appLoader = new LoaderScreen();

        this.renderDelegates = new PixiDelegate(
            this.app,
            {"x":0,"y":0,"width":620,"height":680}
        );

        

        this.setState("init");*/
    }

    public bigBla(bla): number {
        return bla;
    }

    public static subscribeToHeartBeat(cb: (...[]) => void) {
        if(!App.registredOnLoop) {
            App.registredOnLoop = [];
        }

        if(!App.registredOnLoop.includes(cb)) {
            App.registredOnLoop.push(cb);
        }
    }

    public static unsubscribeToHeartBeat(cb: (...[]) => void) {
        if(App.registredOnLoop && App.registredOnLoop.includes(cb)) {
            App.registredOnLoop.splice(App.registredOnLoop.indexOf(cb), 1);
        }
    }

    private static heartBeat(/*time: number*/) {
        if(App.registredOnLoop) {
            App.registredOnLoop.forEach(cb => {
                cb(this.getActualTime());
            })
        }
    }

    public static getActualTime(): number {
        return (App.instance.ticker.lastTime - this.downTime) /100;
    }

}