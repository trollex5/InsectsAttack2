import IAuthorizationData from "../inerfaces/IAuthorizationData";
import { BaseModel } from "./BaseModel";


class GameModel extends BaseModel<IAuthorizationData> {
    lang: string;
    currency: string;
    public mobile: boolean;
    public android: boolean;
    public IOS: boolean;
    public isIpad: boolean


    constructor() {
        super();

        this.mobile = /Mobi/.test(navigator.userAgent);
        this.android = /android/i.test(navigator.userAgent);
        this.IOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent) && /(iPad|iPhone|iPod)/i.test(navigator.platform);
        this.isIpad = /(iPad)/i.test(navigator.userAgent);
    }

    public parseUrlParams(urlParams/*, gameConfig*/) {
        this.lang = urlParams.language || urlParams.lang || 'en';
        this.currency = urlParams.currency || "eu";
    }

    public update(data?: any) {
        console.log("game model was updated ", data);
        
    }
}

export default new GameModel();