export default interface IAuthorizationData {
    lang?: string;
    currency?: string;
    sessionID?: string;
    playerConfig?: IPlayerConfig;
}

export interface IPlayerConfig {
    name?: string;
    userId?: string;
    currency?: string;
}