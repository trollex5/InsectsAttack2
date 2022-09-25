import IAuthorizationData from "../inerfaces/IAuthorizationData";
import { IBaseDataParser } from "../inerfaces/IBaseDataParser";



export default class GameModelDataParser implements IBaseDataParser<IAuthorizationData> {

    check(data: IAuthorizationData): boolean {
        return data != undefined || data != null;
    }

    parse(data: IAuthorizationData): IAuthorizationData | IAuthorizationData[] {
        const playerConfig = data.playerConfig;
        const result = {
            lang: data.lang,
            currency: data.currency,
            sessionID: data.sessionID,
            playerConfig: playerConfig
        }

        return [result];
    }
}