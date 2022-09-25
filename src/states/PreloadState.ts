import AssetMenager from "../AssetMenager";
import { State } from "./State";
import { preloaderResources } from '../configs/loader-config.json';


export default class PreloadState extends State {

    public assetM: AssetMenager;
    public enter(): void {
        super.enter();
        this.assetM = new AssetMenager();
        this.assetM.loadResources(preloaderResources, () => {
            console.log("EEEE == stanaaaaaaaaaa");
            
        });
    }
}