import { Loader } from 'pixi.js';
import ILoadResources from '../inerfaces/ILoadResources';
//import { debug } from 'webpack';
import App from '../App';
import GameEvents from '../events/GameEvents';

export default class GameLoader {

    private _resources: PIXI.IResourceDictionary;
    private loader: PIXI.Loader;
    //private cb: Function;
    private queue: ILoadResources[];
    private dataCounter: number;
    
    constructor() {

        this.loader = new Loader();
       // this.cb;
        this.queue = [];
        this.dataCounter = 0;
        this.loader.onProgress.add(this.showProgress);
        this.loader.onComplete.add(this.doneLoading);
        this.loader.onError.add(this.logError);
    }

    public get resources() {
        return this._resources;
    }

    loadResources = (images: ILoadResources[]) => {
        console.log("EEEE333333  load resources ", images);
        if(!images) return false;
        images.forEach(img => {
            this.queue.push(img);
        });
        this.startLoading();   
    }

    releseData = () => {
        this._resources = null;
    }

    startLoading = () => {
        console.log("EEEE444444  startLoading ");
        const resource = this.queue[0];

        if(!resource) return;

        this.loader.add(resource.data["name"], resource.data["url"]);
        this.loader.load();
    };

    showProgress = (e) => {
        console.log("EEE === loading progress: ", e.progress);
    };

    doneLoading = () => {
        this._resources = this.loader.resources;
        console.log("EEE === doneLoading: ", this._resources);
        const name = this.queue.shift();

        if(this.queue.length) {
            console.log("EEE one more to be loading");
            
            this.startLoading();
        } else {
            console.log("EEE end loading ", name["name"]);
            App.dispatcher.emit(GameEvents.RESOURCE_LOADED, name["name"]);
        }
    };

    logError = (e) => {
        console.error("ERROR: " + e.message);
    };
}



