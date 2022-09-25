import Loader from './loader/GameLoader';
import App from './App';
import GameEvents from './events/GameEvents';
import ILoadResources from './inerfaces/ILoadResources';


export default class AssetMenager {

    private loader: Loader;
    private callback: ()=>void;

    constructor() {
        console.log("EEE2222 - AssetMenager initialize ", App.dispatcher);

        App.dispatcher.on(GameEvents.RESOURCE_LOADED, this.newResourceLoaded);
        App.dispatcher.once(GameEvents.APP_GAME_READY, this.loadResources, this);
        this.loader = new Loader(); 

        
    }

    newResourceLoaded = (dataName) => {
        console.log("EEE555555 new resource loaded : ", dataName, " ==== ", this.loader.resources);
        if(this.callback) {
            this.callback();
            this.callback = null;
        }
    };

    loadResources = (resources: ILoadResources[], cb) => {
      //  console.log("RRRR ", resources);
        this.callback = cb;
        this.loader.loadResources(resources);
    };
}